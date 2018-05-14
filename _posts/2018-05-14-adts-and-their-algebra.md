---
layout: post
asset-type: post
name: adts-and-their-algebra
title: Algebraic data types and their algebra
description: The algebra of algebraic data types
date: 2018-05-14 08:00:00 +00:00
author: Christian Panadero Martinez
canonical:
  name: Christian's personal blog
  href: https://panavtec.me/functional-programming-notes-algebraic-data-types
image:
   src: /assets/custom/img/blog/2018-05-14-adts/adts.jpg
tags:
- functional programming
- fp
- scala
- haskell
- adts
- algebra

---
When we think about types we usually think about how they can help us to abstract concepts. In this post we will learn how we can think about types in terms of cardinality and why some types are equivalent to others even though, at first sight, it could seem that they are different. In this post you will learn why functional programmers are so interested in the word algebra when describing their programs.

<h2>Cardinality</h2>
The cardinality of a type is the number of possible values that the type can have. A simple example is Boolean, it can host only True or False values, so the cardinality is 2.

A type that has a higher cardinality has more possible values, therefore it is more complex to reason about, it is easier to make mistakes and to make invalid representations of it. An example could be to represent a Boolean as a String. If we do so we will have to guard ourselves when the string is not 'true' or 'false' like null, undefined, possible typos, or any other random string. Take into account that cardinality of String is infinite, you can have a really huge amount of possible values for that type so it is always a good idea to avoid it if you can.

The age of a person is usually represented with an Integer, even if a person can't have a negative age. That leads us to do some defensive programming or create a new type Age that throws an exception in the constructor if the age is less than zero. That is usually because programming languages don't have a built-in unsigned Integer or natural number representation. Wouldn't it be nice to restrict that type to be a natural number? If so, we don't have to check whether a type is less than zero. For example, in Haskell there is <a href="https://hackage.haskell.org/package/natural-numbers-0.1.2.0">a representation of natural numbers</a>. In Scala there is an encoding as well if you use <a href="https://github.com/milessabin/shapeless">shapeless</a>.

But this is only an example, when building our own types we should keep that in mind,  limit the cardinality of types and make invalid states unrepresentable.

<h2>Algebras</h2>
Now that we know about the cardinality of types, we should explain what makes a type an ADT. Maybe you are asking yourself how is a type related to an algebra? To explain this, first, let's define the basic components to form an elementary algebra.

To form an abstract algebra we need numbers, variables and operations; those are the basic components. Now, let's try to encode this in the type system:

<h3>Numbers</h3>
Previously we defined Boolean as 2 given that it can host 2 values, here you can find some other types and its cardinality:

<table width="100%" class="table ">
<thead><tr>
<th>Type</th>
<th>Cardinality</th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td>Void</td>
<td>0</td>
<td>There is no way to construct a Void type, therefore its cardinality is 0</td>
</tr>
<tr>
<td>Unit</td>
<td>1</td>
<td>Unit has the cardinality of one because it has only one value. Its usual representation is ()</td>
</tr>
<tr>
<td>Boolean</td>
<td>2</td>
<td>Boolean has 2 possible values, True and False</td>
</tr>
</tbody>
</table>

Notice that they are reduced to its normal form, that is, no further reduction can be done on those types. Those types are examples that form the numbers of our algebra.

<h3>Variables</h3>
Variables are fairly easy, they are just a symbol to represent an unknown value. Given that those variables have to be encoded in the type system, they have to be parameters of our types. For example, <span class="crayon-inline"><code>List[A]</code></span>, <span class="crayon-inline"><code>Option[B]</code></span>. We don't know the cardinality of A or B because they can be whatever value.

<h3>Operations</h3>
Having defined our numbers and variables the last step is to define operations. The most basic ones are sums and products so let's encode those:

<h4>Sum types</h4>
Also called disjoint unions in some languages, are types that can be either one value or another. Let's take Boolean for a moment as an example, Boolean can be True Or False. The cardinality for this type is: 1 (True) + 1 (False). Do you see why it is a sum type? To check the cardinality of a sum type we sum the cardinality of each of its possible values.

