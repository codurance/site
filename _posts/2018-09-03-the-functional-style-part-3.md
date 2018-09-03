---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 3"
date: 2018-09-03 00:00:00
description: Functional programming explained for the pragmatic programmer. Part 3. First-class Functions I - Lambda Functions & Map.
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---
# First-Class Functions I: Lambda Functions & Map.

## What is a first-class function?

You may well have heard it said before that a particular language is functional because it has “first-class functions.” As I said in the first article, this is not my point of view. I do agree that first-class functions are an essential feature in any functional language, but I don’t consider that this is a sufficient condition for a language to be functional. Lots of imperative languages have this feature as well. But what is a first-class function? Functions are said to be _first-class_ objects when they can be treated like any other variable: that is to say, they can be assigned a name or symbol, they can be stored in data structures, passed in via function arguments and returned as function return values.

This is not actually a novel idea. Function pointers have been a feature of C since its beginning in 1972. Procedure references were a feature of Algol 68, implemented in 1970, and at the time they were considered a _procedural_ programming feature. Going back further, Lisp (first implemented in 1963) was built on the very concept that program code and data are interchangeable.

These are not obscure features either. In C, we routinely use functions as first-class objects. For example, when sorting:

```c
char **array = randomStrings();

printf("Before sorting:\n");
for (int s = 0; s < NO_OF_STRINGS; s++)
    printf("%s\n", array[s]);

qsort(array, NO_OF_STRINGS, sizeof(char *), compare);

printf("After sorting:\n");
for (int s = 0; s < NO_OF_STRINGS; s++)
    printf("%s\n", array[s]);
```

The `stdlib` library in C has a collection of functions for different types of sort routine. All of them are capable of sorting any kind of data: the only assistance they need from the programmer is to be provided a function that compares two elements of the data set and returns `-1`, `1`, or `0`, to indicating which element is greater than the other or that they are equal.

This is essentially the Strategy pattern!

The comparator function for our array of pointers to strings could be:

```c
int compare(const void *a, const void *b)
{
    char *str_a = *(char **) a;
    char *str_b = *(char **) b;
    return strcmp(str_a, str_b);
}
```

and we pass it to the sorting function like this:

```c
qsort(array, NO_OF_STRINGS, sizeof(char *), compare);
```

The absence of parentheses on the `compare` function name makes the compiler emit a function pointer instead of a function call. So treating a function as a first-class object in C is very easy, although the signature for a function that accepts a function pointer is quite ugly:

```c
qsort(void *base, size_t nel, size_t width, int (*compar)(const void *, const void *));
```

Function pointers are not only used in sorting. Long before .NET was invented, there was the Win32 api for writing Microsoft Windows applications (and before that, the Win16 api). It made liberal use of function pointers to be used as callbacks. An application provided pointers to its own functions when calling into the window manager, to be called back by the window manager when the application needed notification of some event that had happened. You could think of this as like an Observer pattern relationship between the application (the observer) and its windows (the observables): the application received notifications of events like mouse clicks and keyboard presses occurring on its windows. The job of managing the windows - moving them about, stacking them on top of one another, deciding which application is the recipient of user actions - is abstracted in the window manager. The applications know nothing about the other applications they share the environment with. In object-oriented programming we usually achieve this kind of decoupling by abstract classes and interfaces, but it can also be achieved using first-class functions.

So we’ve been using first-class functions for a long time. But it is probably fair to say that no language has done more for widely promoting the idea of functions as first-class citizens than humble Javascript.

### Lambda expressions.

In Javascript it has long been standard practice to pass functions to other functions to be used as callbacks, just as in the Win32 api. This idea is integral to the HTML DOM, where first-class functions can be added as event listeners to DOM elements:

```javascript
function myEventListener() {
	alert("I was clicked!")
}
...
var myBtn = document.getElementById("myBtn")
myBtn.addEventListener("click", myEventListener)
```

