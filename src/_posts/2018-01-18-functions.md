---
layout: post
name: 2018-01-18-functions
title: Functions
date: 2018-01-18 07:00:00 +00:00
author: Christian Panadero Martinez
canonical:
  name: Christian's personal blog
  href: http://panavtec.me/functional-programming-notes-functions
image:
   src: /assets/custom/img/blog/2018-01-18-functions/functions.jpg
tags:
- functional programming
- scala
- functions 
- partial application
- Higer order functions
---

In the previous posts, we took a look at how functions are the core pieces in functional programming languages. We talked about <a href="https://codurance.com/2017/11/02/side-effects/">pure functions, referential transparency, side effects</a> and <a href="https://codurance.com/2017/12/07/recursion/">recursion</a> in the previous posts. In this post, we are going to explore some properties of functions and how we can use them in a functional programming language.

### Function definition

A function is a black box that given an input <b>always</b> gives you back the same output. As we stated before, a function does not have any side effects; if it has any, it could be a procedure but not a function. Function is a term that comes from Mathematics and there is no concept of side effect in there. A function accepts a set of input values; we call that the domain of a function. The output of a function is called <i>codomain</i> and the set of outputs is called the <i>image</i> of the function. We can decompose them like this:

```
f: A -> B</code></pre>
```

Where A is the domain and B is the codomain. For example, for the function <span style="padding:0" class="prettyprint"><code>f(x) = 2x</code></span> we can decompose it as it follows:

![domain-codomain-image]({{ site.baseurl }}/assets/custom/img/blog/2018-01-18-functions/diagram.png)

Where as we stated, <span style="padding:0" class="prettyprint"><code>A</code></span> is the domain, <span style="padding:0" class="prettyprint"><code>B</code></span> is the codomain and <span style="padding:0" class="prettyprint"><code>[2, 4, 6]</code></span> is the image of the function.

### Arity
Arity is the number of arguments that a function takes. We say that the arity of <span style="padding:0" class="prettyprint"><code>f(x: Int)</code></span> is 1, or that is a unary function, or that is a function with one argument. Therefore, the arity of a function can be expressed with a number or the spring term. Unary, binary, ternary, etc... Are words that come from Latin, but mathematicians usually use Greek instead of Latin so usually they interchange those words for the same ones coming from Greek. We can say as well that the arity of a function is monadic, dyadic or triadic.

### Function composition
Function composition is one of the bases of functional programming. The idea is that if you have a function <span style="padding:0" class="prettyprint"><code>f = A->B</code></span> and a function <span style="padding:0" class="prettyprint"><code>g = B->C</code></span> you can create a 3rd function <span style="padding:0" class="prettyprint"><code>h = A->C</code></span> which internally uses <span style="padding:0" class="prettyprint"><code>f</code></span> and <span style="padding:0" class="prettyprint"><code>g</code></span> to create that <span style="padding:0" class="prettyprint"><code>C</code></span>, that is: <span style="padding:0" class="prettyprint"><code>h = g(f(x))</code></span>. If we express it in mathematical terms we can say that <span style="padding:0" class="prettyprint"><code>h = f∘g</code></span> readed as "h is equal to f after g" or what is the same: <span style="padding:0" class="prettyprint"><code>h = C<sub>g</sub>f</code></span>
An example of function composition is: 
<pre class="prettyprint"><code>def intToString(i: Int) : String = i.toString
def stringToDouble(s: String) : Double = s.toDouble
val composedFunction = stringToDouble _ compose intToString</code></pre>
We declared two functions <span style="padding:0" class="prettyprint"><code>intToString</code></span> and <span style="padding:0" class="prettyprint"><code>stringToDouble</code></span>, when we compose them we create a 3rd function which accepts an int and returns an double. So if we call it: <span style="padding:0" class="prettyprint"><code>composedFunction("32")</code></span> it returns <span style="padding:0" class="prettyprint"><code>32.0</code></span> which is the result after converting that String to int, and from that int to a Double. Notice that when composing functions, the functions are applied from right to left, this time: <span style="padding:0" class="prettyprint"><code>intToString</code></span> and then <span style="padding:0" class="prettyprint"><code>stringToDouble</code></span>. We can do the same without modifying the order of the functions with the function <span style="padding:0" class="prettyprint"><code>andThen</code></span>, this will be like this:
<pre class="prettyprint"><code>val composedFunction2 = intToString _ andThen stringToDouble</code></pre>
  