Do you remember when we defined <a href="https://codurance.com/2018/04/27/lists/">list</a> in the previous post? If we fix the parameter to be unit (a single habitant) we can say that a List can be either <span class="crayon-inline"><code>Empty (Nil)</code></span> or a <span class="crayon-inline"><code>Node (::)</code></span>, therefore its structure is another sum type.

There is an alternative encoding which uses <span class="crayon-inline"><code>Either[A, B]</code></span>, that type can be either A or B so our previous <span class="crayon-inline"><code>List</code></span> definition:

<span class="crayon-inline">List[A] = Nil | List[A]</span> is equivalent to: <span class="crayon-inline"><code>List[A] = Either[Nil, List[A]]</code></span>

Although no one in practice uses that last encoding, it is completely equivalent.

<h4>Product types</h4>
In the same manner that sum types exist, we can express product types. We are used to working with them in many languages. Some possible forms are objects, records and tuples. If we take a tuple like (Boolean, Boolean) the possible values are:

<pre class="lang:scala; decode:true">(True, True) - (True, False) - (False, True) - (False, False)</pre>

In other words, 2 times 2. Another example of a product type would be a Scala case class:
<pre class="prettyprint"><code>case class AnElement(propertyA: Boolean, propertyB: Boolean)</code></pre> 

or its algebraic equivalent in typescript: 
<pre class="prettyprint"><code>type AnElement = { propertyA: Boolean, propertyB: Boolean }</code></pre> 

It is the same, its cardinality is equivalent. Even if they could represent different things for us because the 2nd example has names in the type system they represent the same, a set with 4 possible values.

<h2>Creating our own types</h2>
Let's define the domain of a poker deck using types. I will use typescript because the syntax is less verbose than Scala and quite similar to Haskell, although I will show you how to do the same in Scala later on.

A poker deck has 4 suites:
<pre class="prettyprint"><code>type Suite = Hearts | Diamonds | Clubs | Spades</code></pre>

As we can see the cardinality is 4. Let's define now the ranks that you can find in the cards:
<pre class="prettyprint"><code>type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | J | Q | K</code></pre>

We can sum again the habitants to get its cardinality: 13. Last type for our example, let's define a Card:
<pre class="prettyprint"><code>type Card = { rank: Rank, suite: Suite }</code></pre>

A Card is the combination of a Rank and its suite, the cardinality is: 13 (Rank) ⋅ 4 (Suite) = 52, which is the number of cards that you will find in a common poker deck (excluding jokers, of course). Magic? No, just maths.

The syntax to define a sum type in Scala is a little bit more verbose but equivalent:
<pre class="prettyprint"><code>sealed trait Suite
case object Hearts
case object Diamonds
case object Clubs
case object Spades</code></pre>

And I'm not going to define the other two because it is the same.

<h2>Properties</h2>
Now that we have defined all of the needed components to define an algebra, let's prove some of the basic properties in algebra to demonstrate that our elementary algebra still holds for our types:

<h3>Commutativity</h3>
In maths, an operation of two arguments is commutative if after changing its order, the result is the same. Products and sums are commutative because as we all know:
<pre class="prettyprint"><code>(a ⋅ b) ≅ (b ⋅ a)
(3 ⋅ 1) ≅ (1 ⋅ 3)

(a + b) ≅ (b + a)
(3 + 1) ≅ (1 + 3)</code></pre>

And that property holds for our product types:

<span class="crayon-inline"><code>type Card = { rank: Rank, suite: Suite }</code></span> is equivalent to: <span class="crayon-inline"><code>Card = { suite: Suite, rank: Rank }</code></span>

And for sum types: <span class="crayon-inline"><code>type Boolean = True | False</code></span> is equivalent to: <span class="crayon-inline"><code>type Boolean = False | True</code></span>

We could use the other encoding just to make it even more explicit:
<pre class="prettyprint"><code>type Boolean = Either[True, False]</code></pre>
is equivalent to:
<pre class="prettyprint"><code>type Boolean = Either[False, True]</code></pre>

