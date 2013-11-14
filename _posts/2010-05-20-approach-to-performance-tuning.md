---
author: Mashooq Badar
comments: true
date: 2010-05-20 14:11:38+00:00
layout: post
slug: approach-to-performance-tuning
title: Approach to Performance Tuning
wordpress_id: 104
categories:
- Development Process
tags:
- performance
---

Performance issues in a application manifest as bottlenecks in one or more of the following 4 layers:

  * **Application**: Application is not designed, developed or configured properly.
  * **Platform**: The platform that the application runs under (e.g. App Servers, Databases etc.) is not setup and configure.
  * **System**: The hardware the platform runs on is not sufficient.
  * **Network**: The network capacity is not sufficient. This is relevant when various parts of the platform are involved in high-bandwidth communication with each other).

The first step in Performance Tuning is to have an environment setup that is a realistic copy of the production. Then we look at what exactly are the performance requirements, these will be expressed in terms of
Round Trip Delay and Throughput (number of concurrent requests).

We can then devise some performance tests that exercise the application through typical usage scenarios and execute these tests to collate data that will provide the baseline for subsequent tests.  The data can be collated in the following areas:

  1. Response times and throughput for the over all application
  2. Response times and throughput for various parts of the platform
  3. Response times and throughput for various layers of the application
  4. Resource utilisation both at the platform level (e.g. thread profile, memory profile, socket connections  etc.) and system level (CPU utilisation, Disk IO, Network IO etc.)

Once collated and represented in graphical form you can then start looking at indicators where bottlenecks may be occurring. Please note: that these are simply indicators of performance bottlenecks meant to highlight areas which will most likely require further investigation and tests (in isolation) to pin point the exact problem. Performance tuning is an iterative process with the following steps

	
  1. Perform Load Test
  2. Collate and Analyse Test Result Data
  3. Compare with Previous Test Result Data (if not the first iteration)
  4. Analyse impact of changes (if not first iteration)
  5. Check if improvements satisfy the performance requirements
  6. Analyse to identify bottlenecks
  7. Investigate and isolate the problem
  8. Perform remedial action to eliminate bottleneck

Note: You should start with a baseline of results that you can compare the impact of your changes against. You should only tackle one bottleneck at a time making minimum necessary changes before performing another test.  Once you have made enough improvements to satisfy the performance requirements then you should stop the tuning  process.

Selecting the level of results for your baseline is also important since more granular data require more up-front work. One approach is to start at a higher-level, go through the process to see problems can be identified  at that level. If not then create another more granular baseline and repeat the process.
It is obviously very important that your environment and test scenarios remain the same as the baseline throughout the process.