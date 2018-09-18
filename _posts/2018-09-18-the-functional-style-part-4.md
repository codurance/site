---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 4"
date: 2018-09-18 00:00:00
description: Functional programming explained for the pragmatic programmer. Part 4. First-class Functions II - Filter, Reduce & more.
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---
# First-Class Functions II: Filter, Reduce & more.

In the previous article I introduced the concept of first-class functions and lambdas, demonstrated the technique of
'mapping' a function over an array and advanced it as an alternative to explicit iteration. I went on to assert that the majority of the 
loops we write are either for that purpose of mapping one type of array into another, or they are for filtering elements
from an array, searching for elements in an array, sorting them, or accumulating totals. I promised to show examples of 
all these. I’d better make good on my promise, so to begin I'm going to plunder classical antiquity for an example.

### The Sieve of Eratosthenes.

This is an algorithm for finding prime numbers, discovered by the greek scholar Eratosthenes in the 3rd century BC. It
is very simple. To find all the prime numbers up to some number _n_ what you do is:

1. Iterate all the natural numbers **i** where 2 ≤ **i** ≤ (**n**  ∕ 2).
1. For each **i**, mark every multiple **m** of **i** as non-prime, where 2**i** ≤ **m** ≤ **n**.
1. When you’re done, all the natural numbers up to **n** that remain unmarked are prime.

In Java code, that could look like this:

```java
public class Sieve {

    private Set<Integer> sieve = new HashSet<>();
    private int limit;

    public Sieve(int limit) {
        this.limit = limit;
        for (var n = 2; n <= (limit / 2); n++)
            for (var nonPrime = (n * 2); nonPrime <= limit; nonPrime += n)
                sieve.add(nonPrime);
    }

    public List<Integer> primes() {
        var primes = new ArrayList<Integer>();
        for (var candidate = 1; candidate <= limit; candidate++)
            if (!sieve.contains(candidate))
                primes.add(candidate);
        return primes;
    }
}
```

The constructor creates the sieve and then the `primes()` method effectively “strains” the numbers through the sieve to 
extract the primes. We can use it to print out all the prime numbers between 1 and 10,000:

```java
public static void main(String[] args) {
    var sieve = new Sieve(10000);
    var primes = sieve.primes();
    for (var prime : primes)
        System.out.print(prime + " ");
    System.out.println();
}
```

So far, so imperative. I picked this exercise as an example for filtering because, after all, what is a sieve but a 
filter? So let’s rewrite the sieve in a functional style:

```java
public List<Integer> primes() {
    return IntStream.range(1, limit)
            .filter(candidate -> !sieve.contains(candidate))
            .boxed()
            .collect(Collectors.toList());
}
```

Even if the `IntStream` is new to you hopefully its purpose is clear: it gives us a stream of integers from 1 to 
`limit`. The `.boxed()` call maps the stream of ints to a stream of Integers so that we can collect it to a List in the 
terminating operation, because you cannot create a List of primitives (if you recall from the previous article, 
primitives in Java are a pain).

Now, we could collect the primes to a Set instead, and that might in fact be more appropriate because we only want each 
prime to appear in the output once:

```java
public Set<Integer> primes() {
    return IntStream.range(1, limit)
            .filter(candidate -> !sieve.contains(candidate))
            .boxed()
            .collect(Collectors.toSet());
}
```

However, that has the undesired effect of producing the result out of order:

```
1 2 3 4099 5 2053 7 6151 11 13 2063 4111 17 8209 19 6163 2069 23 8219 [...]
```

We could fix that by streaming and sorting the results too:

```java
public static void main(String[] args) {
    var sieve = new Sieve(10000);
    sieve.primes().stream()
            .sorted()
            .forEach(prime -> System.out.print(prime + " "));
    System.out.println();
}
```

We can take this further still though, by mapping the Integers to Strings and then using `Collectors.joining` to append 
them together and interpose the spaces for us:

```java
public static void main(String[] args) {
    var sieve = new Sieve(10000);
    System.out.println(sieve.primes().stream()
            .sorted()
            .map(Object::toString)
            .collect(Collectors.joining(" ")));
}
```

