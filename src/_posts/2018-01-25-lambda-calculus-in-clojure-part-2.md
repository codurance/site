---
layout: post
name: 2018-01-25-lambda-calculus-in-clojure-part-2
title: Lambda Calculus in Clojure (Part 2)
description: Implementing a Lambda Calculus numeral algebra in Clojure
date: 2018-01-25 08:00:00 +00:00
author: Sergio Rodrigo Royo
layout: post
asset-type: post
image:
    src: /assets/custom/img/blog/2018-01-25-lambda-calculus-in-clojure-part-2.png
canonical:
    name: my personal blog
    href: http://srodrigo.me/lambda-calculus-in-clojure-part-2/
tags:
- functional programming
- lambda calculus
- clojure
---

In [Part 1](https://codurance.com/2017/12/14/lambda-calculus-in-clojure/), we built a boolean algebra using Church Encoding. In this post, we are going to reuse some of the previous work to build a similar algebra, this time for numerals.

## Church numerals

In the algebra we built in the previous post, Church booleans were encoded using higher-order functions. The way Church numerals are represented is similar: given a number `n` and a function `f`, the Church numeral of `n` is the number of times `f` encapsulates `n`. For example, for `n = 3`, the function `f` encapsulates `n` three times:

```
λf.λx.f(f(f x))
```

The general case `n` would look like this:

```
λf.λx.f^n x
```

where `f^n = f ∘ f ∘ f ∘ … ∘ f`, being `f` composed `n` times. `f` is also known as the *successor* function.

`n = 0` is a special case where we just return the parameter:

```
λf.λx.x
```

## Church numerals in Clojure

Using the [macro](https://github.com/srodrigo/lambda-calculus-in-clojure/blob/master/src/lambda_calculus/lambda.clj) we created in Part 1, we can now implement Church numerals in Clojure using a notation close to Lambda Calculus:

```
(def zero
  (λ f (λ x x)))

(def one
  (λ f (λ x (f x))))

(def two
  (λ f (λ x (f (f x)))))

(def three
  (λ f (λ x (f (f (f x))))))
```

The following numbers are implemented in the same way, composing `f` `n` times.
But this is not the only way to build Church numerals. As we have seen, `f` is actually the *successor* function, which can be defined like:

```
; λn.λf.λx.f (n f x)
(def succ
  (λ n (λ f (λ x (f ((n f) x))))))
```

The successor of `n` is a function that:

1. takes `f`
2. returns another function that takes `x`
3. applies `f` to the result of applying `n f` to `x`.
This is a way of generalising the `n` compositions of `f` that we have seen in the general case `n` of the Church numerals.

We can define the numbers of the example above in terms of `succ`:

```
; one
(succ zero)

; two
(succ (succ zero))

; three
(succ (succ (succ zero)))
```

### Printing Church numerals

Church numerals, and the functions built around them, can be, sometimes, difficult to visualise. Another thing we can explore in this post is how we can convert Church numerals into string representations. The idea is to consume the expression (which is a combination of functions applied to a parameter) and add the representation of each application:

```
(def λToStr
  (λ f ((f (λ n (format "f(%s)" n))) "n")))
```

A few examples:

```
(deftest λ-toStr
  (testing "toStr"
    (is (= (toStr zero) "λf.λn.(n)"))
    (is (= (toStr one) "λf.λn.(f(n))"))
    (is (= (toStr two) "λf.λn.(f(f(n)))"))
    ; three
    (is (= (toStr (succ (succ (succ zero)))) "λf.λn.(f(f(f(n))))"))))
```

### Church numerals and integers

For clarity (to avoid calling `succ` many times), we can add two functions to convert Church numerals to integers, and the other way around.
To get a Church numeral from an integer, we can create a recursive function that encapsulates the previous numeral in the *successor* function, until it reaches `0`. This is the same idea as the original definition of Church numerals:

```
(def fromInt
  (λ n
    (if (= n 0)
      zero
      (succ (fromInt (- n 1))))))
```

For example, we could try to convert `5` into a Church numeral:

```
(fromInt 5)
```

This expression will return a Church numeral that can be represented as:

```
(is (= (toStr (fromInt 5)) "λf.λn.(f(f(f(f(f(n))))))"))
```

and is also equivalent to:

```
(succ (succ (succ (succ (succ (zero))))))
```

The opposite function just consumes the numerals, adding `1` to the result, starting from `0`:

```
(def toInt
  (λ f ((f (λ n (+ n 1))) 0)))
```

A few examples:

```
(is (= (toInt zero) 0))
(is (= (toInt (succ zero)) 1))
(is (= (toInt one) 1))
(is (= (toInt (succ (succ zero))) 2))
(is (= (toInt two) 2))
```

## Arithmetic operations

Now that we have defined our Church numerals in Clojure, let's define a few operations that will help us implement a simple calculator.

### Addition

The first operation that we can define is *addition*. This operation is quite similar to *successor*:

```
; plus = λm.λn.λf.λx.m f (n f x)
(def plus
  (λ m (λ n (λ f (λ x ((m f) ((n f) x)))))))
```

In fact, `plus` could be implemented in terms of `succ`:

```
; plus = λm.λn.n succ m
(def plus
  (λ m (λ n ((n succ) m))))
```

We could say that *successor* is an special case of *addition* where `m = 1`. Similarly, implementing `plus` in terms of `succ` applies the `succ` function `n` times, starting at `m`.

A few examples of the `plus` function:

```
(testing "addition"
  (is (=
       (toInt ((plus (fromInt 7)) (fromInt 5)))
       12))
  (is (=
       (toInt ((plus (fromInt 7)) ((plus (fromInt 6)) (fromInt 2))))
       15)))
```

### Exponentiation

This operation is actually very similar to the idea behind the definition of Church numerals itself. Given the mathematical function for exp:

```
exp(m, n) = m^n
```

As per the original definition of Church numerals and `succ`, if `f^n x = n f x`, then we can substitute `f = m` and `x = f` to get `m^n f = n m f`, which can then simplify to `m^n = n m`:

```
; λm.λn.n m
(def exp
  (λ m (λ n (n m))))
```

A few examples of the `exp` function:

```
(testing "exponentiation"
  (is (=
        (toInt ((exp (fromInt 2)) (fromInt 3)))
        8))
  (is (=
        (toInt ((exp (fromInt 2)) ((exp (fromInt 2)) (fromInt 3))))
        256)))
```

### Multiplication

It follows a similar idea as *exponentiation*:

```
mult(m, n) = m * n
```

If `f^(m*n) (x) = (f^n)^m (x)`, then:

```
; λm.λn.λf.m (n f)
(def mult
  (λ m (λ n (λ f (m (n f))))))
```

A few examples of the `mult` function:

```
(testing "multiplication"
  (is (=
        (toInt ((mult (fromInt 2)) (fromInt 3)))
        6))
  (is (=
        (toInt ((mult (fromInt 2)) ((mult (fromInt 5)) (fromInt 3))))
        30)))
```

### Subtraction

*Subtraction* follows the same pattern as *addition*. Given a *predecessor* function, we define *subtraction* as:

```
minus = λm.λn.(n pred) m
```

The implementation in Clojure is straightforward:

```
; λm.λn.n pred m
(def minus
  (λ m (λ n ((n pred) m))))
```

A few examples of the `minus` function:

```
(testing "subtraction"
  (is (=
       (toInt ((minus (fromInt 7)) (fromInt 5)))
       2))
  (is (=
       (toInt ((minus (fromInt 7)) ((minus (fromInt 6)) (fromInt 2))))
       3)))
```

The *predecessor* function is quite complicated compared with the functions described so far:

```
λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)
```

If Church numerals apply a function `n` times using the *successor* function, we could do the reverse reasoning and say that *predecessor* applies the function `n - 1` times. This is achieved by wrapping `f` and `x` to skip the first application of `f`. This way, we get the remaining `n - 1` applications. [Here](https://en.wikipedia.org/wiki/Church_encoding#Derivation_of_predecessor_function) is a more detailed explanation.

A few examples of `pred`:

```
(testing "predecessor"
  (is (= (toInt (pred one)) 0))
  (is (= (toInt (pred two)) 1))
  (is (= (toInt (pred (succ (succ (succ zero))))) 2))
  (is (= (toInt (pred (fromInt 10))) 9)))
```

## A numerals calculator

So far, we have implemented a few basic numeral operations. We can now try to combine them to calculate numeral expressions.

```
(deftest λ-numeral-expressions
  (testing "numeral expressions"
    ; 3 * (2 + 5) - 2^3 = 13
    (is (=
         (toInt ((minus ((mult (fromInt 3))
                         ((plus (fromInt 2)) (fromInt 5))))
                 ((exp (fromInt 2)) (fromInt 3))))
         13))))
```

You can find the full source code [here](https://github.com/srodrigo/lambda-calculus-in-clojure).

## Conclusion

We have seen how to extend the work we did with booleans, to create a simple numeral calculator. This is a step further to understand Church encoding better, and explore more complex operations. There are even more complex things that might be worth exploring; arithmetic operations such as *division* or *modulo*, and new primitive terms such as *pairs* or *lists*, that would introduce new challenges in this game of functions with a single parameter.

## References

[Church Encoding](https://en.wikipedia.org/wiki/Church_encoding)

[http://blog.errstr.com/2012/01/14/church-encoding/](http://blog.errstr.com/2012/01/14/church-encoding/)

[Church-Turing Thesis](http://mathworld.wolfram.com/Church-TuringThesis.html)

[Programming With Nothing by Tom Stuart](https://github.com/tomstuart/nothing)

[Lambda Core - Hardcore by Jarek Ratajski](https://www.youtube.com/watch?v=6NclC7QfmYM)
