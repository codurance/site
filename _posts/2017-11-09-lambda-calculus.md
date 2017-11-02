---
author: Sergio Rodrigo Royo
date: 2017-11-02 08:00:00 +00:00
layout: post
asset-type: post
slug: lambda-calculus-for-mortal-developers
title: Lambda Calculus for mortal developers
image:
    src: /assets/img/custom/blog/2017-11-09-lambda-calculus-for-mortal-developers.png
tags:
- functional programming
- lambda calculus
---

Lambda Calculus sounds like an arcane term that only functional programming wizards can understand. Nothing could be further from the truth. We use Lambda Calculus everyday when we program. It is the most reducible form of all Functional Programming languages; the primitive building block of Functional Programming.

## The atoms of Lambda Calculus
Lambda Calculus is based on three basic building blocks: **expressions**, **variables** and **functions**, which are combined to form other expressions. 

**Variables** are not the ones we use to temporarily store values in imperative languages; variables in Lambda Calculus are the parameters of functions.

**Functions** consist of a head and a body. The head is a lambda plus a variable, and the body is an expression. As we will see later, functions have only one parameter. A function looks like this:
&lambda;x.x
&lambda;x is the head, the second x is the body, and the dot symbol . separates both. This example is the *identity function*.

Functions are also known as *abstractions*. The reason is that they allow us to generalise a computation and reuse it for the different values of the variable (or parameter).

**Expressions** are evaluated until an irreducible term is obtained as a result. An example of a simple expression could look like the following:
(&lambda;x.x) 3
(&lambda;x.x) is a function, as we have seen in the previous example. 3 is the parameter the function is applied to. This expression will be evaluated and reduced until an irreducible term is obtained (we will explain this process later).

## Types of variables

We have seen so far functions with one variable in the head. When applying the function to an expression, the occurrences of the variable in the body are substituted with the applied expression. This kind of variables are called **bound variables**.

Example:
(&lambda;x.x) 3
When the lambda is applied to the 3 parameter, the x variable is substituted with this value in the body. We’ll see this process in more detail later.

Nothing strange so far; we use functions and variables substitution every day when coding.

Another type of variable are **free variables**. They appear in the body, but not in the head. In other words, they cannot be bound. Their values are defined outside of the function they are referenced in. Their scope is not local to the function. This has some implications during the evaluation of the function.

Example:
&lambda;x.xz
The variable z does not appear in the head, therefore it cannot be bound and substituted in the scope of the function.

## Alpha and Beta to reduce them all

We’ve talked about expressions, which are used to create more complex abstractions (or functions). Later on, we will want to *reduce* these expressions in order to get the value they produce. In this process, also called *evaluation*, two new concepts are involved:

### Alpha equivalence

Two expressions are *alpha-equivalent* if they can be obtained from each other; in other words, if replacing the bound variables with other variables gives us back an equivalent expression. In simple terms, this means that we can use different variable names for the same function as long as we preserve their meaning in the body of the function.

Examples:
&lambda;x.x
&lambda;a.a
&lambda;z.z
are alpha-equivalent

&lambda;xyz.yzx
&lambda;abc.bca
are alpha-equivalent

These alpha-equivalent functions could be used instead of the other ones, and the result, when evaluating the expression, would still be the same. This is important when there are name clashes during beta reduction.

What about free variables?
&lambda;xy.yxz
&lambda;ab.baz
are alpha-equivalent

&lambda;xy.yxz
&lambda;ab.bac
are not alpha-equivalent

Free variables cannot be substituted if we want to preserve alpha equivalence. This makes sense because different free variables can mean different things and they are irreducible, so they aren’t equivalent in the context of a function.

Is alpha equivalence something really new for developers? I don’t think so. Every time we rename a parameter in one of our functions, we are applying this concept.

### Beta reduction

The process of evaluating (reducing) a lambda expression is known as beta reduction. It’s called *reduction* because the head is consumed (reduced) by substituting its parameter in the body with the value the function was applied to.

Example: apply the identity function to 3.
(&lambda;x.x) 3
[x:=3]
3

This is also called *application*. [x:=3]means that we substitute x with 3. There are other kinds of notation for variable substitutions, but I find this one quite clear and more familiar for developers, as it reminds of variable assignations.

The process of reducing more complex applications is quite simple, based on a few rules:
Applications are left associative. Using parenthesis helps to clarify the associativity when there are more than a few terms.
The leftmost outermost term is applied to the leftmost lambda.
Free variables name clashes are solved by applying alpha equivalence.
Free variables cannot be reduced.

