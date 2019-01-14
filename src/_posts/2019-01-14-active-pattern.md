---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Active Pattern"
date: 2019-01-14 05:00:00
description: A very interesting construct on F#
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- F#
---

Last week I was pointed by someone to Active Patterns in F#. And it has been quite an interesting discovery.

Active Patterns are used on F# to partition data. Those partitions then can be used with pattern matching. Microsoft's [webpage](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/active-patterns) compares them to discriminated unions.

How they can be used? Well, you could look at the above link, or just follow this post (or, in fact, do both).

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

As you can see there are a few differences on the code. If we concentrate on the logic functions, we can see that now the name of the function has been changed for the construct `(| | |)`, and that now is it returning an Option type. Then, the pattern matching has replaced the `x when ...` code with the new Pattern `Zero(x)`. We complicate a bit the functions, we simplify the pattern matching.

If we look at what is the answer that we are providing, we realize that we are not using the number at all, so in fact we could change the line

```F#
|Zero(x) -> "Is Zero!!"
```

for

```F#
| Zero(_) -> "Is Zero!!"
```

The `x` is not the data that we pass to the Pattern, is the data that is returned! We pass the data implicilty. But wait, if I don't use the return data, do I need to return it at all? And the answer is no. So now we replace

```F#
let (|Zero|_|) (number) = if number = 0 then Some(number) else None
```

with

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
```

We return the name of the pattern, instead of the data.

Which now means that on the match we can do the change from

```F#
| Zero(_) -> "Is Zero!!"
```

to

```F#
| Zero -> "Is Zero!!"
```

So far we have returned the same data that we have passed, and not returned anything. But what if we want to return data of a different type? That is possible: Look below that `(|Positive|_|)` returns a string now.

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
let (|Positive|_|) (number) = if number > 0 then Some("Positive") else None
let (|Negative|_|) (number) = if number < 0 then Some(number) else None

let thisNumberTrait(number) =
    match number with
        | Zero -> "Is Zero!!"
        | Positive(x) -> sprintf "Is %s!!" x
        | Negative(_) -> "Is Negative!!"
        | _ -> "I shouldn't be here"
```

So far I have been using Partial Patterns. That is, the data could not be defined as a partition. That is why there is an underscore (`(|Zero|_|)`) and why we are returning an Option (Some|None). But we could have a full Active Pattern, where the data must be inside one of the partitions. The changes are easy just as below)

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
```

to

```F#
let (|Zero|NonZero|) (number) = if number = 0 then Zero else NonZero
```

Patterns can be combined using `&` for the and combination, and `|` for the or combination.

So instead of

```F#
| Positive(x) -> sprintf "Is %s!!" x
```

we could write

```F#
| NonZero & Positive(x) -> sprintg "Is %s!!" x
```
Not that in this case makes any difference, but is a posibility.

Finally, we could make single big pattern, replacing

```F#
let (|Zero|_|) (number) = if number = 0 then Some(Zero) else None
let (|Positive|_|) (number) = if number > 0 then Some("Positive") else None
let (|Negative|_|) (number) = if number < 0 then Some(number) else None
```

with

```F#
let (|Zero|Positive|Negative|) (number) = if number = 0 then Zero elif number > 0 then Positive else Negative
```

Which in this case looks a bit pointless to me, as I'm nearly back to the original code. It will have it's uses, though.

Active Patterns are an intersting construct, especially when using the Active Pattern multiple times.
