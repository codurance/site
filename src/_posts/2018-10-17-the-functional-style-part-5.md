---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 5"
date: 2018-10-17 00:00:00
description: Functional programming explained for the pragmatic programmer. Part 5. Higher-order functions I - Function composition & Monads.
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---

# Higher-order functions I: Function composition and the Monad pattern.

### What is a higher-order function?

In the previous article we saw several examples of functions as first-class citizens and some of the kinds of uses they can be put to. Just to recap, a function is a first-class citizen when it is a value in its own right, and can be passed around a program just like any other type of value. 

Now, when a function accepts another function as its argument, or it yields another function as its return value - or both - it is said to be a _higher-order function_. We actually already saw an example in the previous article, if you recall the Sieve of Eratosthenes exercise, which had this function in it:

```java
private Predicate<Integer> notInNonPrimesUpTo(int limit) {
    var sieve = new HashSet<Integer>();
    for (var n = 2; n <= (limit / 2); n++)
        for (var nonPrime = (n * 2); nonPrime <= limit; nonPrime += n)
            sieve.add(nonPrime);
    return candidate -> !sieve.contains(candidate);
}
```

That function is returning a `Predicate`. A predicate is a function that yields a boolean value. This means that `notInNonPrimesUpTo` is a higher-order function: it builds the sieve and yields a function that tests whether a number is within the sieve or not.

We’ve seen other examples too. Do you remember `map` from part three? It takes a function and applies it to all the elements in an array, yielding another array. `map` is a higher-order function. So is `filter` because it takes a predicate, tests it on every element of an array, and uses the result of the predicate to decide whether to keep the element or discard it. `qsort` is a higher-order function too, because it takes a comparator function and uses it to determine the order of any two elements in the array, without knowing the types of the elements. So the previous article was full of higher-order functions, and you shouldn't be intimidated by the term. It does not mean anything rarified or exalted. You are almost certainly using some kind of higher-order functions regularly in your work. In fact, first-class functions are useless without higher-order functions to pass them into or return them from.

### Function composition.

You'll hear about this a lot in the functional programming world. To compose two functions means to arrange them so that the result of one function is applied directly as the input of the other function. Your code is probably full of examples of this, but if the code is not structured so as to highlight this fact then you may not always notice. Functional programmers are always alert to notice when functions are arranged this way, because it allows the possibility of certain programming structures, which we will come to shortly. Programmers steeped in the functional style often find it useful to consider two composed functions as a third function in its own right. Let me explain what I mean by that.

<p>Say you have a function <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">f</span> that takes a value <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">x</span> as its argument and returns a value <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">y</span> :</p>

<p style="font-family: Georgia, serif; font-size: 1.2em"><span style="font-style: italic">f</span> ( <span style="font-weight: bold">x</span> ) = <span style="font-weight: bold">y</span></p>

<p>and you have another function <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">g</span> that takes <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">y</span> as its argument and returns <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">z</span> :</p>

<p style="font-family: Georgia, serif; font-size: 1.2em"><span style="font-style: italic">g</span> ( <span style="font-weight: bold">y</span> ) = <span style="font-weight: bold">z</span></p>

<p>clearly, then, you can apply <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">g</span> to the output of <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">f</span> like this :</p>

<p style="font-family: Georgia, serif; font-size: 1.2em"><span style="font-style: italic">g</span> ( <span style="font-weight: bold">f</span> ( <span style="font-weight: bold">x</span> )) = <span style="font-weight: bold">z</span></p>

<p>This implies, therefore, that there is a third function <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">h</span> that maps <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">x</span> directly to <span style="font-family: Georgia, serif; font-size: 1.2em; font-weight: bold">z</span> :</p>

<p style="font-family: Georgia, serif; font-size: 1.2em"><span style="font-style: italic">h</span> ( <span style="font-weight: bold">x</span> ) = <span style="font-weight: bold">z</span>

<p>Functional programmers would say that <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">h</span> is the composition of functions <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">f</span> and <span style="font-family: Georgia, serif; font-size: 1.2em; font-style: italic">g</span>. In Haskell this would be defined like:</p>

```haskell
h = g . f
```

In Haskell minimalism is prized as a virtue. In Clojure, rather more verbose, it would be defined like this:

```clojure
(def h (comp f g))
```

Functional programming devotees tend to view function composition this way. Personally, I don't find the practice of explicitly naming composed functions like that especially useful. In particular I don't see any difference between the Clojure above and this: 

