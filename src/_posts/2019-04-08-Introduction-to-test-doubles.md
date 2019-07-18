---
author: Andre Guelfi Torres
layout: post
asset-type: post
title: "Introduction to Test Doubles"
date: 2019-04-08 00:00:00
description: A introduction to test doubles and how to use them.
image: 
    src: /assets/custom/img/blog/2019-04-02-test-doubles.jpg
    thumbnail: /assets/custom/img/blog/2019-04-02-test-doubles.jpg
    alt: Console application printing to do list
abstract: What are test doubles? Where they live? What do they eat?
tags: 
- testing
- mocking
- test-doubles
---

When you are writing unit test you are faced with many kinds of collaborators and they all have very specific behaviours, knowing which test double you have to use in the right time can
make your life easier.

## Dummy

The first one is the Dummy Object, it’s the simplest one, a Dummy is just an object that you pass to satisfy a constructor, it will not have any method implemented and it shouldn’t.

When we are testing a class we don't want to do anything with the logger, so what do we do?

For example, there's this `PaymentService` that has a logger:

```java
public interface Logger {
    void append(String text);
}
```

```java
public class PaymentService {

    private Logger logger;

    public PaymentService(Logger logger) {
        this.logger = logger;
    }

    public PaymentRequest createPaymentRequest(Sale sale, CreditCard creditCard) {
        logger.append("Creating payment for sale " + sale.toString());
        throw new UnsupportedOperationException();
    }
}
```

To starting writing the test we have to satisfy the dependency of the Logger class, but the real implementation isn't good for the unit tests, the logs will probably save into a text file or send the log to somewhere else, this breaks the isolation of the test, also we don't want to check anything from the logs, they have nothing to do with the business logic that we have, so we are going to implement a Dummy for it. 

```java
public class LoggerDummy implements Logger {

    @Override
    public void append(String text) {}
}
```

Is that? There's no code inside the Dummy. For this case we don't need any kind of implementation inside, and we are ready to write the test.

```java
class PaymentServiceShould {

    @Test
    void create_payment_request() {
        LoggerDummy loggerDummy = new LoggerDummy();
        Customer customer= new Customer("name", "address");
        Item item = new Item("item", 1000);
        List<Item> items= asList(item);
        Sale sale = new Sale(customer, items);
        CreditCard creditCard = new CreditCard(customer, "1");

        PaymentService paymentService = new PaymentService(loggerDummy);
        PaymentRequest actual = paymentService.createPaymentRequest(sale, creditCard);
        assertEquals(new PaymentRequest(1000, "1"), actual);
    }
}
```

## Stubs

Stubs are a bit more complex, they provide canned answers for our calls, they still don’t have any logic but they will not throw an error, instead they return a pre-defined value.

When you are testing, you will want for your tests to be deterministic and repeatable, so they will not stop working after some time because of a change in a collaborator.

Now the `PaymentRequest` has to contain the credit card operator fee, the rate of this fee is defined by the credit card operator, which is defined by the first four digits of the card.To implement this you have to create a stub and add the necessary changes to the `PaymentService`. The first step would be implementing the interface that we need for our stub and production code, this is the part that you do some design upfront, thinking about what should be the parameters in your stub and what should be returned, don't think about the internal implementation, but the contract that you have with that collaborator: 

```java
public interface OperatorRate {
    int feeRate(String operator)
}
```

With the interface defined we can start to write the stub: 

```java
public class OperatorRateStub implements OperatorRate {
    private int rate;

    public OperatorRateStub(int rate){

        this.rate = rate;
    }
    @Override
    public int feeRate(String operator) {
        return rate;
    }
}
```

The stub will always return the value that is passed in the constructor and we have full control of the stub and it's completely isolated from the production code. Now, the test code is implemented

