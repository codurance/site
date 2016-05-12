---
layout: post
name: Finite-state-machines-with-Akka
title: 'Finite state machines with Akka'
date: 2016-05-10 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/machine.png
    attribution:
      text: Machine by Olle Svensson  
      href: https://www.flickr.com/photos/ollesvensson/3335131082
tags:
- akka
- state
- fsm
- actors

---

As you could remember from previous posts, [Part 1](http://codurance.com/2016/04/28/async-systems-with-sync-clients/) and  [Part 2](http://codurance.com/2016/04/30/akka-basics/), we're implementing a solution that integrates a sync client with an async system. Today we'll see how to keep track of the async operations so we can provide a sync response to the client. Let's start with the architectural diagram.

<img src="/assets/img/custom/blog/law_enforcement.png" alt="Law enforcement architecture" title="Law enforcement architecture" class="img img-center img-responsive style-screengrab">

We can understand the system through an example. The police sends us a request to delete an illegal item, and it expects a response in 10 seconds. Relevant statuses, for this example, are:

* 200: the item has been successfully deleted in every container that it was published in.
* 404: the item doesn't exist in our system.
* 504: timeout trying to delete the item.

Law enforcement service communicates with the Items service asynchronously using [Kafka](http://kafka.apache.org/). That means that we need to subscribe to a [topic](http://kafka.apache.org/documentation.html#intro_topics) called `item_deleted`. To add complexity to the system, we need to handle some multiplexing as the item could be published in different containers as the personal timeline or different groups. Let's define what we mean with state, before getting into the details of our solution.

## Defining State

State is the ability to keep track of what happened in our system. A pure stateless application would be a pure function that doesn't have any side effect. It receives an input, transforms it following some rules and returns an output. Such stateless applications are not very useful in a business context. Business and users want to know what happened in the past, so they can make informed decisions.

We don't need to keep the state in our application server, though. State is often stored in datastores or in clients. One canonical example is session management in a http-based application. Http is a stateless protocol meaning that to keep state between the requests, we'll need to do it ourselves, without help from the protocol.

Sticky sessions was a popular solution some years ago. State is stored in server's memory, so clients need to keep track of which server has been assigned to them. This solution has several problems:

* Fault tolerance: if the server crashes the session is lost. The user experience in such cases is really bad.
* Scalability: if some server is overwhelmed we can't easily scale out, as some users are tied to that particular server until the end of the session. Replicating sessions between servers is pretty complex.

A different approach is keeping the session in cookies on the client and/or in some datastore like [Redis](http://redis.io/). Thanks to that we keep our servers stateless, facilitating load balancers to distribute requests efficiently.

This example goes through state between requests, but we could have state inside a single request. Let's see how OOP handles state.

## State and Behaviour in OOP  

Objects and Actors are responsible to keep their own state. That encapsulation forces clients to interact with that state through exposed interfaces. That state affects object's behaviour as we can see in this example:

```scala
class Account(var balance: Int, var overdraft: Int = 0) {

  def deposit(value: Int) = {
      balance = balance + value
  }

  def withdrawal(value: Int) = {
    val remaining = balance - value
    if (remaining < 0) {
      balance = 0
      overdraft = overdraft + remaining.abs
      notifyAccountHolder(overdraft)
    } else {
      balance = remaining
    }
  }
}
```

We're swapping the behaviour of withdrawal depending on the state contained in balance. As soon as this code gets more special cases and branches the readability and maintainability worsens. We could use polymorphism, composition or simply extracting private methods in order to make that complexity bearable. Akka provides a really handy DSL called [Finite State Machines](https://www.wikiwand.com/en/Finite-state_machine) to achieve that.

## Finite State Machines

As Erlang documentation [states](http://erlang.org/documentation/doc-4.8.2/doc/design_principles/fsm.html):

> A FSM can be described as a set of relations of the form:

> State(S) x Event(E) -> Actions (A), State(S')

> These relations are interpreted as meaning:

> If we are in state S and the event E occurs, we should perform the actions A and make a transition to the state S'.

In our example:

*State(positive balance) x Event(significative withdrawal) -> Actions (update balance, withdrawal, and notify account holder), State(negative balance)*

Meanwhile in a negative balance state we could define different rules, as how many times we'll allow the overdraft operation.

## Finite State Machines in Akka

Coming back to our original example, the Law enforcement service will contain multiple instances of ItemCensor actor.

```scala
  class ItemCensor extends Actor with FSM[State, Data]
```

In order to keep the example easy to understand, we'll model only two possible states. Simple FSMs are well designed using the [become/unbecome](http://doc.akka.io/docs/akka/current/scala/actors.html#Become_Unbecome) functionality.

It's important to note the difference between State and Data. You could think of State as the labels of the visual representation of your FSM. The Data is local to every state.

```scala
sealed trait State

case object Idle extends State

case object Active extends State
```

```scala
sealed trait Data

case object Uninitialized extends Data

final case class ItemsToBeDeleted(items: Seq[Item]) extends Data
```

```scala
case class Item(itemId: UUID, containerId: UUID, containerType: String) {
  def partitionKey = s"${itemId.toString}-${containerId.toString}"
}
```

## First steps with FSM

In future posts we'll see how to create actors and manage its lifecycle. For now it's enough to know that in our system there is an actor with coordination responsibilities in charge of creating, resuming and pooling these ItemCensor actors. When the coordinator creates an instance this is executed inside the FSM:

```scala
  startWith(Idle, Uninitialized)
```

That Akka method sets the initial state and in our case an empty state data. Now we're ready to receive messages:

```scala
  when(Idle) {
    case Event(ItemsReported(items), _) =>
      items match {
        case List() => finishWorkWith(CensorResult(Left(ItemNotFound)))
        case items =>
          setTimer("CensorTimer", CensorTimeout, 10 seconds)
          items.foreach(item => {
            pipe(itemReportedProducer.publish(item)) to self
            itemDeletedBus.subscribe(self, item.partitionKey)
          })
          goto(Active) using ItemsToBeDeleted(items)
      }
  }
```

Let's explain this snippet. `when` method defines the scope of some state. When in `Idle` state this actor will receive messages of type `ItemsReported`. The partial function that you define to match messages has some particularity. FSM wraps received messages into `Event` objects and include current state data. We pattern match over the message and if we figure out that there are no item in any container we don't even start the work (this will eventually lead to a 404 response). Otherwise we start a timer that will send a message of type `CensorTimeout` after 10 seconds.

After that we publish every item into Kafka. Remember that a single physical item can live in different containers, so that's why we talk about `items`. `ItemReportedProducer` returns a future and we can `pipe` it into the same actor. Thanks to that we can listen to failures of that future and make the process fail early.

We subscribe the item into an [Akka Event Bus](http://doc.akka.io/docs/akka/2.4.4/java/event-bus.html), so this actor can react exclusively to its deleted items. Finally, we'll move the FSM into Active state including the state data of `ItemsToBeDeleted`.

## Updating Data State in a FSM

`ItemCensor` actor needs to wait until Items service finish deleting the items. Items service will publish some events into Kafka, and our Event Bus will be subscribed to that topic. `ItemCensor` is subscribed to only the items that he's interested to, and the Event Bus will send messages of type `ItemDeleted` to the actor.

```scala
  when(Active) {
    case Event(ItemDeleted(item), currentItemsToBeDeleted@ItemsToBeDeleted(items)) =>
      val newItemsToBeDeleted = items.filterNot(_ == item)
      newItemsToBeDeleted.size match {
        case 0 => finishWorkWith(CensorResult(Right()))
        case _ => stay using currentItemsToBeDeleted.copy(items = newItemsToBeDeleted)
      }
  }
```

As soon as we get `ItemDeleted` messaged from the Event Bus we update the state data `ItemsToBeDeleted`. If we exhaust the items, then we can finish successfully with a [Right](http://www.scala-lang.org/api/rc2/scala/Either.html) message. Otherwise we `stay` in the same state with the new state data, waiting until new messages arrive.

## Dealing with failure

FSM in Akka allows you to capture messages that the actor received but no partial function matched it properly.

```scala
  whenUnhandled {
    case Event(CensorTimeout, _) =>
      finishWorkWith(CensorResult(Left(CensorTimeout("Censor timed out"))))

    case Event(failure: Failure, _) =>
      finishWorkWith(CensorResult(Left(CensorException(failure.cause.getMessage))))
  }
```
`whenUnhandled` will try to match every handled message. If after 10 seconds the actor is still around a `CensorTimeout` message will be sent by `CensorTimer` so we can finish the work with the proper error case. If `itemReportedProducer` fails publishing an item to Kafka, this code will receive a `Failure` message as we piped that future into `self`.

## Finishing the FSM

The lifecycle of the FSM will be controlled from an outside actor, called coordinator. Whenever we want to finish the work of this FSM, we'll have to send a message to the coordinator:

```scala
  private def finishWorkWith(message: Any) = {
    coordinator ! message
    goto(Idle)
  }
```

We don't need to go to `Idle` status, but as doing it is clearer to the reader that that actor is not on duty anymore.

## Summary

FSM is in the core of our solution. In next posts we'll see how we integrate, coordinate, and supervise those FSMs so they can serve its purpose of bridging sync clients with async systems. At the same time we'll see how Kafka and Akka Event Bus implement its own versions of pub-sub philosophy, so they can react asynchronously to changes in our system.

[Part 1](http://codurance.com/2016/04/28/async-systems-with-sync-clients/) | [Part 2](http://codurance.com/2016/04/30/akka-basics/) | [Part 3](http://codurance.com/2016/05/10/Finite-state-machines-with-akka/)
