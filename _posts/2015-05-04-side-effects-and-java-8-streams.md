---
layout: post
asset-type: post
name: side-effects-and-java-8-streams
title: Side effects and Java 8 streams
date: 2015-05-04 11:22:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/2015-05-04-side-effects-and-java-8-streams/stream.jpg
tags:
- java8
- streams
- functional-programming

---

There is a lot of excitement in the Java community since Java 8 was released. Lambdas and Streams are a massive improvement and nobody wants to go back to the old days. Today, however, I want to talk about the caveats of some use of Java Streams.

When you start using Streams and its functional capabilities you start seeing your code as some pipeline of computational operations. As you're abstracting low-level concerns as iteration details, you can focus on the rules (business, english-like rules) of your transformations. Then your mindset gets even more abstract (as it usually happens when you have exposure to functional programming) and you realise that almost every piece of application server code that you've written can be abstracted as a pipeline of transformations in some data that sends messages during the process (aka, side effects).

Even if we use DDD or any OOP design practice, that key principle stands. Then the temptation to model our whole flow (from Rest adapter to DB or Event Stores) as a single Stream is quite strong. Let's provide an example.

Let's say that we have a football league application and we want to check that the day before a match everything is ready to play. Let's see the data in different steps of the pipeline:
 
1. Subscribed players

    a. (filter) Check if they're available for the match       

2. Available players

    a. (map) Create a team

3. Team ....             

In 1.a we want to send a reminder email to the guys that have marked themselves previously as available and in 2.a we want to store that team in some DB. Those behaviours could and should live in different components, but conceptually that flow is the same stream. We want to use the data to execute the side effects but not consume it, as we want to keep using the stream.

## Understanding execution order with the `peek` method.
 
`peek` is a method in the Java 8 Stream API that allows you to use but not consume the data of an stream. We might think that it's a good idea to use `peek` to send messages to EmailAdapter and TeamRepository. The problem with `peek` is that it's only executed whenever we do actually consume the stream. The Javadoc provides some clues about that:

> This method exists mainly to support debugging additionally performing the provided action on each element as elements are consumed from the resulting stream.

*As elements are consumed* is the key, but it's not obvious the first time you read it. In the provided snippet we can see how `peek` is executed only when a final operation (`forEach` in this case) is called:

```java
public static void main(String[] args) {
    IntStream stream = createAStreamAndPerformSomeSideEffectWithPeek();
    System.out.println("Second. I should be the second group of prints");
    consumeTheStream(stream);
}

private static IntStream createAStreamAndPerformSomeSideEffectWithPeek() {
    return IntStream.of(1, 2, 3)
            .peek(number -> System.out.println(String.format("First. My number is %d", number)))
            .map(number -> number + 1);
}

private static void consumeTheStream(IntStream stream) {
    stream.filter(number -> number % 2 == 0)
            .forEach(number -> System.out.println(String.format("Third. My number is %d", number)));
}
```

We might expect an output like this:

- First. My number is 1
- First. My number is 2
- First. My number is 3
- Second. I should be the second group of prints
- Third. My number is 2
- Third. My number is 4

When in fact we'll have:

- Second. I should be the second group of prints
- First. My number is 1
- Third. My number is 2
- First. My number is 2
- First. My number is 3
- Third. My number is 4

A clever reader could state that the problem was the inclusion of some non-stream operation in the middle of a lazy pipeline. That could be true. For instance when you work in asynchronous code like promises in Node.js is quite important not to mix sequential code with the async chain without a lot of a thought.

## Understanding laziness through Optional API.

Non-immediate execution using threads, RxJava, streams or any "lazy" construct could be confusing for a Java developer used to sequential flows. This is a really silly example using Java 8 Optional API that confused me the first time that I saw it:

```java
return fetchTrackBy(device).orElse(trackRepository.saveTrackWith(metadata));
```

`fetchTrackBy` returns an Optional so that code could be thought as syntactic sugar. It would unroll to this:

```java
Track track = fetchTrackBy(device);
if (track.isPresent()) {
    return track.get();
}
return trackRepository.saveTrackWith(metadata);
```

In fact, there is a bug in the first implementation. Did you spot it? Yes, we're saving the track even if we found it in first place. We'd fix it with this implementation:

```java
return fetchTrackBy(device).orElseGet(() -> trackRepository.saveTrackWith(metadata));
```

As you can see we're providing a lambda (an implementation of the `Supplier` functional interface) that will be evaluated lazily if the Optional is not present.

## Other thoughts about Streams

Coming back to Streams, reading the [Javadoc](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html) seems to be quite useful for our concerns. About side effects:

> Side-effects in behavioral parameters to stream operations are, in general, discouraged, as they can often lead to unwitting violations of the statelessness requirement, as well as other thread-safety hazards.

We can see an example of a stateful lambda here:

```java
Set<Integer> seen = Collections.synchronizedSet(new HashSet<>());
stream.parallel().map(e -> { if (seen.add(e)) return 0; else return e; })
```

> If the behavioral parameters do have side-effects, unless explicitly stated, there are no guarantees as to the visibility of those side-effects to other threads, nor are there any guarantees that different operations on the "same" element within the same stream pipeline are executed in the same thread

This is really important to note, but we could say that for our example is not relevant as we want to send messages to external processes with their own concurrency mechanisms. Something more like:

> However, side-effects such as using println() for debugging purposes are usually harmless.

There are another problems about using Stream as backbone of our flows. Once a Stream is consumed it's not possible to reuse it again. That means that storing a Stream as a field of some of our domain objects feels like a dangerous idea, as that domain object will be useless once that field is consumed. An idea to mitigate that problem is wrapping that Stream in a Supplier, generating a new stream every time that we request access to that field. This is similar to an `Iterable`, which creates a new `Iterator` each time the `iterator()` method is called.

## In conclusion

I would discourage passing around streams in teams with little experience with Java 8. If we decide to apply side effects during the pipeline, I would avoid any side effect that implies some kind of locking or coordination between threads. That said, I would recommend experimenting with these ideas in your spare time, as I found that the best way of learning is by applying [the core ideas of Java 8 Streams](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html#package.description):

> * No storage. A stream is not a data structure that stores elements; instead, it conveys elements from a source such as a data structure, an array, a generator function, or an I/O channel, through a pipeline of computational operations.
> * Functional in nature. An operation on a stream produces a result, but does not modify its source. For example, filtering a Stream obtained from a collection produces a new Stream without the filtered elements, rather than removing elements from the source collection.
> * Laziness-seeking. Many stream operations, such as filtering, mapping, or duplicate removal, can be implemented lazily, exposing opportunities for optimization. For example, "find the first String with three consecutive vowels" need not examine all the input strings. Stream operations are divided into intermediate (Stream-producing) operations and terminal (value- or side-effect-producing) operations. Intermediate operations are always lazy.
> * Possibly unbounded. While collections have a finite size, streams need not. Short-circuiting operations such as limit(n) or findFirst() can allow computations on infinite streams to complete in finite time.
> * Consumable. The elements of a stream are only visited once during the life of a stream. Like an Iterator, a new stream must be generated to revisit the same elements of the source.