Just as in C, the lack of parentheses on the `myEventListener` function name when it is referenced in the call to `addEventListener` means that it is not executed immediately. Instead, the function is associated with the `click` event on the DOM element in question. When the element is clicked, _then_ the function is invoked and the alert happens.

The popular jQuery library streamlines the process by proving a function that selects DOM elements by means of a query string, and presents useful functions for manipulating the elements and adding event listeners to them:

```javascript
$("#myBtn").click(function() {
    alert("I was clicked!")
})
```

First-class functions are also the means for achieving asynchronous I/O, as used on the `XMLHttpRequest` object that is the basis for Ajax. The same idea is ubiquitous in Node.js too: when you want to make a non-blocking function call, you pass it a reference to a function for it to call you back on when it is done.

But there is something else here too. The second of these is not only an example of a first-class function. It is also an example of a _lambda function_. Specifically, this part:

```javascript
function() {
    alert("I was clicked!");
}
```

A lambda function (often just called a _lambda_) is an unnamed function. They could have just called them anonymous functions, and then everyone would have known straight away what they are. But that doesn’t sound as impressive, so lambda functions it is. The point of a lambda function is where you need a function in that place and only there; since it is not needed anywhere else you simply define it right there. It doesn’t need a name. If you _did_ need to reuse it somewhere else then you would consider defining it as a named function and referencing it by name instead, like I did in the first Javascript example. Without lambda functions, programming with jQuery and Node would be very tiresome indeed.

Lambda functions are defined various ways in different languages:

In Javascript: `function(a, b) { return a + b }`

In Java: `(a, b) -> a + b`

In C#: `(a, b) => a + b`

In Clojure: `(fn [a b] (+ a b))`

In Clojure - shorthand version: `#(+ %1 %2)`

In Groovy: `{ a, b -> a + b }`

In F#: `fun a b -> a + b`

In Ruby - so-called “stabby” syntax: `-> (a, b) { return a + b }`

As we can see, most languages have gone for a more concise way of expressing lambdas than Javascript.

### Map.

You probably already use the term “map” in your programming to mean to the data structure that stores objects as key-value pairs. (If your language calls this a “dictionary” instead then great, no problem). In functional programming the term has an additional meaning, though in fact the basic concept is really the same. In both cases, one set of things is being mapped to another set of things. In the sense of the data structure, map is a noun: keys are mapped to values. In the programming sense, map is a verb: a function maps an array of values to another array of values.

Say you have a function _f_ and an array of values **A** = [**a1**, **a2**, **a3**, **a4**]. To map _f_ over **A** means applying _f_ to every element in **A**:

* **a1** → _f_ (**a1**) = **a1’**
* **a2** → _f_ (**a2**) = **a2’**
* **a3** → _f_ (**a3**) = **a3’**
* **a4** → _f_ (**a4**) = **a4’**

then assembling an array of the results in the same order as the inputs:

**A’** = map( _f_, **A** ) = [**a1’**, **a2’**, **a3’**, **a4’**]

### Map by example.

