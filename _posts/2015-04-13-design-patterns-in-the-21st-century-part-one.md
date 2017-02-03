---
layout: post
name: design-patterns-in-the-21st-century-part-one
title: Design Patterns in the 21st Century, Part One
date: 2015-04-13 12:30:00 +01:00
author: Samir Talwar
canonical:
    name: my personal blog
    href: http://monospacedmonologues.com/post/116288992550/design-patterns-in-the-21st-century-part-one
image:
    src: /assets/img/custom/blog/2015-04-13-design-patterns/part-one.jpg
    attribution:
        text: Lambda, by greg
        href: https://flic.kr/p/D2Dti
tags:
- design-patterns
- functional-programming
- java
---

I've been having a bit of trouble blogging recently. In an effort to get back into it, I thought I'd take [a talk that I presented at JAX London last year][Design Patterns in the 21st Century], split it up into blog-sized posts as it's pretty long, and post them all week. If you haven't read it before or seen the talk, I hope you enjoy it.

Oh, and if you'd rather just read the whole thing in one go, flick through the slides (which are almost entirely code), or watch the recorded version as a video, head to [my talks page][Design Patterns in the 21st Century].

[Design Patterns in the 21st Century]: http://talks.samirtalwar.com/design-patterns-in-the-21st-century.html

---

### What do you want from me?

I want you to stop using design patterns.

### Um…

OK, let me rephrase that.

I want you to stop using design patterns like it's *1999*.

## This is a book.

<p style="text-align: center;"><img src="{{ site.baseurl }}/assets/img/custom/blog/2015-04-13-design-patterns/book.jpg" class="img-responsive" alt="Design Patterns, by Gamma, Helm, Johnson and Vlissides" style="max-width: 50%;"/></p>

*Design Patterns* was a book by the "Gang of Four", first published very nearly 20 years ago (at the time of writing this essay), which attempted to canonicalise and formalise the tools that many experienced software developers and designers found themselves using over and over again.

The originator of the concept (and the term "design pattern") was Christopher Alexander, who wasn't a software developer at all. Alexander was an architect who came up with the idea of rigorously documenting common problems in design with their potential solutions.

> The elements of this language are entities called patterns. Each pattern describes a problem that occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice. <cite>— Christopher Alexander</cite>

Alexander, and the Gang of Four after him, did more than just document solutions to common problems in their respective universes. By naming these patterns and providing a good starting point, they hoped to provide a consistent *language*, as well as providing these tools up front so that even novices might benefit from them.

<!-- more -->

## And now, an aside, on functional programming.

Functional programming is all about <em><del>functions</del> <ins>values</ins></em>.

Values like this:

    int courses = 3;

But also like this:

    Course dessert = prepareCake.madeOf(chocolate);

And like this:

    Preparation prepareCake = new Preparation() {
        @Override
        public Course madeOf(Ingredient deliciousIngredient) {
            return new CakeMix(eggs, butter, sugar)
                    .combinedWith(deliciousIngredient);
        }
    };

Preparation looks like this:

    @FunctionalInterface
    interface Preparation {
        Course madeOf(Ingredient deliciousIngredient);
    }

So of course, the `prepareCake` object could also be written like this.

    Preparation prepareCake =
        deliciousIngredient ->
            new CakeMix(eggs, butter, sugar)
                .combinedWith(deliciousIngredient);

Because `Preparation` is an interface with a **Single Abstract Method**, any lambda with the same type signature as `Preparation`'s method signature can be assigned to an object of type `Preparation`. This means that `Preparation` is a **functional interface**.

We can go one further. Let's extract that `new CakeMix` out. Assuming it's an immutable object with no external dependencies, this shouldn't be a problem.

    Mix mix = new CakeMix(eggs, butter, sugar);
    Preparation prepareCake =
        deliciousIngredient -> mix.combinedWith(deliciousIngredient);

Then we can collapse that lambda expression into a method reference.

    Mix mix = new CakeMix(eggs, butter, sugar);
    Preparation prepareCake = mix::combinedWith;

### Well.

Yes. It's weird, but it works out.

We're assigning `prepareCake` a reference to the `combinedWith` method of `mix`:

    mix::combinedWith

`mix::combinedWith` is a *method reference*. Its type looks like this:

    Course combinedWith(Ingredient);

And it's (pretty much) exactly the same as `deliciousIngredient -> cakeMix.combinedWith(deliciousIngredient)`. That means it conforms to our `Preparation` interface above.

---

Tomorrow, we'll take a look at the first of our design patterns, the Abstract Factory pattern. See you then.
