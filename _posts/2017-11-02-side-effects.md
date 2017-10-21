---
author: Christian Panadero Martinez
comments: true
date: 2017-10-20 10:00:00 +00:00
layout: post
asset-type: post
slug: side-effects
title: Side effects
image:
    src: /assets/img/custom/blog/2017-11-02-side-effects.jpg
tags:
- functional programming
---

Functional programming is based on the simple premise that <b>your functions should not have side effects</b>, they are considered evil in this paradigm. <b>If a function has side effects we call it a procedure</b>, so functions does not have side effects. We consider that a function has a side effect if it modifies a mutable data structure, variable, uses IO, throws an exception or halts an error, all of this things are considered side effects. The reason why side effects are bad is because if you had them, a function can give unpredictable results depending on the state of the system; when a function has no side effects we can execute it anytime, it will return always the same result.

Don't get me wrong, this paradigm doesn't try to exterminate side effects, just limit them when they are required. Side effects are needed because without them our programs will do only calculations. We often write to databases, integrate with external systems or write files.

<h3>Referential transparency</h3>
A function that returns always the same result for the same input is called a pure function. A pure function therefore is a function with no observable side effects, keep in mind that if we have any side effect on that function the evaluation will give us different results even if we invoke it with the same arguments. We can substitute a function that is pure with its calculated value, for example: <pre class="prettyprint"><code>def f(x: Int, y: Int) = x + y</code></pre> for the input <span style="padding:0;" class="prettyprint"><code>f(2, 2)</code></span> can be replaced by <span style="padding:0;" class="prettyprint"><code>4</code></span>, it is like a big <a href="https://en.wikipedia.org/wiki/Lookup_table">lookup table</a>. We can do so because it does not have any side effects. This ability to replace an expression with its calculated value is it called <a href="https://en.wikipedia.org/wiki/Referential_transparency">referential transparency</a>.

Referential transparency is important because it allows us to substitute expressions with values or operations with abstractions. This constraints enables us to think and reason about program evaluation called the substitution model. Hence, we can say that expressions that can be replaced by values are deterministic, as they return an expected value for a given input.

<h3>Local side effects</h3>
We defined a function with side effects as a function that does internally some mutation, performs some output, etc… But what about functions that always return the same value even tho they do internally some side effect? For example this function:

<pre class="prettyprint"><code>def sumIntsTo(i: Int) = {
  var result = 0
  0 to i foreach((i) => result = result + i)
  result
}</code></pre>

That function has a side effect, it assigns result for every iteration of the for loop. But even that it does that side effect the function can be replaced by a value because it is deterministic, <span style="padding:0;" class="prettyprint"><code>sumsIntsUntil(5) = 10</code></span> and <span style="padding:0;" class="prettyprint"><code>sumsIntsUntil(10) = 45</code></span> etc… We say that the function has a local side effect but the user of that function does not care as it does not break our substitution model. Therefore, this function is pure, even if it has a local side effect.

This is a common practice to optimize functions. We can find some examples in the class List of Scala. For instance this is the implementation of the function drop:

<pre class="prettyprint"><code>def drop(n: Int): List[A] = {
    var these = this
    var count = n
    while (!these.isEmpty && count > 0) {
      these = these.tail
      count -= 1
    }
    these
  }</code></pre>

As you could see there are a lot of names and terms in this little post, there are a lot of them in this paradigm and they are very important because it gives us a vocabulary to express more complex concepts in terms of other concepts. I will continue explaining more concepts in the next post.

<h3>References</h3>
<a href="https://en.wikipedia.org/wiki/Side_effect_(computer_science)">Wikipedia</a>
<a href="https://www.manning.com/books/functional-programming-in-scala">Manning functional programming in Scala</a>

