---
author: Richard Wild
layout: post
asset-type: post
title: "The Functional Style - Part 8"
date: 2018-11-29 00:00:00
description: Functional programming explained for the pragmatic programmer. Part 8. Persistent data structures.
image: 
    src: /assets/custom/img/blog/2018-08-07-the-functional-style.png
abstract: Functional programming explained for the pragmatic programmer.
tags: 
- functional programming
---

# Persistent data structures.

We have discussed immutability at length by now. In particular, we have covered how loops can be replaced with recursive function calls to do iteration while avoiding reassignment of any variables. While it might seem on the face of it that this technique would be grossly inefficient in terms of memory, we have seen how tail call elimination can negate the need for extra subroutine calls, thus avoiding growing the call stack, and making functional algorithms essentially identical to their imperative equivalents at the machine level.

So much for scalar values, but what about complex data structures like arrays and dictionaries? In functional languages they are immutable too. Therefore, if we have a list in Clojure:

```clojure
(def a-list (list 1 2 3))
```

and we construct a new list by adding an element to it:

```clojure
(def another-list (cons 0 a-list))
```

then we now have two lists, one equal to `(1 2 3)` and the other `(0 1 2 3)`. Does this mean that, in order to modify a data structure in the functional style, we have to make a whole copy of the original, in order to preserve it unchanged? That would seem grossly inefficient.

However, there are ways of making data structures _appear_ to be modifiable while preserving them original intact for any parts of the program still holding references to it. Such data structures are said to be ‘persistent’, contrasting with ones that are mutable, which are said to be ‘ephemeral’. Data structures are _fully_ persistent if every version of the structure can be modified, which is the type we will discuss here. Structures are _partially_ persistent when only the most recent version can be modified.

### Fully stacked.

For this example we are going to turn to our old friend, the stack. Now, we are creating a _functional_ stack here, of course, so our interface looks like this:

```java
public interface Stack<T> {

    Stack<T> pop();

    Optional<T> top();

    Stack<T> push(T top);
}
```

We can’t ever modify anything, so when on pushing or popping we get a new `Stack` instance reflecting our pushed or popped stack. We’ll also provide a static method for obtaining a brand new stack:

```java
static <T> Stack<T> create() {
    return new EmptyStack<T>();
}
```

It might seem a strange design choice to create a specific implementation for an empty stack, but it works out very tidily when we do:

```java
public class EmptyStack<T> implements Stack<T> {

    @Override
    public Stack<T> pop() {
        throw new IllegalStateException();
    }

    @Override
    public Optional<T> top() {
        return Optional.empty();
    }

    @Override
    public Stack<T> push(T top) {
        return new NonEmptyStack<>(top, this);
    }
}
```

As you can see, `top` returns empty and `pop` throws an illegal state exception. I think in this case throwing an exception is reasonable because, given the last-in-first-out nature of stacks and the typical uses they are put to, attempting to pop an empty stack almost certainly does indicate a bug in the program rather than a user error.

As for the non-empty implementation, that looks like this:

```java
public class NonEmptyStack<T> implements Stack<T> {

    private final T top;
    private final Stack<T> popped;

    public NonEmptyStack(T top, Stack<T> popped) {
        this.top = top;
        this.popped = popped;
    }

    @Override
    public Stack<T> pop() {
        return popped;
    }

    @Override
    public Optional<T> top() {
        return Optional.of(top);
    }

    @Override
    public Stack<T> push(T top) {
        return new NonEmptyStack<>(top, this);
    }
}
```

It’s worth noting that choosing separate implementations for the empty and non-empty cases avoided the need for any conditional logic. There are no `if` statements in the above code. In use, the stack behaves like this:

1. `create` returns an `EmptyStack` instance.
1. Pushing on it returns a `NonEmptyStack` with the pushed value as its top.
1. When another value is pushed on top of the non-empty stack, another NonEmptyStack instance is created with the newly pushed value on top:

![Evolution of the functional stack as values are pushed]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_1.png "How the functional stack evolves as values are pushed on to it")

The timeline runs from left to right, and the ovals at the bottom of the diagram represent the ‘view’ the client sees of the stack. The regions bounded by dashed lines indicate that all the boxes within are all the same instance in memory. The direction of the arrows show that each NonEmptyStack instance holds a reference to another stack instance, either empty or non-empty. This reference is what will be returned when the stack is popped, and that is where things get clever:

![Popping values from the functional stack]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_2.png "Popping values from the functional stack")

On popping the stack, the client simply shifts its view to the previously pushed element. Nothing gets deleted. This means that, if there were two clients with a view of the same stack, one client could pop it without affecting the other client’s view of the stack. The same is true of pushing:

