---
author: Sandro Mancuso
layout: post
asset-type: post
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

```
public abstract class PrincingService {

    public double calculatePrice(ShoppingBasket shoppingBasket, User user, String voucher) {
        double discount = calculateDiscount(user);
        double total = 0;
        for (ShoppingBasket.Item item : shoppingBasket.items()) {
            total += calculateProductPrice(item.getProduct(), item.getQuantity());
        }
        total = applyAdditionalDiscounts(total, user, voucher);
        return total * ((100 - discount) / 100);
    }

    protected abstract double calculateDiscount(User user);

    protected abstract double calculateProductPrice(Product product, int quantity);

    protected abstract double applyAdditionalDiscounts(double total, User user, String voucher);

}

public abstract class UserDiscountPricingService extends PrincingService {

    @Override
    protected double calculateDiscount(User user) {
        int discount = 0;
        if (user.isPrime()) {
            discount = 10;
        }
        return discount;
    }
}

public abstract class VoucherPrincingService extends UserDiscountPricingService {

    private VoucherService voucherService;

    @Override
    protected double applyAdditionalDiscounts(double total, User user, String voucher) {
        double voucherValue = voucherService.getVoucherValue(voucher);
        double totalAfterValue = total - voucherValue;
        return (totalAfterValue > 0) ? totalAfterValue : 0;
    }

    public void setVoucherService(VoucherService voucherService) {
        this.voucherService = voucherService;
    }
}

public class BoxingDayPricingService extends VoucherPrincingService {
    public static final double BOXING_DAY_DISCOUNT = 0.60;

    @Override
    protected double calculateProductPrice(Product product, int quantity) {
        return ((product.getPrice() * quantity) * BOXING_DAY_DISCOUNT);
    }
}

public class StandardPricingService extends VoucherPrincingService {

    @Override
    protected double calculateProductPrice(Product product, int quantity) {
        return product.getPrice() * quantity;
    }
}
```

![Hierarchies](/assets/img/custom/blog/hierarchies.png)
Let's start with the StandardPricingService. First, let's write some
tests:

```
public class StandardPricingServiceTest {

    private TestableStandardPricingService standardPricingService = new TestableStandardPricingService();

    @Test public void
    should_return_product_price_when_quantity_is_one() {
        Product book = aProduct().costing(10).build();

        double price = standardPricingService.calculateProductPrice(book, 1);

        assertThat(price, is(10D));
    }

    @Test public void
    should_return_product_price_multiplied_by_quantity() {
        Product book = aProduct().costing(10).build();

        double price = standardPricingService.calculateProductPrice(book, 3);

        assertThat(price, is(30D));
    }

    @Test public void
    should_return_zero_when_quantity_is_zero() {
        Product book = aProduct().costing(10).build();

        double price = standardPricingService.calculateProductPrice(book, 0);

        assertThat(price, is(0D));
    }

    private class TestableStandardPricingService extends StandardPricingService {
        @Override
        protected double calculateProductPrice(Product product, int quantity) {
            return super.calculateProductPrice(product, quantity);
        }
    }
}
```

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

```
public class StandardPriceCalculation {

    public double calculateProductPrice(Product product, int quantity) {
        return product.getPrice() * quantity;
    }
}
```

And the StandardPriceService now looks like this:

```
public class StandardPricingService extends VoucherPrincingService {

    private final StandardPriceCalculation standardPriceCalculation = new StandardPriceCalculation();

    @Override
    protected double calculateProductPrice(Product product, int quantity) {
        return standardPriceCalculation.calculateProductPrice(product, quantity);
    }
}
```

All your tests should still pass.

As we create a new class, let's add some tests to it. They should be the
same tests we had for the StandardPricingService.

```
public class StandardPriceCalculationTest {

    private StandardPriceCalculation priceCalculation = new StandardPriceCalculation();

    @Test public void
    should_return_product_price_when_quantity_is_one() {
        Product book = aProduct().costing(10).build();

        double price = priceCalculation.calculateProductPrice(book, 1);

        assertThat(price, is(10D));
    }

    @Test public void
    should_return_product_price_multiplied_by_quantity() {
        Product book = aProduct().costing(10).build();

        double price = priceCalculation.calculateProductPrice(book, 3);

        assertThat(price, is(30D));
    }

    @Test public void
    should_return_zero_when_quantity_is_zero() {
        Product book = aProduct().costing(10).build();

        double price = priceCalculation.calculateProductPrice(book, 0);

        assertThat(price, is(0D));
    }

}
```

