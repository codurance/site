---
layout: post
name: testing-legacy-code-with-golden-master
title: Testing legacy code with Golden Master
date: 2012-11-11 23:54:00 +00:00
author: Sandro Mancuso
---

As a warm up for [SCNA](http://scna.softwarecraftsmanship.org/), the
[Chicago Software Craftsmanship Community](http://www.meetup.com/ChicagoSC/) ran a hands-on coding
session where developers, working in pairs, should test and refactor
some legacy code. For that they used the [Gilded Rose kata](https://github.com/sandromancuso/Gilded-Rose-Kata). You can find
links to versions in java, C\# and ruby
[here](https://github.com/sandromancuso/Gilded-Rose-Kata) and for
clojure
[here](http://blog.8thlight.com/mike-jansen/2012/09/26/welcome-to-the-gilded-rose-in-clojure.html).


We ran the same session for the [London Software Craftsmanship Community (LSCC)](http://www.meetup.com/london-software-craftsmanship) early this
year and back then I decided to write my tests BDD-style (I used JBehave
for that). You can check my solution
[here](https://github.com/sandromancuso/Gilded-Rose-Kata).

This time, instead of writing unit tests or BDD / Spec By Example to
test every branch of that horrible code, I decided to solve it using a
test style called Golden Master.

###The Golden Master approach

Before making any change to the production code, do the following:

1.  Create X number of random inputs, always using the same random seed,
    so you can generate always the same set over and over again. You
    will probably want a few thousand random inputs.
2.  Bombard the class or system under test with these random inputs.
3.  Capture the outputs for each individual random input

When you run it for the first time, record the outputs in a file (or
database, etc). From then on, you can start changing your code, run the
test and compare the execution output with the original output data you
recorded. If they match, keep refactoring, otherwise, revert back your
change and you should be back to green.

###Approval Tests

An easy way to do Golden Master testing in Java (also available to C\#
and Ruby) is to use [Approval Tests](http://approvaltests.sourceforge.net/). It does all the file
handling for you, storing and comparing it. Here is an example:

```
package org.craftedsw.gildedrose;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.approvaltests.Approvals;
import org.junit.Before;
import org.junit.Test;

public class GildedRoseTest {

	private static final int FIXED_SEED = 100;
	private static final int NUMBER_OF_RANDOM_ITEMS = 2000;
	private static final int MINIMUM = -50;
	private static final int MAXIMUN = 101;

	private String[] itemNames = {"+5 Dexterity Vest",
				      "Aged Brie",
				      "Elixir of the Mongoose",
				      "Sulfuras, Hand of Ragnaros",
				      "Backstage passes to a TAFKAL80ETC concert",
				      "Conjured Mana Cake"};

	private Random random = new Random(FIXED_SEED);
	private GildedRose gildedRose;

	@Before
	public void initialise() {
		gildedRose = new GildedRose();
	}

	@Test public void
	should_generate_update_quality_output() throws Exception {
		List<Item> items = generateRandomItems(NUMBER_OF_RANDOM_ITEMS);

		gildedRose.updateQuality(items);

		Approvals.verify(getStringRepresentationFor(items));
	}

	private List<Item> generateRandomItems(int totalNumberOfRandomItems) {
		List<Item> items = new ArrayList<Item>();
		for (int cnt = 0; cnt < totalNumberOfRandomItems; cnt++) {
			items.add(new Item(itemName(), sellIn(), quality()));
		}
		return items;
	}

	private String itemName() {
		return itemNames[0 + random.nextInt(itemNames.length)];
	}

	private int sellIn() {
		return randomNumberBetween(MINIMUM, MAXIMUN);
	}

	private int quality() {
		return randomNumberBetween(MINIMUM, MAXIMUN);
	}

	private int randomNumberBetween(int minimum, int maximum) {
		return minimum + random.nextInt(maximum);
	}

	private String getStringRepresentationFor(List<Item> items) {
		StringBuilder builder = new StringBuilder();
		for (Item item : items) {
			builder.append(item).append("\r");
		}
		return builder.toString();
	}

}
```

For those not familiar with the kata, after passing a list of items to
the GildedRose class, it will iterate through them and according to many
different rules, it will change their "sellIn" and "quality"
attributes.

I've made a small change in the Item class, adding a automatically
generated toString() method to it:

```
public class Item {
	private String name;
	private int sellIn;
	private int quality;

	public Item(String name, int sellIn, int quality) {
		this.setName(name);
		this.setSellIn(sellIn);
		this.setQuality(quality);
	}

        // all getters and setters here

	@Override
	public String toString() {
		return "Item [name=" + name +
                              ", sellIn=" + sellIn +
                              ", quality=" + quality + "]";
	}
}
```

The first time the test method is executed, the line:

{% highlight java %}
Approvals.verify(getStringRepresentationFor(items));
{% endhighlight %}

will generate a text file, in the same folder where the test class is,
called:
GildedRoseTest.should\_generate\_update\_quality\_output.received.txt.
That mean, ..received.txt

ApprovalTests then will display the following message in the console:

{% highlight console %}
To approve run : mv
/Users/sandromancuso/development/projects/java/gildedrose\_goldemaster/./src/test/java/org/craftedsw/gildedrose/GildedRoseTest.should\_generate\_update\_quality\_output.received.txt
/Users/sandromancuso/development/projects/java/gildedrose\_goldemaster/./src/test/java/org/craftedsw/gildedrose/GildedRoseTest.should\_generate\_update\_quality\_output.approved.txt
{% endhighlight %}

Basically, after inspecting the file, if we are happy, we just need to
change the .received with .approved to approve the output. Once this is
done, every time we run the test, ApprovalTests will compare the output
with the approved file.

Here is an example of how the file looks like:

{% highlight console %}
Item [name=Aged Brie, sellIn=-23, quality=-44]
Item [name=Elixir of the Mongoose, sellIn=-9, quality=45]
Item [name=Conjured Mana Cake, sellIn=-28, quality=1]
Item [name=Aged Brie, sellIn=10, quality=-2]
Item [name=+5 Dexterity Vest, sellIn=31, quality=5]
{% endhighlight %}

Now you are ready to rip the GildedRose horrible code apart. Just make
sure you run the tests every time you make a change. :)


###Infinitest

If you are using Eclipse or IntelliJ, you can also use
[Infinitest](http://infinitest.github.com/). It automatically runs your
tests every time you save a production or test class. It is smart enough
to run just the relevant tests and not the entire test suite.  In
Eclipse, it displays a bar at the bottom-left corner that can be red,
green or yellow (in case there are compilation errors and the tests
can't be run).

With this, approach, refactoring legacy code becomes a piece of cake.
You make a change, save it, look at the bar at the bottom of the screen.
If it is green, keep refactoring, if it is red, just hit CTRL-Z and you
are back in the green. Wonderful. :)

###Thanks

Thanks to [Robert Taylor](https://twitter.com/roberttaylor426) and
[Balint Pato](https://twitter.com/balopat) for showing me this approach
for the first time in one of the
[LSCC](http://www.meetup.com/london-software-craftsmanship) meetings
early this year. It was fun to finally do it myself.
