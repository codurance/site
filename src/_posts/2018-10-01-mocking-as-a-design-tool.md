---
layout: post
asset-type: post
name: mocking-as-a-design-tool
title: Mocking as a Design Tool
date: 2018-10-01 00:05:00 +00:00
author: Sandro Mancuso
description: Mocking as a design tool.
image:
   src: /assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/01-association.png
tags:
- tdd
- design
- mocking
---


Mocking is still a point on contention among TDD practitioners. The biggest complaint is that when we use mocks the tests end up knowing too much about the internals of the module under test, making it difficult to refactor in the future. Because of that, a common recommendation is to avoid the use of mocks and only use them as an isolation mechanism in the following scenarios: 

* Domain model: mock the ports in hexagonal architecture, protecting your domain from infrastructure and delivery mechanisms. 
* System: mock at the boundaries of the system (I/O)
* Layering: mock at the boundaries of each layer.  

If we think about mocks as a testing took, this is a very sound advice and most TDD practitioners would agree with that, including myself. 

However, when building systems with a complex domain, where business flows are not linear (flows that touch different areas of the domain model and each area might trigger their own sub-flows), restricting the use of mocks to the boundaries described above is not enough. 

## Association vs Composition vs Aggregation

Let's look at the relationship between modules A, B and C. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/01-association.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>
	
**Association**

The diagram above describes that A is _associated_ with B and C. By the direction of the association we can say that A uses B and C but B and C do not know A. 

But are B and C _part_ of A or just _used_ by A?

**Composition**

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/02-composition.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>
	
The diagram above describes that B and C are _part_ of A, that means, their lifecycle is directly controlled by A's lifecycle. If A is removed (from memory or even from the code base), B and C are removed as well since they do not make any sense without A. 

**Aggregation**

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/03-aggregation.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>
	
The diagram above describes that B and C are _used_ by A, that means, their lifecycle is not controlled by A's lifecycle. If A is removed, B and C will continue to exist. 

Both Composition and Aggregation are types of Association. This distinction is important as it may help us understand the boundaries of our modules or components. 

## Boundaries

Before we talk about mocking we should talk about boundaries. Certain boundaries are very clear like packages, namespaces, classes, methods or functions. They are imposed by our programming language and paradigm. Other boundaries are more subjective, that means, they are defined by our macro design choices, like layers, hexagons, components, delivery mechanism, domain model, infrastructure, and design patterns in general. TDD practitioners, including the ones that normally do not like mocks, are happy to use mocks at the _boundaries_ of whatever they are test-driving. The only problem is that they rarely agree where the boundaries should be drawn while test-driving their code. 

## Let's look at an example

Imagine we are building an e-commerce web application and after discussing with our Product Owner, we captured the following high-level requirements: 

**Scenario: Making a payment**

> In order to have my items delivered to my home address
> As a buyer 
> I would like to pay for all items in my shopping basket

**Acceptance criteria**

* Scenario will be triggered from the check out page, after the user fills up the payment details. 
* Payment should be processed according to:
	* Payment method chosen (Credit Card, Debit Card, Paypal, Apple Pay)
	* Different countries have different payment gateways.
	* Fraud detection should be applied to all credit and debit card payments.
* An order containing the user, all items in the basket, discounts, payment method, and delivery address should be created. 
	* It's status should be set to "open" when created, to "paid" after successful payment or to "payment failed" otherwise.
* A notification to the warehouse system should be sent with all items sold. The warehouse system will trigger the delivery process. 
* Delivery date(s) should be checked again once the payment is sent and shown to the user in the confirmation page. Different items might be delivered on different dates. 
* An email confirmation with the payment confirmation and delivery date sent to the user. 
* User sees the confirmation page with the order number linking to the order details, delivery dates broken down per item and payment method used and amount paid.

We could add many more behaviours to the acceptance criteria, but I guess this is enough to use as an example of a feature (making a payment) where a single trigger from the browser can trigger a lot of behaviour. 

## Identifying behaviours and modules

To keep this post focused and simple, I'll only focus on the business logic described above and not go into the implementation details. 

While reading the requirements above, I believe that it is clear that we will not try to put everything inside a single module. Because of that, test-driving all that logic in a classicist approach seems to me a waste of time. The requirements above gives me enough information to make some macro design decisions and be more efficient while test-driving my code. 

Looking at the requirements, we can identify two different types of flows: 