Maybe you begin to see the appeal of the functional style. Just declare what you want to happen and have the language 
arrange it for you. No more worrying about fencepost errors! The previous version of the code appends a space after
every number, and if it was important to you that it should not, fixing it would be quite awkward. How many 
situations have you had to program your way out of before that this could have helped you with? I've been there often.

I really want to stress this point. This is programmer labour saving right here. Not the kind of labour saving in the 
way some have dreamed of for decades: where people express their wishes in some natural language while the machine 
writes the program for you. The reason that dream was misguided is that the syntax never really has been the hardest part of 
programming. Programming has always been about analysing a problem and codifying it so unambiguously that it can be 
executed by a machine. The functional style does not change that. Rather, the functional style helps you with the 
problems that are already solved, such as _appending these strings together while inserting spaces between them_. You 
shouldn’t have to write code to do this stuff every time.

### Closures.

Enough proselytising. What about if we rewrote the `sieve()` method like this:

```java
public Set<Integer> primes() {
    return IntStream.range(1, limit)
            .boxed()
            .filter(notInNonPrimesUpTo(limit))
            .collect(Collectors.toSet());
}
```

What’s going on here? That `notInNonPrimesUpTo(int)` method returns a `Predicate`, which is a function that accepts a
single argument and returns a boolean value:

```java
private Predicate<Integer> notInNonPrimesUpTo(int limit) {
    var sieve = new HashSet<Integer>();
    for (var n = 2; n <= (limit / 2); n++)
        for (var nonPrime = (n * 2); nonPrime <= limit; nonPrime += n)
            sieve.add(nonPrime);
    return candidate -> !sieve.contains(candidate);
}
```

So it builds the sieve and returns a lambda that tests whether or not the candidate is in the sieve. Isn’t this hugely 
inefficient? Won’t it build the sieve every time it tests a candidate? Not so: it builds the sieve only once. When the 
`filter()` method is invoked on the stream it calls `notInNonPrimesUpTo` once, which returns the lambda predicate. It is 
the lambda that gets executed for every element in the stream. This lambda is also a _closure_. A pure lambda 
function depends only on its input arguments, while a closure also has access to variables in the scope it was created 
from - in this case, the `sieve` set. Even though the `notInNonPrimesUpTo` method has exited, the `sieve` set remains in
scope because the lambda has "closed over" it. As long as the lambda itself remains in scope, the resources it closes over
will remain available and will not be reclaimed by the garbage collector.

### Cool. Let's go too far.

What about the generation of the sieve itself, can that be done with a stream too? Well, yes...

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

I don’t think I actually would do this for real in Java. This code seems less understandable to me than the imperative 
version. Just because you can do a thing doesn't mean that you should.

The `Stream.iterate` part is interesting, but explaining it would be jumping ahead of ourselves, so I will 
come back to that in a later article. The `flatMap` is worth explaining though. What we have here is a function being 
mapped over an array that itself returns an array, so that [2, 3, 4, 5 …] is mapped like this:

* 2 → [4, 6, 8, 10, 12 …]
* 3 → [6, 9, 12, 15, 18 …]
* 4 → [8, 12, 16, 20, 24 …]
* 5 → [10, 15, 20, 25, 30 …]
* ...

But we don’t want an array of arrays, we want it flattened down into a one-dimensional array. That is what `flatMap` 
does for us, so that instead we get:

[4, 6, 8, 10, 12 … 6, 9, 12, 15, 18 … 8, 12, 16, 20, 24 … 10, 15, 20, 25, 30 …]

and finally `Collectors.toSet()` weeds out the duplicates for us. That makes our sieve.

### Aggregation operations.

If you look through the Java streams API, or LINQ if you are a .NET developer, you will see several other operations
that are based on searching: find any, find first, any match, etc. They are all based on predicates and work basically
the same way as filtering, so I will not labour the point by detailing them all. Instead I want to turn our attention now to
aggregation operations. Recall that earlier in the series, we had a recursive program that calculated factorials which 
looked like this:

