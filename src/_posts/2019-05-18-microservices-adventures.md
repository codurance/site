---
author: Andrzej Rehmann
layout: post
asset-type: post
title: "Microservices adventures: Ignoring platform complexity"
date: 2019-05-18 08:00:00
description: "Microservices adventures: Ignoring platform complexity"
abstract: Microservice architecture is shifting complexity from the services to the platform.
image: 
    src: /assets/custom/img/blog/three-monkeys.jpg
    attribution:
       text: Photo by Joao Tzanno on Unsplash
       href: https://unsplash.com/photos/1NacmxqfPZA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags: 
- devops
- microservices
---

I think there is a common misconception about microservices out there.

The popular opinion is that microservices supposed to be the cure for all of our problems.
However, I say that by themselves, they can only cure half of them.
To cure the other half, you are supposed to combine microservices with the latest DevBizSecDbaQaOps practices and transform your company into the ultimate buzzword producing killing machine and achieve Continuous Deployment nirvana.

But seriously.

Microservices were supposed to enable companies to perform gazillion deployments per day, scale the system up to infinity, reduce the codebase complexity, and save money at the same time.

Few, however, ask what is the price for this?

In my opinion, the price is the increase in platform complexity.

> Microservices shift the complexity from the services to the platform.
> Ignoring this fact results in the suboptimal results.

## Complexity

> Complex - many parts with intricate arrangements, organized (easy) or disorganized (hard)

> Complicated - hard to understand regardless of the complexity

Sometimes things may seem complicated at first but become complex with enough familiarity (think driving a car).

We can describe any software system on how complicated and complex it is.
The system can be made less complicated and complex by removing pieces of it.
When splitting a system into pieces, it may become less complicated, but the complexity usually increases.

Thankfully splitting can be done in such a way that we end up with an "organized" complexity, which is easy to understand.
However, that, in my opinion, is an art and requires not only expertise but a ton of experience.

When going from a monolith to microservices, we split services reducing their complexity, but the complexity does not disappear into thin air, it transfers onto the platform.

Because designing a platform for distributed systems on a large scale is not yet a mainstream concept, many companies don't realize they have to change tactics and fall short when giving in the microservices hype.

## Platform definition

The software which is not a shelfware eventually ends up running on a platform.
The platform is all the things which enable the software to run and perform its duty.
When the platform fails, your software fails.

My definition of a software platform includes:

* *Platform topology* - existing infrastructure
* *Services* - executable units of software
   - *Core services* - executables required to fulfill business needs
   - *Support services* - executables monitoring core services and the platform itself
   - *Service Orchestration* - executables assigning which service goes where also responsible for scaling and destroying services
* *Service Configuration* - configuration which changes depending on the environment
* *Service Secrets* - configuration which should not be source controlled
* *Service Discovery* - detection of services
* *Service Mesh* - delivery of requests through a topology

Additionally, we have things which describe the platform setup and deployment procedures:

* *Platform definition* - procedures (hopefully in code) describing in details the infrastructure
* *Deployment pipelines* - procedures (hopefully in code) describing the deployment process

Every platform is alive, evolving, and has a lifecycle:

*Day 1*

There is nothing.
Infrastructure gets created, and software gets deployment for the first time.

*Day 2+*

Infrastructure gets removed, updated, or extended.
Configuration changes.
Software crashes.
Software gets redeployed.
Deployment fails and needs a rollback.

Challenging problems arise not on day 1, but on day 2 onwards.
If you don't plan and think ahead on the first day, you may be in a need one day to scrap your whole platform and go back to the drawing board.

There are many things which can go wrong here.
What's inside the boxes (services) is irrelevant, the thing which handles the boxes and connection between them should be the main focus of attention.
If the company thinks that the services are more crucial then the platform, then I would recommend staying with monoliths.

The platform is like a free puppy.
The upfront cost may be zero, but when the puppy grows and multiplies the maintenance costs grows exponentially.
Eventually, a badly designed and poorly maintained platform behaves in the most unexpected ways up to a point where instead of fixing the current one, it's cheaper to create a new one.

