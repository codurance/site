---
author: Mashooq Badar
comments: true
date: 2013-01-12 21:34:55+00:00
layout: post
slug: spring-integration-based-dispatcher-worker-with-worker-queues
title: Spring Integration based Dispatcher-Worker with Worker Queues
wordpress_id: 213
categories:
- Development
tags:
- Java
- Spring
image:
    src: /assets/img/blog/dispatcher-worker.jpeg
---

In the back-office world the central concept in most of the systems is one of a Trade. A Trade has many events (e.g. Inception, Amend, Novation, Termination). Generally events from different trades can be processed in parallel because they have no interdependencies, however, events from the same trade cannot be processed in parallel due to the fact that they modify the same internal instance of a Trade.

A useful pattern for this kind of scenario is dispatcher-worker with worker queues. Each worker has a job queue which it processes in a sequential fashion. Each job queue only contains events for a single trade. This allows parallel processing across trades while maintaining sequential processing on events for a single trade.

[![Image](http://mashb.files.wordpress.com/2013/01/dispatcher-worker.png?w=474)](http://mashb.files.wordpress.com/2013/01/dispatcher-worker.png)

I've developed simple version of this concept using Spring Integration. The first step is to create a Router that routes inbound trade events into channels that are specific to a trade. If the channel doesn't exist then the Router will create a new one and register it with the Spring framework.

{% highlight java %}
public String dispatch(CustomMessage inputMessage) {
  String channelName = inputMessage.getId() + CHANNEL_SUFFIX;

  synchronized (channelName.intern()) {
    if (activeChannels.get(channelName) == null) {
      QueueChannel activeChannel = createNewChannel(channelName);
      PollingConsumer activeConsumer = createConsumerWithWorker(inputMessage, activeChannel);
      activeConsumer.start();
    }
  }

  return channelName;
}

{% endhighlight %}


Creation of a channel is the only place where synchronisation is required. We only synchronise on the channel name which corresponds to the trade id. Hence contention is minimal. I also attach a Polling Consumer to the channel at the point that the channel is created. Creation of a channel and registering it to Spring framework is quite straight forward as shown in the snippet below:

{% highlight java %}
private QueueChannel createNewChannel(String channelName) {
  QueueChannel activeChannel = new QueueChannel();
  activeChannel.setBeanName(channelName);
  activeChannels.put(channelName, activeChannel);
  applicationContext.getBeanFactory().registerSingleton(channelName, activeChannel);
  return activeChannel;
}
{% endhighlight %}

Although I attach a Polling Consumer to each channel. We don't have to have a thread per channel. We can use a Task Executor to run the polling consumers which will allow much better control over the number of concurrent threads in the system using a thread pool:

{% highlight java %}
private void startConsumingFromChannel(final String consumerName, final PollingConsumer activeConsumer) {
  activeConsumer.setBeanName(consumerName);
  activeConsumer.setAutoStartup(true);
  activeConsumer.setBeanFactory(applicationContext.getBeanFactory());
  activeConsumer.setTaskExecutor(consumerExecutorPool);
  applicationContext.getBeanFactory().registerSingleton(consumerName, activeConsumer);
}
{% endhighlight %}


Finally (not yet implemented) you can run a Reaper Thread that can remove channels and consumers that have not seen activity for a specified threshold. You can also back the inbound channel with a Message Store to ensure that the system can come backup in a consistent state on failure.

The source code is at [Github](https://github.com/mashooq/designpatterns/tree/master/dispatcherworker).