```java
@Test
void create_payment_request() {
    LoggerDummy loggerDummy = new LoggerDummy();
    Customer customer= new Customer("name", "address");
    Item item = new Item("item", 1000);
    List<Item> items= asList(item);
    Sale sale = new Sale(customer, items);
    CreditCard creditCard = new CreditCard(customer, "1");

    OperatorRate operatorRate = new OperatorRateStub(10);
    PaymentService paymentService = new PaymentService(loggerDummy, operatorRate);
    PaymentRequest actual = paymentService.createPaymentRequest(sale, creditCard);
    assertEquals(new PaymentRequest(1000, "1", 100), actual);
}
```

## Mocks

Mocks are objects that you can say what they are expecting to receive. They are used to verify the behaviour between the System Under Test and its collaborators.

You set your expectations, call the method of the SUT and verify if the method was called at the end.

Moving forward with our system that we are maintaining, there’s a new User Story for us to complete, the customer wants that for every `PaymentRequest` over 1000 pound an email is sent to the administration. There are two reasons for isolating the email sending:

- Sending emails is an activity that talk to the outside world, we can’t have a email sent every time we run our tests, this would slow down the tests and would be really annoying.
- The `PaymentService` should not be aware of the implementation of the email sender, mixing those two things would create coupling and making it harder to maintain the service or to change how we send emails, that’s why the email sender gets a service by itself.

The steps to that we need to follow are:

- Create an interface
- Create a mock implementing the interface
- Write our test

The interface:

```java
public interface PaymentEmailSender {
    void send(PaymentRequest paymentRequest);
}
```

Then we have to implement our mock:

```java
public class PaymentServiceMock implements PaymentEmailSender {

    private List<PaymentRequest> paymentRequestSent = new ArrayList<>();
    private List<PaymentRequest> expectedPaymentRequest = new ArrayList<>();

    @Override
    public void send(PaymentRequest paymentRequest) {
        paymentRequestSent.add(paymentRequest);
    }

    public void expect(PaymentRequest paymentRequest) {
        expectedPaymentRequest.add(paymentRequest);
    }

    public void verify() {
        assertEquals(paymentRequestSent, expectedPaymentRequest);
    }
}
```

This is a very simple mock object, but it will do the work, we implement the interface that we just created, and we make the `send` method store the `PaymentRequest` and we add two methods to setup the mock, `expect` and `verify`, the `verify` method uses jUnit `assertEqual` method to compare the expected value to the one passed by the SUT.

We write the test for the new user story:

```java
@Test
void send_email_to_the_administration_if_sale_is_over_1000() {
    EmailSenderMock emailSender = new EmailSenderMock();
    LoggerDummy loggerDummy = new LoggerDummy();
    OperatorRate operatorRate = new OperatorRateStub(10);
    PaymentService paymentService = new PaymentService(loggerDummy, operatorRate, emailSender);
        PaymentRequest paymentRequest = new PaymentRequest(1000, "1", 100);
    Customer customer= new Customer("name", "address");
    Item item = new Item("item", 1000);
    List<Item> items = asList(item);
    Sale sale = new Sale(customer, items);
    CreditCard creditCard = new CreditCard(customer, "1");

    paymentService.createPaymentRequest(sale, creditCard);

    emailSender.expect(paymentRequest);
    emailSender.verify();
}
```

and the result of the test is:

```
org.opentest4j.AssertionFailedError: 
Expected :[]
Actual   :[PaymentRequest{total=2500, cardNumber='1234123412341234', gatewayFee=250}]
```

Then we move to implement the production code:

```java
    public class PaymentService {
    
        private Logger logger;
        private OperatorRate operatorRate;
        private final EmailSender emailSender;
    
        public PaymentService(Logger logger, OperatorRate operatorRate, EmailSender emailSender) {
            this.logger = logger;
            this.operatorRate = operatorRate;
            this.emailSender = emailSender;
        }
    
        public PaymentRequest createPaymentRequest(Sale sale, CreditCard creditCard) {
            logger.append("Creating payment for sale: " + sale);
    
            int feeRate = operatorRate.feeRate(creditCard.cardNumber);
            int fee = (feeRate * sale.total()) / 100;
    
            PaymentRequest paymentRequest = new PaymentRequest(sale.total(), creditCard.cardNumber, fee);
    
            if (sale.total() >= 1000) {
                emailSender.send(paymentRequest);
            }
            return paymentRequest;
        }
    }
```