```java
public static int factorial(int number) {
    if (number == 1)
        return number;
    else
        return number * (factorial(number - 1));
}
```

This algorithm falls into the class of “loops that calculate an accumulated result,” which is another of the cases I 
promised could be done without looping. We eliminate this loop in Java by using `reduce`. In order to calculate **n** factorial, 
first we need to get a stream of integers from 1 up to **n**. This will do it for us:

```java
IntStream.iterate(1, n -> n += 1)
        .takeWhile(n -> n <= 10)
        .forEach(System.out::println);
```

Usually mathematicians define factorial the other way around, i.e. counting downwards:

5! = 5 × 4 × 3 × 2 × 1

We get the same result whether we count downwards or upwards so we may as well count upwards because it is simpler. To 
calculate a factorial we use `reduce` as the terminating operation of the stream:

```java
public static int factorial(int number) {
    return IntStream.iterate(1, n -> n += 1)
            .takeWhile(n -> n <= number)
            .reduce(1, (acc, next) -> acc * next);
}
```

The `reduce` method takes two arguments, which are:

* An identity value (1)
* A lambda that is executed for every element in the stream and itself takes two arguments:
  * One argument receives the value of current stream element.
  * The other receives the identity value on the first iteration, and on every subsequent iteration it receives the result of the previous computation.
  
The final result of the `reduce` method is the result of the lambda function on the last element in the stream.
If you’re wondering which way round the lambda arguments go, the documentation states that the function must be 
associative, so it doesn’t really matter. Whatever the identity value is, it must satisfy the condition that when it is
passed to the accumulator function along with any other value, the other value is returned as the result. 
In mathematical terms, identity is defined such that:

_f_ (**x**, identity) = **x**

For multiplication and division the identity value is unity, while for addition and subtraction it is zero.

In C# the operation is called `Aggregate` rather than reduce but otherwise it is basically the same:

```csharp
public static int Factorial(int number)
{
    return Enumerable.Range(1, number)
            .Aggregate(1, (acc, next) => acc * next);
}
```

### Robot love.

But don’t think that reduce is limited to calculating arithmetic totals. You can reduce an array of one type of elements
down to a result of a completely different type. To illustrate this, let’s use another programming exercise we like to
use at Codurance, which we call Mars Rover.

We are simulating a robotic rover vehicle. Its “world” is a grid of integer coordinates, and it can point in any of the 
four cardinal directions: north, east, south, or west. The rover can turn left, it can turn right, and it can move 
forwards. It is programmed with a sequence of instructions like `LAARA` which would mean: left, ahead, ahead, right, ahead.

In Clojure we could define a function to make a robot:

```clojure
(defn robot [coordinates bearing]
  (hash-map :coordinates coordinates, :bearing bearing))
```

so that creating a robot gives us a simple data structure that represents the state of a robot, like this:

```
user=> (robot {:x -2 :y 1} :east)
{:coordinates {:x -2, :y 1}, :bearing :east}
```

In Clojure a hash-map literal is defined by curly braces enclosing a number of key-value pairs,
e.g. `{:key1 value1 :key2 value2 ...}`. The names prefixed with colons (e.g. `:east`) are merely symbols; they stand for
nothing other than themselves. They do not need to be declared because they have no value except for their names.
Symbols can be compared, i.e. `(= :foo :foo)` is true while `(= :foo :bar)` is false, which makes them handy for map 
keys and other uses.

Now, to be able to turn, we need to know the effect of rotating left or right depending on our robot’s bearing. So let's
build a data structure to hold the rotations:

```clojure
(def rotations
  {:north {:left :west, :right :east}
   :east {:left :north, :right :south}
   :south {:left :east, :right :west}
   :west {:left :south, :right :north}})
```

This tells us what our robot's new bearing will be after turning left or right while pointing in any of the four
directions. Using it, we can define a function to turn a robot right:

```clojure
(defn turn-right [robot]
  (let [bearing (:bearing robot)]
    (assoc robot :bearing (-> rotations bearing :right))))
```

There is quite a lot going on in those three lines of code. To help you understand it, the first thing to know is that 
you can get the value from a map for a given key like this:

```
user=> (def a-map {:key1 "value 1" :key2 "value 2"})
#'user/a-map
user=> (:key1 a-map)
"value 1"
user=> (:key2 a-map)
"value 2"
```

That is how `(:bearing robot)` gets the robot's current bearing.
The `->` symbol is called the “thread-first” macro; it is a shorthand for `(:right (bearing rotations))` or, in other 
words, get the rotations corresponding to the robot’s current bearing and then the new bearing after rotating right. The
thread-first and thread-last macros are Clojure's answer to the build-up of close-parens that occurs at the end of Lisp 
forms, which some people find objectionable about the language. They also allow composed functions to be 
written in left-to-right order, which some people may find more natural (I do).

The `assoc` function behaves as if it adds or replaces key-value pairs in a map. In this case, it appears to update the
robot's bearing. All data structures in Clojure are immutable, of course, so what it does _really_ is create a new map while 
leaving the original unchanged.

The function for turning a robot left is similar, and we could of course extract the common functionality if we wished to:

```clojure
(defn turn-left [robot]
  (let [bearing (:bearing robot)]
    (assoc robot :bearing (-> rotations bearing :left))))
```

We can easily test the turning functions in the REPL:

```
user=> (turn-left (robot {:x 0 :y 0} :north))
{:coordinates {:x 0, :y 0}, :bearing :west}

user=> (turn-left (robot {:x 0 :y 0} :west))
{:coordinates {:x 0, :y 0}, :bearing :south}

user=> (turn-left (robot {:x 0 :y 0} :south))
{:coordinates {:x 0, :y 0}, :bearing :east}

user=> (turn-left (robot {:x 0 :y 0} :east))
{:coordinates {:x 0, :y 0}, :bearing :north}

user=> (turn-right (robot {:x 0 :y 0} :north))
{:coordinates {:x 0, :y 0}, :bearing :east}

user=> (turn-right (robot {:x 0 :y 0} :east))
{:coordinates {:x 0, :y 0}, :bearing :south}

user=> (turn-right (robot {:x 0 :y 0} :south))
{:coordinates {:x 0, :y 0}, :bearing :west}

user=> (turn-right (robot {:x 0 :y 0} :west))
{:coordinates {:x 0, :y 0}, :bearing :north}
```

Notice that it never changes the coordinates, only the bearing. This gives us a robot that can turn on the spot. In 
order to move, we also need to know the effect that moving forwards has on its position, according to its bearing:

```clojure
(def translations
  {:north {:delta-x 0, :delta-y 1}
   :east {:delta-x 1, :delta-y 0}
   :south {:delta-x 0, :delta-y -1}
   :west {:delta-x -1, :delta-y 0}})
```

And now we can write a function to move the robot ahead along its current bearing:

```clojure
(defn move-ahead [robot]able
  (let [{ {x :x, y :y} :coordinates, bearing :bearing} robot]
    (let [{delta-x :delta-x, delta-y :delta-y} (translations bearing)]
      (assoc robot :coordinates {:x (+ x delta-x), :y (+ y delta-y)}))))
```

There is some slightly complex destructuring going on there, but hopefully it is clear enough. We get the coordinates 
and the bearing from the robot, and then further destructure the coordinates into its x and y components. We then look up the 
translation to be applied according to the robot’s bearing. Finally, we return a new robot whose bearing is the
same as the original robot and whose coordinates are (x + Δx, y + Δy). Once again we can test this function in 
the REPL:

```
user=> (move-ahead (robot {:x 0 :y 0} :north))
{:coordinates {:x 0, :y 1}, :bearing :north}

user=> (move-ahead (robot {:x 0 :y 0} :east))
{:coordinates {:x 1, :y 0}, :bearing :east}

user=> (move-ahead (robot {:x 0 :y 0} :south))
{:coordinates {:x 0, :y -1}, :bearing :south}

user=> (move-ahead (robot {:x 0 :y 0} :west))
{:coordinates {:x -1, :y 0}, :bearing :west}
```

