---
author: Mashooq Badar
comments: true
date: 2010-02-26 14:25:09+00:00
layout: post
slug: jvm-profiling-thread-dumps
title: 'JVM Profiling: Thread Dumps'
wordpress_id: 61
categories:
- Development
tags:
- java
- performance
---

Thread dumps are possilby the most useful tool in diagnosing concurrancy related issues. You can get a thread dump at any time by sending a break signal to the JVM. In Windows it's `CTRL-Break` and in Unix/Linux it's `kill -3 <pid>`

The possible issues to look for are:

  * Deadlocks: You 'll find something similar to "`Found one Java-level deadlock:" ` in the tread dump. Have a look [here](http://java.sun.com/docs/books/tutorial/essential/concurrency/deadlock.html) for an explanation of deadlocks.
  * Blocked: If there a number of threads blocked then look in the thread dump if they are blocked on the same monitor. This will indicate a heavily contented resource. You can see which thread has locked on the monitor by searching for "`locked <monitor_id>`". You may want to review the design of this code (if you can change it) to ensure that you're not over-zealous with locking or that the locking thread is not blocking on another monitor. Have a look at [Software Transactional Memory ](http://en.wikipedia.org/wiki/Software_transactional_memory) for a possible alternative to locking.

You may also use "Thread Telemetry" view avialable in most JVM profiling tools (e.g. JProbe, JProfiler, YourKit etc.). This gives you an historical view of thread states in the JVM. Very useful for monitoring JVM performance over a period of time and spotting live-lock situations.