Tests passing and we are done with our story.

## Spy

Think of a spy like someone that it’s infiltrated in your SUT and is recording his every move, just like a movie spy. Unlike mocks, the spy is silent, its up to you to assert based on the data that he provides.

You use spies when you are not really sure about what your SUT will call from your collaborator, so you record everything and assert if the spy called the desired data.

For this example we can use the same interface that we created for the mock and implement a new test with our spy.

```java
public class PaymentEmailSpy implements PaymentEmailSender {

    private List<PaymentRequest> paymentRequests = new ArrayList<>();

    @Override
    public void send(PaymentRequest paymentRequest) {
        paymentRequests.add(paymentRequest);
    }

    public int timesCalled() {
        return paymentRequests.size();
    }

    public boolean calledWith(PaymentRequest paymentRequest) {
        return paymentRequests.contains(paymentRequest);
    }
}
```

The implementation of the `Spy` is close to the mock, but instead of giving the calls that we are expecting we just record the behaviour of the class, then we go for the test and we can assert what we need there.

```java
class PaymentServiceShould {

    private OperatorRate operatorRate;
    private EmailSenderMock emailSender;
    private PaymentService paymentService;
    private LoggerDummy loggerDummy;
    public static final Customer BOB = new Customer("Bob", "address");
    public static final Item IPHONE = new Item("iPhone X", 1000);
    public static final CreditCard BOB_CREDIT_CARD = new CreditCard(BOB, "1");

    @BeforeEach
    void setUp() {
        loggerDummy = new LoggerDummy();
        operatorRate = new OperatorRateStub(10);
        emailSender = new EmailSenderMock();
        paymentService = new PaymentService(loggerDummy, operatorRate, emailSender);
    }

    
    @Test
    void not_send_email_for_sales_under_1000() {
        Item iphoneCharger = new Item("iPhone Charger", 50);
        Sale sale = new Sale(BOB, asList(iphoneCharger));
        EmailSenderSpy emailSpy = new EmailSenderSpy();
        PaymentService spiedPaymentService = new PaymentService(loggerDummy, operatorRate, emailSpy);

        spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

        assertEquals(0, emailSpy.timesCalled());
    }
}
```

## Fakes

We create a `PaymentService` with the spy, make the necessary calls and then we can assert based on the data provided by the spy.

Fakes are different from all the other examples that we had, instead of canned responses or just recording calls, they have a simplified version of the business logic.

An example of a Fake would be a InMemory repository where we have the logic to store, retrieve and even do some queries, but it won’t have a real database behind, in fact everything can be stored in a list, or you can fake a external service like an API. 

In this case we could create a fake to simulate the API that connects to the payment gateway and use to test our production implementation of the `OperatorRate`. 

In this case our production implementation will send a Json to the gateway with the credit card operator and will receive a Json back with the rate, then will do the proper parsing and the return the value that is in the Json.

So we start writing the test for `CreditCardRate` class that implements the `OperatorRate`

```java
public class CreditCardRateShould {

    @Test
    void return_rate_for_credit_card_payment() {
        PaymentGateway fakeCreditCardGateway = new FakeCreditCardGateway();
        CreditCardRate creditCardRate = new CreditCardRate(fakeCreditCardGateway);
        String operator = "1234123412341234";

        int result = creditCardRate.feeRate(operator);

        assertEquals(10, result);
    }
}
```

The class that is being tested talks to a external service, this service is faked by `FakeCreditCardGateway`. 

The fake Gateway is parsing Json and applying some really simple logic and returning another Json. 

