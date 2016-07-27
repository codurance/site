---
layout: post
asset-type: post
name: working-with-slas
title: 'Working with SLAs'
date: 2015-05-19 14:00:00 +01:00
author: Steve Lydford
image:
    src: /assets/img/custom/blog/2015-05-19-working-with-slas/guarantee.jpg
    attribution:
        text: WmRogers_guarantee, by Nancy Gluck
        href: https://flic.kr/p/5KxiDX
---

If you spend any time designing applications which use third-party platforms and services, you will have spent time considering Service Level Agreements (SLAs). The *tl;dr* part of any SLA, the bit the everyone is actually interested in, is the uptime guarantee. However, this seemingly simple number has some hidden meanings that you should be aware of when designing applications and reporting your SLAs to customers.

###Uptime guarantees
This one seems obvious, but of course an uptime guarantee is not actually a guarantee of uptime in the purest sense of the word. It is merely the point at which any penalty clauses in the uptime guarantee section of the service contract come into force. Subtle, but very different. Especially worth considering if the financial reimbursement offered if less than the cost per period of downtime to your business.

###Amount of permitted downtime
As mentioned previously, uptime guarantees form the basis of SLAs. Typically these are values in the region of 99% and above. While 99% uptime may sound a lot, it actually means that the service you are using may be unavailable for over 3.5 days per year and still be well within it's guaranteed level of availability.

Below is a table showing the actual allowed downtime values against SLA percentages:

|Uptime Guarantee		|Downtime per Week	|Downtime per Month		|Downtime per Year 	|
|-------------------|-------------------|---------------------|-------------------|
| 90%               | 16.8 hours        | 72 hours            | 36.5 days         |
| 99%               | 1.68 hours        | 7.2 hours           | 3.65 days         |
| 99.9%             | 10.1 minutes      | 43.2 minutes        | 8.76 hours        |
| 99.99%            | 1.01 minutes      | 4.32 minutes        | 52.56 minutes     |
| 99.999%           | 6.05 seconds      | 25.9 seconds        | 5.26 minutes      |
| 99.9999%          | 0.605 seconds     | 2.59 seconds        | 31.5 seconds      |

Clearly, calculating the cost of this downtime to your business can make a huge difference when choosing a service provider. Five minutes of downtime in the middle of the day will be considerably more financially troublesome to an investment bank than to say a news aggregation website for example.

As systems become increasingly distributed, fueled in part by the adoption of Cloud and 'micro' services, network and hardware fault tolerance is becoming more and more of a consideration for solution design. There are design strategies that we can use to minimize the disruption caused by these, often transient, faults, such as effective use of caches, queues, retry policies, replication and failover, load-balancing, etc., but I'll save these for a future article.

###Time frames
When comparing uptime guarantees, it is also useful to compare the reporting periods  over which availability is measured, favoring the shorter. A service provider who resets the clock yearly has a much longer period to hide bad spells within the average than one which resets weekly or monthly.

###SLA uptimes are composite
My final point for now on SLAs regards the calculation of overall uptime guarantees for a software system. It is important to note, yet less than plainly obvious, that when creating a software system which uses multiple third-party services with independent SLAs, *the overall uptime guarantee is a composite*.

Let's say for example that we are building a system using three third-party services, each with their own uptime guarantee:

|            |Uptime Guarantee  |
|------------|------------------|
| Service 1  | 99.9%            |
| Service 2  | 99.9%            |
| Service 3  | 99.5%            |

So what is the maximum downtime that we could expect from this system? It is easy to assume that this would be equal to that offered by the lowest uptime guarantee, in this case 99.5%, or 3.6 hours potential downtime per month, but this is not actually the case.

In this example let's assume that each of the three services are vital to the operation of the system, which may not necessarily always be the case (in reality, the loss of logging, advertising or analytics services for example may not affect the overall system uptime). Each of these three systems may experience outages at different times during the reporting period, so to come up with an overall figure we must multiply these percentages to come up with a composite. In our case this calculation is:

> ##0.999 x 0.999 x 0.995 = 0.993

So our three services combined actually provide an uptime guarantee of *99.3%*, or a potential downtime of 5.04 hours per month.

###Conclusion
We have seen that, as with all parts of software design, when working with SLAs it is important to pay attention to the detail. Not all SLAs are made equal, and when reporting overall SLA uptimes to customers, simple assumptions can lead to potentially costly mistakes.
