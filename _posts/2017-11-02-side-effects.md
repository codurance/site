---
author: Christian Panadero Martinez
comments: true
date: 2017-11-02 08:00:00 +00:00
layout: post
asset-type: post
slug: side-effects
title: Side effects
description: Functional programming is based on the premise that your functions should not have side effects, but what is a side effect?
canonical:
  name: Christian's personal blog
  href: http://panavtec.me/functional-programming-notes-side-effects
image:
  src: /assets/img/custom/blog/2017-11-02-side-effects.jpg
tags:
- functional programming
- scala
---

Functional programming is based on the simple premise that <b>your functions should not have side effects</b>, they are considered evil in this paradigm. <b>If a function has side effects we call it a procedure</b>, so functions do not have side effects. We consider that a function has a side effect if it modifies a mutable data structure or variable, uses IO, throws an exception or halts an error; all of these things are considered side effects. The reason why side effects are bad is because if you had them, a function can be unpredictable depending on the state of the system; when a function has no side effects we can execute it anytime, it will always return the same result, given the same input.

Don't get me wrong, this paradigm doesn't try to get rid of side effects, just limit them when they are required. Side effects are needed because without them our programs will do only calculations. We often have to write to databases, integrate with external systems or write files.

<h3>Referential transparency</h3>
A function that returns always the same result for the same input is called a pure function. A pure function therefore is a function with no observable side effects, if there are any side effects on a function the evaluation could return different results even if we invoke it with the same arguments. We can substitute a pure function with its calculated value, for example: <pre class="prettyprint"><code>def f(x: Int, y: Int) = x + y</code></pre> for the input <span style="padding:0;" class="prettyprint"><code>f(2, 2)</code></span> can be replaced by <span style="padding:0;" class="prettyprint"><code>4</code></span>, it is like a big <a href="https://en.wikipedia.org/wiki/Lookup_table">lookup table</a>. We can do so because it does not have any side effects. The ability to replace an expression with its calculated value is called <a href="https://en.wikipedia.org/wiki/Referential_transparency">referential transparency</a>.

Referential transparency is important because it allows us to substitute expressions with values. This property enables us to think and reason about the program program evaluation using the substitution model. Hence, we can say that expressions that can be replaced by values are deterministic, as they always return the same value for a given input.

<h3>Local side effects</h3>
We defined a function with side effects as a function that does some visible mutation, uses IO, etc… But what about functions that always return the same value even though they do some side effect internally? For example:

<pre class="prettyprint"><code>def sumIntsTo(i: Int) = {
  var result = 0
  0 to i foreach((i) => result = result + i)
  result
}</code></pre>

That function has a side effect, it mutates the result variable in every iteration of the loop. But even if it does that side effect the function can be replaced by a value, because the side effects are not visible from the outside. In other words, the function is deterministic, <span style="padding:0;" class="prettyprint"><code>sumsIntsUntil(5) = 10</code></span> and <span style="padding:0;" class="prettyprint"><code>sumsIntsUntil(10) = 45</code></span> etc… We say that the function has a local side effect but the user of that function does not care as it does not break our substitution model. Therefore, this function is pure, even if it has a local side effect.

Consider now a similar example but with a slightly difference:

<pre class="prettyprint"><code>object { 
  var result = 0
  def sumIntsTo(i: Int) = {
    0 to i foreach((i) => result = result + i)
    result
  }
}</code></pre>

With this particular variation, when we call for the 1st time the function: <span style="padding:0;" class="prettyprint"><code>sumsIntsUntil(5)</code></span> it will give us 10 but if we call it again with the same input will give us 20. This is the reason why variable mutation is considered a side effect, even though in the previous example the side effect is local to the function, making it deterministic.

The use of local side effects is a common practice to optimize functions. We can find some examples in Scala’s List class. For instance, this is the implementation of the drop function:

<pre class="prettyprint"><code>def drop(n: Int): List[A] = {
  var these = this
  var count = n
  while (!these.isEmpty && count > 0) {
    these = these.tail
    count -= 1
  }
  these
}</code></pre>

As you could see there are a lot of names and terms in this little post; there are a lot of them in this paradigm and they are very important because it gives us a vocabulary to express more complex concepts in terms of other concepts. I will continue explaining more concepts in the next post.

<h3>References</h3>
<ul>
  <li><a href="https://en.wikipedia.org/wiki/Side_effect_(computer_science)">Wikipedia</a></li>
  <li><a href="https://www.manning.com/books/functional-programming-in-scala">Manning functional programming in Scala</a></li>
</ul>
