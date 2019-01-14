---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Active Pattern"
date: 2019-01-11 05:00:00
description: A very intersting construct on F#
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- F#
---

Last week I was pointed by someone to Active Patterns in F#. And it has been quite an interesting discovery.

Active Patterns are used on F# to partition data. Those partitions then can be used on pattern matching. Microsoft's [webpage](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/active-patterns) compares them to discrimanted unions.

How they can be used? Well, you could look at the above link, or just follow this post.

Below is an initial version of a trivial function using pattern matching.

```F#
let thisNumberTrait(number) =
    match number with
        | x when x = 0 -> "Is Zero!!"
        | x when x > 0 -> "Is Positive!!"
        | x when x < 0 -> "Is Negative!!"
        | _ -> "I shouldn't be here"
```

A first improvement of the above code would be to put the logic on the guards behind functions, so we can arrive to this:

```F#
let isZero(number) = number = 0
let isPositive(number) = number > 0
let isNegative(number) = number < 0

let thisNumberTrait(number) =
    match number with
        | x when isZero(x) -> "Is Zero!!"
        | x when isPositive(x) -> "Is Positive!!"
        | x when isNegative(x) -> "Is Negative!!"
        | _ -> "I shouldn't be here"
```

But what if we could remove the guard clauses completely? That is where Active Patterns come into play.

```F#
let (|Zero|_|) (number) = if number = 0 then Some(number) else None
let (|Positive|_|) (number) = if number > 0 then Some(number) else None
let (|Negative|_|) (number) = if number < 0 then Some(number) else None

let thisNumberTrait(number) =
    match number with
        | Zero(x) -> "Is Zero!!"
        | Positive(x) -> "Is Positive!!"
        | Negative(x) -> "Is Negative!!"
        | _ -> "I shouldn't be here"
```

As you can see there are a few differences on the code. If we concentrate on the logic functions, we can see that now the name of the function has been changed for the construct `(| | |)`, and that now is it returning a Maybe (monad, type, however you want to call it). Then, the pattern matching has replace the `x when ...` code with the new Patterns `Zero(x)`. We complicate a bit the functions, we simplify the pattern matching.

If we look at what is the answer that we are providing, we realize that we are not using the number at all, so in fact we could change the line

```F#
|Zero(x) -> "Is Zero!!"
```

for

```F#
| Zero(_) -> "Is Zero!!"
```

The `x`, is not the data that we pass to the Pattern, is the data that is returned! But wait, if I don't use the data, do I need to return it at all? And the answer is no. So now we replace

```F#
let (|Zero|_|) (number) = if number = 0 then Some(number) else None
```

with

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
```

We return the name of the pattern, instead of the data.

Which now means on the match that we can do the change from

```F#
| Zero(_) -> "Is Zero!!"
```

to

```F#
| Zero -> "Is Zero!!"
```

So far we have returned the same data that we have passed, and not returned anything. But what if we want to return data of a different type? That is possible
return different data. Look below that `(|Positive|_|)` returns a string now.

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
let (|Positive|_|) (number) = if number > 0 then Some("Positive") else None
let (|Negative|_|) (number) = if number < 0 then Some(number) else None

let thisNumberTrait(number) =
    match number with
        | Zero -> "Is Zero!!"
        | Positive(x) -> sprintf"Is %s!!" x
        | Negative(_) -> "Is Negative!!"
        | _ -> "I shouldn't be here"
```
change partial pattern for full pattern

combine patterns

Make single big pattern