Example:
(&lambda;x.xy)(&lambda;x.xz)(&lambda;y.y)
Apply (&lambda;x.xz), the leftmost outermost term.
[x:=(&lambda;x.xz)]
((&lambda;x.xz)y)(&lambda;y.y)
[x:=(&lambda;y.y)]
(((&lambda;y.y)z)y)
[y:=z]
zy

zy is not reducible anymore, it’s a fully evaluated expression. At this stage, we say that zy is in **beta normal form**. In Programming words, this means that the function was *evaluated* and returned the result term, which cannot be reduced any further.

## Multiple parameters

So far, we’ve seen how to work with functions with only one parameter. How do we reduce functions with two or more parameters?
As lambdas can only bind one parameter, the way to rearrange several parameters is to split the head into nested heads, each one containing a single parameter. For example:
&lambda;xy.yx
This function contains one head with two parameters. We could split the head in two.
&lambda;x.&lambda;y.yx or &lambda;x.(&lambda;y.yx)
Now we have a function with one parameter, and its body contains another function with one parameter (the second parameter in the original head). When reducing this expression, y will be bound and substituted as usual, and x will be bound and substituted before reducing the nested function.

This simple idea is called *currying*.

Finally, we could have a look at an example of beta reduction with a name clash, to see the how alpha equivalence works in practice:
(&lambda;xyz.xyz)(&lambda;x.xz)(&lambda;x.x)
The head of the leftmost lambda has three parameters. They can be split in three different heads.
(&lambda;x.&lambda;y.&lambda;z.xyz)(&lambda;x.xz)(&lambda;x.x)
The next step would be to bind [x:=(&lambda;x.xz)]. The problem is that there is already a z free variable in one of the heads of the leftmost lambda. This is a name clash, as they are different variables but have the same name. To solve this, we can rename one of them before we apply the binding.
(&lambda;x.&lambda;y.&lambda;z'.xyz')(&lambda;x.xz)(&lambda;x.x)
Now, we can bind [x:=(&lambda;x.xz)] safely.
(&lambda;y.&lambda;z'.(&lambda;x.xz)yz')(&lambda;x.x)
[y:=(&lambda;x.x)]
(&lambda;z'.(&lambda;x.xz)(&lambda;x.x)z')
[x:=(&lambda;x.x)]
(&lambda;z'.((&lambda;x.x)z)z')
[x:=z]
(&lambda;z'.zz')
This function has no arguments to be applied, so we are done.

We have seen how to beta reduce an expression containing functions with multiple parameters. The process is the same as per functions with one parameter. But, are all expressions reducible to beta normal form?

## Divergence

When a expression is beta reduced and produces a result, we say that the expression converged. But not all expressions converge. Let’s see a classical example:
(&lambda;x.xx)(&lambda;x.xx)
[x:=(&lambda;x.xx)]
As x appears twice in the body, the new expression is the same as the original one.
(&lambda;x.xx)(&lambda;x.xx)
[x:=(&lambda;x.xx)]
The next application returns again the same expression.
(&lambda;x.xx)(&lambda;x.xx)
...

This expression does not converge and will never be reduced into beta normal form. When this happens, we say that the expression *diverges*.

Some expressions will even grow when evaluating them:
(&lambda;x.xxx)(&lambda;x.xxx)
[x:=(&lambda;x.xxx)]
(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)
[x:=(&lambda;x.xxx)]
(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)
[x:=(&lambda;x.xxx)]
(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)(&lambda;x.xxx)
...

Does divergence remind you of something? It is an infinite recursion. Any Java developer has seen this more than once. The Java API calls it StackOverflowError.

## Was it that bad after all?

As we’ve seen, the general idea behind Lambda Calculus is quite simple. Names such as alpha equivalence or beta reduction can sound scary, but we, as developers, already use these concepts in our daily work. The importance of Lambda Calculus not only applies to Functional Programming, but also to the basic building blocks in Programming itself.

## References

[Haskell Programming: From First Principles by Christopher Allen and Julie Moronuki](http://haskellbook.com/)

[https://en.wikipedia.org/wiki/Lambda_calculus](https://en.wikipedia.org/wiki/Lambda_calculus)

[http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf](http://www.inf.fu-berlin.de/lehre/WS03/alpi/lambda.pdf)

[http://wiki.c2.com/?AlphaEquivalence](http://wiki.c2.com/?AlphaEquivalence)

