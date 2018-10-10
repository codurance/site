---
layout: post
name: Unit-vs-Integration-Akka-Testing
title: 'Unit vs Integration Akka Testing'
date: 2016-05-31 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/custom/img/blog/time.jpg
    attribution:
      text: York railway station by Daida Medina
      href: https://www.instagram.com/p/nBD197Ho2F/?taken-by=thelastfreeusername
alias: [/2016/05/31/unit-vs-integration-akka-testing/]
tags:
- testing
- unit
- integration
- akka
categories:
- software-creation
---

This is the sixth post in the series about integrating sync clients with async systems ([1, ](http://codurance.com/2016/04/28/async-systems-with-sync-clients/)[2, ](http://codurance.com/2016/04/30/akka-basics/)[3, ](http://codurance.com/2016/05/10/finite-state-machines-with-akka/)[4, ](http://codurance.com/2016/05/16/publish-subscribe-model-in-kafka/)[5](http://codurance.com/2016/05/25/coordination-in-akka/)). Here we'll see how to test [Akka actors](http://doc.akka.io/docs/akka/current/scala/actors.html) with different testing styles.


## Unit vs Integration Testing

Nowadays everybody agrees with the famous [testing pyramid](http://googletesting.blogspot.com.es/2015/04/just-say-no-to-more-end-to-end-tests.html):

<img src="{{ site.baseurl }}/assets/custom/img/blog/pyramid.png" alt="Testing pyramid" title="Testing pyramid" class="img img-center img-fluid style-screengrab">

Harder to achieve is an agreement on what integration, unit, functional or acceptance means. It is reasonable as applications are structured differently depending on language, architecture and domain. I'll try to distill some essences though:

* Unit: the key here is isolation. Some people talk about isolated production code, e.g. a single function or a bunch of methods within a class (one public and the rest private). [Some other people](https://vimeo.com/68375232) talks about isolated or independent tests, i.e. tests that may be executed in parallel as they don't access to any shared resource. A third view is that a unit test execution should be synchronous without any concurrency concern. That's [Akka's view](http://doc.akka.io/docs/akka/current/scala/testing.html):

> Testing isolated pieces of code without involving the actor model, meaning without multiple threads; this implies completely deterministic behavior concerning the ordering of events and no concurrency concerns and will be called Unit Testing in the following.

* Integration: this kind of tests often involves that several classes, modules or services are exercised. With Akka we'll test several actors but the key concept is that we'll use multi-threaded scheduling:

> Testing (multiple) encapsulated actors including multi-threaded scheduling; this implies non-deterministic order of events but shielding from concurrency concerns by the actor model and will be called Integration Testing in the following.

## Akka Unit Testing

When we unit test objects we look for:

* Check the returned value.
* Verify calls to collaborators.
* Inspect the internal state. This might be an smell in some cases.

The concept of returned value is slightly different in Akka. Akka focuses on messages and not on method invocations. Checking the returned value involves two actors and two messages. If the collaborators of the *Actor Under Test* are also Actors, verifying calls will involve two actors and two messages too. If we use a multi-threaded dispatcher for scheduling this, this scenario will be out of our unit testing definition. Let's focus then on testing internal state.

Akka actors are completely encapsulated and the only communication channel is the mailbox. `TestActorRef` is provided by Akka so we can gain access into the internals of an actor and unit test it. One of its specialised forms is `TestFSMRef` allowing us to test [Finite State Machines](http://codurance.com/2016/05/10/finite-state-machines-with-akka/). Let's see an example from our platform:

```scala
"Item FSM" should {
  "move into active state when it receives an item" in {
    val fsm = TestFSMRef(new ItemFSM(itemReportedProducer, itemDeletedBus))
    fsm.stateName shouldBe Idle
    fsm.stateData shouldBe Uninitialized

    fsm ! ItemReported(itemId)

    within(200 millis){
      fsm.stateName shouldBe Active
      fsm.stateData.asInstanceOf[ItemsToBeDeleted].items shouldBe items
    }
  }
}
```

As you can see `TestFSMRef` wraps the actor that we want to test and exposes its internal state. That wrapper has other useful methods like setting state programatically or manipulating FSM timers.

I want to share something that confused me a little the first time, but it's important to understand. We need to recall that unit testing in Akka means using one single thread in order to achieve a deterministic order of events. `TestActorRef` uses `CallingThreadDispatcher` by default. This dispatcher *runs invocations on the current thread only* so we could do an unit test that checks the returned value of an actor with this style.

```scala
class EchoActor extends Actor {
 override def receive = {
   case message ⇒ sender() ! message
 }
}

"send back messages unchanged" in {
  import akka.pattern.ask
  import scala.concurrent.duration._
  implicit val timeout = Timeout(5 seconds)

  val actorRef = TestActorRef(new EchoActor)

  val future = actorRef ? "hello world"
  val Success(result: String) = future.value.get
  result should be("hello world")
}
```

Let's see how we can test this, and other scenarios, with an integration testing style in Akka.

## Akka Integration testing

Akka provides the `TestKit` class for integration testing. Let's see one of our tests written using that class:

```scala
class ItemFSMSpec() extends TestKit(ActorSystem("ItemFSMSpec")) with ImplicitSender

"send a complete message to the original sender when one deleted item is received and there are no more messages pending" in {
    val worker = TestFSMRef(new ItemFSM(itemReportedProducer, itemDeletedBus))
    worker ! ItemReported(itemId)

    itemDeletedBus.publish(MsgEnvelope(item.partitionKey, ItemDeleted(item)))

    within(200 millis) {
      expectMsg(Result(Right()))
    }
 }
```

In this particular test we're interested in the message that the FSM is dispatching to the sender. Let's take another look at this line:

```scala
worker ! ItemReported(itemId)
```

Here we're saying: send a message of `ItemReported` type to the actor assigned in the val `worker`. But who is sending that message? Extending and mixing `TestKit` and `ImplicitSender` creates a `testActor` that will be the messages sender. `TestKit` exposes some methods like `expectMsg` to allow inspecting the mailbox of that `testActor`. `within` acts like [Scalatest `eventually`](http://www.artima.com/docs-scalatest-2.0.M5/org/scalatest/concurrent/Eventually.html) but with more power. For instance, as the documentation says:

> It should be noted that if the last message-receiving assertion of the block is expectNoMsg or receiveWhile, the final check of the within is skipped in order to avoid false positives due to wake-up latencies. This means that while individual contained assertions still use the maximum time bound, the overall block may take arbitrarily longer in this case.

Another interesting class is `TestProbe`. If we have several actors in our integration test and we want to verify different messages sent between the different actors, using a single `testActor` might be confusing. Even with a single actor, using a `TestProbe` improves readability in some cases:

```scala
"flush a FSM when it receives a Failed message" in {
  val fsmProbe = TestProbe()
  val actorFactory: (ActorContext, ActorRef) => ActorRef = (context, self) => fsmProbe.ref
  val coordinator = TestActorRef(ItemReportedCoordinator.props(actorFactory))

  fsmProbe.send(coordinator, Result(Left(Exception("Some exception message"))))

  fsmProbe.expectMsg(FlushItemFSM)
}
```

In [the previous post](http://codurance.com/2016/05/25/coordination-in-akka/) we introduced the actor factory in order to create an actor pool. Here `TestProbe` helps understand with better clarity as to who is sending and expecting the messages.

## Summary

Testability is one of the main assets of Akka. The biggest challenge is understanding what we want to test: internal business logic of the actor or the async exchange of messages between different actors.

[Part 1](http://codurance.com/2016/04/28/async-systems-with-sync-clients/) | [Part 2](http://codurance.com/2016/04/30/akka-basics/) | [Part 3](http://codurance.com/2016/05/10/finite-state-machines-with-akka/) | [Part 4](http://codurance.com/2016/05/16/publish-subscribe-model-in-kafka/) | [Part 5](http://codurance.com/2016/05/25/coordination-in-akka/)