```java
public class FakeCreditCardGateway implements PaymentGateway {
    @Override
    public String rateFor(String cardOperator) {
        String operator = parseJson(cardOperator);

        int rate = 15;

        if (operator.startsWith("1234")) {
            rate = 10;
        }

        if (operator.startsWith("1235")) {
            rate = 8;
        }

        return jsonFor(rate);
    }

    private String jsonFor(int rate) {
        return new JsonObject()
                .add("rate", rate)
                .toString();
    }

    private String parseJson(String cardOperator) {
        JsonObject payload = Json.parse(cardOperator).asObject();
        return payload.getString("operator", "");
    }
}
```

and finally there is the production code for the `CreditCardRate` class

```java
public class CreditCardRate implements OperatorRate {
    private PaymentGateway paymentGateway;

    public CreditCardRate(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    @Override
    public int feeRate(String operator) {

        String payload = jsonFor(operator);

        String rateJson = paymentGateway.rateFor(payload);

        return parse(rateJson);
    }

    private int parse(String rateJson) {
        return Json.parse(rateJson).asObject()
                .getInt("rate", 0);
    }

    private String jsonFor(String operator) {
        return new JsonObject()
                .add("operator", operator)
                .toString();
    }
}
```

With this fake we can test if the Json that we are sending to the gateway is right, have some logic so the fake gateway can answer different rates, and finally we can test if we are parsing the response Json properly. 