Ok so this is interesting but a [bit mathematical](https://en.wikipedia.org/wiki/Map_(mathematics). How often would you do this anyway? Actually, a lot more often than you may think. As usual, an example explains things best, so let’s do some RNA transcription. This exercise from exercism.io is very simple: an input string of bases needs to be transcribed to an output string, and the bases translate like this:

* C → G
* G → C
* A → U
* T → A

Any input other than C, G, A, T is invalid. The test in JUnit5 could look like this:

```java
class TranscriberShould {

    @ParameterizedTest
    @CsvSource({
            "C,G",
            "G,C",
            "A,U",
            "T,A",
            "ACGTGGTCTTAA,UGCACCAGAAUU"
    })
    void transcribe_dna_to_rna(String dna, String rna) {
        var transcriber = new Transcriber();
        assertThat(transcriber.transcribe(dna), is(rna));
    }

    @Test
    void reject_invalid_bases() {
        var transcriber = new Transcriber();
        assertThrows(
                IllegalArgumentException.class,
                () -> transcriber.transcribe("XCGFGGTDTTAA"));
    }
}
```

And we can make the tests pass with this Java implementation:

```java
class Transcriber {

    private Map<Character, Character> pairs = new HashMap<>();

    Transcriber() {
        pairs.put('C', 'G');
        pairs.put('G', 'C');
        pairs.put('A', 'U');
        pairs.put('T', 'A');
    }

    String transcribe(String dna) {
        var rna = new StringBuilder();
        for (var base: dna.toCharArray()) {
            if (pairs.containsKey(base)) {
                var pair = pairs.get(base);
                rna.append(pair);
            } else
                throw new IllegalArgumentException("Not a base: " + base);
        }
        return rna.toString();
    }
}
```

The key to programming in the functional style is, unsurprisingly, to turn everything that can possibly be expressed as a function into one. So let’s do that:

```java
char basePair(char base) {
    if (pairs.containsKey(base))
        return pairs.get(base);
    else
        throw new IllegalArgumentException("Not a base " + base);
}

String transcribe(String dna) {
    var rna = new StringBuilder();
    for (var base : dna.toCharArray()) {
        var pair = basePair(base);
        rna.append(pair);
    }
    return rna.toString();
}
```

Now we’re in a position to use map as a verb. In Java, there is a function provided for this in the Streams api:

```java
char basePair(char base) {
    if (pairs.containsKey(base))
        return pairs.get(base);
    throw new IllegalArgumentException("Not a base " + base);
}

String transcribe(String dna) {
    return dna.codePoints()
            .mapToObj(c -> (char) c)
            .map(base -> basePair(base))
            .collect(
                    StringBuilder::new,
                    StringBuilder::append,
                    StringBuilder::append)
            .toString();
}
```

### Hmmmm.

So let’s critique that solution. The best thing that can be said about it is that the loop has gone. If you think about it, looping is a kind of clerical activity that we really shouldn’t have to be concerned with most of the time. Usually, we loop because we want to do something to every element in a collection. What we _really_ want to do here is take this input sequence and generate an output sequence from it. Streaming takes care of the basic admin work of iterating for us. It is, in fact, a design pattern - a functional design pattern - but I shall not mention its name just yet. I don’t want to scare you off.

I have to admit that the rest of the code is not that great, and it is mostly due to the fact that primitives in Java are not objects. The first bit of non-greatness is this:

```java
mapToObj(c -> (char) c)
```

We had to do this because Java treats primitives and objects differently, and although the language does have wrapper classes for the primitives, there is no way to directly get a collection of Character objects from a String.

The other bit of less-than-awesomeness is this:

```
.collect(
        StringBuilder::new,
        StringBuilder::append,
        StringBuilder::append)
```

It is far from obvious why it is necessary to call `append` twice. I will explain that later, but the time is not right for that now.

I’m not going to try to defend this code: it sucks. If there were a convenient way of getting a Stream of Character objects from a String, or even an array of Characters, then there would be no problem, but we haven't been blessed with one. Dealing with primitives is not the sweet spot for FP in Java - come to think of it, it’s not even any good for OO programming - so maybe we shouldn’t be so obsessed with primitives. What if we designed them out of the code? We could create an enumeration for the bases:

```java
enum Base {
    C, G, A, T, U;
}
```

and a class to act as a first-class collection holding a sequence of bases:

```java
class Sequence {

    List<Base> bases;

    Sequence(List<Base> bases) {
        this.bases = bases;
    }

    Stream<Base> bases() {
        return bases.stream();
    }
}
```

Now the Transcriber looks like this:

```java
class Transcriber {

    private Map<Base, Base> pairs = new HashMap<>();

    Transcriber() {
        pairs.put(C, G);
        pairs.put(G, C);
        pairs.put(A, U);
        pairs.put(T, A);
    }

    Sequence transcribe(Sequence dna) {
        return new Sequence(dna.bases()
                .map(pairs::get)
                .collect(toList()));
    }
}
```

This is a lot better. The `pairs::get` is a method reference, it refers to the `get` method of the instance assigned to the `pairs` variable. By creating a type for the bases we have designed out the possibility of invalid input, so the need for the `basePair` method disappears, as does the exception. This is one advantage Java has over Clojure, which by itself cannot enforce types in function contracts. What’s more, the `StringBuilder` has disappeared as well. Java Streams are excellent for when you need to iterate a collection, process each element in some way, and build up a new collection containing the results. This probably accounts for quite a large proportion of the loops you have written in your life. Most of the housekeeping, which is not part of the real job at hand, is done for you.

### In Clojure.

Lack of typing aside, Clojure is somewhat more concise than the Java version, and it gives us no difficulty in mapping over the characters of a string. The most important abstraction in Clojure is the sequence; all the collection types can be treated as sequences, and strings are no exception:

```clojure
(def pairs {\C, "G",
            \G, "C",
            \A, "U",
            \T, "A"})

(defn- base-pair [base]
  (if-let [pair (get pairs base)]
    pair
    (throw (IllegalArgumentException. (str "Not a base: " base)))))

(defn transcribe [dna]
  (map base-pair dna))
```

If we want it to return a string instead of a list (which is what `map` gives us), the only change required would be:

```clojure
(apply str (map base-pair dna))
```

### In C#.

Let’s try another language. An imperative approach to the solution in C# looks like this:

```csharp
namespace RnaTranscription
{
    public class Transcriber
    {
        private readonly Dictionary<char, char> _pairs = new Dictionary<char, char>
        {
            {'C', 'G'},
            {'G', 'C'},
            {'A', 'U'},
            {'T', 'A'}
        };

        public string Transcribe(string dna)
        {
            var rna = new StringBuilder();
            foreach (char b in dna)
                rna.Append(_pairs[b]);
            return rna.ToString();
        }
    }
}
```

Again, C# does not present us with the problems we encountered in Java, because a string in C# is enumerable and all 'primitives' can be treated as objects with behaviour.

We can rewrite the program it in a more functional way like this, and it turns out to be considerably less verbose than the Java Streams version. For “map” in a Java stream, read “select” in C# instead:

```csharp
public string Transcribe(string dna)
{
    return String.Join("", dna.Select(b => _pairs[b]));
}
```

Or, if you like, you can use LINQ for its syntactic sugar:

```csharp
public string Transcribe(string dna)
{
    return String.Join("", from b in dna select _pairs[b]);
}
```

### Why do we loop?

You probably get the idea. If you think of the times before when you have written a loop, most often you will have been trying to accomplish one of the following:

* Mapping an array of one type into an array of another type.
* Filtering by finding all the items in an array satisfying some predicate.
* Determining whether any or none of the items in an array satisfy some predicate.
* Accumulating a count, sum or some other kind of cumulative result from an array.
* Sorting the elements of an array into a particular order.

The functional programming features available in most modern languages let you accomplish all these things without resorting to writing loops, or creating collections to store the results in. The functional style allows you to dispense with those housekeeping operations and concentrate on the real work. What’s more, the functional style allows you to chain operations together, for example if you needed to:

1. Map the elements of an array into another type.
1. Filter out some of the mapped elements.
1. Sort the filtered elements.

In the imperative style, this would require either multiple loops, or one loop with much code inside it; either way, it involves lots of administrative work that obscures the real purpose of the program. In the functional style, you can dispense with the admin work and express directly what you mean. Later on we shall see more examples of how the functional style can make your life easier.

## Next time:

While I was learning functional programming and getting used to the Java streams API, every time I wrote a loop, the very next thing I would do is consider how I could rewrite it as a stream. It is usually possible. In C#, the ReSharper plugin for Visual Studio automatically suggests this kind of refactoring for you. Now that I have internalised the functional style, I just go straight for the stream and don’t even bother with the loop unless I really need one. In the next article we will continue our exploration of first-class functions, and how we can use the functional style to make our code more expressive, with a look at filter and reduce.
