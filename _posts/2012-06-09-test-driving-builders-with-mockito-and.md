---
author: Sandro Mancuso
layout: post
name: test-driving-builders-with-mockito-and
title: "Test-driving Builders with Mockito and Hamcrest"
date: 2012-06-09 23:05:00 +10:00
---


A lot of people asked me in the past if I test getters and setters
(properties, attributes, etc). They also asked me if I test my builders.
The answer, in my case is it depends.


When working with legacy code, I wouldn’t bother to test data
structures, that means, objects with just getters and setters, maps,
lists, etc. One of the reasons is that I never mock them. I use them as
they are when testing the classes that uses them.
For builders, when they are used just by test classes, I also don’t unit
test them since they are used as “helpers” in many other tests. If they
have a bug, the tests will fail.
In summary, if these data structures and builders already exist, I
wouldn’t bother retrofitting test for them.

But now let’s talk about doing TDD and assume you need a new object with
getters and setters. In this case, yes, I would write tests for the
getters and setters since I need to justify their existence writing my
tests first.

In order to have a rich domain model, I normally tend to have business
logic associated with the data and have a richer domain model. Let’s see
the following example.

In the real life, I would be writing on test at a time, making them pass
and refactor. For this post, I’ll just give you the full classes for
clarity’s sake. First let’s write the tests:

```
package org.craftedsw.testingbuilders;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TradeTest {

	private static final String INBOUND_XML_MESSAGE = "<message />";
	private static final boolean REPORTABILITY_RESULT = true;
	private Trade trade;

	@Mock private ReportabilityDecision reportabilityDecision;

	@Before
	public void initialise() {
		trade = new Trade();
		when(reportabilityDecision.isReportable(anyString()))
				.thenReturn(REPORTABILITY_RESULT);
	}

	@Test public void
	should_contain_the_inbound_xml_message() {
		trade.setInboundMessage(INBOUND_XML_MESSAGE);

		assertThat(trade.getInboundMessage(), is(INBOUND_XML_MESSAGE));
	}

	@Test public void
	should_tell_if_it_is_reportable() {
		trade.setInboundMessage(INBOUND_XML_MESSAGE);
		trade.setReportabilityDecision(reportabilityDecision);

		boolean reportable = trade.isReportable();

		verify(reportabilityDecision).isReportable(INBOUND_XML_MESSAGE);
		assertThat(reportable, is(REPORTABILITY_RESULT));
	}

}
```

Now the implementation:

```
package org.craftedsw.testingbuilders;

public class Trade {

	private String inboundMessage;
	private ReportabilityDecision reportabilityDecision;

	public String getInboundMessage() {
		return this.inboundMessage;
	}

	public void setInboundMessage(String inboundXmlMessage) {
		this.inboundMessage = inboundXmlMessage;
	}

	public boolean isReportable() {
		return reportabilityDecision.isReportable(inboundMessage);
	}

	public void setReportabilityDecision(ReportabilityDecision reportabilityDecision) {
		this.reportabilityDecision = reportabilityDecision;
	}

}
```

This case is interesting since the Trade object has one property called
inboundMessage with respective getters and setters and also uses a
collaborator (reportabilityDecision, injected via setter) in its
isReportable business method.

A common approach that I’ve seen many times to “test” the
setReportabilityDecision method is to introduce a
getReportabilityDecision method returning the reportabilityDecision
(collaborator) object.

This is definitely the wrong approach. Our objective should be to test
how the collaborator is used, that means, if it is invoked with the
right parameters and if whatever it returns (if it returns anything) is
used. Introducing a getter in this case does not make sense since it
does not guarantee that the object, after had the collaborator injected
via setter, is interacting with the collaborator as we intended.

*As an aside, when we write tests that are about how collaborators are
going to be used, defining their interface, is when we are using TDD as
a design tool and not just simply as a testing tool. I’ll cover that in
a future blog post.*

