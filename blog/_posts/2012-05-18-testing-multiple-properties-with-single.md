---
author: Sandro Mancuso
layout: post
name: testing-multiple-properties-with-single
title: "Testing multiple properties with single assertion"
date: 2012-05-18 17:29:00 +00:00
---

Every time I was trying to test an object's properties I was neither
satisfied writing very verbose tests nor in using some of the out of the
box hamcrest matchers. Although using the matchers was a big help, I
never managed to make them read the way I wanted.

Another thing that was very important to me, I wanted to have a single
assertion per method and a very descriptive description if the test did
not pass.

I've decided to write my own matcher and hopefully it will be useful to
other people. So, that's what I've done:

###BeanMatcher
Hamcrest matcher to match multiple attributes of an object within a single assertion.

###How to use it

```
// Static imports

import static org.craftedsw.beanpropertymatcher.matcher.BeanMatcher.has;
import static org.craftedsw.beanpropertymatcher.matcher.BeanPropertyMatcher.property;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;

// Imagine that you have a method that returns an object Person

Person person = new Person();
person.setFirstName("Sandro");
person.setAge(25);
person.setLastName("Mancuso");

// Then you can test it like that

assertThat(person, has(
                        property("firstName", equalTo("Another dude")),  // Mistmatch
                        property("age", greaterThan(18)),  // Use any matcher
                        property("lastName", equalTo("Mancuso"))));
```

Hamcrest matcher to match multiple attributes of an object within a
single assertion.


**NOTE**: Make sure you are using org.hamcrest.MatcherAssert.assertThat
instead of the JUnit one.

If you run this test, you will get a message like

```
java.lang.AssertionError:
     Expected: property "firstName" = "Another dude"
     but: property "firstName" was "Sandro"
```

Now, change the age check to

{% highlight java %}
property("age", greaterThan(60))
{% endhighlight %}


And you should get:
{% highlight java %}
Testing object graphs
{% endhighlight %}

###Testing object graphs
You can also do this

```
Person person = new Person();
    person.setFirstName("Sandro");
    person.setAge(35);

    Country uk = new Country();
    uk.setName("United Kingdom");

    Address address = new Address();
    address.setPostcode("1234556");
    address.setCity("London");
    address.setCountry(uk);

    person.setAddress(address);

    assertThat(person, has(
                            property("firstName", equalTo("Sandro")),
                            property("age", greaterThan(18)),
                            property("address.city", equalTo("London")),
                            property("address.postcode", equalTo("1234556")),
                            property("address.country.name", equalTo("United Kingdom"))));
```

I use a combination of two matchers to do that:

- [BeanMatcher](https://github.com/sandromancuso/bean-property-matcher/blob/master/src/main/java/org/craftedsw/beanpropertymatcher/matcher/BeanMatcher.java):
Provides the "has" method responsible to group all the property
matchers.

- [BeanPropertyMatcher](https://github.com/sandromancuso/bean-property-matcher/blob/master/src/main/java/org/craftedsw/beanpropertymatcher/matcher/BeanPropertyMatcher.java):
Provides the "property" method.

I expect to make more changes to them, so for the most up-to-date
version, please check
[BeanMatcher](https://github.com/sandromancuso/bean-property-matcher) on
[my github account](https://github.com/sandromancuso).

Enjoy!!!
