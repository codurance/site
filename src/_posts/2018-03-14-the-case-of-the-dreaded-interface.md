---
author: Mashooq Badar
layout: post
asset-type: post
name: the-case-of-the-dreaded-interface
title: The case of the dreaded interface
alias: [2018/03/14/the-case-of-the-dreaded-interface/, 2018/03/14/the-case-of-the-dreaded-inerface/]
date: 2018-03-14 10:00:00
image:
    src: /assets/custom/img/blog/socket.png
tags:
    - software-design 
abstract: Interfaces with single implementations are often not necessary! 
---

The Java/C# interface has a lot to answer for. Recently someone told me that, "You can tell a design is coupled if it doesn't use interfaces" after a few follow-up questions I realised that they were not talking about coding to well-defined contracts in general but the Java or C# interfaces in particular. My next question was, "Should you have an interface even if there is only one implementation?" The answer was, "Yes if you think there may be more implementations in the future". I disagree with this view.

### Conflating the **interface** keyword with the Contract of a class

My view is that the keyword **interface** is an implementation detail and is only necessary when we want to benefit from polymorphism, in particular [subtype polymorphism](https://en.wikipedia.org/wiki/Subtyping). The problem arises from the fact that we often conflate the keyword **interface*/usr/local/src/src/_posts/2014-10-03-guide-to-deploying-artifacts-with-jenkins.pug* with the contract of a class. The contract of a class is it's public methods and attributes. Following are equivalent in their contract if we only have a single account in the system:

```java
  code.hljs.java.
    interface BankAccount {
      deposit (Money amount);
      withdraw (Money amount);
    }

    public class CurrentAccount implements BankAccount {
      deposit (Money amount) { ... }
      withdraw (Money amount) { ... }
    }
```

... is contractually the same as 

```java
  code.hljs.java.
    public class BankAccount {
      deposit (Money amount) { ... }
      withdraw (Money amount) { ... }
    }
```

In C# the interface may be named IBankAccount with a BankAccount as the implementation. The "I" prefix convention really irks me, but I do understand it's a convention so will say no more.

### Introduce the interface when needed

Let's get back to the above example with the scenario where we don't have an interface and just one class called **BankAccount**, at this time we don't need to differentiate because we only have one kind of Bank Account in the system. When we have another account that differs in behaviour then we can create the **BankAccount** interface and have two implementations **CurrentAccount** and say **SavingsAccount**. Only the construction will change at this point, the contract will not. Even if we started with the **BankAccount** interface in the first place, the construction would change to add the new account type. You can introduce the interface at the refactoring stage of you TDD cycle just before you add the second implementation of the Bank Account.

### Conclusion

In summary, indiscriminate use of anything is usually not a good approach. Interfaces with single implementations are not necessary. I've seen codebases where there is a proliferation of interfaces with one implementation. In some cases certain libraries and frameworks necessitate the need for an interface even when one is not needed. I would seriously consider different alternatives to these libraries and frameworks, of course you may not have an alternative. 

> We often conflate the keyword **interface** with the contract of an object.

The contract of a class is composed of its public methods and public attributes. An interface is a handy way to make that contract more explicit but it is not necessary. It also makes these codebase more difficult to navigate because there is another layer of indirection. Of course it is necessary when we have multiple implementations of a contract, and that is the place to use interfaces. A place where an interface may exist with a single implementation is when we want to invert the dependency to explicitly mark an architectural boundary. For example in a [Hexagonal Architecture](http://alistair.cockburn.us/Hexagonal_architecture) we would not want the Application (i.e. core domain) to have a direct dependency with the infrastructure or external services, here we may use an interface to invert that dependency. However, I'd only do this in a system where architectural boundaries are well established.

If you want to minimise the creational change on the client side then introduce a factory method, builder, or another creational pattern. Of course that in itself is also another layer of indirection so make sure that the introduction of a creational pattern is worth the cost. A possible example is where you provide a library and do not have control of the client(s) to this library. A creational pattern here could serve to make the change from class to interface backwards compatible for the client.