* **Main flow:** An overarching _make a payment_ flow that needs to orchestrate different sub-flows. 
* **Sub-flows:** The sub-flows can be orchestrated by specific areas of the domain. These different areas could be called modules. 

Let's have a look at the potential modules and responsibilities: 

* **Payments:** Payment methods, payment gateways, country specific logic, fraud detection.
*  **Orders:** Create order, update order.
*  **Delivery:** Complex logic where different items in the shopping basket might be grouped and delivered at different dates depending on warehouse location, delivery options, etc.
* **Notification:** User notifications related to payment, delivery, etc. 

The overarching logic also needs to be added to a _module_ and this logic should be provided to the delivery mechanism. 

## Mocking as a design tool

When building a complex flow, with many movable parts, trying to build everything in one go can be extremely complicated as we need to keeping moving across logic in different levels of abstraction. E.g. We should not be focusing on details of fraud detection while building (test-driving) the main business flow. That's when mocks can be very helpful as a design tool. 

Mocking as a design tool makes more sense when using outside-in TDD (London School). This style of coding focus on the decomposition of a big problem into smaller problems. It starts from the macro behaviour (main flow), decomposing it into smaller behaviours until the decomposed behaviours are small enough to be cohesive or have a single reason to change. In the example above, we would start test-driving the main flow first and only then think about the sub-flows inside the modules. 

### Outside-In Design via Mocks

Let's say we will have an endpoint called `PaymentsAPI` that will parse the JSON received via HTTP request, will call the _main flow_, and will return the HTTP code and confirmation JSON to the frontend app. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/04-delivery-mechanism.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Now we need to define the domain module that is going to be called by the `PaymentsAPI`. At this time, we can use a mock to design the interface of this module and finish the implementation of `PaymentsAPI`. The reason we could safely do this is that we already decided what behaviour will remain in the `PaymentsAPI` and what is going to be delegated. 

If you follow the [Clean Architecture][8], [Domain Driven Design][7], or [Interaction Driven Design][4], we will need a module that will orchestrate the business flow. This module plays the role of a Use Case (Clean Architecture), Application Service (DDD) or Action (IDD). I'll use the IDD naming and call it `CheckoutAction`.

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/05-mock-action.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Using a mock to design the `CheckoutAction` public interface helped us to decide what the `PaymentsAPI` should send and what it would need to receive. This way we can finish testing the `PaymentsAPI` without worrying about the details of the business flow. This also allows us to hardcode some value and already test the whole user interface journey. 

### Designing the domain model 

Now that we know that the `CheckoutAction` is the entry point to our domain model, we need to implement it. According to our previous analysis, we have at least four groups of behaviours that need to be orchestrated by `CheckoutAction`: Payments, Orders, Delivery, Notification. 

#### Composition or aggregation?

When looking at the logic related to payments, orders, delivery or notification, how do they relate to the `CheckoutAction`? 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/06-checkout-relation-question.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Are they _part of_ the `CheckoutAction` or _used by_ it? This is an important distinction because the answer to this question directly impacts on the boundaries we are drawing around our business components, which in turn impacts the testing strategy. Test-driving code is much easier when boundaries are well defined and a little upfront thinking can make TDD far more effective. 

So, back to the question: How do we know if an association is a composition or an aggregation?

A simplistic approach would be to ask about lifecycles, that means, if we delete `CheckoutAction`, would we also delete the logic related to payments, orders, delivery and notification? We need to be very careful with this question because in theory, if the `CheckoutAction` is the only piece of code calling those other pieces of logic, they would be orphans and should be deleted. But that is not enough to decide if an association is an aggregation or composition. A better question to ask is about different reasons to change and how each change impacts other areas. 

**Analysing changeability** 

First, let's discuss what should be the responsibility of CheckoutAction. If we try to put all the logic related to payments, orders, delivery, and notification plus the coordination across these areas, the `CheckoutAction` would be violate Single Responsibility Principle and probably a dozen of other design principles. To avoid this, I would recommend to leave the `CheckoutAction` to control the flow and delegate all the behaviour of each step of the flow to their own module. 

Now, let's look at Payments. We could add or remove payment methods, payment gateways, country specific logic, and fraud detection. Speaking to the business we discovered that before adding a new payment method or gateway to the platform, different a group of people would get involved, sign contracts with providers, and these people are not the same ones that would be involved in other areas of the system. Should any of that impact the checkout flow? I would rather make sure the Payments changes did not bleed into the other areas. That would make the payments module compatible with the Open/Closed Principle, that means, we could add or remove payment methods, gateways, etc, with no impact in the rest of the system. With all that in mind, I'm quite confident to make the payments module totally independent. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/07-checkout-payment.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

