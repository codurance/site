---
author: Mashooq Badar
comments: true
date: 2010-05-27 15:21:25+00:00
layout: post
slug: naming-your-unit-tests
title: Naming your Unit Tests
wordpress_id: 118
categories:
- development
tags:
- tdd
---

Often I see Unit Tests with the test methods that have the same name as the method under test prefixed with the word "test" e.g. `testSubmitApplication`. This provides no extra information on which "flow" of the mothod is being tested. Other test method names provide a bit more information by suffixing the nature of the test e.g. `testSubmitApplicationWithInvalidCriteria`. It better but not much better. A number of IDEs actually allow the developer to generate test method names based on the class under test which in my opinion defeats the object.

Unit test methods should be named in such as way that they provide a clear description of the test. In my opinion the prefix "test" is redundent and should never appear in your test method names unless it is part of the domain vocabulary. For example `AppicationSubmittedWithInvalidCriteriaMustRaiseException`* is more informative then `testSubmitApplication`. Providing a more descriptive name also serves to keep a clear focus on the flow under test and leads the devloper to create a test method per flow.

Please Note that the example method name is a simplification. I would consider the term "InvalidCriteria" a bit too high-level for a real unit test. It should be more specific such as `AppicationSubmittedWithNoSurnameMustRaiseException`.
