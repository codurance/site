--- layout: post name: extract-inject-kill-breaking\_26 title: !
'Extract, Inject, Kill: Breaking hierarchies (part 3)' time: 2012-03-26
16:42:00.000000000 +01:00 ---
*In [part
one](http://craftedsw.blogspot.co.uk/2012/03/extract-inject-kill-breaking.html)
I explain the main idea behind this approach and in [part
two](http://craftedsw.blogspot.co.uk/2012/03/extract-inject-kill-breaking_06.html)
I start this example. Please read parts
[one](http://craftedsw.blogspot.co.uk/2012/03/extract-inject-kill-breaking.html)
and
[two](http://craftedsw.blogspot.co.uk/2012/03/extract-inject-kill-breaking_06.html)
before reading this post*\
\
Although the main ideas of Extract, Inject, Kill is already expressed,
it's good to finish the
[exercise](http://craftedsw.blogspot.co.uk/2012/03/extract-inject-kill-breaking_06.html)
just for completion's sake. Here is where we stopped:\
\
[![](http://1.bp.blogspot.com/-lHrDKs7xC5k/T24Ub4EE6LI/AAAAAAAAAOA/zSSo5Ho4jk0/s640/hierarchies_2.png)](http://1.bp.blogspot.com/-lHrDKs7xC5k/T24Ub4EE6LI/AAAAAAAAAOA/zSSo5Ho4jk0/s1600/hierarchies_2.png)
Let's have a look at the VoucherPricingService, that now is the only
concrete class at the bottom of our hierarchy. 
\
\
Note that it uses the VoucherService class to calculate the voucher
value.
\
Before anything, let's write some tests to VoucherPricingService.java\
\
\
\
\
Once thing to notice is that the User parameter is not used for
anything. So let's remove it.
\
Now it is time to user the Extract, Inject, Kill on the
VoucherPricingService. Let's **Extract** the content of the
VoucherPricingService.applyAdditionalDiscounts(double, String) method
and add it to a class called VoucherDiscountCalculation. Let's call the
method calculateVoucherDiscount(). Of course, let's do that writing our
tests first. They need to test exactly the same things that are tested
on VoucherPricingService.applyAdditionalDiscounts(double, String). We
also take the opportunity to pass the VoucherService object into the
constructor of VoucherDiscountCalculation.
\
If you noticed, when doing the extraction, we took the opportunity to
give proper names to our new classes and methods and also to pass their
essential dependencies to the constructor instead of using method
injection.
 
Let's now change the code in the VoucherPricingServiceto use the new
VoucherDiscountCalculation and see if all the tests still pass.
\
\
Cool. All the tests still pass, meaning that we have the same behaviour,
but now in the VoucherDiscountCalculation class, and we are ready to
move to the **Inject** stage.
\
Let's now **inject** VoucherDiscountCalculation into PricingService,
that is the top class in the hierarchy. As always, let's add a test that
will test this new collaboration.
\
And here is the changed PriningService.
\
Now it is time to **kill** the VoucherPricingService class and **kill**
the PricingService.applyAdditionalDiscounts(double total, String
voucher) template method, since it is not being used anymore. We can
also **kill** the VoucherPricingServiceTest class and fix the
PricingServiceTest removing the applyAdditionalDiscounts() method from
the testable class.
\
So now, of course, we don't have a concrete class in our hierarchy
anymore, since the VoucherPricingService was the only one. We can now
safely promote UserDiscountPricingService to concrete.
\
That is now how our object graph looks like:
\
[![](http://1.bp.blogspot.com/-mL333NK2Wj4/T24SM3PZrlI/AAAAAAAAAN4/te0Q8t2IyoA/s400/class_hierarchies_v4.png)](http://1.bp.blogspot.com/-mL333NK2Wj4/T24SM3PZrlI/AAAAAAAAAN4/te0Q8t2IyoA/s1600/class_hierarchies_v4.png)
\
Our hierarchy is another level short. The only thing we need to do now
is to apply  **Extract, Inject, Kill **once again, **extracting** the
logic inside UserDiscountPricingService into another class (e.g.
UserDiscountCalculation), **inject** UserDiscountCalculation into
PricingService, finally **kill** UserDiscountPricingService and the
calculateDiscount(User user) template method. 
UserDiscountPricingService, 
\
Since the approach was described before, there is no need to go step by
step anymore. Let's have a look at the final result.
\
Here is the diagram representing where we started:
\
[![](http://1.bp.blogspot.com/-u9OQ7OgLTic/T24VFbKDpmI/AAAAAAAAAOI/82EUFtwoXAM/s640/hierarchies.png)](http://1.bp.blogspot.com/-u9OQ7OgLTic/T24VFbKDpmI/AAAAAAAAAOI/82EUFtwoXAM/s1600/hierarchies.png)
  After the last Extract, Inject, Kill refactoring, this is what we've
got:
\
[![](http://3.bp.blogspot.com/-peXBqjyk22k/T3CL90EnatI/AAAAAAAAAOQ/6CK_S_-n0xQ/s640/hierarchies_classes_final.png)](http://3.bp.blogspot.com/-peXBqjyk22k/T3CL90EnatI/AAAAAAAAAOQ/6CK_S_-n0xQ/s1600/hierarchies_classes_final.png)
\
The cool thing about the final model pictured above is that now we don't
have any abstract classes anymore. All classes and methods are concrete
and every single class is independently testable. \
\
\
That's how the final PricingService class looks like:\
\
\
For a full implementation of the final code, please look
at [https://github.com/sandromancuso/breaking-hierarchies](https://github.com/sandromancuso/breaking-hierarchies)\
\
*Note: For this three part blog post I used three different approaches
to drawing UML diagrams. By hand, using
[ArgoUML](http://argouml.tigris.org/) and [Astah community
edition](http://astah.net/editions/community). I'm very happy with the
latter. *
