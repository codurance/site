---
layout: post
name: queue-based-synchronisation
title: Queue Based Synchronisation
date: 2014-07-18 12:00:00 +00:00
author: Mashooq Badar
image:
    src: /assets/img/blog/queue-based-synchronisation.jpg
tags:
- threading
- design
---

The first rule of using locks for thread synchronisation is, **"Do NOT use them!"**. Recently I saw an implementation that made heavy use of locks to synchronise access to a shared cache between two threads. The overall approach is explained in the diagram below:

![Lock based synchronisation](/assets/img/blog/lock-based-synchronisation.jpg)

Why not do the whole thing in a single thread? Well! the operations to the External Store are very time consuming and Thread-1 does not need to wait for them. So how do you solve this without using lock-based synchronisation?

The operations to the cache are very quick and can be done in a single thread. These operations are coming from multiple threads. We can funnel them through a single thread by using a thread-safe queue as explained in the following diagram:

![Queue based synchronisation](/assets/img/blog/queue-based-synchronisation.jpg)

Although this solution looks more complicated, the key advantage is that no low-level thread synchronisation is needed. Most good programming languages already provide thread-safe queues. Also, you can scale up using a thread pool for the operations to the external store. 

*Note: in both of the above approaches we need to ensure that the cache does not grow indefinitely. In case of the queue based approach we can use a a queue that blocks after a maximum capacity is reached. In case of the lock based approach the cache itself will need to block.*