## Platform as an afterthought

There are two cases when starting with microservices architecture:

1. Starting fresh - what we call a greenfield project.
2. Migrating from a monolith by extracting bits from it.

Unfortunately, both cases usually suffer from the same symptoms:

> Platform design is often an afterthought.

The platform usually comes up in the conversations as the "supporting" role, rarely as the main actor.
Companies who change their viewpoint and reverse this situation shall be the one to reap the full benefits of microservice architecture.
Who knows, maybe even all of the devops catchphrases from the company "we are hiring" page will then come alive like in a fairy tale and mingle among the dancing developers.

## Monitoring, observability and debuggability

Monitoring is gathering and displaying data so it can be analyzed.
To monitor a system, it must be observable.

> If you are observable I can understand you.

The tools and techniques needed to analyze a system composed of couple services vs. hundredths of services are vastly different.
Where one can manage to manually gather and sift through metrics for a few services, doing so for dozens is not sustainable.
Any large scale microservice system needs tools to automatically gather all the essential metrics and display them in a format consumable to humans.

### Black box

The opposite of an observable system is a "black box," where the only things we can measure are the inputs and outputs (or a lack thereof).
In this entertaining [talk](https://www.youtube.com/watch?v=30jNsCVLpAE) Bryan Cantrill talks about the art of debuggability:

> The art of debugging isn't to guess the answer - it is to be able to ask the right questions to know how to answer them.
> Answered questions are facts, not a hypothesis.

Making platform observable is hard and under-appreciated work.
When a deployment is a non-event, nobody congratulates the people behind it.

In my opinion, successfully pulling out microservices architecture requires putting more effort into the platform itself than on the services running on it.
Companies need to realize they are creating a platform first, and the services running on it are the afterthought.

## Platform engineers

> Systems are as good as the people who designed it.

Systems fail, and that is something to be expected and embraced.
However, they should also self recover.
How, you ask?
Preferably without the input of humans.

> With any advanced automation, the weakest link is always the human.

Self-healing system requires self-monitoring capabilities.
To monitor anything, you need observability.
Observability and monitoring should then be a priority, not an afterthought.
To design, setup, and maintain platform monitoring, we need platform engineers.

Humans should be in the loop only when the system cannot repair itself.
Our job should not only be fixing the problems but primarily making sure that those problems never occur again or gets fixed automatically next time.

When dealing with complex platforms, we need "platform engineers."
Those are either system administrators who can code or coders who know system administration.
They write code to make the platform more observable, stable, and developer friendly.

Best results are achieved when the platform engineers are not an isolated team but part of the development teams.
An ideal situation is when all your developers can be considered platform engineers.

## Common oversights

> "Some people change their ways when they see the light; others when they feel the heat."

In my opinion, the most common oversights when dealing with microservices are:

### 1. Lack of monitoring

>  "It’s pretty incredible when we stop assuming we know what’s going on."

Observability needs to be built into the platform from the very beginning.
Don't make a mistake of going into production and then worry about observability, at that time it may be too late.

SLIs, SLAs, and SLOs, which boils down to [availability](https://cloud.google.com/blog/products/gcp/sre-fundamentals-slis-slas-and-slos), should be agreed up front and be monitored.
To monitor those values, you need observability.

Often there is a question who should be looking at the monitoring, and my answer would be to ask this:

Who cares about not breaking the SLA and what happens when it's broken?

If the answer is "nobody" and "nothing," then you don't need monitoring in the first place because nobody cares if the system is working or not.
However, if there is a penalty for breaking the SLA, then the answer clarifies itself.

> "People are not afraid of failure, they are afraid of blame."

### 2. Wrong tools for alerts (or no alerting)

Getting spammed by dozens of occurrences of the same alert makes the receivers desensitized.
Same types of alerts should automatically get grouped.
Receiving a notification for the same alert multiple times is much different than getting spammed with copies of it.

Every alert needs to have an assignee and a status.
You don't want people working on the same issue in parallel without knowing the problem was fixed yesterday by someone else.

Every alert needs at least the source of origin and the action to follow.
Humans fix problems quickly if there is a clear procedure for how to deal with them.

### 3. Not following the [twelve factors](https://12factor.net) rules

It makes me sad when I see an application in 2019 which instead of logging to stdout logs to a file.
Twelve factors rules are the basics and the lowest hanging fruits to pick.

### 4. Making artifacts mutable

Having to rebuild the artifact to change its runtime configuration makes me cry — every time.
Artifacts should be built once and be deployable to any environment.
You can pass or select the config with environment variables or read an external config file.

Immutable artifacts are useful because every build is slightly different.
The same artifact built twice may behave differently in the same conditions.
We want to avoid that.

### 5. Not having a common logging strategy

Nobody looks at logs for fun.
We use them when debugging or when creating a baseline for the system pulse (think heart rate monitor but for software).
Analyzing logs from services using different logging schemes is just too complicated.
Just come up with a logging strategy which everybody agrees on and make a logging library for everybody to use.

If you cannot enforce a common strategy, then automatically normalize the log streams before they end up presented to a human.

Standardized logging scheme is also crucial for making useful dashboards.

### 6. Not [tracing](https://zipkin.apache.org/) network calls

When a function call crash we get a stack trace with all the calls from start to finish.
In microservices, calls can jump from service to service, and when one fails, it's crucial to see the whole flow.

It is incredibly useful and insightful to be able to trace a single call throughout the system.

Tracking individual calls may seem daunting at first, but implementation is straightforward.
Usually, it's a middleman which marks the network calls and logs the event.
Logs are then used to produce visualizations.

### 7. Designing pipelines without automated rollbacks

To have an automated rollback, you need auto detection when something goes wrong.
How the system detects and decides if something went wrong separates Continuous Deployment wannabes from the pros.

### 8. Not requiring health checks

Every service needs to answer one fundamental question: is it healthy or not.
Of course, health check status from the application should be just one of many metrics collected by the orchestrator to decide if a service is healthy.
There may be many issues that the service is not aware of.

### 9. Not using a Service Mesh

When replacing function calls (monolith) for network calls (microservices), we need to accommodate for latency, network errors, and packet drops.
Doing retries directly from the service may seem harmless, but it may cause system-wide cascading failures and put unnecessary strain on the network.

Instead of forcing each service to deal with network failures, we can use a middleman called Service Mesh, which is designed to handle those cases.
It is true that we are still making a network call to a service mesh, but it is safer because the call is not leaving the host.

Service mesh also gives us essential features like retries policies, call timeouts, deadlines and [circuit breaking](https://martinfowler.com/bliki/CircuitBreaker.html).
It also makes it easier to have a system-wide call tracing.

### 10. Not adapting the tools with scale

Many years ago, I joined a project where, at the very beginning, the platform was running just a handful of services.
The tool for orchestrating services was very primitive.
The biggest flaw of that orchestrator was that it didn't respect the capacity of the hosts.
Service assignment to a host was manual.
The manual assignment works just fine with a tiny platform, but it just did not scale.
We had to estimate how much memory and CPU each service needs and assign them accordingly.
Sometimes the estimates were wrong, and one service would crash or starve other services.

When we scaled from a couple of services to dozens, we should have changed the tool, but we didn't.
At that time, I didn't even understand the problem as I was new to the subject, so did the vast majority of the people on the project.
Those who knew what was wrong didn't care or were too afraid to escalate the problem to the decision makers.
The platform became incredibly unstable and required daily manual restarts, and soon it was late to replace the orchestrator, it got too deeply embedded into the platform.
It took more than a year to acknowledge the problem and design a new platform from scratch.

Conclusion: the platform needs to be checked periodically to asses if it still suits the needs of a system.


## Ending words

Its been about 10 years since the microservices became mainstream.
The industry is still coming up with new tools, solutions, and patterns to make our life easier.
Keeping up with "devops" technology can be fatiguing and overwhelming, so instead, I think it is better to learn the underlying concepts which are universal and evolve slowly.