This is the same and in my opinion less confusing.
This last expression could be stated without infix operators as it follows:
<pre class="prettyprint"><code>val composedFunction2 = (intToString(_)).andThen(stringToDouble)</code></pre>
<h3>Higher-order functions</h3>
The idea behind higher-order functions is that functions are values, hence functions can be passed around as we do with Integers, Strings, etc... Functions that accept other functions as arguments or return functions are called higher-order functions.
An example of a really common higher order function is map, its definition in Scala’s List class is:
<pre class="prettyprint"><code>def map[B](f: A => B): List[B]</code></pre>
The meaning of map is to apply a transformation to every element of the List and returning a new List with all the new transformed elements.
If a language supports higher order functions, we say that the functions in that language are treated as <a href="https://en.wikipedia.org/wiki/First-class_citizen">first class citizens</a>, that is, functions are first class functions. So when we refer to a programming language, we say that the language supports first class citizens but if we refer to a function, we say that the function is a first class function.
One of the convenient usages of higher-order functions is to create inline functions, which we call anonymous functions or function literals. One example using the previously defined map, could be this:
<pre class="prettyprint"><code>List(1).map(i => i + 1)</code></pre>
As you can see, the function <span style="padding:0;" class="prettyprint"><code>i => i + 1</code></span> is passed in as an argument of the <span style="padding:0;" class="prettyprint"><code>map</code></span> function.
<h3>Partial application</h3>
Partial application means that for a function that accepts a number of arguments, N, we can fix or bind some of its arguments that it takes to reduce the arity of the function. Consider these two functions:
<pre class="prettyprint"><code>def sum(a: Int, b: Int) = a + b
def sumOfOneWith(a: Int) = sum(1, a)</code></pre>
Notice that <span style="padding:0;" class="prettyprint"><code>sumOfOne</code></span> partially applies the function sum reducing its arity to 1. This is super useful and if you take a look on the internet you will see some people using this technique as a replacement for dependency injection.
<h3>Currying</h3>
Currying is a technique that allows us to decompose a function with arity N (where N is > 1) in a chain of calls to smaller functions with arity 1. Let's see an example:
<pre class="prettyprint"><code>def sumCurried = (a: Int) => (b: Int) => a + b
sumCurried(1)(1) == 2</code></pre>
Now <span style="padding:0;" class="prettyprint"><code>sumCurried</code></span> returns a function which returns another function and that last one calculates the result. Doing that we reduced the arity of sum to 1 expressing it as a smaller function. Scala can automatically curry a function using the <span style="padding:0;" class="prettyprint"><code>curried</code></span> function, an example of the previous version of sum:
<pre class="prettyprint"><code>sum _ curried</code></pre>
This is a sample curry implementation:
<pre class="prettyprint"><code>def curry[A, B, C](f: (A, B) => C): A => (B => C) = a => b => f(a, b)</code></pre>
What it does, is to receive a function with arity 2 and return a function with arity 1 that returns another function with arity 1, and finally that function calls the given function with the required parameters. Take some time to digest this, and if you have the chance, play around a little until you understand the concept. It is a powerful technique but it takes some time to fully understand it.
We can, as well, uncurry a function. It is the same concept but all the way around, so we take a function with less arity and we convert it to another with a higher arity. The dual of the previous function is:
<pre class="prettyprint"><code>def uncurry[A, B, C](f: A => (B => C)): (A, B) => C = (a, b) => f(a)(b)</code></pre>
This time it takes a function with arity 1 and it returns a function with arity 2 that finally applies those arguments to the original one.
<h3>Currying VS partial application</h3>
So, what is the difference between curry and partial application? As we stated before:
<ul>
<li>Currying: Ability to decompose a function with arity N (where N is > 1) in a chain of calls to smaller functions with arity 1</li>
<li>Partial application: Possibility to apply a function with a given set of arguments to reduce the original function arity. A requirement to do partial application is that the function is already curried so that we can apply arguments one by one</li>
</ul>
This is an example of how to apply currying to a binary function:
<pre class="prettyprint"><code>@ def aFunction(a: Int, b: String) : String = a.toString + b 
defined function aFunction
@ val curriedFunction = curry(aFunction) 
curriedFunction: Int => String => String = ammonite.$sess.cmd1$$$Lambda$2127/1053392896@788bebee
</code></pre>
This is an example of how to partially apply a curried function:
<pre class="prettyprint"><code>@ val partiallyAppliedFunction = curriedFunction(1) 
partiallyAppliedFunction: String => String = ammonite.$sess.cmd1$$$Lambda$2140/255517071@6ad5f700
@ partiallyAppliedFunction("") 
res12: String = "1"
</code></pre>
There is a small difference, but is important to understand it. 
