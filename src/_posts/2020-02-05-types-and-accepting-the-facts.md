---
layout: post
asset-type: post
name: types-and-accepting-the-facts
title: Types and accepting the fact that I might not be that smart.
date: 2020-02-05 00:00:00 +00:00
author: André Guelfi Torres
image:
    src: /assets/custom/img/blog/jigsaw-types.jpg
    attribution:
        text: Photo by Gabriel Crismariu on Unsplash
        href: https://unsplash.com/photos/sOK9NjLArCw
tags:
    - types
abstract: Let's talk about the basics of type systems and how they can help us
---

# Types and accepting the fact that I might not be that smart.

I've said quite a few times that I like static typing, but to be honest, I'm probably not the most knowledgeable person around using typing and I wanted to change that. What's going to be the aim of this post? 

I will present some different type systems, provide some examples of how we can use types to solve some code smells, and give more safety to our codebase.

## Why do I like types?

Usually, I'm not the smartest person in the room. Part of the time I'm at the bottom of the list. A short summary of things I can't do are as follows:

- Remember the return type for that method that I just created.
- Remember all the places that I have to change something because of some refactoring, like adding a new field to a constructor.
- Juggling multiple variables in my head and trying to memorize their types, e.g: Multiple fields that you have to pass for a method.

Just like the monkeys from 2001: A Space Odyssey, I know how to use tools and how to write better code. I try to rely on every tool, automation, and check that is provided, and we have many things in that area, like compilers, unit tests, and static code analysis.

Now I'm going to focus on types, but before that let's go through the basics of type systems, so we have context and I can make this post longer to give the false impression that I'm smart and I really understand type systems. 

## The different flavours of Type Systems

Type systems can go from very relaxed and they will try to make things work with everything you give to them to very strict and rigid not allowing your type shenanigans. 

### Dynamic Typing

In dynamically typed languages, you don't have much enforcement on the types that you pass around, you don't have to say which type you want to return or to pass in the parameters, doesn't mean that you should pass anything if you try to call a method or field that doesn't exists your code will break, but besides that, it doesn't matter much. 

```javascript
function printText(text) {
    console.log(text);
}
```

See the method above, it has zero enforcement of that will receive or return, it will just print to the console, and that's how dynamic typed languages work, variables have their types assigned at runtime at the moment you pass the value, you don't have to worry with that beforehand. 

When talking about Dynamic Typed languages we have to understand that dynamic typed languages might have different ways of dealing with typecasting, the more permissive ones are called Weakly typed, an example of the is JavaScript (No hate please. Just dropping facts).

### Weak Typing

Is the more relaxed version of typing that you can find, usually the interpreter will try to make some  conversions in the types so the operations can be done, let's try to do some calculations with JavaScript:

```javascript
    1 + 1   // 2
    "1" + 1 // "11"
    1 + "1" // "11"
    1 - "1" // 0
    "1" - 1 // 0
```

Let's try to understand what's going on there. The first result is obviously right, but why do we get `"11"` When we try to sum a string with an integer? Under the hood the JavaScript engine is casting the other value to make the operation successful, instead of throwing an error the integer is transformed into a string and concatenated to the other string, the same thing for the third operation. 

So why do the last two ones are done over the integer value? In JavaScript, strings have the `+` operator but not the `-`, so to not throw an error the interpreter cast the string value to an integer that has the minus operation. 

The main thing with Weak Typed systems is that they give preference to casting values and trying to make the operation to happen instead of throwing an error, doesn't mean that they will do the operation 100% of the time, but at least they will try.

### Strong Typing

Let's try to do that in another dynamic language like Ruby and see what's going to happen:

```javascript
1 + 1   // 2
"1" + 1 // TypeError (no implicit conversion of Integer into String)
1 + "1" // TypeError (String can't be coerced into Integer)
1 - "1" // TypeError (String can't be coerced into Integer)
"1" - 1 // NoMethodError (undefined method `-' for "1":String)
```

Now we only have one operation working and two different errors for the rest. From the second to the fourth operation we got `TypeError`, which is Ruby's way to say that the types are different and that operation is wrong. The last error is saying that `-` isn't a valid method for a String. 

Throwing all those errors make Ruby less of a dynamically typed language? Of course not, we can see that the function that we wrote in JavaScript will be the same thing in Ruby:

```ruby
def print_text(text)
    puts text
