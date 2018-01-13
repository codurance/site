---
layout: post
name: Testing-Spark-Streaming-Unit-Testing
title: 'Testing Spark Streaming: Unit testing'
date: 2016-08-02 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/custom/img/blog/unit_testing.jpg
    attribution:
      text: Untitled by Daida Medina
      href: https://www.instagram.com/p/BHiJPKrBb-w/?taken-by=thelastfreeusername
tags:
- testing
- big data
- spark
- streaming

---

There is enough evidence to prove the importance of automated testing. Projects in new fields often neglect automated testing, as the domain itself steals the attention of the developers. However, lack of testing implies 'laugh now, cry later'. Some of the tools around Big Data space have been architected around testability or, at least, the community has taken care of it afterwards. We'll see how [Spark](http://spark.apache.org/), and more specifically [Spark Streaming](http://spark.apache.org/streaming/), performs in different aspects of automated testing.

## What is Stream Processing

[Stream processing](https://www.wikiwand.com/en/Stream_processing) is a programming paradigm that works on infinite and continuous streams of data, applying parallel operations on them. The idea is simple but powerful, and the complexity of the implementation will vary depending on the following requirements:

- Semantic delivery: at-least-once, at-most-once or exactly-once.
- Stateful operations: local or remote state.
- Latency: real time or near real time.
- Reliability, high availability and durability.

## What is Spark Streaming

Spark has been a revolution in the [Big Data](https://www.wikiwand.com/en/Big_data) space. It has replaced [Hadoop's MapReduce](https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html) as the preferred batch processing framework. The main reasons are:

- Speed: [Run programs up to 100x faster than Hadoop MapReduce in memory, or 10x faster on disk.](http://spark.apache.org/)
- Usability: MapReduce DSL is far from easy to write and read. Spark Scala DSL works as an extension of Scala Collections operations so the learning curve is not steep.
- Community: there are a lot of excitement around Spark and there are plenty of related tools like MLib, Spark SQL or Spark Streaming.

Spark Streaming is built on top of Spark. That means that you can use the Spark infrastructure and concepts such as [YARN](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/YARN.html), [HDFS](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html) or [RDDs](http://www.tutorialspoint.com/apache_spark/apache_spark_rdd.htm). On top of that we'll have abstractions to help us build streaming features like aggregations or sliding windows.

## What is Unit testing

[This](http://robdmoore.id.au/blog/2015/01/26/testing-i-dont-even/) is a fantastic series about different views on unit testing. To keep the scope of this post focused, we'll work with the following characteristics:

- Network Isolation: production code under test will involve code that lives in a single process. No network calls are allowed.
- Framework Isolation: we want to test our code, as much as possible, and not the interactions with underlying frameworks.

## Spark Testing Base to the rescue

Controlling the lifecycle of Spark can be cumbersome and tedious. Fortunately, [Spark Testing Base](https://github.com/holdenk/spark-testing-base) project offers us Scala Traits that handle those low level details for us. Streaming has an extra bit of complexity as we need to produce data for ingestion in a timely way. At the same time, Spark internal clock needs to tick in a controlled way if we want to test timed operations as sliding windows.

Let's see how to test the archetypical example of WordCount:

```scala
def count(lines: DStream[String]): DStream[(String, Int)] =
 lines.flatMap(_.split(" "))
   .map(word => (word, 1))
   .reduceByKey(_ + _)
```

As you can see, this is a pure function, with no side effects or access to external state. We can reason about it by having a look at the signature of the function. [DStream](https://spark.apache.org/docs/0.7.2/api/streaming/spark/streaming/DStream.html) is the basic abstraction in Spark Streaming and Spark Testing Base will help us to deal with it.

```scala
class WordCountSpec extends StreamingSuiteBase {

 test("count words") {
  val input = List(List("the word the"))
  val expected = List(List(("the", 2), ("word", 1)))
  testOperation[String, (String, Int)](input, count _ , expected, ordered = false)
 }
}
```

You don't need to work directly with the DStream abstraction. The input will be a sequence of input collections, and every collection will be consumed with a tick of Spark Streaming internal clock. You can find more examples about what you can do with this library [here](https://github.com/holdenk/spark-testing-base/wiki/StreamingSuiteBase).

## Joining Streaming and Batch Processing

One classical scenario in Stream Processing is joining a stream with a database in order to enrich, filter or transform the events contained on the stream. Thanks to [Spark 2.0](https://spark.apache.org/releases/spark-release-2-0-0.html) and [Structured Streaming](https://jaceklaskowski.gitbooks.io/mastering-apache-spark/content/spark-sql-structured-streaming.html), Streaming and Batch are aligned, and somehow hidden, in a layer of abstraction.

As Spark 2.0 has been recently released, let's focus on an example of the old API:

```scala
def countWithSpecialWords(lines: DStream[String], specialWords: RDD[String]):
 DStream[(String, Int)] = {
 val words = lines.flatMap(_.split(" "))
 val bonusWords = words.transform(_.intersection(specialWords))

 words.union(bonusWords)
    .map(word => (word, 1))
    .reduceByKey(_ + _)
}
```

This is a convoluted example, but serves as a demonstration. Our system keeps a list of special words in an external database. We want to count a word twice in the stream that are contained in that special words bag. It's important to note that our function is free of any concern about how to retrieve those special words. That's done outside of the function and that gives us the chance to unit test the logic.

```scala
val lines = ingestEventsFromKafka(ssc, brokers, topic).map(_._2)

val specialWords = ssc.sparkContext
  .cassandraTable(keyspace, specialWordsTable)
  .map(_.getString("word"))

countWithSpecialWords(lines, specialWords)
  .saveToCassandra(keyspace, wordCountTable)
```

Currently there is no support for that kind of operation on Spark Testing Base, but I've created a [PR](https://github.com/holdenk/spark-testing-base/pull/122) that will provide that functionality.

```scala
test("stream and batch transformation") {
  def intersection(f1: DStream[String], f2: RDD[String]) = f1.transform(_.intersection(f2))

  val stream = List(List("hi"), List("holden"), List("bye"))
  val batch = List("holden")
  val expected = List(List(), List("holden"), List())

  testOperationWithRDD[String, String, String](stream, batch, intersection _, expected, ordered = false)
}
```

### Conclusion

Unit testing Spark Streaming is pretty easy thanks to Spark Testing Base. We need to architect our operations cleanly though, if we want to leverage this library. In the next posts we'll see how to do integration tests with Spark Streaming, Kafka and Cassandra.

Thank you for your time, feel free to send your queries and comments to [felipefzdz](http://twitter.com/felipefzdz).
