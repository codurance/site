---
layout: post
name: design-patterns-in-the-21st-century-part-two
title: 'Design Patterns in the 21st Century: The Abstract Factory Pattern'
date: 2015-04-14 10:00:00 +01:00
author: Samir Talwar
canonical:
    name: my personal blog
    href: http://monospacedmonologues.com/post/116370706560/design-patterns-in-the-21st-century-the-abstract
image:
    src: /assets/img/custom/blog/2015-04-13-design-patterns/part-two.png
    attribution:
        text: Van Nelle Factory IR, by Vincent van der Pas
        href: https://flic.kr/p/8eq5hL
tags:
- design-patterns
- functional-programming
- java
---

This is part two of my talk, [Design Patterns in the 21st Century][].

[Design Patterns in the 21st Century]: http://talks.samirtalwar.com/design-patterns-in-the-21st-century.html

---

This pattern is used *everywhere* in Java code, especially in more "enterprisey" code bases. It involves an interface and an implementation. The interface looks something like this:

    public interface Bakery {
        Pastry bakePastry(Topping topping);
        Cake bakeCake();
    }

And the implementation:

    public class DanishBakery implements Bakery {
        @Override public Pastry bakePastry(Topping topping) {
            return new DanishPastry(topping);
        }

        @Override public Cake bakeCake() {
            return new Aeblekage(); // mmmm, apple cake...
        }
    }

More generally, the Abstract Factory pattern is usually implemented according to this structure.

![Abstract Factory pattern UML diagram]({{site.baseurl}}/assets/img/custom/blog/2015-04-13-design-patterns/abstract-factory-pattern-uml.png)

In this example, `Pastry` and `Cake` are "abstract products", and `Bakery` is an "abstract factory". Their implementations are the concrete variants.

Now, that's a fairly general example.

In actual fact, most factories only have one "create" method.

    @FunctionalInterface
    public interface Bakery {
        Pastry bakePastry(Topping topping);
    }

Oh look, it's a function.

This denegerate case is pretty common in in the Abstract Factory pattern, as well as many others. While most of them provide for lots of discrete pieces of functionality, and so have lots of methods, we often tend to break them up into single-method types, either for flexibility or because we just don't need more than one thing at a time.

So how would we implement this pastry maker?

    public class DanishBakery implements Bakery {
        @Override public Pastry apply(Topping topping) {
            return new DanishPastry(Topping topping);
        }
    }

OK, sure, that was easy. It looks the same as the earlier `DanishBakery` except it can't make cake. Delicious apple cake… what's the point of that?

Well, if you remember, `Bakery` has a **Single Abstract Method**. This means it's a **Functional Interface**.

So what's the functional equivalent to this?

    Bakery danishBakery = topping -> new DanishPastry(topping);

Or even:

    Bakery danishBakery = DanishPastry::new;

Voila. Our `DanishBakery` class has gone.

But we can go further.

    package java.util.function;
    /**
     * Represents a function that
     * accepts one argument and produces a result.
     *
     * @since 1.8
     */
    @FunctionalInterface
    public interface Function<T, R> {
        /**
         * Applies this function to the given argument.
         */
        R apply(T t);

        ...
    }

We can replace the `Bakery` with `Function<Topping, Pastry>`; they have the same types.

    Function<Topping, Pastry> danishBakery = DanishPastry::new;

In this case, we might want to keep it, as it has a name relevant to our business, but often, `Factory`-like objects serve no real domain purpose except to help us decouple our code. (`UserServiceFactory`, anyone?) This is brilliant, but on these occasions, we don't need explicit classes for it—Java 8 has a bunch of interfaces built in, such as `Function`, `Supplier` and many more in the `java.util.function` package, that suit our needs fairly well.

Here's our updated UML diagram:

![Updated Abstract Factory pattern UML diagram]({{site.baseurl}}/assets/img/custom/blog/2015-04-13-design-patterns/abstract-factory-pattern-uml-functional.png)

Aaaaaah. Much better.

---

Tomorrow, we'll be looking at the Adapter pattern.
