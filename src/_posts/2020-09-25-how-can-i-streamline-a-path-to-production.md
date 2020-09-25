---
layout: post
asset-type: post
name: how-can-i-streamline-a-path-to-production
title: How do I streamline a path to production?    
title-es: ¿Cómo podemos agilizar el proceso de producción?
date: 2020-09-25 08:00:00 +00:00
author: Tom Spencer
description:  In this article we look at six steps to ensure that your path to production is as smooth as possible. Here, the claim is that release processes should be treated as infrastructure products in their own right. Software producers should recognise the need to budget for developing and building a robust release system. 
description-es: En este artículo, analizamos seis pasos para garantizar que el camino hacia la producción sea lo más fluido posible. Los procesos de release deben tratarse como productos de infraestructura por derecho propio. Quien se dedique al desarrollo de software debe tener en cuenta la necesidad de presupuestar el desarrollo y la construcción de un sistema de lanzamiento sólido.  

image:
    src: /assets/custom/img/blog/2020-09-25-how-can-i-streamline-a-path-to-production/path-to-production.jpg

tags:
    - site reliability engineering
    - system administrators
    - production builds
    - delivery
  
pinned_locations:
    - specialist-expertise

in_page_banner: none

hubspot-cta-id: 924b6d6b-6cc5-4f1c-9ae5-1ff7720191e3
hubspot-cta-id-es: cb50c28c-4205-428c-8bf5-66b4c95bab81

--- 

{% include path-to-production_cheat_sheet_banner.liquid %}

Many companies give too little thought to the release stage of software development. Company build systems often merely do the minimum required to push to production. Frequently, relief that the software appears to work within a tight deadline can blind development and operation teams to the pitfalls ahead. In this article we look at six steps to ensure that the path to production is as smooth as possible. Here, the claim is that release processes should be treated as infrastructure products in their own right. Companies need to budget developing and building a robust release system. The main point here is to be aware that deployment to production can involve the orchestration of multiple moving parts and businesses neglect processes at their peril. Lessons learnt from Google’s experience of scaling have led to the development of a new software field, Site Reliability Engineering (SRE). SRE applies the principles of computer science and engineering to the design and development of computing systems: generally large distributed ones. At Google, the role of SRE has three main aspects: first, engineering, applying scientific principles to the development of large distributed computing systems, second, system reliability, improving the design and operation of systems, thirdly, operating services, storage, email and web search, all on a global scale. 

Now, for businesses to survive, deployments must be frequent and seamless. The boundary between operations and development is now blurred and software must be designed to be deployable and ready for production. All deploys including database schema changes must be integrated into the deployment pipeline. The deployment pipeline is a well integrated system for deployment starting from commit and ending when delivery to users. At the commit stage a suite of tests are run with code analysis. Automated acceptance tests are the next stage of the process and would then ideally be run in order to ensure that the code meets the needs of the user. The next stage involves manual User Acceptance Testing (UAT) to ensure that the system is usable and provides value. Finally, the code will be run through the release stage to deliver the system changes to the user. The challenge for businesses is to ensure that the cycle from commit to production is as short as possible in order to make sure that feedback is as fast and accurate as possible. We will now consider six main points for ensuring production resilience and incremental system improvement.

### 1. Deploy as early and often as possible

It helps to see deployments as an incremental and continuous process. In some past earlier systems developers would throw zipped up software “over the wall” to system administrators who would have to factor in a period of “planned downtime” while the code was made to work on production. This was a poor service for customers for whom continuity is always important. The process of updating the system takes time. A typical design requires that the system always sees itself in either the “before” or “after” state but too often no attention is given to the “during” state while the system is being updated. Applications need to be designed so that they are easy to deploy. 

Jez Humble and David Farley in their book Continuous Delivery tell us that:

>“continuous integration requires that every time somebody commits any change, the entire application is built and a comprehensive set of automated tests is run against it. Crucially, if the build or test process fails, the development team stops whatever they were doing and fixes the problem immediately. The goal of continuous integration is that the software is in a working state all the time.” (p. 55).

Continuous deployment extends the process of continuous integration to make deploys as easy as possible with an emphasis on automation. 

Continuous deployment can help cut the delay between commitment and production and reduce the tendency for teams to build up a backlog of undeployed code. A build pipeline is a series of checks and tests which protect the production system from the introduction of failures. There are several products for creating build pipelines including Jenkins, CircleCI and AWS code pipeline. Here, it is important to avoid analysis paralysis. Developers should pick one system and become familiar with it for use in the business. Between the time a developer commits code to the repository and that same code is run on production the software for release should be considered as unfinished inventory, a pure liability. Unreleased code may have unknown bugs, issues with scaling or may even implement features that nobody wants.

In Continuous Delivery every change that is made to an application’s configuration, source code, environment or data triggers the creation of a new instance of the pipeline. The aim of the deployment pipeline is threefold: first it makes every part of the process of building, deploying, releasing and testing software, visible to everyone involved, aiding collaboration, second, it improves feedback so that problems are identified and resolved as early in the process as possible, thirdly, it enables teams to deploy and release any version of their software to any environment at will through a fully automated process. 

