---
layout: post
asset-type: post
name: seven-testing-sins
title: Seven Testing Sins and How To Avoid Them
date: 2019-08-08 00:05:00 +00:00
author: Sam Davies
description: Seven testing mistakes and how to avoid them by writing readable test code
image:
   src: /assets/custom/img/blog/
tags:
- codurance
---

# Seven Testing Sins and How To Avoid Them
Within this article I will be using Java within code snippets, whilst also using [JUnit](https://junit.org/junit5/) and
[Mockito](https://site.mockito.org).

This article aims to provide examples of test code which can be:

- hard to read
- difficult to maintain

Following these examples the article will attempt to offer alternatives, which can be used to enhance the readability of your 
tests, which in turn will help to make them easier to maintain in the future.

Creating good examples is challenging and so as a reader I encourage you to use the examples simply as a tool to
appreciate the underlying message of this article, which is to strive for readable test code.

## Generic test names
You might have seen tests named like the below

```java
@Test
void testTranslator() {
    String word = new Translator().wordFrom(1);
    
    assertThat(word, is("one"));
}
```

Now this is very generic and does not inform the reader of the code what the test is **actually** testing. The 
`Translator` could have multiple methods, how do we know which one we are exercising in the tests? It is not very clear
by looking at the test name, which means we have to look inside the test itself to see. 

We can do much better than this, and so we can see the below:

```java
@Test
void translate_from_number_to_word() {
    String word = new Translator().wordFrom(1);
    
    assertThat(word, is("one"));
}
```

As we can see from the above, it does a better job of explaining what this test is actually doing. In addition, if you
name your test file something like `TranslatorShould` you can form a reasonable sentence in your mind when you combine
the test file and the individual test name: `Translator should translate from number to word`.

## Mutation in test setup
It is very likely within tests you will have a desire to construct objects used within a test to be in a certain state.
There are different ways of doing this, the below shows one such way. In this snippet we are deciding whether a 
character is in fact "Luke Skywalker", based on information contained in that object (imagine this is what the `isLuke()`
method does):

```java
@Test
void inform_when_character_is_luke_skywalker() {
    StarWarsTrivia trivia = new StarWarsTrivia();
    Character luke = new Character();
    luke.setName("Luke Skywalker");
    Character vader = new Character();
    vader.setName("Darth Vader");
    luke.setFather(vader);
    luke.setProfession(PROFESSION.JEDI);
    
    boolean isLuke = trivia.isLuke(luke);

    assertTrue(isLuke);
}
```

The above constructs a `Character` object to represent "Luke Skywalker", what happens after involves a mutation of
considerable proportions. It continues to set the name, parental status and profession on the subsequent lines. This is
of course ignoring a similar thing happening with our friend "Darth Vader".

This level of mutation **distracts** from what is happening in the test. If we revisit my earlier sentence for a second:

    It is very likely within tests you will have a desire to construct objects used within a test to be in a certain state
However, what is happening in the above test is actually two stages:

- Construct objects
- Mutate them to be in a certain state

This is unnecessary and we can avoid it. One might suggest that to avoid the mutation we can simply transplant
everything and dump it in the constructor, ensuring that we construct objects in a given state, avoiding mutation:

```java
@Test
void inform_when_character_is_luke_skywalker() {
    StarWarsTrivia trivia = new StarWarsTrivia();
    Character vader = new Character("Darth Vader");
    Character luke = new Character("Luke Skywalker", vader, PROFESSION.JEDI);
    
    boolean isLuke = trivia.isLuke(luke);

    assertTrue(isLuke);
}
```

As we can see from the above, we have reduced the number of lines of code, as well as the mutation of objects. However,
in the process we have lost the meaning of what the - now parameters of `Character` - represent in the test. In order
for the `isLuke()` method to return true the `Character` object we pass in must have the following:
- Name of "Luke Skywalker"
- Have a father named "Darth Vader"
- Be a Jedi

However, this is not clear from the test that this is the case, we would have to inspect the internals of `Character` to
know what those parameters are for (or your IDE would tell you).

We can do a bit better than this, we can utilise the Builder pattern to construct a `Character` object in a desired
state, whilst also maintaining readability within the test:

```java
@Test
void inform_when_character_is_luke_skywalker() {
    StarWarsTrivia trivia = new StarWarsTrivia();
    Character luke = CharacterBuilder().aCharacter()
        .withNameOf("Luke Skywalker")
        .sonOf(new Character("Darth Vader"))
        .employedAsA(PROFESSION.JEDI)
        .build();
    
    boolean isLuke = trivia.isLuke(luke);

    assertTrue(isLuke);
}
```

With the above there might be a few more lines, but it attempts to explain what is important within the test.

## Assertion madness
During testing you are going to assert/verify something has happened in your system (commonly located near the end of 
each test). This is a very important step within the test, and it could be tempting to add a number of assertions, 
asserting values of a returned object for example.

```java
@Test
void successfully_upgrades_user() {
    UserService service = new UserService();
    User someBasicUser = UserBuilder.aUser()
        .withName("Basic Bob")
        .withAge(23)
        .withTypeOf(UserType.BASIC)
        .build();

    User upgradedUser = service.upgrade(someBasicUser);
    
    assertThat(upgradedUser.name(), is("Basic Bob"));
    assertThat(upgradedUser.type(), is(UserType.SUPER_USER));
    assertThat(upgradedUser.age(), is(23));
}
```

(in the above example I have additional information to the builders, such as name and age, however you would not
ordinarily include this if it was not significant to the test, use sensible default values in your builders instead)

As we can see there are three assertions, in more extreme examples we are talking about tens of lines of assertions.
We don't necessarily need to do three assertions, sometimes we can do it in one:

```java
@Test
void successfully_upgrades_user() {
    UserService service = new UserService();
    User someBasicUser = UserBuilder.aUser()
        .withName("Basic Bob")
        .withAge(23)
        .withTypeOf(UserType.BASIC)
        .build();

    User expectedUserAfterUpgrading = UserBuilder.aUser()
        .withName("Basic Bob")
        .withAge(23)
        .withTypeOf(UserType.SUPER_USER)
        .build();


    User upgradedUser = service.upgrade(someBasicUser);
    
    assertThat(upgradedUser, is(expectedUserAfterUpgrading));
}
```

Now we are comparing the user that is upgraded against what we expect the object to look like after being upgraded. In
order to do this you will need the object being compared (`User`) to have overridden `equals` and `hashCode`.

## Magic values
Have you ever looked at a number or a string and wondered what it represents? I have and those precious seconds of
having to parse lines of code can start to add up quickly. We have an example of such code below.

```java
@Test
void denies_entry_for_someone_who_is_not_old_enough() {
    Person youngPerson = PersonBuilder.aPerson()
        .withAgeOf(17)
        .build();
        
    NightclubService service = new NightclubService(21);
    
    String decision = service.entryDecisionFor(youngPerson);
    
    assertThat(decision, is("No entry. They are not old enough."));
}
```

Reading the above you might have a few questions, such as:
- what does the `17` mean?
- what does the `21` mean in the constructor?

Wouldn't it be nice if we could denote to readers of the code what they mean, so they don't have to think as much?
Fortunately we can:

```java
private static final int SEVENTEEN_YEARS = 17;
private static final int MINIMUM_AGE_FOR_ENTRY = 21;
private static final String NO_ENTRY_MESSAGE = "No entry. They are not old enough.";

@Test
void denies_entry_for_someone_who_is_not_old_enough() {
    Person youngPerson = PersonBuilder.aPerson()
        .withAgeOf(SEVENTEEN_YEARS)
        .build();
        
    NightclubService service = new NightclubService(MINIMUM_AGE_FOR_ENTRY);
    
    String decision = service.entryDecisionFor(youngPerson);
    
    assertThat(decision, is(NO_ENTRY_MESSAGE));
}
```

Now when we look at the above we know that:
- `SEVENTEEN_YEARS` is the value used to represent 17 years, we have left no doubt in the reader's mind. It is not seconds
or minutes, it is years.
- `MINIMUM_AGE_FOR_ENTRY` is the value for which someone has to be to be allowed to enter the nightclub. The reader
should not even have to care what this value is, just to understand what it means in the context of the test.
- `NO_ENTRY_MESSAGE` is the value that is returned to denote that someone is not permitted to enter the nightclub. By
nature strings often have a better chance of being descriptive, however always review your code to identify areas where
it could be improved.

The key here is to reduce the time readers of your code need to spend attempting to parse lines of code.

## Hard to read test names

```java
@Test
void testingNumberOneAndNumberTwoCanBeAddedTogetherToProduceNumberThree() {
    ...
}
```

How long did it take you to read the above? Was it easy to read, could you understand what is being tested here at a
quick glance, or would you need to parse many characters?

Fortunately we can attempt to name our tests in a nicer way, by reducing them to what they are really testing, removing
the waffle that is tempting to add:

```java
@Test
void twoNumbersCanBeAdded() {
    ...
}
```

Does it read slightly nicer? We have reduced the amount of words here, it is easier to parse. What if we could take this
a step further and ask if we can move away from the use of camel case:

```java
@Test
void two_numbers_can_be_added() {
    ...
}
```

This is a matter of preference, and should be agreed by those who contribute to a given codebase. Using snake case
(as above) can help to improve the readability of test names, as you are more than likely aiming to emulate a written
sentence. Therefore, the use of snake case closely follows physical spaces present in a normal written sentence.
However, Java does not allow spaces in method names and it is the best we have, short of using something like Spock.

## Setters for dependency injection
Often for testing you want to be able to inject dependencies for a given object (also known as "collaborating objects"
or simply "collaborators"). You might have seen something like the below in order to achieve this:

```java
@Test
void save_a_product() {
    ProductService service = new ProductService();
    TestableProductRepository repository = mock(TestableProductRepository.class);
    service.setRepository(repository);
    Product newProduct = new Product("some product");

    service.addProduct(newProduct);
    
    verify(repository).save(newProduct);
}
```

The above uses a setter method, namely `setRepository()` in order to inject a mock of `TestableProductRepository`, so we
can verify the correct collaboration has happened between the service and the repository.

Similar to the point around mutation, here we are mutating the `ProductService` instead of constructing the object in a
desired state. This can be avoided by injecting the collaborator in the constructor:

```java
@Test
void save_a_product() {
    TestableProductRepository repository = mock(TestableProductRepository.class);
    ProductService service = new ProductService(repository);
    Product newProduct = new Product("some product");

    service.addProduct(newProduct);
    
    verify(repository).save(newProduct);
}
```

So now we have injected the collaborator in the constructor, we now know upon construction what state the object will be
in. However, you might be asking "have we not lost some context in the process?".

We have gone from

```java
service.setRepository(repository);
```

to

```java
ProductService service = new ProductService(repository);
```

The former was more descriptive. Therefore, if you do not like this loss of context then you can opt for something like
a builder and create the below instead:

```java
@Test
void save_a_product() {
    TestableProductRepository repository = mock(TestableProductRepository.class);
    ProductService service = ProductServiceBuilder.aProductService()
                                .withRepository(repository)
                                .build();
    Product newProduct = new Product("some product");

    service.addProduct(newProduct);
    
    verify(repository).save(newProduct);
}
```

This solution has enabled us to avoid mutating the `ProductService` whilst documenting the injection of a collaborator
via the `withRepository()` method.

## Non-descriptive verifications
As mentioned previously your tests will often contain verification statements. Instead of rolling your own you will
often utilise a library to do this. However, you have to be careful not to mask the intent of your verifications. To
get an idea of what I am talking about, take a look at the following example.

```java
@Test
void no_error_is_shown_when_user_is_valid() {
    UIComponent component = mock(UIComponent.class);
    User user = mock(User.class);
    when(user.isValid()).thenReturn(true);
    LoginController controller = new LoginController();

    controller.attemptLogin(component, user);
    
    verifyZeroInteractions(component);
}
```

Now if you look at the above, would you immediately know that the assertion is saying that no error is being shown to
the user? Possibly, given it is the name of the test, but you might not **associate** that line of code with the test
name. This is because it is code from Mockito and is generic to cater for many different use cases. It does what it
says, it checks that there were no interactions with the mock of `UIComponent`.

However, this means something different in your test. How about we try and make that clearer.

```java
@Test
void no_error_is_shown_when_user_is_valid() {
    UIComponent component = mock(UIComponent.class);
    User user = mock(User.class);
    when(user.isValid()).thenReturn(true);
    LoginController controller = new LoginController();

    controller.attemptLogin(component, user);
    
    verify(component, times(0)).addErrorMessage("Invalid user");
}
```

This is slightly better, as there is a higher potential that readers of this code can work out what this line is doing
at a quick glance. However, in some circumstances it might still be hard to read. In such circumstances, consider 
extracting a method to better explain your verification, as per below.

```java
@Test
void no_error_is_shown_when_user_is_valid() {
    UIComponent component = mock(UIComponent.class);
    User user = mock(User.class);
    when(user.isValid()).thenReturn(true);
    LoginController controller = new LoginController();

    controller.attemptLogin(component, user);
    
    verifyNoErrorMessageIsAddedTo(component);
}

private void verifyNoErrorMessageIsAddedTo(UIComponent component) {
    verify(component, times(0)).addErrorMessage("Invalid user");
}
```

The above code is not perfect, but it certainly provides a high level overview of what we are verifying, within the
context of the current test.

## Summary
I hope you enjoyed this article and will spend a refactoring step or two next time you finish writing a test.

>"Programs must be written for people to read, and only incidentally for machines to execute." 
― Harold Abelson, Structure and Interpretation of Computer Programs