---
layout: post
asset-type: post
name: the-java-synchronisers
title: 'The Java Syncrhonisers' 
date: 2016-08-24 10:00:00 +00:00
author: Carlos Morera de la Chica
image:
    src: /assets/img/custom/blog/synchronisation.jpg
tags:
- java
- threading
- synchronization

canonical:
    name: my personal blog
    href: https://carlosmchica.github.io/the-java-synchronisers/

---

Threads communication happens primarily by sharing access to fields and objects. Although extremely efficient, this form of communication is prone to errors such as [thread interference](https://docs.oracle.com/javase/tutorial/essential/concurrency/interfere.html) and [memory consistency](https://docs.oracle.com/javase/tutorial/essential/concurrency/memconsist.html). Synchronization is a tool that helps to prevent such errors.

However, synchronization does not come for free and can introduce latency when accessing a lock or object that is currently being held by another thread. The waiting thread cannot use that object until the other thread releases the lock on the  object. This condition is known as thread contention. It may also lead to deadlocks and livelocks.

In this post, we will explore the different options that Java provides to deal with threads synchronization.

## Synchronization essentials

Java provides a series of mechanisms to handle basic thread synchronization and coordination. It supports fine-grained object access synchronization through [synchronized methods](#sync-methods) and [synchronized statements](#sync-statements). Basic thread coordination can be accomplished through [guarded blocks](#guarded-blocks). All mentioned mechanisms are built around acquiring and releasing the object's intrinsic lock.

### Intrinsic Lock

Every Java object has an associated intrinsic lock. A thread that needs exclusive access to an object's fields has to acquire the object's lock before accessing them, and then releasing the intrinsic lock once it is done. Other threads trying to access the object will block until the thread holding the lock releases it.

### <a name="sync-methods"></a> Synchronized methods

When a thread invokes a [synchronized method](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html), it acquires the **intrinsic lock** for that method's object and releases it when the methods returns. The lock is released even if the method returns due to an uncaught exception. If done in a static method, the thread acquires the lock for the class object associated with the class.

### <a name="sync-statements"></a> Synchronized statements

Provides a more fine-grained synchronization mechanism. [Synchronized statements](https://docs.oracle.com/javase/tutorial/essential/concurrency/locksync.html) must specify the object that provides the intrinsic lock. Synchronizing over separated lock objects can provide fields synchronization, without forcing synchronization between methods calls.

### <a name="guarded-blocks"></a> Guarded Blocks

As mentioned earlier, [guarded blocks](https://docs.oracle.com/javase/tutorial/essential/concurrency/guardmeth.html) provide support for thread coordination. Guarded blocks are part of every Java object, and can be constructed using the `wait`, `notify` and `notifyAll` methods.

> The `wait` method suspend the current thread. When a thread invokes wait, it must own the object's intrinsic lock, that is why calls to wait are usually wrapped in a synchronized method or statement. The invocation of the wait method suspends the thread execution and releases the lock. 

> At some point, another thread will acquire the object's intrinsic lock and invoke `notifyAll` to inform all threads waiting that something important has happened. After the second thread has released the lock, the waiting threads will reacquire the lock and resume execution by returning from the wait invocation.

> `Notify` wakes up a single thread. The concrete thread that is woken up can not be specified, therefore, it is useful only if we do not care which thread is woken up.

## The Java Synchronizers

Java also provide five classes for common special-purpose synchronization.

### CountDownLatch

The [CountDownLatch](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/CountDownLatch.html) class allows one or more threads to wait until a set of operations in other threads complete. It is initialised with a count number.

> The `await` method **blocks** until the count reaches zero.

> The `countDown` method **decrements** the count.

When the await method returns all waiting threads are released and subsequent invocations to `await` return immediately. The count cannot be reset.

### Semaphore

The [Semaphore](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Semaphore.html) is used to restrict thread access to a certain resource. It is initialised with a number of permits. 

> The `acquire` method **blocks** until a permit is available and takes it.

> The `release` method **adds** a permit, releasing a blocking acquirer. 

Note that calls to release does not have to be made by the same thread that called acquire. A semaphore can be *fair* or *unfair*. If fair, then the threads acquire permits in a FIFO fashion.

Although at first it may seem similar to the CountDownLatch its purpose is completely different.

### CyclicBarrier

The [CyclicBarrier](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/CyclicBarrier.html) is built around the concept of **parties**. It allows threads to wait for each other to reach a common barrier point.

> The `await` method **blocks** until all parties arrive. It behaves somehow as the inverse of the *CountDownLatch*. After *N* awaits it continues.

It has support for an optional runnable that runs once per barrier point. After the last party arrives, but before they are released. It is usually used to update shared-state between threads. It is cyclic because it can be *reused* after threads are released.

### Exchanger

The [Exchanger](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Exchanger.html) is a synchronization point at which two threads can exchange information.

Threads **block** until its counterpart presents its information. The same behaviour occurs at both sides.

### Phaser

The [Phaser](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/Phaser.html) is a reusable barrier, similar to *CountDownLatch* and *CyclirBarrier*, but much more flexible.

In phaser, the number of registered parties is not fixed at creation time. Parties can *register* at any time through `register` or `bulkRegister` methods. Parties can deregister upon arrival with `arriveAndDeregister`.

It offers several methods for *synchronization*. The `arriveAndAwaitAdvance` method behaves the same way as *CycleBarrier* `await` method does. `arrive` and `arriveAndDeregister` record arrival, but don't block. `awaitAdvance` blocks until all parties arrive.

It can be *terminated*, forcing all synchronization methods to return. Can be forced through the `forceTermination` method.

It also provides support for *monitoring* its state. It is noteworthy mentioning that synchronization methods can be called only by registered parties, whilst state can be monitored by any caller. Monitoring methods include `getRegisteredParties` and `getArrivedParties` among others.

## Conclusion

Multithreading is definitely not an easy problem, but can be somehow easier to tackle using the tools that some of the languages provide. Personally, I do not need to use all of the tools on a daily basis, but I think it is worth knowing that they exist and how they can help.

### Further reading

[Java Thread States](https://pbs.twimg.com/media/BiuJpaZCEAAt-QR.png:large)