![The client shifting its view as it pushes on the functional stack]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_3.png "As the client pushes on the functional stack, it shifts its view from the old top to the new top")

This is basically the same as the first diagram, except that we have dispensed with the horizontal dashed regions and instead made it explicit that the stack is a single data structure rather than several copies. We are simply representing each `Stack` instance, whether empty or not, as a single box. Initially the client sees an empty stack; on pushing, a non-empty stack instance is created which points at the empty stack, and the client shifts its view to the new instance. When the client pushes a second time, another non-empty stack instance is created which points at the previous non-empty stack, and the client shifts its view again. The stack tells the client where to point its view next, via the return value of the push and pop operations, but it is the client that actually shifts its view. The stack does not move anything.

We already mentioned the possibility that the clients might not be all the same, so now let’s explicitly imagine that the three ovals are representing three different clients’ views of one single stack structure. Client 1 is looking at a newly created stack, while client 2 has pushed once on it, and client 3 has pushed twice on it:

![Multiple clients with different views on the same functional stack]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_4.png "Multiple clients can maintain their own different viewpoints on the same stack structure")

If client 2 pushed something on the stack, the effect would be this:

![The effect of client 2 pushing on the shared functional stack]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_5.png "When client 2 pushes on the shared stack, the value it pushed is not visible to the other clients")

Notice that the directions of the arrows ensure that neither client 1 or client 3 are affected by what client 2 did: client 3 cannot follow the arrow backwards to see the value that was just pushed, and nor can client 1. Similarly if client 1 pushed on the stack neither of the others would be affected by that either:

![The effect of client 1 pushing on the shared functional stack]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/functional_stack_6.png "When client 1 pushes on the shared stack, the value it pushed is not visible to the other clients either")

The other thing to note about this data structure is that nothing is duplicated. All three clients share the same EmptyStack instance, and clients 2 and 3 also share the NonEmptyStack that was pushed first. Everything that _could_ be shared _is_ shared. Nothing is copied whenever any of them push, and popping does not cause any links in the structure to be broken.

So when _do_ things get deleted? Eventually we must reclaim resources or our program may run out of memory. If a stack element has been popped and no part of the program is holding a reference to it any more, in time it will be reclaimed by the garbage collector. Indeed, garbage collection is an essential feature for functional programming in any language.

### Cons cells, CAR and CDR.

Maybe this stack structure seems familiar; if it does, there’s a good reason for that. It’s known as a _linked list_ and it is a standard data structure in computer science. Usually a linked list is represented in a diagram something like this:

![The linked list data structure]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/linked_list.png "The linked list data structure")

The list is a chain of elements, and each element contains a pair of pointers. One of the two pointers points to a value. The other one points at the next element in the chain. The final element in the chain does not point to another element. In this way a chain of values can be linked together. An advantage usually cited for this kind of data structure, in imperative programming, is that it is very easy to insert a value in the middle of a list: all you need to do is create the new element, link it to the following element, and re-point the preceding element in the list to the new element. By contrast, an array would require shuffling all the elements down after the inserted element in order to make room for it, which could be a very expensive operation indeed. On the other hand, linked lists perform badly at random access, which is an O(n) operation, because to find the nth element you must traverse the preceding (n - 1) elements. Conversely, with an array you can access any element in constant O(1) time.

Linked lists are a foundational data structure in functional programming. The Lisp programming language is built on them. A single element of a linked list is referred to in Lisp as a cons cell:

![A cons cell]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/cons_cell.png "The cons cell is the building block of the Lisp programming language")

The CAR pointer points to the value of the cons cell while the CDR pointer points to the next element in the list. CAR and CDR are archaic terms which are not in general use any more, but I mention them because you might come across them. The Lisp programming language was first implemented on an IBM 704 mainframe, and the implementers found it convenient to store a cons cell in a machine word. The pointer to the cell value was stored in the “address” part of the word, while the pointer to the next cell was stored in the “decrement” part. It was convenient because the machine had instructions that could be used to access both of these values directly, when the cell was loaded into a register. Hence, _contents of the address part of the register_ and _contents of the decrement part of the register_ or CAR and CDR for short.

This nomenclature made it into the language; Lisp used `car` as the keyword for returning the first element of a list, and cdr for returning the rest of the list. Nowadays, Clojure uses `first` and `rest` for these instead, which is much more transparent: it is hardly appropriate to name fundamental language operations after the architecture of a particular machine from the 1950s. Other languages might refer to them as _head_ and _tail_ instead.