Great, one sibling done. Now let's do the same thing for the
BoxingDayPricingService.

```
public class BoxingDayPricingServiceTest {

    private TestableBoxingDayPricingService boxingDayPricingService = new TestableBoxingDayPricingService();

    @Test public void
    should_apply_boxing_day_discount_on_product_price() {
        Product book = aProduct().costing(10).build();

        double price = boxingDayPricingService.calculateProductPrice(book, 1);

        assertThat(price, is(6D));
    }

    @Test public void
    should_apply_boxing_day_discount_on_product_price_and_multiply_by_quantity() {
        Product book = aProduct().costing(10).build();

        double price = boxingDayPricingService.calculateProductPrice(book, 3);

        assertThat(price, is(18D));
    }

    private class TestableBoxingDayPricingService extends BoxingDayPricingService {

        @Override
        protected double calculateProductPrice(Product product, int quantity) {
            return super.calculateProductPrice(product, quantity);
        }

    }
}
```

Now let's extract the behaviour into another class. Let's call it
BoxingDayPricingCalculation.

```
public class BoxingDayPriceCalculation {
    public static final double BOXING_DAY_DISCOUNT = 0.60;

    public double calculateProductPrice(Product product, int quantity) {
        return ((product.getPrice() * quantity) * BOXING_DAY_DISCOUNT);
    }
}
```

The new BoxingDayPriceService is now

```
public class BoxingDayPricingService extends VoucherPrincingService {
    private final BoxingDayPriceCalculation boxingDayPriceCalculation = new BoxingDayPriceCalculation();

    @Override
    protected double calculateProductPrice(Product product, int quantity) {
        return boxingDayPriceCalculation.calculateProductPrice(product, quantity);
    }
}
```

We now need to add the tests for the new class.

```
public class BoxingDayPriceCalculationTest {

    private BoxingDayPriceCalculation priceCalculation = new BoxingDayPriceCalculation();

    @Test public void
    should_apply_boxing_day_discount_on_product_price() {
        Product book = aProduct().costing(10).build();

        double price = priceCalculation.calculateProductPrice(book, 1);

        assertThat(price, is(6D));
    }

    @Test public void
    should_apply_boxing_day_discount_on_product_price_and_multiply_by_quantity() {
        Product book = aProduct().costing(10).build();

        double price = priceCalculation.calculateProductPrice(book, 3);

        assertThat(price, is(18D));
    }

}
```

Now both StandardPricingService and BoxingDayPricingService have no
implementation of their own. The only thing they do is to delegate the
price calculation to StandardPriceCalculation and
BoxingDayPriceCalculation respective. Both price calculation classes
have the same public method, so now let's extract a PriceCalculation
interface and make them both implement it.

```
public interface PriceCalculation {
    double calculateProductPrice(Product product, int quantity);
}

public class BoxingDayPriceCalculation implements PriceCalculation

public class StandardPriceCalculation implements PriceCalculation
```

Awesome. We are now ready for the Inject part of Extract, Inject, Kill
approach. We just need to **inject** the desired behaviour into the
parent (class that defines the template method). The
calculateProductPrice() is defined in the PricingService, the class at
the very top at the hierarchy. That's where we want to inject the
PriceCalculation implementation. Here is the new version:

```
public abstract class PricingService {

    private PriceCalculation priceCalculation;

    public double calculatePrice(ShoppingBasket shoppingBasket, User user, String voucher) {
        double discount = calculateDiscount(user);
        double total = 0;
        for (ShoppingBasket.Item item : shoppingBasket.items()) {
            total += priceCalculation.calculateProductPrice(item.getProduct(), item.getQuantity());
        }
        total = applyAdditionalDiscounts(total, user, voucher);
        return total * ((100 - discount) / 100);
    }

    protected abstract double calculateDiscount(User user);

    protected abstract double applyAdditionalDiscounts(double total, User user, String voucher);

    public void setPriceCalculation(PriceCalculation priceCalculation) {
        this.priceCalculation = priceCalculation;
    }

}
```

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