So, what about orders? Speaking to the business I discovered that orders have their own life cycle (new, waiting confirmation, paid, rejected, fulfilled, etc) and different parts of the system and internal users need orders information, mainly in the back office. This is enough information to make a decision to separate the orders logic from the checkout process. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/08-checkout-orders.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Delivery is a complex part of the domain as it involves different service providers in different parts of the world. They also charge different rates, have different contractual models, etc. The decision of displaying the available delivery mechanism to the end user is not a simple one and is handled by different parts of the business. Another area that we should keep isolated from the rest of the system. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/09-checkout-delivery.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Finally we discuss the notifications. The only thing we got from the business is that we would need to send an notification to the user with the result of the checkout process — either the payment was received and order recorded or the payment was rejected. Although I might have a gut feel that this logic can grow and maybe reused, I don't have enough evidence of that, so in this case I'll keep it as a sub-module of the checkout process.  

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/10-checkout-notification.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

In order to gather the information above and decide what would be a composition or aggregation we only had to have a quick conversation with the product owner where we asked a few business questions about each part of the flow. 

### Using mocks to design the collaborations

With the decision of what behaviour goes together (composition) and what behaviour is going to be in a separate module (aggregation), we just need to figure out how these modules are going to talk to each other. At this point we can use Mocks to design this collaboration. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/11-checkout-sequence-with-mocks.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

At this point we can test-drive (London style) the full implementation of `CheckoutAction` and use mocks to define the public interface of `Payments`, `Orders`, and `Delivery`. Their interface should be limited to the information that `CheckoutAction` needs, reducing coupling and increasing cohesion among modules. 

<center>
<img src="{{site.baseurl}}/assets/custom/img/blog/2018-10-01-mocking-as-a-design-tool/12-checkout-full-flow.png" alt=“inside-out” class="img img-fluid" style="height: 70%; width: 70%;"/>
</center>
<br/>

Once `CheckoutAction` is fully implemented, we will also have defined the public interface of all its collaborators. At this point we are ready to think about the internals of each collaborator, knowing that nothing else will be impacted. 

### Designing the collaborators (outside-in)

With three modules defined, we can now pick the first one, let's say `Payments.makePayment(...)` and explore. We can ask questions like: Shall we keep the logic for credit card, Paypal and Direct Debit isolated from each other. (Hopefully the answer would be yes). Shall we keep the fraud detection logic isolated from the payment methods? If we are storing credit card data, should he have a separate service and reduce the scope of the system which needs to be PCI compliant? Shall we have an area of the system where we decide which payment gateway we are going to use according to the location of the user? Answering these questions lead us to decide the sub-modules the `Payments` module will have and the association among them - composition or aggregation. This, as seen before, will help us decide what we mock, when we mock and where we mock. With a rough macro design in our heads (or in a piece of paper, or whiteboard drawing), we can start test driving our solution, making sure we are flexible enough to adjust our design ideas as we gain more insight through code. 

## Final words

For people used to [Outside-In TDD][1] and Design, mocking is a design tool, not a testing tool. Once we understand that, mocks become an excellent tool to drive the [macro design][8] of our applications. 

Using mock

------

Mocking as a design tool makes more sense when working with Outside-In TDD. In this TDD style we start by defining the public API of our system, that means, how our system will provide the desired behaviour to the external world. Let's assume a REST API that is defined in collaboration with the consumers of the API, just to keep the post simple and focused. Once the API is defined, we write an Acceptance Test which will test the application as a black box, sending an HTTP request and checking any side effects like JSON or HTTP codes coming back, changes in the database, or calls to other services depending on the developer's preference and behaviour of the API. This is the first test to be written and the last one to pass. 

With the acceptance test written, we then start unit testing from the outer part of our system, in this case the controller or endpoint. 

For more context on outside-in design, watch this talk on [Interaction Driven Design][4].


[TODO] - Continue

[1]: link to the block post I wrote comparing the two TDD styles
[2]: LInk to the cleancoders videos
[3]: Link to UB twitter account
[4]: Interaction drive design
[5]: Link to the explanation of an "epic"
[6]: link to the explanation of a delivery mechanism
[7]: Link to value objects or DDD building blocks
[8]: link to somewhere where I have the picture of macro design. 




