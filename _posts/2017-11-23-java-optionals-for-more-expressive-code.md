---
author: Richard Wild
date: 2017-11-23 09:00:00 +00:00
layout: post
asset-type: post
slug: java-optionals-for-more-expressive-code
title: Java Optionals For More Expressive Code
image:
    src: /assets/img/custom/blog/2017-11-23-java-optionals-for-more-expressive-code.png
abstract: Java 8 Optionals allow you to write your method signatures to indicate that your method may or may not return a value. But there is more to Optional than merely checking whether the value is present and getting it if it is. Here I show how Optional also includes some features that can enhance your code's expressiveness.
tags:
- Java
- craftsmanship
- cleancode
---
Any of us who has programmed in a language that permits null references will have experienced what happens when you try to dereference one. Whether it results in a segfault or a NullPointerException, it’s always a bug. Tony Hoare described it as his [billion-dollar mistake](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare). The problem typically occurs when a function returns a null reference to a client that was unanticipated by the developer of the client. Say, in code like this:

```java
User user = userRepository.find("Alice");
```

An astute programmer will straight away inquire what happens when no user matching “Alice” is found, but nothing in the `find()` method’s signature tells you what to expect. A typical Java solution to this in the past would have been to make the method throw a checked exception, maybe a `UserNotFoundException`. That would certainly communicate to the client programmer that this eventuality might happen, but it would do nothing to enhance the expressivity of their code. Catching exceptions results in code that hinders comprehension. In any case, checked exceptions fell out of favour and people tend no longer to write code that throws them.

Many programmers will resort instead to throwing an unchecked exception or returning a null reference. Both are as bad as each other, and for the same reasons: neither of them inform the programmer to expect this eventuality, and both of them will cause a runtime failure if not handled correctly. Java 8 introduced the `Optional` type to deal with this problem. Whenever you write a method that may or may not return a value, you should make the method return an Optional of whatever type you wish to return. So in our example above, find would return a value of type `Optional<User>`. The client code now needs to perform additional steps to test the presence of and then get the value:

```java
Optional<User> userOpt = userRepository.find("Alice");
if (userOpt.isPresent()) {
	User user = userOpt.get();	
}
```

What’s more, if the code calls `get()` unguardedly then their IDE will probably warn them about it.

### Lambdas Make Things Better
This solution is already a lot better, but there is more to `Optional` than that: if you stick to handling optionals this way, you are missing out on some opportunities to make your code more expressive.

The code snippet above was adapted from my own implementation of the “social networking” exercise that Codurance use to test job candidates. My actual code is more like:

```java
Optional<User> userOpt = userRepository.find(subject);
if (userOpt.isPresent()) {
    User user = userOpt.get();
    printAllMessagesPostedToUser(user);
}
```

Optional has an `ifPresent()` method that allows us to provide a `Consumer` that will be called if the optional is present. The consumer’s argument will be the object being wrapped by the optional. This allows us to rewrite the code like this:

```java
userRepository.find(subject).ifPresent(user -> printAllMessagesPostedToUser(user));
```

Indeed we can go one step further and replace the lambda with a method reference:

```java
userRepository.find(subject).ifPresent(this::printAllMessagesPostedToUser);
```

I think this communicates the programmer’s intent (in this case mine) much more clearly than the if statement. 

Maddeningly, there is no `ifNotPresent()` counterpart and, even if there were, ifPresent is a void method so they would not be chainable anyway. Java 9 goes some way towards fixing this with its `ifPresentOrElse(Consumer<T>, Runnable)` method, but it is still not ideal.

### Substituting Default Values
On the subject of when the optional value is not present, what can we do? Forgetting complaints about missing features, `ifPresent()` is only suitable for commands with side effects. If we were implementing a query then we may want to substitute a default value for an empty optional, for example:

```java
if (optionalValue.isPresent()) {
	return optionalValue.get();
}
return defaultValue;
```

This can be very easily accomplished with `Optional.orElse()`:

```java
return optionalValue.orElse(defaultValue);
```

This also provides a convenient way of de-nulling values when you have to call a method that may return null and is not under your control. We have all written code similar to this before:

```java
value = methodThatMayReturnNull();
if (value == null) {
	value = defaultValue;
}
```

You can use `Optional.ofNullable()` to refactor that code, because it returns `Optional.empty()` if the value is null:

```java
value = Optional.ofNullable(methodThatMayReturnNull()).orElse(defaultValue);
```

I think this reads a bit better than using [`ObjectUtils.defaultIfNull`](https://commons.apache.org/proper/commons-lang/javadocs/api-3.1/org/apache/commons/lang3/ObjectUtils.html#defaultIfNull) to do the same thing. However, there is a caveat. You must not use `Optional.orElse()` to call a method that has side effects. For example, elsewhere in my social networking exercise I have code that searches for a user and returns it when found, otherwise it creates a new user:

```java
Optional<User> userOpt = userRepository.find(recipient);
if (userOpt.isPresent()) {
    return userOpt.get();
}
return createUser();
```

You might assume that you can rewrite this code like this:

```java
return userRepository.find(recipient).orElse(createUser());
```

You mustn’t do this, because `createUser()` will always be called whether the optional is present or not! This is almost certainly not what you want: at best you will make an unnecessary method call and, if the method has side effects, it may introduce a bug. Instead you should call `Optional.orElseGet()` and give it a `Supplier` that supplies the default value:

```java
return userRepository.find(recipient).orElseGet(() -> createUser());
```

Now `createUser()` will only be called when the optional is not present, which is the behaviour I want. Once again we can replace the lambda with a method reference:

```java
return userRepository.find(recipient).orElseGet(this::createUser);
```

### Throwing Exceptions
It may be that, for you, it is an error condition when the optional is not present and you want to throw an exception. You can do this by calling Optional.orElseThrow() and passing it a Supplier that creates the exception:

```java
return userRepository.find(recipient)
        .orElseThrow(() -> new RuntimeException("User " + recipient + " not found"));
```

### Mapping Optional Values
`Optional` also has some methods that allow you to do operations similar to those on streams. For example, in another exercise I had some code that was structurally similar to this:

```java
Optional<Amount> creditAmountOpt = transaction.getCreditAmount();
Optional<Amount> debitAmountOpt = transaction.getDebitAmount();

String formattedDepositAmount = creditAmountOpt.isPresent() ?
        formatAmount(creditAmountOpt.get()) : " ";

String formattedWithdrawalAmount = debitAmountOpt.isPresent() ?
        formatAmount(debitAmountOpt.get()) : " ";

return String.format(" %s| %s|", formattedDepositAmount, formattedWithdrawalAmount);
```

The context of this code was a class that prints a bank statement line: my `Transaction` class knew whether it was a deposit or a withdrawal but I did not want the statement line printer to know. So I had the Transaction interface return optional values for debit and credit amount: the statement line printer would format each value if it was present and substitute a blank space if not.

To avoid the conditional operators, we can use the `Optional.map()` method. This is very similar to the `map` method on the `Stream` API. It accepts a `Function` and calls it when the optional is present. It passes the wrapped value as the function argument, and wraps the return value in another Optional. So in this case it maps an `Optional<Amount>` to an `Optional<String>`. This allows us to rewrite the code like this:

```java
return String.format(" %s| %s|",
        transaction.getDepositAmount().map(this::formatAmount).orElse(" "),
        transaction.getWithdrawalAmount().map(this::formatAmount).orElse(" "));
```

You might wonder what happens if you map a function that returns another optional - i.e. `Function<T, Optional<U>>` - in this case you end up with a result of type `Optional<Optional<U>>` which probably isn’t what you want. Again, similar to a stream, you can use `flatMap()` instead which will return an `Optional<U>` value.

The similarities with streams extend to `Optional.filter()` which evaluates the provided predicate if the optional value is present, and when the predicate evaluates to false then it will return an empty optional. It would be wise to avoid getting too cute though, without care you may end up with code that is difficult to understand. Optionals are best used to refactor code that is straightforward but long-winded into code that is straightforward and more concise.

### But Be Careful
Finally, any useful tool can be abused, and so it is with `Optional`. They were only intended to be used to represent return values. IntelliJ will give you a warning if you declare an instance variable of type Optional. This constitutes an explicit declaration of a temporary field, which is considered a [code smell](https://sourcemaking.com/refactoring/smells/temporary-field). Also, Optionals should not be used as method parameters: this is essentially a boolean parameter in disguise, which is also considered smelly. If you find yourself wanting to do this, it would be better to separate your method into two methods: one with the parameter and the other without, and put the conditional in the client code instead.