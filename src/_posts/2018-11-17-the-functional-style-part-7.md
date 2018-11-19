---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 7"
date: 2018-11-17 00:00:00
description: Functional programming explained for the pragmatic programmer. Part 6. Lazy evaluation.
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---

# Lazy evaluation.

<p style="font-style: italic; margin: 0em 3em 1em 3em">To see a world in a grain of sand and heaven in a wild flower<br/>
Hold infinity in the palm of your hand and eternity in an hour
</p>
<p>- William Blake</p>

Several ago, I was attending a training course on C#. I recall having trouble understanding two things in particular. One of them was LINQ, which was partly a matter of not quite being able to wrap my mind round the syntax, and also because I hadn’t yet learned about the functional style of programming. It makes a lot more sense to me now. The other thing was the `yield` keyword, but maybe it was explained to me poorly, because in fact it’s really quite simple. The .NET documentation gives this example usage:

```csharp
public class PowersOf2
{
    static void Main()
    {
        foreach (var i in Power(2, 8))
            Console.Write("{0} ", i);
    }

    public static IEnumerable<int> Power(int number, int exponent)
    {
        var result = 1;
        for (var i = 0; i < exponent; i++)
        {
            result = result * number;
            yield return result;
        }
    }
}
```

When run it prints out: `2 4 8 16 32 64 128 256`

What happens is, the `Power` method is declared to return an `IEnumerable` instance, and the foreach loop calls `MoveNext` on it repeatedly. However, the `Power` method does not explicitly create an instance of `IEnumerable`. By using the `yield return` statement, the method itself defines an iterator instead. The value returned is the first iterated element. At this point, control returns to the foreach loop whereupon its body is executed once. Then it calls `MoveNext` on the iterator, which causes control to return to the point immediately after the `yield return` statement. All state internal to the `Power` method is preserved from before. In this case, it will iterate the for loop again and supply the next iterated element. Control thus continually jumps between the foreach loop and the `yield return` statement until finally `Power` exits without calling `yield return` again.

As [the documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield) explains it, the principal use case for `yield return` is to implement an iterator for a custom collection type in a method, without the need to create a new `IEnumerable` or `IEnumerator` implementation, thus avoiding the need to define a new class. It gives another example to illustrate this point.

### But what if the iterator method never exits?

```csharp
public static IEnumerable<int> Numbers()
{
    var number = 1;
    for (;;)
        yield return number++;
}
```

If we call it like this, we print out `1 2 3 4 5 6 7 8 9 10`:

```csharp
static void Main()
{
    foreach (var i in Numbers())
    {
        Console.Write("{0} ", i);
        if (i == 10)
            break;
    }
}
```

Now we _have_ to break out of the loop because clearly `Numbers` will never exit normally. So what would be the point of that? A deep and profound point, in fact. What we have now is an `IEnumerable` that purports to contain all the natural numbers, which is an infinite set.

### Surely that is impossible!

Indeed it is, but it turns out that the promise is much more important than the fact that it cannot be kept.

If you recall in part 4 we had this code that generates a sieve of prime numbers and returns a predicate for testing whether or not a number is prime:

```java
private Predicate<Integer> notInNonPrimesUpTo(int limit) {
    Set<Integer> sieve = IntStream.range(2, (limit / 2))
            .boxed()
            .flatMap(n -> Stream.iterate(n * 2, nonPrime -> nonPrime += n)
                    .takeWhile(nonPrime -> nonPrime <= limit))
            .collect(Collectors.toSet());
    return candidate -> !sieve.contains(candidate);
}
```

I said that the `Stream.iterate` was interesting and that I would come back to it later. The time has come. This is another purportedly infinite list:

```java
Stream.iterate(n * 2, nonPrime -> nonPrime += n)
```

It generates a stream of integers beginning at `(n * 2)` and increasing by `n` each time. Notice there is no upper bound there. The part that makes it stop taking integers from the stream - when they exceed the value of `limit` - is here:

```java
      .takeWhile(nonPrime -> nonPrime <= limit)
```