This is a very ad-hoc implementation without having to deal with an HTTP request, but we can have an idea of how this would translate to the real world. If you want to write integration tests make real HTTP calls you can take a look into things like [WireMock](http://wiremock.org/), and [mockingjay-server](https://github.com/quii/mockingjay-server).

## Mockito and the duck syndrome

Not only Mockito but most mocking frameworks have this duck syndrome where they can do multiple things, a duck can swim, fly, and walk. Those frameworks works has dummies, mocks, spies and stubs.

So how we know what we are using when mocking with a framework? To help with that we are going to use the tests that were written with the manual test doubles and refactor them to use Mockito.

```java
class PaymentServiceShould {

    private OperatorRate operatorRate;
    private EmailSenderMock emailSender;
    private PaymentService paymentService;
    private LoggerDummy loggerDummy;
    public static final Customer BOB = new Customer("Bob", "address");
    public static final Item IPHONE = new Item("iPhone X", 1000);
    public static final CreditCard BOB_CREDIT_CARD = new CreditCard(BOB, "1");

    @BeforeEach
    void setUp() {
        loggerDummy = new LoggerDummy();
        operatorRate = new OperatorRateStub(10);
        emailSender = new EmailSenderMock();
        paymentService = new PaymentService(loggerDummy, operatorRate, emailSender);
    }

    @Test
    void create_payment_request() {
        Sale sale = new Sale(BOB, asList(IPHONE));

        PaymentRequest actual = paymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

        assertEquals(new PaymentRequest(1000, "1", 100), actual);
    }

    @Test
    void send_email_to_the_administration_if_sale_is_over_1000() {
        Sale sale = new Sale(BOB, asList(IPHONE));

        paymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

        emailSender.expect(new PaymentRequest(1000, "1", 100));
        emailSender.verify();
    }

    @Test
    void not_send_email_for_sales_under_1000() {
        Item iphoneCharger = new Item("iPhone Charger", 50);
        Sale sale = new Sale(BOB, asList(iphoneCharger));
        EmailSenderSpy emailSpy = new EmailSenderSpy();
        PaymentService spiedPaymentService = new PaymentService(loggerDummy, operatorRate, emailSpy);

        spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

        assertEquals(0, emailSpy.timesCalled());
    }

    @Test
    void send_email_to_hmrs_for_sales_over_10_thousand() {
        Item reallyExpensiveThing = new Item("iPhone Charger", 50000);
        Sale sale = new Sale(BOB, asList(reallyExpensiveThing));
        EmailSenderSpy emailSpy = new EmailSenderSpy();
        PaymentService spiedPaymentService = new PaymentService(loggerDummy, operatorRate, emailSpy);

        spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

        assertEquals(2, emailSpy.timesCalled());
    }
}
```

### Dummy

When you create a Mockito mock the object is a Dummy, it don't have any behaviour attached, so we can start refactoring the tests and change the `LoggerDummy` to use a Mockito object. 

```diff
    class PaymentServiceShould {

        private OperatorRate operatorRate;
        private EmailSenderMock emailSender;
        private PaymentService paymentService;
-    private LoggerDummy loggerDummy;
+    private Logger logger;
        public static final Customer BOB = new Customer("Bob", "address");
        public static final Item IPHONE = new Item("iPhone X", 1000);
        public static final CreditCard BOB_CREDIT_CARD = new CreditCard(BOB, "1");

        @BeforeEach
        void setUp() {
-        loggerDummy = new LoggerDummy();
+        logger = mock(Logger.class);
            operatorRate = new OperatorRateStub(10);
            emailSender = new EmailSenderMock();
-        paymentService = new PaymentService(loggerDummy, operatorRate, emailSender);
+        paymentService = new PaymentService(logger, operatorRate, emailSender);
        }

        @Test
@@ -48,7 +49,7 @@ class PaymentServiceShould {
            Item iphoneCharger = new Item("iPhone Charger", 50);
            Sale sale = new Sale(BOB, asList(iphoneCharger));
            EmailSenderSpy emailSpy = new EmailSenderSpy();
-        PaymentService spiedPaymentService = new PaymentService(loggerDummy, operatorRate, emailSpy);
+        PaymentService spiedPaymentService = new PaymentService(logger, operatorRate, emailSpy);

            spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

@@ -60,7 +61,7 @@ class PaymentServiceShould {
            Item reallyExpensiveThing = new Item("iPhone Charger", 50000);
            Sale sale = new Sale(BOB, asList(reallyExpensiveThing));
            EmailSenderSpy emailSpy = new EmailSenderSpy();
-        PaymentService spiedPaymentService = new PaymentService(loggerDummy, operatorRate, emailSpy);
+        PaymentService spiedPaymentService = new PaymentService(logger, operatorRate, emailSpy);

            spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);
```

All tests are passing and we don't have to use the `LoggerDummy` implementation that we had. 

### Stubs

Now we have to start to give some behaviour to our mocks, and following the same order from our manual test doubles, we have to transform the Mockito object into a stub, for that Mockito has the `given()` method where we can set a value to be returned.

For primitives Mockito returns 0, null for Objects, and a empty collection for collections like List, Map, or Set.

The `given()` works in the following way:

```java
given(<method to be called>).willReturn(returnValue);
```

and we change the implementation in our tests. 

```diff
    import static java.util.Arrays.asList;
    import static org.junit.jupiter.api.Assertions.assertEquals;
+import static org.mockito.ArgumentMatchers.anyString;
+import static org.mockito.BDDMockito.given;
    import static org.mockito.Mockito.mock;

@@ -20,9 +22,10 @@ class PaymentServiceShould {
        @BeforeEach
        void setUp() {
            logger = mock(Logger.class);
-        operatorRate = new OperatorRateStub(10);
+        operatorRate = mock(OperatorRate.class);
            emailSender = new EmailSenderMock();
            paymentService = new PaymentService(logger, operatorRate, emailSender);
+        given(operatorRate.feeRate(BOB_CREDIT_CARD.cardNumber)).willReturn(10);
    }
```

Now the mock is acting like a stub and the tests are passing. 

### Mocks and Spies

In the previous test that we created, we are still using the `PaymentEmailMock` that we created, now we can change that for the one in Mockito. 

```diff
@@ -8,11 +8,12 @@ import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.mockito.ArgumentMatchers.anyString;
    import static org.mockito.BDDMockito.given;
    import static org.mockito.Mockito.mock;
+import static org.mockito.Mockito.verify;

    class PaymentServiceShould {

        private OperatorRate operatorRate;
-    private EmailSenderMock emailSender;
+    private EmailSender emailSender;
        private PaymentService paymentService;
        private Logger logger;
        public static final Customer BOB = new Customer("Bob", "address");
@@ -23,7 +24,7 @@ class PaymentServiceShould {
        void setUp() {
            logger = mock(Logger.class);
            operatorRate = mock(OperatorRate.class);
-        emailSender = new EmailSenderMock();
+        emailSender = mock(EmailSender.class);
            paymentService = new PaymentService(logger, operatorRate, emailSender);
            given(operatorRate.feeRate(BOB_CREDIT_CARD.cardNumber)).willReturn(10);
        }
@@ -43,8 +44,8 @@ class PaymentServiceShould {

            paymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

-        emailSender.expect(new PaymentRequest(1000, "1", 100));
-        emailSender.verify();
+        PaymentRequest paymentRequest = new PaymentRequest(1000, "1", 100);
+        verify(emailSender).send(paymentRequest);
        }
```

All tests are passing, that’s great, but there’s a difference between the stub from Mockito and the one that we created. This time we didn’t have to specify what we were expect, we went straight to the verify step. That’s Mockito taking multiple roles again, a mock created by Mockito will record all the received calls like a Spy.

We still have the tests that are using the spy, we can change the tests to only use mockito.

```diff
class PaymentServiceShould {
        void not_send_email_for_sales_under_1000() {
            Item iphoneCharger = new Item("iPhone Charger", 50);
            Sale sale = new Sale(BOB, asList(iphoneCharger));
-        EmailSenderSpy emailSpy = new EmailSenderSpy();
-        PaymentService spiedPaymentService = new PaymentService(logger, operatorRate, emailSpy);

-        spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);
+        paymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

-        assertEquals(0, emailSpy.timesCalled());
+        verify(emailSender, never()).send(any(PaymentRequest.class));
        }

        @Test
        void send_email_to_hmrs_for_sales_over_10_thousand() {
            Item reallyExpensiveThing = new Item("iPhone Charger", 50000);
            Sale sale = new Sale(BOB, asList(reallyExpensiveThing));
-        EmailSenderSpy emailSpy = new EmailSenderSpy();
-        PaymentService spiedPaymentService = new PaymentService(logger, operatorRate, emailSpy);

-        spiedPaymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);
+        paymentService.createPaymentRequest(sale, BOB_CREDIT_CARD);

-        assertEquals(2, emailSpy.timesCalled());
+        PaymentRequest paymentRequest = new PaymentRequest(50000, "1", 5000);
+        verify(emailSender, times(2)).send(paymentRequest);
        }
    }
```

`verify` has multiple modifiers like:

- `atLeast(int)`
- `atLeastOnce()`
- `atMost(int)`
- `times(int)`

Again we have the mock object having multiple function, this time has a Mock and a Spy.

### What about Fakes?

Fakes are objects with logic inside, we can’t have them using Mockito, but that’s not a problem, for most cases you will not need a Fake, usually Fakes tend to grow and you will end having tests to see if your Fake is behaving correctly.

As Uncle Bob says is his post “The Little Mocker”:

> Yes, Hmmm. I don’t often write fakes. Indeed, I haven’t written one for over thirty years.

## Good Practices and smells.

### CQS, Stubs and Mocks

If you are not familiar with CQS go ahead and read those:

[OO Tricks: The Art of Command Query Separation](https://hackernoon.com/oo-tricks-the-art-of-command-query-separation-9343e50a3de0)

[bliki: CommandQuerySeparation](https://martinfowler.com/bliki/CommandQuerySeparation.html)

A good rule of thumb for deciding where to use stubs and mocks is to follow the Command Query Separation principle, where you have:

Commands

- They don’t have return values
- Used to mutate data inside your class.
- Use `verify()` when mocking with Mockito.

Queries 

- Is to query data from the class
- Don’t create any side effect
- Just returns data.
- Use `given()` when mocking with Mockito

### Only Mock/Stub classes you own

One thing that we have to understand about mocking, is that isn’t only about testing, but about designing how our SUT works with its collaborators, it’s going to be hard to find an application where you will not use a third party library, but this doesn’t mean that you have to mock them, in fact you should never do that. The main thing of mocking third party libraries is that you are subject of their changes, a change of signature would break all your tests mocking that.

The solution? Writing a thin wrapper around that library, using mocking tools you can design a thin wrapper that receives and return only the necessary information, but how do we test our wrappers?

In this case the wrappers can be tested depending the dependency that you have, if you have a wrapper for a database layer you can have integration tests in another source set, so you can run your unit tests without having to worry about the integration tests slowing you down.

### Don't mock data structures.

When you have your own data structures you don't have to mock it, you can simply instantiate with the data that you need, case the data structure is hard to instantiate or you need multiple objects you can use the Builder pattern. 

You can learn about the Builder pattern [here](https://refactoring.guru/design-patterns/builder).

### Make your tests minimalists

When testing with mock objects it’s important to not make your tests too brittle, it’s important that you can refactor your code base without your tests being an annoyance, if something like this is happening you might have over-specified things to check with your mocks, and if this happens in multiple tests it ends up slowing the development. The solution is to re-examine the code and see if the specification or code has to be changed.

Imagine that instead of using a Dummy for the logger in the example at the beginning a mock were used. Then the mock would be verifying all the messages that the logger pass and changing anything would break the test. No one wants to have their tests breaking just because they fixed a typo in the logs. 

### Don’t use mocks/stubs to test boundary/isolated objects

Objects that don’t have collaborators don’t have to be tested with mock objects, an object like that just need assertions in the values that returns or that are stored. Sounds a bit obvious, but it’s good to reinforce that. 

For a dependency like a JSON parser you can test the wrapper with the real dependency working. You can see this in action in the example for the Fake, instead of mocking the Json library, the real one was used, something like a wrapper to do the conversion could be used, then we would have to test the wrapper with the real Json library and see if the json created is right, in this case we would never mock that dependency. 

### Don’t add behaviour

Mocks are test doubles, and you should not be adding complexity to your test doubles, you have fakes that contain some logic, but besides that, none of the test double should contain logic, this is a symptom that you misplaced responsibilities. 

An example of this problem would be a mock that returns another mock, if you have something like a service that returns another service you might want to take a second look at the design of your application. 

### Only mock/stub your immediate neighbours

A complex object that might have multiple dependencies might be hard to test, and one symptom that we can see from this is that the setup for the test is complex, and the test is also hard to read. Unit tests should be focused to test one thing at the time and should only set expectations for their neighbours (think of Law of Demeter). You might have to introduce a role to bridge the object and its surroundings.

### Too Many mocks/stubs

Your SUT might have multiple collaborators, and your tests start to get more complex to set up and hard to read, like in the other situations that we saw, the SUT might have too many responsibilities, to solve that you would have to break your object into smaller ones more focused. 

So if you have a service with multiple classes in the constructor like:

```java
public ReadCommand(UserRepository userRepository, MessageRepository messageRepository, 
                    MessageFormatter messageFormatter, Console console, String username) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
    this.messageFormatter = messageFormatter;
    this.console = console;
    this.username = username;
}
```

You can refactor this to become:

```java
public ReadCommand(UserRepository userRepository, MessageRepository messageRepository, 
                                        MessagePrinter messagePrinter, String username) {
    this.userRepository = userRepository;
    this.messageRepository = messageRepository;
    this.messagePrinter = messagePrinter;
    this.username = username;
}
```

Now the `MessagePrinter` has the `MessageFormatter` and the `Console` working together, so when you test the `ReadCommand` class you just have to verify if the method to print was called.