```clojure
(defn h [arg] (g (f arg)))
```

other than that the first example is slightly more concise. FP devotees like to wax lyrical about the power of function composition, while my own outlook is rather more prosaic.

### Function composition as plumbing.

The idea of composing functions together is not novel. In 1964, Doug McIlroy wrote this in a memo:

<p style="font-style: italic; margin: 0em 3em 1em 3em">We should have some ways of coupling programs like garden hose -- screw in another segment when it becomes necessary to massage data in another way.</p>

The idea Doug was getting at was later realised in Unix as pipes, probably the single feature that makes Unix shell scripting so powerful. Unix pipes are a system of inter-process communication; they can be created and used directly by processes via system calls, but they can also be created in the shell by using the | symbol, like this:

```
program1 | program2
```

The effect is to create a pipe that reads everything written to standard output by `program1` and feeds it verbatim to `program2` via its standard input. This means that you can chain programs together like building blocks to accomplish tasks that none of the programs can do by themselves. For example, if I wanted to find the top 3 largest Java programs in a directory by lines of code, I could do this:

```
wc -l *.java | grep \.java | sort -nr | head -n 3
        82 Book.java
        43 Isbn.java
        38 Genre.java
```

McIlroy put it this way:

<p style="font-style: italic; margin: 0em 3em 1em 3em">This is the Unix philosophy: Write programs that do one thing and do it well. Write programs to work together.</p>

Replace “programs” with “functions” and you have the principle of composability.

### Connascence of execution.

