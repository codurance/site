---
layout: post
name: 2017-12-07-recursion
title: Recursion
date: 2017-12-07 07:00:00 +00:00
author: Christian Panadero Martinez
image:
   src: /assets/img/custom/blog/2017-12-07-recursion.jpg
tags:
- functional programming
- Scala
- recursion
---

Recursion is a technique that allows us to break down a problem into smaller pieces. This technique allows us to remove some local <a href="https://codurance.com/2017/11/02/side-effects/">side effects</a> that we perform while writing looping structures and also makes our code more expressive and readable. In this post we will see why it is a very useful technique in functional programming and how it can help us.

<h3>Functional loops</h3>
In the function that we wrote in the previous post:

<pre class="prettyprint"><code>def sumIntsTo(i: Int) = {
  var result = 0
  0 to i foreach((i) => result = result + i)
  result
}</code></pre>

You could notice that there is a <a href="https://codurance.com/2017/11/02/side-effects/">side effect</a> in that imperative-like loop. We are assigning the result of the computation to an accumulator because <span style="padding:0;" class="prettyprint"><code>foreach</code></span> is a function that returns Unit. Or in other words, it does not return anything, so we don't have any other choices. That foreach method therefore is a statement. We say that an statement is a block of code that can be executed but not reduced. On the other hand, we say that a block of code that can be reduced is an expression.

<h3>Head recursion</h3>
The first technique that we are going to use is called head recursion. Let's translate the previous function to a head recursive function:

<pre class="prettyprint"><code>def sumIntsToRecursive(i: Int) : Int =
  if (i == 0) 0 else i + sumIntsToRecursive(i - 1)</code></pre>

This function does not have any <a href="https://codurance.com/2017/11/02/side-effects/">side effects</a>. Internally it calculates a sum until we reach the base case which is 0. Here is the stack trace for <span style="padding:0;" class="prettyprint"><code>sumIntsToRecursive(5)</code></span>:

<pre class="prettyprint"><code>sumIntsToRecursive(5)
5 + sumIntsToRecursive(4)
5 + (4 + sumIntsToRecursive(3))
5 + (4 + (3 + sumIntsToRecursive(2)))
5 + (4 + (3 + (2 + sumIntsToRecursive(1))))
5 + (4 + (3 + (2 + (1 + sumIntsToRecursive(0)))))
5 + (4 + (3 + (2 + (1 + 0))))
> 15</code></pre>

We can say that the recursive calls occurs before the computation, or at the head. That means that after the recursive call we can have other blocks to evaluate, or like in this case, we evaluate the first sum after all the consequent evaluations are reduced. 

You could see as well that we have to keep the state of the current computation until we finish evaluating the stack, so in the last step we will end up holding: <span style="padding:0;" class="prettyprint"><code>5 + 4 + 3 + 2 + 1</code></span> and then we will evaluate the last case to finish up with the computation of all the values that we had in the intermediate steps.

Holding this state can be a problem, specially if we deal with a large amount of numbers. If we try to evaluate the previous function passing <span style="padding:0;" class="prettyprint"><code>Integer.MAX_VALUE</code></span> as the argument we will see that the function crashes and gives us a <span style="padding:0;" class="prettyprint"><code>StackOverflowException</code></span>. Even if we achieved our initial purpose of not having <a href="https://codurance.com/2017/11/02/side-effects/">side effects</a>, we do have one if the number is too large to be evaluated. That lead us to the next technique, tail recursion:

<h3>Tail recursion</h3>
The only difference between head and tail recursion is that the recursive calls occurs after the computation, or at the tail. Let's translate the previous function to a tail recursive function:

<pre class="prettyprint"><code>def sumIntsToTailRecursive(i: Int) : Int = {
    @tailrec
    def go(i: Int, acc: Int): Int = {
      if (i == 0) acc
      else {
        val nextI = i - 1
        val nextAcc = acc + i
        go(nextI, nextAcc)
      }
    }
    go(i, 0)
}</code></pre>

As you could notice the last call in the method is the tail recursive call, we need to make the computations before invoking it. That lead us to the following stack trace: 

<pre class="prettyprint"><code>go(5, 0)
go(4, 5)
go(3, 9)
go(2, 12)
go(1, 14)
go(0, 15)
> 15</code></pre>

As you could notice we only have to hold the previous intermediate state, but not all the previous to the current one. If we execute this function with the argument <span style="padding:0;" class="prettyprint"><code>Integer.MAX_VALUE</code></span> we will see that it completes ok.

In modern languages like Scala, Kotlin, etc... Tail recursive calls are converted to imperative loops at compile time to optimize the code. In Scala, when we write a tail recursive function we can annotate the recursive method with <span style="padding:0;" class="prettyprint"><code>@tailrec</code></span>. If we do so, and the function is not tail recursive we will have an error at compile time.

I recommend you to practice writing recursive functions as they are a common technique in functional programming. <a href="https://en.wikipedia.org/wiki/Fibonacci_number">Fibonacci number</a>, <a href="http://www.fryes4fun.com/Bowling/scoring.htm">a bowling score calculator</a> or <a href="https://en.wikipedia.org/wiki/Pascal%27s_triangle">the pascal triangle</a> are good exercises to get used to it.

<h3>References</h3>
<a href="https://www.cs.cmu.edu/~adamchik/15-121/lectures/Recursions/recursions.html">Recursions</a>
<a href="https://en.wikipedia.org/wiki/Recursion_(computer_science)#Tail-recursive_functions">Wikipedia</a>