###2. Automate as much as possible

Automated deployment seems to be the only reliable procedure for releasing production ready code. The alternative, manual deployment, can involve several people working together on complex and time consuming tasks which require specific expertise. Because manual deployment is tedious and repetitive, even very skilled people are bound to make errors.
Software release should be a short and painless process with only low risk. Ideally, developers should be restricted from changing production server environments manually. Code, configuration, host environment and data, the application components all need to be controlled and a complete account kept of changes in any of them. Automation allows the reduction of toil and human error throughout the deployment process.

Version control is essential. All configuration should be self documented through readily available files. There are reliable open source version control systems such as git, subversion and mercurial and these should include everything relating to the software build. This should include the source code, build files, build tools, documentation, build results and build artifacts. Keeping everything in source control can help to ensure that the build environment is reproducible. Also, release engineers may need to be able to recreate the Operating System, compilers and build tools in order to resolve issues with release. It is important to keep a historical record of configuration changes including who made them and ensure that rollbacks are easy and reliable.

Infrastructure as code enables visibility and openness regarding server configuration. This can ensure that infrastructure documentation is always up to date, keeping a detailed audit trail for changes. It can help to achieve reproducibility, accessibility, tolerance to failure with dynamic infrastructure. For fully version controlled build tool management development teams can use Terraform or Ansible. Terraform is infrastructure as code and Ansible is a configuration management tool. Terraform is a multi-cloud infrastructure as code software written by HashiCorp in Go programming language. It provides built-in dependencies to handle automatic provisioning of infrastructure both in the public and private cloud. This can be helpful for use with AWS. Ansible is another software provisioning configuration management tool that uses declarative language to describe system configuration. Ansible Playbooks, the building blocks of all Ansible use cases, are written in YAML.

###3. Reduce Toil

Toil is manual, repetitive and automatable work that is devoid of enduring value which tends to increase as the business grows. SREs need to think about what they are doing. They need protected time on project work to reduce toil or add service features. Puppet and CfEngine are tools that can be used for centralised management and configuration of the software release phase. Using configuration management makes the infrastructure mutable. There are tradeoffs for this mutable infrastructure. Upgrades of aspects of the infrastructure such as NGINX can partially fail during upgrade in place and this can cause increased complexity.  An even better option can be to use immutable infrastructure where servers are not modified once they are deployed. With an immutable approach we take a snapshot of the Virtual Machine and then upgrade with discrete versioning.

A prerequisite for automation of operational infrastructure is access control so that only approved changes can be made. Without turning off access operations staff can spend all their time fire-fighting because unplanned changes break things all the time. Michael Nygard, in his book Release It!, calls this tendency “fiddling” and points out that every time a human touches a server is an opportunity for unforced errors. Servers should be treated as “cattle” as opposed to “pets” and immutable infrastructure can help to avoid misguided or over-enthusiastic configuration changes.

Automated build pipelines should reject any code which fails tests, linting or integration. Builds can include Make for C and C++, Ant or Maven for Java and scripting languages such as Bash and Python. It is important, however, to avoid unnecessary complexity for builds. Centralized makefiles should be used for scripts. Compiler options will change between architectures. Here, reducing toil is a key goal for SREs and template files should be provided to developers to avoid overcomplexity and make it easier to begin work on future iterations. Uniform configuration style and linting should be enforced throughout the development team. It is important to maintain a consistent style across all authors to improve readability and detect errors.

Database changes can often be another pain point for deployment. First, it is extremely important to ensure that the development team has a migration framework in place. Instead of running raw SQL scripts against an admin command line interface developers should have programmatic control to roll the schema version forward and also roll back if necessary. Some schema changes such as adding a table, views, nullable columns, or aliases are perfectly safe changes provided the changes they add are not yet used by the current application. Shims (splitting tables) and updates need to be tested on realistic data before deployment. More care should be taken with database actions that may impact the business application’s integrity.

###4. Logging and Monitoring

In a large computer infrastructure the servers, the network and the applications all need to be monitored. This cannot be done by a single tool. Choice of tools for this task is important but depends on the specific nature of the system. A good manager will try to discover what colleagues in similar organisations are using and how they go about the monitoring task. Monitoring is not a job. Rather it is a skill which every team member should try to acquire. Effective monitoring is not a box ticking exercise. All too often monitoring is interpreted as keeping a record of the most obvious indicators of the system such as system load, CPU usage and memory utilisation. When things go wrong developers are left scratching their heads to work out why. It helps if developers have an idea what “working” actually means in the system. With a web app, for example, an HTTP GET / command will promptly respond HTTP 200 OK on a healthy system. Delay or failure in this test strongly suggests there is something wrong. It is useful to distinguish between measurements of application function and those which measure the inner work of the operating system itself. The latter are usually of only incidental interest in dealing with this kind of problem. Bear in mind that good monitoring will flag up problems early but it won’t fix them. 

###How to design an automated monitoring system?

Composable monitoring has developed as a partial answer to the question of automation. It embodies the UNIX philosophy described by Doug McIlroy as:

>“Write programs that do one thing and do it well. Write programs to work together.”

Different tasks can be fulfilled by stringing monitoring programs together in different configurations. The monitoring service needs to do data collection, data storage, analytics and reporting, visualisation, and alerting.

Data collection has two basic modes: push or pull. Push sets up the client to provide regular updates for monitoring purposes. In the pull model data is requested centrally from remote nodes or servers. With either design, you end up with two types of data - metrics or logs. Metrics will include performance statistics, counting the number of times a site is accessed, for instance, or it may provide a snapshot of the rate at which something is happening. Logs are text strings often in compressed form. A mature monitoring system will be able to extract log contents into human and computer readable form for search and analysis. Techniques for turning data into presentable information can be found in books such as Edward Tufte, The Visual Display of Quantitative Information, or Stephen Few, Information Dashboard Design. 

Quite often the software supplier is contractually bound to a service level availability agreement with penalties for failure. This is often summarised in the form of nines to represent the percentage of uptime expected. Google developers adhere to an error budget which allows a very limited amount of downtime in order to give opportunity for development and general system improvement with its attendant risks. AWS EC2 provides 99.95% SLA for a single region, allowing up to 4 hours of downtime in any year. If your applications are running on AWS you cannot guarantee more uptime than they offer. Solutions for this could include purchasing EC2 instances from different regions to protect against network failures.

When setting up a monitoring system it is a good idea to start as close to the end user as possible, focusing on the data and performance customers will receive. An example of a test for monitoring from a user perspective is to collect HTTP response codes which may highlight problems immediately. These tests can act as integration tests on the application to wrap a simple test result that encompasses database retrieval, redis instances and system infrastructure, for instance. Involving product managers in monitoring can help to focus data collection to the areas that really matter. Business Key Performance Indicators (KPIs) are the most important metrics available and make great leading indicators for application health and performance.

###5. Delivering version changes

>"Be conservative in what you do, be liberal in what you accept from others."

John Postel			

Delivering version changes requires awareness of the existing arrangements with clients. Changes that might break agreements with clients could include rejecting a network protocol, a request framing or request syntax that worked prior to the version change. Another common agreement breaker is adding required fields to the request or forbidding optional information in the request which was previously acceptable. Alterations to the content of the response may also be deal breakers. As Michael T Nygard says in Release It!,

>“We can accept more than we accepted before but we cannot accept less or require more. We can always return more than we returned before but we cannot return less.”

M. Nygard, Release It! 

Be aware that there may be a gap between what we say our service accepts and what it really accepts so that the service now rejects requests that it previously accepted. This is to be avoided. Postel indicates that we should be capable of accepting the input.

Another aspect of API versioning is handling others’ versions. When receiving requests or messages the application has no control over the format. Integration tests should check the application’s own conformance to the specification. It is important that the tests do not make unjustified assumptions about how the other parties in API interaction behave. The tests and code should be written with a cynical mindset. Even if the most trusted service provider claims to do zero downtime deployments it is still essential to protect the service. Use a gateway for timeouts, connection handling, error handling and result processing. This means that the application interaction logic is in one place and calling code can just provide the essential logic. Collecting the interaction into one class has the added benefit of making a Circuit Breaker pattern easier to implement. If requests fail above a certain limit the circuit breaker trips and opens the circuit to isolate errors and avoid infecting the whole system when one API interaction fails.

###6. Avoid drift

Economic return can play a part in increased risk. Highly efficient systems handle disruption badly and tend to break all at once. Nassim Taleb in his book The Antifragile terms this phenomenon antifragility and defines it in the following terms:
	
>"Antifragility is beyond resilience or robustness. The resilient resists shocks and stays the same; the antifragile gets better." 

Taleb, N. The Antifragile

One way to improve production resilience, therefore, is to create tolerable levels of stress and breakage to increase the system over time. The work of Netflix and their [Simian Army](https://netflixtechblog.com/the-netflix-simian-army-16e57fbab116) has frequently been held as a model for Chaos Engineering but before adding chaos monkeys across the stack it can help to start with an opt-in model as opposed to opt-out. It can take time for resilience testing to take root on production services and over ambitious implementations can lead to serious issues across departments. Adding latency or making service calls fail are examples of injecting chaos. Another interesting exercise could include zombie day exercises to enable teams to make fuller inventories of team readiness for production failures or errors. In these types of exercises selected team members are required to remain offline in order to leave other members of the team to solve production issues. Here also it is important to have a code word when it is necessary to signal “this is not part of the drill”. The important point to remember is that breaking things regularly in a semi-controlled way can help software and teams to become more resilient.

###Conclusion

Change is the defining characteristic of software. The release to production is the beginning of the software’s true life, everything before is just gestation. Released systems need to grow and adapt over time in order to build resilience within the production environment. The alternative is decay and rigidity until benefits are outweighed by benefits. Release to production must, therefore, be regarded as the integral part of the business software. It is not enough to design for change in software. Businesses must prepare and plan for change in production through automation, versioning and resilience training.
