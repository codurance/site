---
layout: post
asset-type: post
name: project-maturity-model
title: Project Maturity Model
date: 2020-02-24 10:00:00 +00:00
author: Christopher Eyre
image:
    src: /assets/custom/img/blog/railway.png
    attribution:
        text: Public domain photo from Pixabay
        href: https://pixabay.com/photos/rails-soft-gleise-railway-3309912/
tags:
    - project improvements
abstract: A year of improvements to a project
alias: [/2020/02/34/project-maturity-model]
---

## A Year in the life of a Project

This article describes the evolution of a project over the course of a year. It has not been the full time focus of the team. 
I want to describe the process in terms of the Capability Maturity Model. The CMM is intended for organisational effectiveness, but is easier to discuss in a smaller setting. 

Here are the stages:

1. Initial
2. Managed
3. Defined
4. Quantitatively Managed
5. Optimising

The team that I lead had shortly before I took over the team lead position had inherited a project. 
I am going to call it Project A to keep it anonymous.

Project A consists of a dozen services. Whether these count as microservices is another matter (they are independently deployable, theoretically replaceable, and use rabbit mq and REST to communicate). The team had previously been under instructions not to spend more time than absolutely necessary on Project A as they had other important things to work on. 

### Level 1 - Initial

The team does not understand the project. Errors are resolved by restarting one of the services.
The team had added automated build triggers to rebuild the services every day.
Errors are found by support incidents being raised. 
Most of our users are in another timezone so problems are typically reported at the end of the working day.

### First Crisis

On one Tuesday afternoon we were told by our users that Project A had not been sending out regular emails since the weekend.
Project A integrates with an external third party system and sends out emails notifying of changes that the user is interested in.

We start by looking at our logs:
We have no errors.
We also have no warnings.
We have lots of info messages.

Our logs were being sent to Datadog. It was shortly after this that we found that you need to provide a status code to Datadog in order for it to correctly segregate the messages. Without this everything is Info.

I like to document systems using graphviz. This is a compiler that allows generation of images from source code:

![Architecture Diagram](https://github.com/chriseyre2000/sample-readme/raw/master/docs/architecture.png)
![Key](https://github.com/chriseyre2000/sample-readme/raw/master/docs/key.png)

There are samples for this here: https://github.com/chriseyre2000/sample-readme

I started using graphviz to draw data flow diagrams for each of the services in Project A.
These were checked into source control alongside the projects.

The idea of the data flow digram is to follow the chain of data use through the system.
Items to the left feed data to items on the right.
Each service in Project A was documented with the items to the left and right of it.

The initial diagrams were crude, and somewhat inaccurate (some of the items had the flow going the wrong way, other subtle links were missing).
However to quote Simon Wardley "all maps are wrong, some of them are useful".

These are maps since they have a key and direction is meaningful.

By working through the services we found that we were not receiving any inputs. The third party had changed their login process. 
We found a notification of this hidden on the updates section of their website in a three month old article!

It took us a couple of days to fix up the login process and to restore the functions of Project A

### Level 2 Managed

We now had a basic understanding of the components of the system.
We managed to fix the Datadog logging and now had the logs correctly split by category.
Errors were still reported by our users.

We started to fix the error levels of the messages, Some errors were merely informational and could be downgraded. 
Others needed more details.

We added [Dependabot](/2019/02/24/taming-dependabot/) to all of our projects to assist with upgrades. This allows us to keep on top of the security and other changes to the libararies that we depend upon.

### Second Crisis

We started to get complaints that our users were not recieving emails.
This was odd as we could see in the logs that some emails were being sent out.

We used datadog to produce a dashboard that produces graphs of both the signals that an email should be sent along with a list of the number of emails actually sent.
This was enough for us to see that while we were sending some emails, it was significantly lower than expected.

One of our internal services had changed it's contract and one of the services could not cope with the new shape of the data. This did not take long to solve or isolate given the now improving diagrams.

### Level 3 Defined

We now started to reduce the most frequent group of errors whenever we had a quiet time. Datadog has a great option to detect patterns in the logs and create groups out of them. 
These form obvious targets for reducing the errors. We started adding alerts for specific problems to ensure that we know about a problem before the users tell us.

We were still occasionally getting problems reported just before hometime on a Friday. Solving these is much quicker now.


## Third Crisis
Our QA while testing a change noticed a message on a database dashboard. The database service that we were using for eight of the services is being decomissioned in 6 months time.
We fairly quickly find that four of the databases are actually only used for locking and were able to replace them with AWS Lamdas. The remaining four we eventually migrated.

The diagrams are getting more accurate by this point.

## Further Improvements

We added integration tests to check that the access codes that we needed for each remote service were still accurate. We are integrating with over 100 almost identical services and they are undergoing an upgrade program! This means that the tests will be broken first thing on Monday morning, allowing us to fix things before our users need the data.

One of the services used AWS S3 to store messages that could not be parsed. Expanding this to other parts of the service greatly assisted fixing (or at least quieting) some strange errors.

One of the services was responsible for querying an external service (which had over 100 instances). At any given time some of these were broken (2% to 5%, but not always the same one). For a while we were moving the broken feeds to use a less effictive backup service manually. This required us to remember to restore the feeds once they had recovered.

The first attempt to standardise this involved having a test check each feed each day and report those that were broken. This was good at spotting broken items, but made fixing them labour intensive.

The second attempt was better: use railway oriented programming. This is a technique which models the success and error conditions as two parallel railway tracks. An error shunts the train onto the error track. If it remained there then this would be normal error handling. The railway trick is to have corrective processes that can restore the train to the main track. In our specific case this meant changing the error handler of the primary feed to call the secondary feed should an error occour. This allowed us to cater for unreliable feeds for the small price of one service being able to call another. This small change eliminated 30% of the daily errors!

I use a three level approach for logs. Errors are for things that the system cannot correct for itself. Warnings are for things that may be wrong, but could just be expected and incomplete. Information messages are the background items that show you that the system is functioning, and give you a easier time to locate a problem when viewed in context.

### Level 4 Quantitatively Managed

The diagrams are now far more accurate.
We now remove the most frequent error each day (and are now starting on the warnings).
Project A is far more stable than ever. The diagrams make finding problems far easier and help explain the system to new arrivals on the team.

We have started to find other parts of the systems that we support that we want to give the same treatment to (one of the user interface components still has one level logs).

We try to keep an active eye on what is going to need to be upgraded so we can plan it carefully.

Fixes are applied slowly. Fix one new thing each day and you will make a lot of progress, and know the cause of any side effects. 

### The Future

Project A still has a few rough edges, but we have made a lot of progress. This has not been our main focus for all of the year, it only becomes important when something breaks.

We generally spot the errors before the users now.

### Lessons Learned

Understand any system that you have to support.
Graphviz is a great way to document this knowledge.
Datadog has a lot of powerful tools that will help, if you can make your logs work with it.
Actively monitor your system especially after any significant change. 
Keep an eye on the logs to know what is normal, and see what the system is trying to tell you.