Also, if you recall in the previous article we saw several uses of the `range` function in Clojure. In each case I used it in this manner:

```clojure
(range 1 10)
```

which evaluates to a list of numbers from 1 to 10. But we can call `range` with no arguments as well:

```clojure
user=> (take 5 (range))
(0 1 2 3 4)
```

That's right, `range` with no arguments is another purportedly infinite list of integers. However, if you execute `(range)` in the REPL by itself then it will hang and do nothing. It is waiting for something to be taken. Just as with the Java stream, and the C# `yield` loop, it is only when values are requested that they are generated. This is why the evaluation is said to be lazy. An ‘eagerly’ evaluated sequence generates all its values immediately on creation, just as `(range 1 10)` does. A ‘lazily’ evaluated sequence only generates its values on demand. It is this deferred execution that enables the pretence of infinite sequences. With a wink and a knowing nod, the pretence can be maintained, provided the program never actually asks for the promise to be fulfilled.

### Loop indices.

As you have probably figured out by now, I like a clever trick as much as the next person, but I like it best if it can be put to some practical use that makes my code better. So it is with lazy evaluation.

Earlier in the series, I asserted that the adopting functional style means you will hardly ever have to write a loop again. Mapping and reducing do indeed cover a great many use cases, but nevertheless sometimes you do need to keep track of your iteration with some kind of counter. For the sake of pragmatism, rather than go through the contortions necessary to do it in a functional style in a language like C# or Java, I wouldn’t bother. I would just use a traditional for loop instead:

```java
public void IterateWithIndex()
{
    var numbers = new[] {"one", "two", "three", "four", "five"};
    for (var i = 0; i < numbers.Length; i++)
        Console.WriteLine("{0}: {1}", i, numbers[i]);
}
```

I _do_ prefer not to mutate state unnecessarily, but I consider simplicity a higher virtue still, and in some languages this is still the simplest way to tackle the problem. All else being equal, I would choose three lines of simple code that mutates state over half a dozen lines of inscrutable functional code that does the same job.

Some languages give you an easy way out-of-the-box to iterate a sequence in a functional style while also giving you an iteration counter. Groovy provides an `eachWithIndex` method that allows this to be done without the administration work:

```groovy
[
        [symbol: 'I', value: 1],
        [symbol: 'V', value: 5],
        [symbol: 'X', value: 10],
        [symbol: 'L', value: 50],
        [symbol: 'C', value: 100],
        [symbol: 'D', value: 500],
        [symbol: 'M', value: 1000],
].eachWithIndex { numeral, i -> 
    println("${i}: ${numeral.symbol} ${numeral.value}")
}
```

Swerving back to lazy evaluation, the problem could be solved in Clojure in an interesting way by using `(range)`:

```clojure
(map (fn [i number] (format "%d: %s" i number))
     (range)
     '("one" "two" "three" "four" "five"))
```

Recall that `map` on multiple sequences keeps going until the shortest of the sequences runs out. Clearly the lazily evaluated sequence is not going to run out first, so it keeps counting up until the other list is exhausted. Therefore, the result is:

```
("0: one" "1: two" "2: three" "3: four" "4: five")
```

That said, Clojure also provides the `map-indexed` function which does a similar job to `eachWithIndex` in Groovy:

```clojure
(map-indexed (fn [i number] (format "%d: %s" i number))
             '("one" "two" "three" "four" "five"))
```

### You're going round in circles. Show me an example where lazy evaluation really helps.

One situation I faced in the real world recently, which required a loop index, was tht I wanted to write log messages with parameters in them. I chose a template format similar to that used in C#, i.e.:

```
The {0} has a problem. Cause of failure: {1}. Recommended solution: {2}.
```

That wasn’t one of the actual log messages but you get the idea. The program was in Java and the solution quite straightforward:

```java
{% raw  %}
private String replaceParameters(String template, String... parameters) {
    var out = template;
    for (var i = 0; i < parameters.length; i++)
        out = out.replace(String.format("{%d}", i), parameters[i]);
    return out;
}
{% endraw  %}
```

It is totally imperative and it mutates its internal state shamelessly. Now we _could_ try to rewrite it into a more functional style:

