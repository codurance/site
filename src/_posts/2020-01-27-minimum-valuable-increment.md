---
layout: post
asset-type: post
name: minimum-valuable-increment
title: Minimum Valuable Increment - MVI
date: 2020-01-27 00:00:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/custom/img/blog/2020_01_27_minimun-valuable-increment.png
tags:
    - agile
    - process
abstract: Replacing User Stories with Minimum Valuable Increments
---

## Minimum Valuable Increment - MVI

User Stories have been widely adopted by Agile teams around the world. They became the standard way to describe activities in product and iteration backlogs. In highly collaborative Agile teams, any person from the product team can add things to the backlog. User stories are refined by the three amigos (product owner, tester and developer), but the responsibility for the prioritisation remains with the product owner. In many other teams, the product owner (or business representative) has the full control of the backlog. They are responsible for defining the users stories and respective acceptance criteria. The acceptance criteria serve as a guide for the development team and is used by the product owner and/or testers to accept (or "reject") the work. 

Not all tasks (I'll call them increments from now on) in a software project are related to a user. Even if we consider the _user_ to be any person or stakeholder instead of a real user of the system, the user story format does not always fit. There are many systems that don't even have direct users—they are used by other systems. Furthermore, the unbalanced focus on user features at the expense of the quality and technical stability of the system can significantly harm a software product. There are many valuable and needed technical increments that fail to be added to the backlog. Business representatives do not necessarily understand the technical needs of a software product. To make things worse, developers often struggle to express the value of their proposed technical improvements.  

Defining a strategy to evolve a software product is a balancing act. The emphasis in different types of increments vary overtime. There are times when building user-centric features or increasing customer satisfaction will take precedence over anything else. But there are times when technical improvements are essential to the stability and healthy evolution of the software. It is a mistake to think that only user-centric features have business value. Any increment should be about business value. A healthy backlog should have a balance of functional, technical and operational increments. What changes is the emphasis we put on each category at a different point in time. 

Although user stories are about value, they are about value to the _user_. I would rather have backlog items describing the value to the _business_. We can argue that proving value to users is a way to provide value to the business as a side effect. I certainly agree with that but the end goal still is value to the business.

Instead of the traditional user story/acceptance criteria format, I propose a different format that allows different members of the team to propose increments that are valuable to the business, regardless if they are user-centric or not. I call these increments Minimum Valuable Increments (MVIs).

## Defining Minimum Valuable Increments - MVIs

MVIs are meant to represent any valuable increment to the software. The word _Minimum_ emphasises the importance of working in small increments and short feedback loop. The basic structure of an MVI is:

 > **Value:** `<describes the expected business value>`    
 > **Increment:** `<describes what will be done to generate the value>`    
 > **Tasks:** `<optional list of tasks involved to complete the increment>`    
 > **Example:** `<optional example(s) to clarify the intent of the MVI>`     
 > **Verification:** `<describes how the team can verify if the increment is ready to be released to production>`    

There is often a need to group increments, that means, having a group of MVIs that map to a bigger business goal. In addition, there is also a need to measure the impact an MVI (or group of MVIs) had on the business. The measurement should specify the metrics to be used and measurement process if applicable.  


> **Goal:** `<description of the goal>`    
>> **[MVI 1]**    
>> **Value:** ...    
>> **Increment:** ...    
>> **Example:** ...    
>> **Verification:** ...    
>>    
>> **[MVI 2]**    
>> **Value:** ...    
>> **Increment:** ...    
>> **Verification:** ... 
>       
> **Measurement:** `<specify the expected impact, metrics to be used and/or measurement process>`    
	
Business value can only be measured once the MVI(s) is(are) in production. The product team should keep track of what they are measuring, continuously analyse the data, and plan future MVIs accordingly. 

## Writing MVIs

Different product teams organise their work in different ways. Some teams have a single and prioritised backlog of _tasks_ (or increments). The increments at the top must contain all the details need by the team to implement them. Increments at the bottom are written at a very high-level—they are further detailed if and when they become a priority. Other product teams (normally in larger organisations) tend to have their work organised in a more structured way, with a product roadmap, a milestone backlog and a iteration backlog. While items in the product roadmap describe the increment and its value at a very high-level, increments in the iteration backlog are very detailed and ready to be worked on. MVIs can be used at all levels. Let's use the product, milestone and iteration backlog levels just to exemplify the different levels an MVI can be written:

### Product roadmap

MVIs written at this level are meant to provide a strategic view of the evolution of the product, often focused on the next 6 to 12 months. They are normally used by stakeholders who are not only interested in what is going to be done but also the expected value to the business. MVIs at this level should not contain implementation details, just the main idea. For teams using a single backlog, MVIs written at this level would be at the bottom of the backlog. 

#### Single MVI Example

> **Value:** Increase sales.</br>
> **Increment:** Accept all popular payment methods.</br>
> **Verification:** Have new payment methods available for all our customers.</br>
> **Examples:** AMEX, PayPal and Apple Pay. Currently only VISA and Mastercard are accepted.</br>
> **Measurement:** 15% increase in online sales after 3 months the new payments are in production.

#### Composite MVI Example
	
> **Goal:** Reduce lead time to production
>> **[MVI 1]**</br>
>> **Value:** Faster and more reliable delivery of new payment-related features.</br>
>> **Increment:** Move all payment related logic from the existing application to a new payment service.</br> 
>> **Verification:** New payment service deployed in production and used by the rest of the application.</br>
>> **Measurement:** Payment changes released to production every two weeks (currently being released every 3 to 6 months, alongside the whole application).</br>
>> 
>> **[MVI 2]**</br>
>> **Value:** Catalogue changes immediately displayed on website.</br>
>> **Increment:** Display catalogue data from a CMS instead of static data from the application.</br>
>> **Verification:** Catalogue data is displayed immediately on the website after being changed in the CMS. No redeployments of the application or changes in database needed.</br> 
>> **Measurement:** Reduction from a few days (development intervention) to immediately available content changes.

### Milestone backlog

MVIs at this level are meant to give stakeholders and product teams an idea of what is going to be done in the next 3 months. For teams using a single backlog, MVIs written at this level would be between the middle and upper part of the backlog, but not at the very top. They contain more details than the MVIs described at product roadmap level but still need refinement before they can be implemented. The level of details should be enough to give the product team a rough idea of size and work to be done. 

> **Goal:** Reduce lead time of payment-related changes to production</br>
>> **[MVI 1]**</br>
>> **Value:** Ability to test and release VISA payments independently.</br>
>> **Increment:** Create a new payment service and move all the existing VISA logic to it.</br>
>> **Verification:** VISA flow should work exactly as before. There should be no change from a usability perspective.</br>
>>
>> **[MVI 2]**</br>
>> **Value:** Increase sales accepting AMEX payments.</br>
>> **Increment:** Build AMEX payment flow as part of the new payments service.</br>
>> **Verification:**</br>
>>    -Option available during checkout</br>
>>    -Integration with AMEX payment gateway</br>
>>    -Integration with Orders system</br>
>>    -All AMEX changes should be done in the new payment service.</br>
>>    -.... </br>
>> **Measurement:** 2% increase in sales after 3 months AMEX payments are available in production.

### Iteration backlog

MVIs at this level have been refined by the product team and contain all the necessary details to be implemented. For teams using a single backlog, MVIs written at this level should be at the very top of the backlog. At this level, teams can use the optional _task_ section. As MVIs are refined, they might be split into smaller MVIs. This allows teams to work in small increments and continuous release their changes to production. 

#### Refined MVIs
	
> **[MVI 1]**</br>
> **Value:** Infrastructure that allows payment changes to be done in isolation from the rest of the application.</br>
> **Increment:** Create a walking skeleton for the new payment system.</br>
> **Tasks:**</br>
> -Create a new repository on GitHub for the new payment service.</br>
> -Create Spring Boot service that is able to respond an HTTP call.</br>
> -Create the CI/CD pipeline for the new service.</br>
> -......</br>
> -....</br>
> **Verification:**</br>
> -Tests should run for each branch on GitHub.</br>
> -Pull Requests can only be merged if all tests are green.</br>
> -Tests should run after a Pull Request is merged.</br>
> -Application should be deployed to QA environment every time a new pull request is merged successfully.</br>
> -.....</br>
> -...

----
 
> **[MVI 2]**</br>
> **Value:** Test and release VISA payments independently from the rest of the system.</br>
> **Increment:** Move existing VISA payment logic to the new payments service.</br>
> **Tasks:**</br>
> -Move VISA payment gateway integration logic to the new payment service.</br>
> -Move call-back endpoint for VISA payment gateway.</br>
> -....</br>
> -...</br>
> -Redirect the frontend API calls to the new Payment service.</br>
> -Remove old VISA logic from the main application.</br>
> **Verification:**</br>
> -No change in the user flow. VISA payment flow should work exactly as before.</br>
> -VISA option available during checkout.</br>
> -Integration with VISA payment gateway.</br>
> -Integration with Orders system.</br>
> -All VISA logic should be done provided by the new payment service.</br>
> -.....</br>
> -...</br>

## Final words 

As described earlier, MVIs can be used in a wider variety of contexts when compared to user stories. MVIs can be related to any work that provides value in a software project. Business value can be generated by building a feature for a customer, a technical improvement to speed delivery, cost reduction, system stability, compliance with regulations, risk mitigation, etc. MVIs can represent all valueable increments. MVIs are owned by the whole product team, including developers. There is no division between business and technology in a product team. There are different people with different skills, knowledge, responsibilities, and accountability. Prioritisation must happen by value to the business, not to the user. User satisfaction, cost reduction, system stability, bug reduction, ability to release features safely and more often, are all different types of business value. 
