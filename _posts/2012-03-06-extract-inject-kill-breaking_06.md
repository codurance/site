---
author: Sandro Mancuso
layout: post
name: extract-inject-kill-breaking\_06
title: "Extract, Inject, Kill: Breaking hierarchies (part 2)"
date: 2012-03-06 20:26:00 +00:00
---

*In [part 1](/2012/03/06/extract-inject-kill-breaking/)
of this post I explain the problems of using the template method in deep
class hierarchies and how I went to solve it. Please [read
it](/2012/03/06/extract-inject-kill-breaking/)
before reading this post.*

Here is a more concrete example in how to break deep hierarchies using
the Extract, Inject, Kill approach. Imagine the following hierarchy.


![Hierarchies](/assets/img/custom/blog/hierarchies.png)
Let's start with the StandardPricingService. First, let's write some
tests:

Note that I used  a small trick here, extending the
StandardPricingService class inside the test class so I could have
access to the protected method. We should not use this trick in
normal circumstances. Remember that if you feel the need to test
protected or private methods, it is because your design is not quite
right, that means, there is a domain concept missing in your design. In
other words, there is a class crying to come out from the class you are
trying to test.

Now, let's do the step one in our Extract, Inject, Kill strategy.
**Extract** the content of the calculateProductPrice() method into
another class called StandardPriceCalculation. This can be done
automatically using IntelliJ or Eclipse. After a few minor adjusts,
that's what we've got.

And the StandardPriceService now looks like this:

All your tests should still pass.

As we create a new class, let's add some tests to it. They should be the
same tests we had for the StandardPricingService.

Great, one sibling done. Now let's do the same thing for the
BoxingDayPricingService.

Now let's extract the behaviour into another class. Let's call it
BoxingDayPricingCalculation.

The new BoxingDayPriceService is now

We now need to add the tests for the new class.

Now both StandardPricingService and BoxingDayPricingService have no
implementation of their own. The only thing they do is to delegate the
price calculation to StandardPriceCalculation and
BoxingDayPriceCalculation respective. Both price calculation classes
have the same public method, so now let's extract a PriceCalculation
interface and make them both implement it.

Awesome. We are now ready for the Inject part of Extract, Inject, Kill
approach. We just need to **inject** the desired behaviour into the
parent (class that defines the template method). The
calculateProductPrice() is defined in the PricingService, the class at
the very top at the hierarchy. That's where we want to inject the
PriceCalculation implementation. Here is the new version:


Note that the template method calculateProductPrice() was removed from
the PricingService, since its behaviour is now being injected instead of
implemented by sub-classes.

As we are here, let's write some tests for this last change, checking if
the PricingService is invoking the PriceCalculation correctly. 

Great. Now we are ready for the last bit of the Extract, Inject, Kill
refactoring. Let's **kill** both StandardPricingService and
BoxingDayPricingService child classes. 

The VoucherPricingService, now the deepest class in the hierarchy, can
be promoted to concrete class. Let's have another look at the hierarchy:

![Hierarchies](/assets/img/custom/blog/hierarchies_2.png)
And that's it. Now it is just to repeat the same steps for
VoucherPricingService and UserDiscountPricingService. **Extract** the
implementation of their template methods into classes, **inject** them
into PricingService, and **kill** the classes.

In doing so, every time you extract a class, try to give them proper
names instead of calling them Service. Suggestions could be
VoucherDiscountCalculation and PrimeUserDiscountCalculation.

There were a few un-safe steps in the re-factoring described above and I
also struggled a little bit to describe exactly how I did it since I was
playing quite a lot with the code. Suggestions and ideas are very
welcome.

For the [final solution](/2012/03/26/extract-inject-kill-breaking_26/),
please check the [last part](/2012/03/26/extract-inject-kill-breaking_26/)
of this blog post.

*NOTE*
*If you are not used to use builders in your tests and is asking
yourself where the hell aProduct() and aShoppingBasket() come from,
check the code in here:*

[ProductBuilder.java](https://gist.github.com/1988792)

[ShoppingBasketBuilder.java](https://gist.github.com/1988805)

*For more information about the original problem that triggered all
this, please read [part 1](/2012/03/06/extract-inject-kill-breaking/)
of this blog post.*

*In [part 3](/2012/03/26/extract-inject-kill-breaking_26/)
I finish the exercise, breaking the entire hierarchy. Please have a look
at it for the [final solution](/2012/03/26/extract-inject-kill-breaking_26/).*