Finally, we need to be able to process a sequence of instructions and determine the final robot state. To do this, we need 
a function that can decode an instruction and apply the relevant function to the robot:

```clojure
(defn do-step [robot next-step]
  (case next-step
    \A (move-ahead robot)
    \L (turn-left robot)
    \R (turn-right robot)))
```

and then it is a simple matter of iterating the instruction sequence, keeping track of the robot state as we go, and 
calling `do-step` on each instruction to get the next robot state:

```clojure
(defn simulate [steps initial-robot]
  (loop [remaining-steps steps, robot initial-robot]
    (if (empty? remaining-steps)
      robot
      (recur (rest remaining-steps) (do-step robot (first remaining-steps))))))
```

### So...?

But wait! This is just another loop that calculates an accumulated result. It is reducible, as if you hadn’t guessed. 
Of course you did. So this will work too:

```clojure
(defn simulate [steps initial-robot]
  (reduce do-step initial-robot steps))
```

Well of course, I hear you saying, but that’s just funky magical Clojure though, right? Not so! You can do exactly the 
same thing in C#:

```csharp
private readonly Dictionary<Bearing, Rotation> _rotations = new Dictionary<Bearing,Rotation>
{
    {Bearing.North, new Rotation(Bearing.West, Bearing.East)},
    {Bearing.East, new Rotation(Bearing.North, Bearing.South)},
    {Bearing.South, new Rotation(Bearing.East, Bearing.West)},
    {Bearing.West, new Rotation(Bearing.South, Bearing.North)}
};
        
private readonly Dictionary<Bearing, Coordinates> _translations = new Dictionary<Bearing, Coordinates>
{
    {Bearing.North, new Coordinates(0, 1)},
    {Bearing.East, new Coordinates(1, 0)},
    {Bearing.South, new Coordinates(0, -1)},
    {Bearing.West, new Coordinates(-1, 0)}
};

private Robot TurnLeft(Robot robot)
{
    var rotation = _rotations[robot.Bearing];
    return new Robot(robot.Coordinates, rotation.Left);
}
        
private Robot TurnRight(Robot robot)
{
    var rotation = _rotations[robot.Bearing];
    return new Robot(robot.Coordinates, rotation.Right);
}

private Robot MoveAhead(Robot robot)
{
    var delta = _translations[robot.Bearing];
    return new Robot(
        new Coordinates(
        robot.Coordinates.X + delta.X,
        robot.Coordinates.Y + delta.Y), 
        robot.Bearing);
}

private Robot DoStep(Robot robot, char nextStep)
{
    switch (nextStep)
    {
        case 'L': return TurnLeft(robot);
        case 'R': return TurnRight(robot);
        default: return MoveAhead(robot);
    }
}
```

The imperative code to drive a robot could be:

```csharp
public Robot Simulate(string instructions, Robot initialRobot)
{
    var robot = initialRobot;
    foreach (var step in instructions)
        robot = DoStep(robot, step);
    return robot;
}
```

but we can just as readily do:

```csharp
public Robot Simulate(string instructions, Robot initialRobot)
{
    return instructions.Aggregate(
        initialRobot, 
        (robot, step) => DoStep(robot, step));
}
```

Hopefully by now I’ve begun to convince you that looping is a construct you should only reach for when you really need 
it, and in most cases you don’t. LINQ, Streams and similar features in other modern languages can achieve a lot of these 
use cases for you with far less typing and administrative work. Just as we saw with the example of sorting in the 
beginning of the previous article, the languages can take care of the parts of the problem that are already solved: how 
to sort an array efficiently, to search for an item, to remove duplicates, to group by certain keys, etc. You are free 
to concentrate on the aspects that are particular to your problem domain. The signal-to-noise ratio in your code is thus 
improved, making it cleaner, more understandable, and less likely to harbour bugs.

### Next time.

In this and the last article we have had a pretty thorough look at first-class functions. Next time, we will introduce 
a closely related concept, higher-order functions, and I will attempt to explain the dreaded Monad pattern. In fact I 
hope that I will be able not only to help you understand it, but also convince you of its utility.
