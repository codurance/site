---
layout: post
asset-type: post
name: functional-programming-in-elixir
title: Functional Programming in Elixir
date: 2020-04-16 10:00:00 +00:00
author: Christopher Eyre
description: An iterated example of solving a problem in Elixir, illustrating the clarity of a functional language. 
image:
    src: /assets/custom/img/blog/potion.png
    attribution:
        text: Public domain photo from Pixabay
        href: https://pixabay.com/photos/wine-glass-magic-potion-1129366/
tags:
    - functional programming
    - elixir
    - kata
abstract: An iterated example of solving a problem in Elixir, illustrating the clarity of a functional language. 
alias: [/2020/04/16/functional-programming-in-elixir]
---

## Solving a simple problem in Elixir

In this article, I am going to solve the Word Count problem from [Exercism](https://exercism.io) in Elixir. I'll start with a form that would be familiar to an object-oriented programmer, then adjust it to show how clear code can be.
I am going to talk through the language features that are used in some detail.

Elixir is a functional language. Functions are first class citizens. Data is immutable.

This is the statement of the problem:

```
Given a phrase, count the occurrences of each word in that phrase.

For example for the input "olly olly in come free"

olly: 2
in: 1
come: 1
free: 1
Words are compared case-insensitively. The keys are lowercase.

Hyphenated words such as co-operative are considered a single word.
```

In Elixir, functions live in modules.

This is from the file words.ex

Elixir uses snake_case for filenames, variables and functions, but PascalCase for modules.

Nested modules are represented by a dot in the name simulating namespaces in other languages, so that
`Module.Special` is a valid module name.

You can call public functions from another namespace, but not the private ones. Functions behave much like static functions do in C#, if you swap the class name for the module.

```
defmodule Words do

  @seperators ~r/[ _,!&@$%^&:]/u

  def count(sentence) do
    Enum.reduce(String.split(String.downcase(sentence), @seperators, trim: true), %{}, &update_map/2)
  end

  defp update_map(word, acc) do
    Map.update(acc, word, 1, &(&1 + 1))
  end
end
```
I'll repeat that with line numbers so that it is easier to discuss (these are not part of the language):

```
01  defmodule Words do
02
03    @seperators ~r/[ _,!&@$%^&:]/u
04
05    def count(sentence) do
06      Enum.reduce(String.split(String.downcase(sentence), @seperators, trim: true), %{}, &update_map/2)
07    end
08
09	  defp update_map(word, acc) do
10      Map.update(acc, word, 1, &(&1 + 1))
11    end    
12  end
```

Line #1 defines the module, providing a scope for the functions. It ends on line #12

Elixir looks like Ruby but is more consistent in its block syntax. 
All blocks follow one of two patterns:

```
defsomething name [optional parameters] do
...
end

# or the shorter form:

defsomething name [optional parameters], do: ...

```

The later form makes sense for simple operations.

In this code, this is used to define a `module`, a `public function` and a `private function`

Line #03 defines a module attribute. This is equivalent to a constant in other languages but is more like a C preprocessor macro. Module attributes get substituted at compile time. You have to define it in the file before you use it. You are allowed to redefine it throughout the module. These are not visible outside the module nor do they exist at runtime.

This uses a regex `sigil` `~r` with a Unicode switch on the end. This defines a simple regex that splits on certain characters. Sigils are mapped to functions so `~r` becomes `sigil_w/2`. You can use this to define your own if you need to.

Line #05 defines a public function. This ends on line #7. Elixir has no return statement as the last expression result in a function is the return value.

Line #06 is where most of the work happens. I have written this in a nested format but will spend some time tidying this up later.

Let's start with the inside of this function. It starts by calling `String.downcase/1` on the sentence.

Elixir names the function by the module, name and arity. The arity being the number of parameters that the function has.

This passes the result to `String.split/3`. 

The last parameter of `String.split/3` looks like it is a variable length list of options. 
However, it is actually a keyword list. 
A keyword list is a list of length 2 tuples where the first value is an atom.

This could be written as `[{:trim, true}]`. 
The `[` and `]` define a list, `{` and `}` define a tuple (a fixed length set of values).
`:trim` is an atom. These are mapped to a globally defined numeric identifier with an Erlang VM.
`true` is an alias for the atom `:true`.

If a function has a keyword list as the last parameter then it can be expanded to give the illusion of a variable length parameter list.

Here the `trim: true` option tells `String.split/3` to ignore empty items in the split list.
`String.split/3` returns a list which is passed into `Enum.reduce/3`

`Enum.reduce/3` (as you may guess from the name) takes three parameters. 
The first is the data to reduce. This can be any type that implements the `enumerable protocol`. 
The second is the initial value of the accumulator, here an empty map `%{}`.
The third uses the capture operator `&` to turn a function name into an `anonymous function`.

Protocols are the equivalent of interfaces. They provide a set of methods that a module must define for a data type. Enum requires the type to implement the Enumerable protocol. The `iex` REPL environment provides built in help, from `iex` type `h Enumerable` to get the documentation on the Enumerable protocol. 

Functions in Elixir are called by the module, so we would call `String.downcase('FIsh')`.
Anonymous functions are slightly different.

The anonymous function defined here

```
my_fun = fun a -> a + 1 end

# would need to be called as:

my_fun.(7)
```

Anonymous functions are first class citizens and can be passed around as parameters.
The capture syntax allows turning a function (including public functions defined in another module) into an anonymous function.

Lines #09 to #11 defines the private function `update_map/2`

Line #10 uses `Map.update/4`

The first parameter is the map.
The second parameter is a key in the map.
The third parameter is a default value to use if the key does not already exist in the map.
The fourth is a function used to transform the existing value (technically it is a `functor`, but Elixir generally does not use the formal terms).

Here we are using the short form of an anonymous function.
`&(&1 + 1)` is equivalent to the anonymous function that I defined above `fn a -> a + 1 end`.
It again uses the capture operator and references positional parameters by index.

This finishes the first pass through the module, but we can do better.

### First refactor

Elixir has some more syntactic sugar that will help here. You can use the pipeline operator `|>` to remove the nesting.

`a(b())` becomes `b() |> a()`.
The pipeline operator takes the output of the left hand side and puts it into the first parameter of the right hand side function.

Version 2

```
defmodule Words do

  @seperators ~r/[ _,!&@$%^&:]/u

  def count(sentence) do
    String.split(String.downcase(sentence), @seperators, trim: true)
    |> Enum.reduce( %{}, &update_map/2)
  end

  defp update_map(word, acc) do
    Map.update(acc, word, 1, &(&1 + 1))
  end
end
```

This is easier to understand.
There is a convention to align the pipeline operator with the data that it was passed into.

We can go much further with this:

### Second Refactor

```
defmodule Words do

  @seperators ~r/[ _,!&@$%^&:]/u

  def count(sentence) do
    sentence
    |> String.downcase()
    |> String.split(@seperators, trim: true)
    |> Enum.reduce( %{}, &update_map/2)
  end

	defp update_map(word, acc) do
  	Map.update(acc, word, 1, &(&1 + 1))
  end
end
```

This is a clearer read. You now can see the order of execution.

### Third Refactor

Now I am going to add a typespec to the code. The code so far looks untyped, but that is only because we have not restricted anything.

```
defmodule Words do

  @seperators ~r/[ _,!&@$%^&:]/u

  @spec count(String.t()) :: map
  def count(sentence) when is_binary(sentence) do
    sentence
    |> String.downcase()
    |> String.split(@seperators, trim: true)
    |> Enum.reduce( %{}, &update_map/2)
  end

  @spec counter(list, map) :: map
	defp update_map(word, acc) do
  	Map.update(acc, word, 1, &(&1 + 1))
  end
end
```

Here I have made three edits to the solution. Each of the functions now has a `typespec` and I have added a guard clause to `count/1`. Typespecs allow static checking of the code. It's not a required part of the language but does add value in larger projects. There is a tool called [dialyzer](https://hexdocs.pm/dialyzex/Mix.Tasks.Dialyzer.html) that can be used to statically check a codebase to ensure that all uses of a function conform to the typespec. Recent versions of Elixir (from version 1.10) will check that a function`s signature matches the typespec if a typespec is provided.

`is_binary/1` is a guard clause. This can be used to assist with the definition of a type. Functions in Elixir use pattern matching which permits a function to have multiple clauses. Guard clauses provide the ability to add some extra details. The name binary comes from Erlang since it can be used to parse a binary file.

It's fairly common to have functions return two tuples `{:ok, details}` and `{:error, reason}`.
Here is a process/1 function:

```
def process({:ok, details} = body) where is_string(details) do
  IO.puts(details)
  body
end

def process(body = {:error, reason}) do
  IO.puts("Error, #{reason}")
  body
end
```

This demonstrates a two clause function. If details are not a string then the first clause will not match and you will get a run time exception. The `= body` is used for pattern matching to capture the entire tuple. This matching can happen on the left or the right. Pattern matching is also used to deconstruct the tuple to obtain the details. In both cases, the input is passed on to the output making them easy to chain with pipelines. This allows some sophisticated validation to be applied without needing to use an `if`.


Elixir takes the following maxim from Erlang `Unless you can handle an error "let it crash".`

For more details on why see [Joe Armstrong's doctorial thesis](http://erlang.org/download/armstrong_thesis_2003.pdf)


This hopefully will make understanding the Elixir library of functions easier.
The first parameter is normally where data will arrive via a pipeline.
The last parameter is frequently used to provide options in a Keyword list.

If you want to find out more about Elixir why not join the Elixir track on [Exercism](https://exercism.io) where I am one of the mentors.