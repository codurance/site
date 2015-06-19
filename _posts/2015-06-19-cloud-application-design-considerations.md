---
layout: post
name: cloud-application-design-considerations
title: 'Cloud Application Design Considerations'
date: 2015-06-19 18:00:00 +01:00
author: Steve Lydford
image:
    src: /assets/img/custom/blog/clouds.jpg
    attribution:
        text: Wheat Field in Swellendam, by Atelier Design Studio
        href: https://flic.kr/p/q2avm3

tags:
- Cloud
- Design

---
# Cloud Application Design Considerations

When designing applications for the cloud, irrespective of the chosen platform, I have found often it useful to consider four specific topics during my initial discussions; scalability, availability, manageability and feasibility.

It is important to remember that the items presented under each topic within this article are not an exhaustive list and are aimed only at presenting a starting point for a series of long and detailed conversations with the stakeholders of your project, always the most important part of the design of any application. The aim of these conversations should be to produce an initial high-level design and architecture. This is achieved by considering these four key elements holistically within the domain of the customers project requirements, always remembering to consider the side-effects and trade-offs of any design decision (i.e. what we gain vs. what we lose, or what we make more difficult).

## Scalability
Conversations about scalability should focus on any requirement to add additional capacity to the application and related services to handle increases in load and demand. It is particularly important to consider each application tier when designing for scalability, how they should scale individually and how we can avoid contention issues and bottlenecks. Key areas to consider include: 
### Capacity
- Will we need to scale individual application layers and, if so, how can we achieve this without affecting availability?
- How quickly will we need to scale individual services?
- How do we add additional capacity to the application or any part of it?
- Will the application need to run at scale 24x7, or can we scale-down outside business hours or at weekends for example?

### Platform / Data
- Can we work within the constraints of our chosen persistence services while working at scale (database size, transaction throughput, etc.)?
- How can we partition our data to aid scalability within persistence platform constraints (e.g. maximum database sizes, concurrent request limits, etc.)?
- How can we ensure we are making efficient and effective use of platform resources? As a rule of thumb, I generally tend towards a design based on many small instances, rather than fewer large ones.
- Can we collapse tiers to minimise internal network traffic and use of resources, whilst maintaining efficient scalability and future code maintainability?

### Load
- How can we improve the design to avoid contention issues and bottlenecks? For example, can we use queues or a service bus between services in a co-operating producer, competing consumer pattern?
- Which operations could be handled asynchronously to help balance load at peak times?
- How could we use the platform features for rate-leveling (e.g. Azure Queues, Service Bus, etc.)?
- How could we use the platform features for load-balancing (e.g. Azure Traffic Manager, Load Balancer, etc.)? 

## Availability
Availability describes the ability of the solution to operate in a manner useful to the consumer in spite of transient and enduring faults in the application and underlying operating system, network and hardware dependencies. In reality, there is often some crossover between items useful for availability and scalability.
Conversations should cover at least the following items:

### Uptime Guarantees
- What Service Level Agreements (SLA’s) are the products required to meet?
- Can these SLA’s be met? Do the different cloud services we are planning to use all conform to the levels required? Remember that [SLA’s are composite](http://codurance.com/2015/05/19/working-with-slas/).

### Replication and failover
- Which parts of the application are most at risk from failure?
- In which parts of the system would a failure have the most impact?
- Which parts of the application could benefit from redundancy and failover options?
- Will data replication services be required?
- Are we restricted to specific geopolitical areas? If so, are all the services we are planning to use available in those areas?
- How do we prevent corrupt data from being replicated?
- Will recovery from a failure put excess pressure on the system? Do we need to implement retry policies and/or a circuit-breaker?

### Disaster recovery
- In the event of a catastrophic failure, how do we rebuild the system?
- How much data, if any, is it acceptable to lose in a disaster recovery scenario?
- How are we handling backups? Do we have a need for backups in addition to data-replication?
- How do we handle “in-flight” messages and queues in the event of a failure?
- Are we idempotent? Can we replay messages?
- Where are we storing our VM images? Do we have a backup?

### Performance
- What are the acceptable levels of performance? How can we measure that? What happens if we drop below this level?
- Can we make any parts of the system asynchronous as an aid to performance?
- Which parts of the system are the mostly highly contended, and therefore more likely to cause performance issues?
- Are we likely to hit traffic spikes which may cause performance issues? Can we auto-scale or use queue-centric design to cover for this?

### Security
This is clearly a huge topic in itself, but a few interesting items to explore which relate directly to cloud-computing include:

- What is the local law and jurisdiction where data is held? Remember to include the countries where failover and metrics data are held too.
- Is there a requirement for federated security (e.g. ADFS with Azure Active Directory)?
- Is this to be a hybrid-cloud application? How are we securing the link between our corporate and cloud networks?
- How do we control access to the administration portal of the cloud provider?
- How do we restrict access to databases, etc. from other services (e.g. IP Address white-lists, etc.)?
- How do we handle regular password changes?
- How does service-decoupling and multi-tenancy affect security?
- How we will deal with operating system and vendor security patches and updates?

## Manageability
This topic of conversation covers our ability to understand the health and performance of the live system and manage site operations. Some useful, cloud specific, considerations include:

### Monitoring
- How are we planning to monitor the application?
- Are we going to use off-the-shelf monitoring services or write our own?
- Where will the monitoring/metrics data be physically stored? Is this in line with data protection policies?
- How much data will our plans for monitoring produce?
- How will we access metrics data and logs? Do we have a plan to make this data useable as volumes increase?
- Is there a requirement for auditing as well as logging?
- Can we afford to lose some metrics/logging/audit data (i.e. can we use an asynchronous design to “fire and forget” to help aid performance)?
- Will we need to alter the level of monitoring at runtime?
- Do we need automated exception reporting?

### Deployment
- How do we automate the deployment?
- How do we patch and/or redeploy without disrupting the live system? Can we still meet the SLA’s?
- How do we check that a deployment was successful?
- How do we roll-back an unsuccessful deployment?
- How many environments will we need (e.g. development, test, staging, production) and how will deploy to each of them?
- Will each environment need separate data storage?
- Will each environment need to be available 24x7?

## Feasibility
When discussing feasibility we consider the ability to deliver and maintain the system, within budgetary and time constraints. Items worth investigating include:

- Can the SLA’s ever be met (i.e. is there a cloud service provider that can give the uptime guarantees that we need to provide to our customer)?
- Do we have the necessary skills and experience in-house to design and build cloud applications?
- Can we build the application to the design we have within budgetary constraints and a timeframe that makes sense to the business?
- How much will we need to spend on operational costs (cloud providers often have very complex pricing structures)?
- What can we sensibly reduce (scope, SLAs, resilience)?
- What trade-offs are we willing to accept?

## Conclusion
The consideration of these four topics (availability, scalability, manageability and feasibility) will help you discover areas in your application that require some cloud-specific thought, specifically in the early stages of a project. The items listed under each are definitely not exhaustive, but should give you a good starting point for discussion.