```java
{% raw  %}
private String replaceParameters(String template, String... parameters) {
    var i = new AtomicInteger(0);
    return Arrays.stream(parameters)
            .reduce(template, (string, parameter) ->
                    string.replace(
                            String.format("{%d}", i.getAndIncrement()),
                            parameter));
}
{% endraw  %}
```

but I don’t think this is pragmtic. Rather, I think this is using the functional style just for its own sake, not because it is better. Recall what I said about the sweet spot for functional programming? This isn’t it either. For one thing, I've had to break it into more lines to try to aid readability, so it lacks the clarity of the original. And it still mutates state anyway - the `AtomicInteger` is being incremented.

So I'd use an old-fashioned `for` loop instead, but what about in a properly functional language where we cannot? In Clojure, the `map-indexed` function won't help here. This job calls for the use of `reduce` instead, and there is no `reduce-indexed` function. What we _do_ have is `zipmap`, sometimes called “zip” in other languages. It is so named because its behaviour is reminiscent of the action of a zipper fastening:

```clojure
user=> (zipmap [1 2 3] ["one" "two" "three"])
{1 "one", 2 "two", 3 "three"}
```

We can use it to write a parameter replacement function using `reduce` like this:

```clojure
{% raw  %}
(defn- replace-parameter [string [i parameter]]
  (clojure.string/replace string (format "{%d}" i) parameter))

(defn replace-parameters [template parameters]
  (reduce replace-parameter template (zipmap (range) parameters)))
{% endraw  %}
```

and it works!

```
user=> (replace-parameters
  #_=>   "The {0} has a problem. Cause of failure: {1}. Recommended solution: {2}."
  #_=>   ["time machine" "out of plutonium" "find lightning bolt"])
"The time machine has a problem. Cause of failure: out of plutonium. Recommended solution: find lightning bolt."
```

### Being lazy ourselves.

We’ve played a bit with lazy sequences out of the box, so let’s do a little exercise that involves building one of our own. You may have heard of Pascal’s Triangle. In mathematical terms, Pascal’s Triangle is a triangular array of the binomial coefficients, but you don’t really need to know what that means because it is very simple to construct. You begin by placing a 1 at the apex and then build a triangle by placing rows of numbers below, offset to the left and right of the numbers above, so that each row has one more number in it than the one above. Each number is equal to the sum of the two numbers above it; for numbers on the edge of the triangle, absent numbers are treated as zero. This diagram should make it clear:

```
     1
    1 1
   1 2 1
  1 3 3 1
 1 4 6 4 1
```

Writing a program to produce this is an interesting problem. It becomes much simpler when you see that the next row can be generated by duplicating the previous row, shifting one of them to the left or right, and then summing the offset digits, i.e.

```
    1  4  6  4  1  0
+   0  1  4  6  4  1
=   1  5 10 10  5  1
```

In Clojure terms this can be expressed like this:

```clojure
(defn next-row [previous]
  (apply vector (map + (conj previous 0)
                       (cons 0 previous))))
```

A quick test shows that it works:

```
#'user/next-row
user=> (next-row [1])
[1 1]
user=> (next-row [1 1])
[1 2 1]
user=> (next-row [1 2 1])
[1 3 3 1]
```

and then we can build a whole triangle lazily using `iterate` like this:

```clojure
(def triangle (iterate next-row [1]))
```

`iterate` builds a sequence lazily by repeatedly applying the result of the previous iteration to the `next-row` function, starting with the seed value `[1]`, which is a vector containing the number 1.

You can then take as many rows from `triangle` as you wish:

```
user=> (take 7 triangle)
([1] [1 1] [1 2 1] [1 3 3 1] [1 4 6 4 1] [1 5 10 10 5 1] [1 6 15 20 15 6 1])
```

and even request any arbitrary row:

```
user=> (nth triangle 10)
[1 10 45 120 210 252 210 120 45 10 1]
```

Obviously, although `triangle` appears to be a sequence, no actual sequence ever exists in memory, unless you happen to build one yourself out of the results. If you read back to the `yield return` example in C# at the beginning, you will see the same behaviour there. Paradoxically, unlimited collections require less memory!

