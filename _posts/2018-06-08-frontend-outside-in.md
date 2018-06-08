---
layout: post
asset-type: post
name: frontend-outside-in
title: Is it possible to TDD on front-end outside-in?
date: 2018-06-08 12:10:00 +00:00
author: Nacho García
description: 
image:
   src: /assets/custom/img/blog/2018-05-26-should-we-always-use-TDD-to-design/fractal.jpg
tags:
- craftsmanship
- software design
- TDD
- outside-in
- frontend
---
Traditionally there have not been that many good practices in front end development:
You just made the Jquery work and if you were lucky you used selenium to automate the tests from a user perspective.

Which led to this

An inverted testing pyramid, which gives slow feedback (I'm looking at you, 8h test battery) alongside [many other issues](https://martinfowler.com/bliki/TestPyramid.html)

Latest frameworks (react, vue, angular...) are encouraging unit testing and people are embracing the power it provides.
But we still have some way to go to be as mature as backend development is.

## How is it currently tested
In the best case, probably you have:
 * Mounted (shallow rather) individual components, without their dependencies nor children and test their behaviour
 * Tested your functions separately: actions, reducers, services, store...

If you are doing TDD, of course you will have done that writing every test first, right?

Well, you have done a classicist approach, which is completely fine.

But probably testing the correctness of the system is left to the e2e tests, making the top of the testing pyramid (ref) painfully big (and slow), when at that point you shouldn't be testing for accuracy.

## What we're going to do
Either for the sake of being able to do outside-in or to be able to leave the e2e to test browser integration and some happy paths instead of everything.

These are going to be our next steps:
 1. Create a brand new app with 1 use case
 2. Mock our APIs
 3. Mount our whole application
 4. Start testing our acceptance criteria
 5. Drive our design from that test, creating unit tests and implementing components
 6. Enjoy the robustness and speed of our tests 

If you want to see already the final solution, it is in [this repository]()

### Create App
This is our acceptance criteria
> Given I am in the hope page

> When I click on a button which says 'What did Chuck Norris said?'

> Then some random phrase from Chuck Norris will show

We have joined with our backend folks and we have come up with an API definition. This contract will go to a mock server for development purposes.

In this case, we're going to create a React app using [Create react app](https://github.com/facebook/create-react-app).
Of course this could have been any other framework, the methodology remains the same.

### Mock APIs
We're going to stub our API so it returns a fixture with the example in our contract.
We don't want to test the correctness of our system alongside backend: That will be done in e2e tests and it would make this tests much more fragile with almost no benefit.

If you are consuming a 3rd party and you're worried about the contract changing, make a contract test.

If the contract is owned by your team, just don't break it ;).

In this step we might as well decide how we're doing to do our requests. In this case we will use [axios]()

----------snippet of mountApp------------

### Mount application
flushpromises -> https://github.com/facebook/jest/issues/2157
### Test our acceptance criteria

### Outside-in TDD

### Enjoy our app
API -> http://www.icndb.com/api/