end
```

We still enforce neither parameter nor return type, but what Ruby does is try to be more conservative with castings, when an operation doesn't sound right Ruby will throw an error instead of trying to make the operation happen.

### Static Typing

Leaving the land of Dynamic Typed languages and getting into a more strict place, we have static types. Probably everyone is familiar with at least one static language like Java, C#, C++, C, Delphi, and many others.

When dealing with Static Typing we have to be more explicit about our intentions, we need to let people know what we are expecting and what we giving them back, it's like a contract. When we reproduce the same code we did for Ruby and JavaScript in Java we get:

```java
public void printText(String text) {
    System.out.printLn(text);
}
```

We have to inform you that we are going to receive a String and that we don't return anything from that method, in case we try to violate that contract the are going to have problems with the compiler. We try to compile the program calling the method with a different type and we get a compilation error.

```java
public class Main {

    public static void printText(String text) {
        System.out.println(text);
    }

    public static void main(String[] args) {
        printText(123);
    }
}
```

```
Main.java:10: error: incompatible types: int cannot be converted to String
        printText(123);
                    ^
```

Now we moved the runtime errors that we were having in Ruby to the compilation time, the compiler is a safety net but isn't fail-proof we still can get runtime errors by doing weird casting in runtime:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(1 + Integer.parseInt("WAT"));
    }
}
```

This piece of code will compile without any problem, we are satisfying all the boundaries in the type system but when we run everything breaks. 

```
Exception in thread "main" java.lang.NumberFormatException: For input string: "WAT"
    at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
    at java.base/java.lang.Integer.parseInt(Integer.java:652)
    at java.base/java.lang.Integer.parseInt(Integer.java:770)
```

So keep that in mind, even with the safety of a compiler we can't be 100% that our code is right. 

## So static types are better than dynamic ones?

Well, not exactly. A compile-time check gives you a guard rail against some problems. Said that relying on types purely to avoid problems isn't the best way to go, even with statically typed languages you are bound to commit mistakes like the one shown previously.

The Ruby and Rails community use unit testing to solve the lack of the compile enforcement but you still need to test your code for runtime exceptions, static languages will not need all this coverage but you still need to test for edge cases in the input and nulls. 

The kind of project that you are doing is also something important when deciding between static or dynamic types. In case you are prototyping something and want to move fast a language that forces you to take care of all cases might not be the best, but it will shine in mission-critical applications that shouldn't crash. 

One of the main reasons to use a static typed language is to try to catch bugs earlier. Is quite well known that the earlies we catch bugs/problems the cheaper is to fix them, if you never heard about that you can read more about that [here](https://www.researchgate.net/publication/255965523_Integrating_Software_Assurance_into_the_Software_Development_Life_Cycle_SDLC). 

## Types and abstractions

Remember the reasons that I mentioned earlier? One way to avoid those problems is to abstract those problems in a way that we can reason with more simple terms and that they are presented, force them to tell us what do they mean. 

There are many ways to create the same abstraction, we can use different types and end up having the same result. 

For example in Ruby we can create a struct to store values for us:

```ruby
Customer = Struct.new(:name, :address, :age)
john = Customer.new("John Doe", "123 Street, SE10JA", 20)
puts john.name # "John Doe"
puts john.age # 20
```

and we can make the same thing in Kotlin: 

```kotlin
data class Customer(val name: String, val address: String, val age: Int)
val john = Customer("John Doe", "123 Street, SE10JA", 20)
println(john.name) // "John Doe"
println(john.age)  // 20
```

Those two are different constructs in the languages but they are the same abstraction, we wrapped multiple values inside one type, we can compare both types by value and access the values using dot notation. When we start to work and use those abstractions around we will start thinking about a Customer doesn't matter what a customer is composed of, we can defer that to the moment that we really need some specific information. The example also shows that we can have abstractions in both kinds of languages.

## Wrapping up and References

We could see the difference between type systems and how they work. We also spoke a little about abstractions, which we will cover more in the next part where we have started building using our type system more and more to help us to write an application. In case you want to know more about type systems I recommend you to go straight to the sources:

[What To Know Before Debating Type Systems](https://blog.steveklabnik.com/posts/2010-07-17-what-to-know-before-debating-type-systems)

[Using the type system to ensure correct code](https://fsharpforfunandprofit.com/posts/correctness-type-checking/)

[Type System - Wikipedia](https://en.wikipedia.org/wiki/Type_system)

[An Introduction To Programming Type Systems](https://www.smashingmagazine.com/2013/04/introduction-to-programming-type-systems/)