---
layout: homepage
name : Blog
title: Spring Integration based Dispatcher-Worker with Worker Queues
---

In the back-office world the central concept in most of the systems is one of a Trade. A Trade has many events (e.g. Inception, Amend, Novation, Termination). Generally events from different trades can be processed in parallel because they have no interdependencies, however, events from the same trade cannot be processed in parallel due to the fact that they modify the same internal instance of a Trade.
A useful pattern for this kind of scenario is dispatcher-worker with worker queues. Each worker has a job queue which it processes in a sequential fashion. Each job queue only contains events for a single trade. This allows parallel processing across trades while maintaining sequential processing on events for a single trade.