<h3>Associativity</h3>
In maths an operation is associative if the order of the parenthesis can be changed without modifying the result. That holds for products and sums:
<pre class="prettyprint"><code>(a ⋅ b) ⋅ c ≅ a ⋅ (b ⋅ c)
(3 ⋅ 1) ⋅ 2 ≅ 3 ⋅ (1 ⋅ 2)

(a + b) + c ≅ a + (b + c)
(3 + 1) + 2 ≅ 3 + (1 + 2)</code></pre>

As we proved before, it holds for product types:
<span class="crayon-inline"><code>type Card = { rank: Rank, suite: Suite, exposed: Boolean }</code></span>

is equivalent to:

<pre class="prettyprint"><code>type Card = { rank: Rank, suite: Suite }

type ExposedCard = { card: Card, exposed: Boolean }</code></pre>

And for sum types:
<pre class="prettyprint"><code>type Suite = Either[Spades, Either[Clubs, Either[Diamonds, Hearts]]]]</code></pre>

is equivalent to:

<pre class="prettyprint"><code>type Suite = Either[Hearts, Either[Diamonds, Either[Clubs, Spades]]]]</code></pre>

<h3>Distributive property</h3>
The distributive property is a property of sum and products from basic algebra. If you don't remember that, is fine, let me show you an example with numbers first:
<pre class="prettyprint"><code>a (b + c) = (a ⋅ b) + (a ⋅ c)
1 (2 + 3) = (1 ⋅ 2) + (1 ⋅ 3)</code></pre>

It is basically saying that you can distribute that product into the components that are inside the parentheses. And that property applies to our types as well, for example:
<pre class="prettyprint"><code>type Logged = In | Out
type PremiumUser = True | False

type UserState = { logged: Logged, subscription: PremiumUser }</code></pre>

is equivalent to:
<pre class="prettyprint"><code>type UserState = (In, True) | (In, False) | (Out, True), (Out, False)</code></pre>
The cardinality is still the same, 4. This is a refactor using a mathematical property, we probably will choose the first representation for our systems because it is less verbose but in case that you find any program written with the latter you can safely refactor it.

<h2>Bonus algebras</h2>
This is fun, show me more algebraic equivalence!

<span class="crayon-inline"><code>a ⋅ 0 = 0</code></span> is equivalent to: <span class="crayon-inline"><code>(a, Void)</code></span> which is equivalent to Void because we can't construct any Void therefore it can't be constructed
<span class="crayon-inline"><code>a ⋅ 1 = a</code></span> is equivalent to: <span class="crayon-inline"><code>(a, ())</code></span> which is equivalent to just a

<h3>Option</h3>
Option can be <span class="crayon-inline"><code>None</code></span> or <span class="crayon-inline"><code>Some(A)</code></span>, given that there is only one value of type <span class="crayon-inline"><code>None</code></span>, the following is equivalent to:
<span class="crayon-inline"><code>Option[A] = Either[(), A]</code></span>

<h3>Functions</h3>
The cardinality of a function that goes from <span class="crayon-inline"><code>A -> B</code></span> is defined as <span class="crayon-inline"><code>B ^ A</code></span>. For example, using our previous defined types, a function like: <span class="crayon-inline"><code>Card -> Boolean</code></span> has a cardinality of <span class="crayon-inline"><code>2 ^ 4</code></span>.

<span class="crayon-inline"><code>1 ^ a = 1</code></span> is equivalent to: <span class="crayon-inline"><code>A => ()</code></span>

<h3>Currying</h3>
We discussed currying <a href="https://codurance.com/2018/01/18/functions/">before</a> <span class="crayon-inline"><code>(A, B) => C</code></span> is the same as <span class="crayon-inline"><code>A => B => C</code></span>. We can formulate that in an algebraic way:

<pre class="prettyprint"><code>(A, B) -> C ≅ A -> B -> C
C ^ (A, B) ≅ C ^ B ^ A
C ^ (A ⋅ B) ≅ C ^ (B ⋅ A)</code></pre>