### Do repeat yourself.

To finish our exploration of lazy evaluation, let's have a bit of fun. As someone once drily observed, the kata of FizzBuzz is popular because it avoids the awkwardness of realising no-one in the room can remember how to binary search an array. If you’re one of the handful of people in the world not familiar with the game, it’s dead simple: you count through the numbers while replacing all multiples of three with “Fizz,” all multiples of five with “Buzz,” and all multiples of both with “FizzBuzz.”

<p style="margin: 0em 3em 1em 3em; font-style: italic">N.B. It is usually said to have originated as a drinking game, and indeed I did play a drinking game like this at university, although the Warwick Rules were slightly different. As we played it, buzz was four not five, and there was an additional rule: when the decimal number contained a digit 3 then you also had to say “fizz” and when it contained 4 you had to say “buzz.” Therefore, 12 was “fizzbuzz,” 13 was “fizz,” 14 was “buzz” and 15 was “fizz” again. This made it a bit more complicated and therefore we got more drunk.<br/><br/>

We once tried during a band social playing it with binary numbers, but the baritone sax player objected on the grounds that he was a law student not a scientist. So we agreed to do it in roman numerals instead, thus killing two katas in one.</p>

If there is a canonical implementation, in Java it probably looks something like this:

```java
public class FizzBuzz {

    public static void main(String[] args) {
        for (var i = 0; i < 100; i++)
            System.out.println(fizzBuzz(i));
    }

    private static String fizzBuzz(int i) {
        if (i % 3 == 0 && i % 5 == 0)
            return "FizzBuzz";
        else if (i % 3 == 0)
            return "Fizz";
        else if (i % 5 == 0)
            return "Buzz";
        else
            return String.valueOf(i);
    }
}
```

<p>(but definitely not <a href="https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition">like this</a>).</p>

Maybe it isn’t an arithmetic problem at all though. The whole cycle repeats continuously with a period of fifteen, like this:

_number, number, Fizz, number, Buzz, Fizz, number, number, Fizz, Buzz, number, Fizz, number, number, FizzBuzz_

so perhaps we can treat it that way in our program. Clojure has a function called `cycle` which lazily repeats a supplied pattern endlessly:

```
user=> (take 10 (cycle [nil nil "Fizz"]))
(nil nil "Fizz" nil nil "Fizz" nil nil "Fizz" nil)
```

If we had a function that mapped over these three lazy sequences we could produce a lazily evaluated FizzBuzz implementation out of them:

```clojure
(def numbers (map inc (range)))
(def fizzes (cycle [nil nil "Fizz"]))
(def buzzes (cycle [nil nil nil nil "Buzz"]))
```

The `map inc` is necessary because `range` starts from 0 and we need it to start from 1. Let’s have a stab at writing the function:

```clojure
(defn fizzbuzz [n fizz buzz]
  (if (or fizz buzz)
      (str fizz buzz)
      (str n)))
```

That’s pretty simple; if either `fizz` or `buzz` are truthy then concatenate them both together (when concatenating strings, nil is treated like an empty string) otherwise return `n` as a string. When we map it over the lazy sequences, we get FizzBuzz:

```
user=> (take 30 (map fizzbuzz numbers fizzes buzzes))
("1" "2" "Fizz" "4" "Buzz" "Fizz" "7" "8" "Fizz" "Buzz" "11" "Fizz" "13" "14" "FizzBuzz" "16" "17" "Fizz" "19" "Buzz" "Fizz" "22" "23" "Fizz" "Buzz" "26" "Fizz" "28" "29" "FizzBuzz")
```

We can also use `nth` to obtain any value from the sequence (remembering that nth counts from zero, not one):

```
user=> (nth (map fizzbuzz numbers fizzes buzzes) 1004)
"FizzBuzz"
```

Isn’t that cool?

### Next time.

In the next article, I will conclude our examination of the practical aspects of functional programming. I will take a look at how functional languages are able to implement immutable data structures while simultaneously giving the impression that they are mutable.