The creation of a new cons cell is referred to as _cons-ing_ and it therefore means to create a list by prepending an element at the beginning of another list:

```
user => (cons 0 (list 1 2 3))
(0 1 2 3)
```

Just as we saw in the stack example, cons-ing an element onto a list does not alter the list for any other part of the program that is still using it.

### B-Trees.

That’s all fine, but what about if we want to insert a value in a list, or append it to the end? In this case duplication is necessary; we will have to duplicate all the elements up to the point in the list where the new element is to be inserted. In the worst case, where we want to append an element to the end, we will be forced to duplicate the entire list. So another approach is to use a binary tree instead of a linked list. This is an ordered data structure in which every element has zero, one or two pointers to other elements in the structure: one of them points to an element whose value is considered ‘less’ than the current element, and the other points to an element whose value is considered ‘greater,’ by whatever comparison is appropriate for the type of data held in the tree:

![A B-Tree]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/b_tree_1.png "A B-Tree holds data in an ordered structure")

This structure _t_ holds a tree of elements that are ordered alphabetically: A, B, C, D, F, G, H. Notice that E is missing. Following the arrows down, elements to the left have lower value than elements to the right, so you can easily traverse the tree to find a value by comparing the value with each element in turn and following the tree down+left or down+right accordingly. Such data structures are therefore good for searching, and they are commonly used for indexing database tables. Now let us imagine that we want to insert the missing value E into this tree, which might look in code like this:

```
t' = t.insert(E)
```

As before, we want this insertion operation to leave the original tree _t_ unmodified, while at the same time we would like to reuse as much of _t_ as possible in order to minimise duplication. The result looks like this:

![Inserting an element into a persistent B-Tree structure]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/b_tree_2.png "The result of inserting an element into a persistent B-tree structure")

To achieve the insertion of E it has been necessary to duplicate D, G, F, while A, B, C are shared between the two data structures, but the effect is that, following the arrows from t the original data structure is unchanged, while following the arrows from _t'_ we see a data structure that now also includes E in the proper position.

### One direction.

The linked list and the binary tree have one vital thing in common: both are examples of _directed acyclic graphs_. If you haven’t heard this term before, don’t be dismayed, because it’s very simple. A _graph_ is a collection of things (nodes, points, vertices, whatever) that have connections between them:

![A graph]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/graph.png "A graph is a collection of objects that are connected")

The graph is _directed_ when the connections only go one way:

![A directed graph]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/directed_graph.png "A directed graph is when the connections between the objects are unidirectional")

Finally, the graph is _acyclic_ when there are no cycles, that is to say, it is impossible to follow the graph from any point and return back at that same point:

![A directed acyclic graph]({{site.baseurl}}/assets/custom/img/blog/the-functional-style/directed_acyclic_graph.png "A directed graph is acyclic when there are no cycles anywhere in the graph")

It is the directed acyclic nature of these structures - that the connections can be followed in one direction only and never loop back on themselves - that make it possible for us to ‘bolt on’ additional structure to give the appearance of modification or copying, while leaving unaffected any parts of the program that are still looking at the original version of the structure.

### Don’t panic!

I’m hoping that my explanations here have made some sense, but if not, don’t worry too much. It’s not necessary to implement data structures like these when you do functional programming - functional and hybrid-functional languages have immutable data structures built in which work just fine, very probably better than anything most of us could write.

My reason for including this section in the series is partly technical interest - I like to know how things work - and partly to allay concerns about efficiency. Immutable data structures do not mean making wholesale copies of entire structures every time something needs to be modified; much more efficient methods exist for doing this.

### Next time.

This concludes our introduction to the fascinating subject of functional programming. I hope it’s been useful. In the next article, we will finish up by discussing the declarative nature of the functional style, whether functional programming and object-oriented programming can live together, and the tension between the functional style and efficiency.

<hr/>

## The whole series:

1. [Introduction](/2018/08/09/the-functional-style-part-1/)
1. [First Steps](/2018/08/17/the-functional-style-part-2/)
1. [First-Class Functions I: Lambda Functions & Map](/2018/09/04/the-functional-style-part-3/)
1. [First-Class Functions II: Filter, Reduce & More](/2018/09/19/the-functional-style-part-4/)
1. [Higher-Order Functions I: Function Composition and Monads](/2018/10/17/the-functional-style-part-5/)
1. [Higher-Order Functions II: Currying](/2018/11/02/the-functional-style-part-6/)
1. [Lazy Evaluation](/2018/11/26/the-functional-style-part-7/)
1. Persistent Data Structures