OK, now imagine that this trade object can be created in different ways,
that means, with different reportability decisions. We also would like
to make our code more readable and we decide to write a builder for the
Trade object. Let’s also assume, in this case, that we want the builder
to be used in the production and test code as well. 
In this case, we want to test drive our builder. 

Here is an example that I normally find when developers are test-driving
a builder implementation.

```
package org.craftedsw.testingbuilders;

import static org.craftedsw.testingbuilders.TradeBuilder.aTrade;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TradeBuilderTest {

	private static final String TRADE_XML_MESSAGE = "<message />";

	@Mock
	private ReportabilityDecision reportabilityDecision;

	@Test public void
	should_create_a_trade_with_inbound_message() {
		Trade trade = aTrade()
				    .withInboundMessage(TRADE_XML_MESSAGE)
				    .build();

		assertThat(trade.getInboundMessage(), is(TRADE_XML_MESSAGE));
	}

	@Test public void
	should_create_a_trade_with_a_reportability_decision() {
		Trade trade = aTrade()
				    .withInboundMessage(TRADE_XML_MESSAGE)
				    .withReportabilityDecision(reportabilityDecision)
				    .build();

		trade.isReportable();

		verify(reportabilityDecision).isReportable(TRADE_XML_MESSAGE);
	}

}
```

Now let’s have a look at these tests.  
The good news is, the tests were written in the way developers want to
read them. That also means that they were “designing” the TradeBuilder
public interface (public methods). 
The bad news is how they are testing it.

If you look closer, the tests for the builder are almost identical to
the tests in the TradeTest class. 

You may say that it is OK since the builder is creating the object and
the tests should be similar. The only different is that in the TradeTest
we instantiate the object by hand and in the TradeBuilderTest we use the
builder to instantiate it, but the assertions should be the same,
right? 

For me, firstly we have duplication. Secondly, the TradeBuilderTest
doesn’t show it’s real intent. 

After many refactorings and exploring different ideas, while
pair-programming with one of the guys in my team we came up with this
approach:

```
package org.craftedsw.testingbuilders;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TradeBuilderTest {

	private static final String TRADE_XML_MESSAGE = "<message />";

	@Mock private ReportabilityDecision reportabilityDecision;
	@Mock private Trade trade;

	@Spy @InjectMocks TradeBuilder tradeBuilder;

	@Test public void
	should_create_a_trade_with_all_specified_attributes() {
		given(tradeBuilder.createTrade()).willReturn(trade);

		tradeBuilder
			.withInboundMessage(TRADE_XML_MESSAGE)
			.withReportabilityDecision(reportabilityDecision)
			.build();

		verify(trade).setInboundMessage(TRADE_XML_MESSAGE);
		verify(trade).setReportabilityDecision(reportabilityDecision);
	}

}
```

So now, the TradeBuilderTest express what is expected from the
TradeBuilder, that means, the side effect when the build method is
called. We want it to create a Trade and set its attributes. There are
no duplications with the TradeTest. It is left to the TradeTest to
guarantee the correct behavior of the Trade object.

For completion’s sake, here is the final TradeBuider class:

```
package org.craftedsw.testingbuilders;

public class TradeBuilder {

	private String inboundMessage;
	private ReportabilityDecision reportabilityDecision;

	public static TradeBuilder aTrade() {
		return new TradeBuilder();
	}

	public TradeBuilder withInboundMessage(String inboundMessage) {
		this.inboundMessage = inboundMessage;
		return this;
	}

	public TradeBuilder withReportabilityDecision(ReportabilityDecision reportabilityDecision) {
		this.reportabilityDecision = reportabilityDecision;
		return this;
	}

	public Trade build() {
		Trade trade = createTrade();
		trade.setInboundMessage(inboundMessage);
		trade.setReportabilityDecision(reportabilityDecision);
		return trade;
	}

	Trade createTrade() {
		return new Trade();
	}

}
```

The combination of [Mockito](http://code.google.com/p/mockito/) and
[Hamcrest](http://code.google.com/p/hamcrest/) is extremely powerful,
allowing us to write better and more readable tests.
