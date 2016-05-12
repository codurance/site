---
layout: post
name: Publish-subscribe-model-in-Kafka
title: 'Publish-subscribe model in Kafka'
date: 2016-05-12 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/kafka.jpg
    attribution:
      text: Kafka Museum by Priit Tammets
      href: https://www.flickr.com/photos/tammets/2116102744
tags:
- publish-subscribe
- kafka
- messaging

---

This is the fourth post in the series about integrating sync clients with async systems ([1, ](http://codurance.com/2016/04/28/async-systems-with-sync-clients/)[2, ](http://codurance.com/2016/04/30/akka-basics/)[3](http://codurance.com/2016/05/10/finite-state-machines-with-akka/)). Here we'll try to understand how [Kafka](http://kafka.apache.org/) works in order to leverage properly its publish-subscribe implementation.


## Kafka concepts

According to [official documentation](http://kafka.apache.org/documentation.html#introduction):

> Kafka is a distributed, partitioned, replicated commit log service. It provides the functionality of a messaging system, but with a unique design.

Kafka runs as a cluster and the nodes are called brokers. Brokers can be leaders or replicas to provide high-availability and fault tolerance. Brokers are in charge of partitions, being the distribution unit where messages are stored. Those messages are ordered and they're accessible by offset. A set of partitions forms a topic, being a feed of messages. A partition can have different consumers, and they access to the messages using its own offset. Producers publish messages into Kafka topics.

## Queuing vs publish-subscribe

Consumer groups is a key concept to explain why Kafka is more flexible and powerful than other messaging solutions like [RabbitMQ](https://www.rabbitmq.com/). Consumers are associated to consumer groups. If every consumer has the same consumer group, the topic's messages will be evenly load balanced between consumers; that's called queuing model. By contrast, if every consumer has a different consumer group, all the messages will be consumed in every client; that's called publish-subscribe model.

You can have a mix of both approaches, having different logical consumer groups, for different needs, and several consumers inside of every group to increase throughput through parallelism.

## Understanding our needs

<img src="/assets/img/custom/blog/law_enforcement.png" alt="Law enforcement architecture" title="Law enforcement architecture" class="img img-center img-responsive style-screengrab">

As we saw in previous posts the Items service publish messages into a Kafka topic called `item_deleted`. To define in which topic's partition will live that message Kafka provides [three alternatives](https://kafka.apache.org/090/javadoc/org/apache/kafka/clients/producer/Partitioner.html):

> If a partition is specified in the record, use it

>If no partition is specified but a key is present choose a partition based on a hash of the key

>If no partition or key is present choose a partition in a round-robin fashion

We'll use as a key the `item_id`. Consumers contained in different instances of the Law enforcement service are only interested in particular partitions, as they're keeping internal state for some items. Let's inspect different Kafka consumer implementations to see what is the more convenient for our use case.

## Kafka Consumers

There are three consumers in Kafka: [High level consumer](https://cwiki.apache.org/confluence/display/KAFKA/Consumer+Group+Example), [Simple Consumer](https://cwiki.apache.org/confluence/display/KAFKA/0.8.0+SimpleConsumer+Example) and [New Consumer](http://kafka.apache.org/090/javadoc/index.html?org/apache/kafka/clients/consumer/KafkaConsumer.html)

**Simple Consumer** is the lowest-level of them. It fits for our scenario as allows to "consume only a subset of the partitions in a topic in a process". However, as the documentation says:

> The SimpleConsumer does require a significant amount of work not needed in the Consumer Groups:
You must keep track of the offsets in your application to know where you left off consuming.
You must figure out which Broker is the lead Broker for a topic and partition
You must handle Broker leader changes

If you read the code suggested for handling those concerns, you'll be quickly discouraged to use this consumer.

**New Consumer** offers the right level of abstraction and allows us to subscribe to specific partitions. In the documentation they suggest as use case the following:

> The first case is if the process is maintaining some kind of local state associated with that partition (like a local on-disk key-value store) and hence it should only get records for the partition it is maintaining on disk.

Unfortunately our system is using Kafka 0.8, and this consumer is only available from 0.9. We don't have the resources to migrate to that version, so we'll need to stick with **High level consumer**.

That consumer offers a nice API, but it doesn't allow us to subscribe to specific partitions. That means that every instance of the Law enforcement service will consume every message, even those that are not pertinent. We can achieve that defining different consumer groups per instance.

## Leveraging Akka Event Bus

In the [previous post](http://codurance.com/2016/05/10/finite-state-machines-with-akka/) we defined some FSM actor that is waiting for `ItemDeleted` messages.

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

Our Kafka Consumer could forward every message to those actors and let them to discard/filter not relevant items. However we don't want to overwhelm our actors with redundant and inefficient work, so we'll add a layer of abstraction that will filter the proper messages in a really efficient way.

```scala
final case class MsgEnvelope(partitionKey: String, payload: ItemDeleted)

class ItemDeletedBus extends EventBus with LookupClassification {
  override type Event = MsgEnvelope
  override type Classifier = String
  override type Subscriber = ActorRef

  override protected def mapSize(): Int = 128

  override protected def publish(event: Event, subscriber: Subscriber): Unit = subscriber ! event.payload

  override protected def classify(event: Event): Classifier = event.partitionKey

  override protected def compareSubscribers(a: Subscriber, b: Subscriber): Int = a.compareTo(b)
}
```
[Akka Event Bus](http://doc.akka.io/docs/akka/2.4.4/scala/event-bus.html) offers us that subscription by partition that we're missing in our Kafka High Level Consumer. From our Kafka Consumer we'll publish every message into the bus:

```scala
    itemDeletedBus.publish(MsgEnvelope(item.partitionKey, ItemDeleted(item)))
```

In the previous post we showed how to subscribe to messages for that partition key:

```scala
  itemDeletedBus.subscribe(self, item.partitionKey)
```

The `LookupClassification` will filter unwanted messages, so our actors won't be overloaded.

## Summary

Thanks to the flexibility that Kafka provides, we were able to design our system understanding different trade-offs. In the next posts we'll see how to coordinate the outcome of those FSMs to provide a sync response to the client.

[Part 1](http://codurance.com/2016/04/28/async-systems-with-sync-clients/) | [Part 2](http://codurance.com/2016/04/30/akka-basics/) | [Part 3](http://codurance.com/2016/05/10/finite-state-machines-with-akka/) | [Part 4](http://codurance.com/2016/05/12/publish-subscribe-model-in-kafka)