So, I think the value of writing functions that “do one thing and do it well” pretty much self-evident, but it might not be clear yet why it is a good idea to write functions to be composable, i.e. to work together. You may have heard of [connascence](http://connascence.io/). Connascence is a way of describing things that are coupled to each other in various kinds of ways. There are many different types of connascence, including:

- Connascence of name - if the name of a thing is changed, other things must be renamed to match or the program will break. Usually function calls work by connascence of name. Modern refactoring IDEs can help you when renaming things by automatically updating all the other names that need to be changed to match.
- Connascence of type - two or more things must have the same type. In statically-typed languages this can usually be enforced by the compiler, but if you’re working in a dynamically typed language then you must take care to match up types by yourself.
- Connascence of meaning - also often referred to as “magic values”, this refers to things that must be set to specific values which have certain meanings and, if altered, will break the program.
- Connascence of execution - things must happen in a certain order, in other words, temporal coupling.

It is the last one which is important to us here. It is frequently critical in programming that things are done in a certain order:

```
email = createEmail()
email.sender("walter@lebowski.com")
email.addRecipient("thedude@lebowski.com")
email.subject("Proposal")
mailer.send(email)
email.body("Let's go bowling")
```

In this code, an email object is created, then the sender, recipient and subject are set, then the email is sent. _After_ the email has been sent, it then sets the email body. Almost certainly this is wrong, and the likely outcome is the email will be sent with an empty body. Slightly less likely, but an outcome that cannot be ruled out, is that setting the body on the email after it has been sent might cause an error. Either way it is bad.

But we can design things so that it becomes impossible to do things out of order:

```
mailer.send(emailBuilder()
        .sender("walter@example.com")
        .addRecipient("thedude@example.com")
        .subject("Proposal")
        .body("Let's go bowling")
        .build())
```

Since we need an email object to pass to `mailer.send`, we make it so that the only way to create one and set it up is to use the builder. We remove all setter methods on the email class so that impossible to modify anything to the email after it has been built. Therefore the object that is passed to `mailer.send` is guaranteed not to be tampered with afterwards. The builder pattern seen above is a very common way to turn imperative operations into composable functions. You can use it to wrap things that aren’t in the functional style and make them seem like they are.

### The dread Monad.

When I first envisaged this series of articles, I thought I was not going to mention monads at all, but as it developed I realised that any discussion of the functional style would be incomplete without them. Moreover, Monads turn up sometimes without announcing themselves. I struggled for a long time to understand the Monad, and the explanations I found were quite unhelpful, and I believe this is why they have got their reputation for being hard to understand. I will try to explain it here in terms of code, which I hope will convey the concept clearly enough. As always, I have an example to illustrate the point with; it is a little Java project that I use to try out ideas on, which implements a simple webservice API comprising a set of endpoints that pretend to serve a library. You can search for books with it, view their details, borrow and return them, etc. There is an endpoint to retrieve a book by its ISBN number, and its implementation looks like this:

```java
public LibraryResponse findBookByIsbn(Request request) {
    try {
        Isbn isbn = isbnFromPath(request);
        Book book = findBookByIsbn(isbn);
        SingleBookResult result = new SingleBookResult(book);
        String responseBody = new Gson().toJson(result);
        return new LibraryResponse(200, "application/json", responseBody);
    } catch (IllegalArgumentException e) {
        return new LibraryResponse(400, "text/plain", "ISBN is not valid");
    } catch (Exception e) {
        LOG.error(e.getMessage(), e);
        return new LibraryResponse(500, "text/plain", "Problem at our end, sorry!");
    }
}
```

I deliberately messed up this code a little for our purposes here - though it's still better than much code I have seen in the wild - so let’s critique it. I really don’t like the exception handlers here. They represent special cases, and one of the things I have learned through experience is that special cases are the enemy of clean code. They disrupt the flow of the program and they make ideal hiding places for bugs.

Exceptions bring their own evil with them, being essentially gotos in disguise, but worse still, only one of the exception handlers here is handling genuinely exceptional behaviour. The other is handling part of the API's specified behaviour. We'll come back to that in a moment.

Now, we don’t need to go into the details of the web framework being used here (it’s [spark-java](http://sparkjava.com/)); suffice to say that all web frameworks can be configured to trap unhandled exceptions and return a preconfigured HTTP response when they happen. Different responses can be mapped to different exception classes: it would be appropriate to return the HTTP 500 response when a top-level `Exception` is thrown, so we can remove that `catch` block from the `findBookByIsbn` method.

On the other hand, the 400 response “ISBN is not valid” is due to invalid input from the client and is very much part of the specified API behaviour. The `isbnFromPath` method is throwing an `IllegalArgumentException` when the parameter value from the client does not match the right format for an ISBN number. This is what I meant by a disguised GOTO; it obscures the logic because it is not immediately obvious where the exception is coming from.

There is something more that seems to be missing entirely there. What happens when `findBookByIsbn` does _not_ find the book? That should result in an HTTP 404 response and, in use, so it does, so where did that happen? Examining `findBookByIsbn` we see the answer:

```java
Book findBookByIsbn(Isbn isbn) {
    return bookRepository.retrieve(isbn).orElseThrow(() -> Spark.halt(NOT_FOUND_404, BOOK_NOT_FOUND));
}
```

This makes things even worse! Here we're making use of a framework feature by which an exception encodes an HTTP 404 response within it. This is important control flow that is completely obscured in the endpoint implementation.

So what can we do about it? We _could_ improve things by creating specific exception types for the different outcomes, but we would still be using exceptions as a means of control flow. Alternatively, we could rewrite the code not to depend on exceptions at all:

```java
public LibraryResponse findBookByIsbn(Request request) {
    Isbn isbn = isbnFromPath(request);
    if (isbn.valid()) {
        Optional<Book> book = findBookByIsbn(isbn);
        if (book.isPresent()) {
            SingleBookResult result = new SingleBookResult(book.get());
            String responseBody = new Gson().toJson(result);
            return new LibraryResponse(200, "application/json", responseBody);
        } else {
            return new LibraryResponse(404, "text/plain", "Book not found");
        }
    } else {
        return new LibraryResponse(400, "text/plain", "ISBN is not valid");
    }
}
```

At least all the different execution paths are now present in the method. This code is hardly great either, although a better solution is hinted at in there by the `findBookByIsbn` method which has been modified now to return an `Optional<Book>`. That `Optional` type speaks something to us: it says that it may or may not return a book and that we must handle both eventualities, although Optional can be used far more neatly than it is there. What we need is a way to make it similarly explicit that `findBookByIsbn` will return _either_ a valid ISBN number _or_ some kind of invalid request error.

### Maybe it's valid, maybe it isn't.

In Haskell there is the `Either` type that lets you do exactly that, and it is frequently used for error handling. `Either` values may be either `Left` or `Right` and the programmer must deal with both. Conventionally, the `Left` constructor is used for indicating an error and the `Right` constructor for wrapping a non-erroneous value. Personally I’m not a fan of the use of “left” and “right” in this way: those words only have meaning to me in terms of spatial orientation. Anyway, Java has its own stereotypical construction for this kind of thing, which has been established by the `Stream` and `Optional` classes. We could create a `MaybeValid` type to wrap values that may be valid or not, and by designing it to resemble the built-in types we could cause the least astonishment:

```java
interface MaybeValid<T> {

    <U> MaybeValid<U> map(Function<T, U> mapping);

    <U> MaybeValid<U> flatMap(Function<T, MaybeValid<U>> mapping);

    T ifInvalid(Function<RequestError, T> defaultValueProvider);
}
```

The `ifInvalid` method is the terminating operation. It is meant to return the wrapped value in the case that it is valid, and the `defaultValueProvider` function will supply the value when it is not valid. We can conveniently provide separate implementations for valid values and invalid values, respectively:

```java
public class Valid<T> implements MaybeValid<T> {

    private final T value;

    public Valid(T value) {
        this.value = value;
    }

    @Override
    public <U> MaybeValid<U> map(Function<T, U> mapping) {
        return new Valid<>(mapping.apply(value));
    }

    @Override
    public <U> MaybeValid<U> flatMap(Function<T, MaybeValid<U>> mapping) {
        return mapping.apply(value);
    }

    @Override
    public T ifInvalid(Function<RequestError, T> unused) {
        return value;
    }
}
```

The key parts here are:

- `ifInvalid` returns the wrapped value rather than executing the supplied function.
- `map` applies the wrapped value to the mapping function and returns a new `MaybeValid` instance wrapping the mapped value.
- `flatMap` applies the mapping function and simply returns its result, which is already wrapped in a `MaybeValid` instance.

```java
public class Invalid<T> implements MaybeValid<T> {

    private final RequestError error;

    public Invalid(RequestError error) {
        this.error = error;
    }

    @Override
    public <U> MaybeValid<U> map(Function<T, U> unused) {
        return new Invalid<>(error);
    }

    @Override
    public <U> MaybeValid<U> flatMap(Function<T, MaybeValid<U>> unused) {
        return new Invalid<>(error);
    }

    @Override
    public T ifInvalid(Function<RequestError, T> defaultValueProvider) {
        return defaultValueProvider.apply(error);
    }
}
```

The crucial differences are:

- The `map` and `flatMap` methods do not execute the mapping functions; they simply return another `InvalidRequest` instance. The reason they have to create a new instance is because the wrapped type might change (from `T` to `U`).
- The terminating `ifInvalid` method uses the `defaultValueProvider` function to supply the return value.
- The default value provider is provided with the request error as its argument in case it needs it in order to return the appropriate result.

All of this means that we need to wrap the `isbnFromPath` method in order to return a `MaybeValid` instance:

```java
MaybeValid<Isbn> maybeValidIsbn(Request request) {
    Isbn isbn = isbnFromPath(request);
    return isbn.valid()
            ? new Valid<>(isbn)
            : new Invalid<>(new RequestError(400, "ISBN is not valid"));
}
```

And we must give a similar treatment to `findBookByIsbn`:

```java
MaybeValid<Book> maybeValidBook(Isbn isbn) {
    return findBookByIsbn(isbn)
            .map(book -> new Valid<>(book))
            .orElseGet(() -> new Invalid<>(new RequestError(404, "Book not found")));
}
```

Please note that `RequestError` is _not_ an exception; it does, however, contain an HTTP status code, therefore this code _must_ live in the application component that is dealing with HTTP requests and responses. It would be inappropriate for it to live anywhere else: in a service class, for example.

Now we can rewrite the endpoint like this:

```java
public LibraryResponse findBookByIsbn(Request request) {
    return maybeValidIsbn(request)
        .flatMap(isbn -> maybeValidBook(isbn))
        .map(book -> new SingleBookResult(book))
        .map(result -> new Gson().toJson(result))
        .map(json -> new LibraryResponse(200, "application/json", json))
        .ifInvalid(error -> new LibraryResponse(error.httpStatus(), "text/plain", error.body()));
}
```

Some of the lambdas could be replaced with method references but I left them as they are to bear the closest resemblance to the original code. There are other possibilities for further refactoring too. But notice how it reads clearly now as a sequence of chained operations. This is possible because the original was a indeed chain of composable functions: the return value from each function was passed as the sole argument to the next. The use of higher-order functions has allowed us to encapsulate the logic pertaining to validation errors inside the `MaybeValid` subtypes. In the library service there are several endpoints with requirements similar to this and the `MaybeValid` class could be used to simplify all of them.

### So what about the monad...?

I mentioned the dread word “monad” earlier, and you've probably guessed that `MaybeValid` is one, otherwise I wouldn’t have brought it up. So what _is_ a monad exactly? First we need to clear one thing up, because you may have heard the word in the context of a “monadic function” - this is a completely different usage. It means a function with one argument (a function with two arguments is dyadic, and one with three arguments is triadic, etc.); this usage originated in APL and it has nothing to do with what we're talking about here. The monad we are talking about is a design pattern.

Doubtless you are already familiar with design patterns. The ones you already know, like Strategy, Command, Visitor etc. are all object-oriented design patterns. Monad is a functional design pattern. The Monad pattern defines what it means to chain operations together, enabling the programmer to build pipelines that process data in a series of steps, just like we have above:

1. Retrieve the ISBN number from the request (may be invalid, i.e. wrong format).
1. Look up the book by its ISBN number (may be invalid, i.e. not found).
1. Create a `SingleBookResult` DTO from the retrieved book.
1. Map the DTO to a JSON string.
1. Create a `LibraryResponse` with status 200 containing the JSON.

Each step may be ‘decorated’ with the additional processing rules provided by the monad. In our case, the additional rules are:

- The step actions are only to be performed when the value is valid.
- When the value is invalid then the error is passed along instead.

The terminating operation `ifInvalid` makes the final decision about what to return: it returns the wrapped value if it is valid, otherwise it uses the supplied default value provider to build a suitable response from the client request error.

### A formal definition.

More formally, the monad pattern is usually defined as an assemblage of the following three components, which together are known as a _kleisi triple:_

- A _type constructor_ that maps every possible type to its corresponding monadic type. This wording does not make much sense in Java. To understand it, think of generic types, e.g: `Isbn` → `MaybeValid<Isbn>`.
- A _unit function_ that wraps a value in an underlying type with an instance of the corresponding monadic type, e.g: `new Valid<Isbn>(isbn)`.
- A _binding operation_ that takes a function and applies it to the underlying type. The function returns a new monadic type, which becomes the return value of the binding operation, e.g: `map(book -> new SingleBookResult(book))` which yields a `MaybeValid<SingleBookResult>`.

If you have these three components, you have a monad.

### I heard Monads are all about encapsulating side-effects.

If you first came across the Monad pattern while learning Haskell, then most likely you would have learnt about it in the shape of the I/O Monad. The Haskell tutorial on I/O literally advises you not to worry about the Monad part for now, that you don't need to understand it in order to do I/O. Personally, that would just have the effect of making me worry more. Probably because of this, people who learn Haskell think that the purpose of a Monad is to encapsulate side-effects such as I/O. I'm not going to disagree, I cannot comment on that, but I have not come to understand the Monad pattern that way.

In my view, a Monad wraps a typed value (of any type) and maintains some additional state separately from the wrapped value. We have seen two examples here. In the case of the `Optional` monad, the additional state is whether or not the value is present. In the case of the `MaybeValid` monad, it is whether or not the value is valid, plus a validation error in the case that it is not. Notice that there are _two_ types here: the monadic type (e.g. `Optional`) and the wrapped type.

You can supply the Monad with a function that operates on the encapsulated value. Whatever the type is of the wrapped value, the function's argument must match it. The Monad will pass its wrapped value to the function and will yield a new Monad, of the same monadic type, encapsulating the value returned by function. This is called a “binding operation”. The encapsulated type of the new Monad may be different and that is fine. For example, if you have an `Optional` wrapping a `Date`, you may bind a function that maps a `Date` to a `String` and the result will be an `Optional` wrapping a `String`. If there is some additional functionality associated with the Monad's additional state, the Monad handles it as part of the binding operation. For example, when you pass a function to an empty `Optional`, the function will not executed; the result is another empty `Optional`. In this way, you can call a chain of composed functions in sequence, morphing from type to type, all within the context of the Monad.

Finally, the Monad provides a means for you to handle the value, taking account of the additional monadic state, in whatever the appropriate manner is given the context of your program. The appropriate behaviour is, naturally, handled using first-class functions. The other functions used in the binding operations are thus decoupled from the additional state maintained in the Monad and freed from all responsibility for dealing with it.

In other words, the Monad provides another tool for abstraction in your box, helping you to reduce the global complexity of your programs.

### Next time.

In the next article we will continue our investigation of higher-order functions. We will take a look at currying, and how, despite seeming on the face of it very arcane, in fact it is very useful. To do this we will solve an exercise in Clojure, which will be a rather more involved exercise than the others we have seen in this series so far. We will go through it step by step and get a glimpse of the power of REPL-driven development.

