
# Higher-order functions II: Currying.

We previously saw in part 5 how you can use function composition to arrange your code into sequences of steps representing the main ‘happy’ flow, while alternative ‘unhappy’ execution paths are encapsulated in a reusable structure known as a monad. Composing functions requires, perforce, functions that take exactly one argument. But you may have a function with more than one argument, so what do you do then? Are you out of luck?

The answer is, you identify which one of the function's arguments you need to be variable, and you create a new function which calls the original function while passing fixed values to all of the surplus arguments. It is very similar to the technique of partial differentiation in calculus. In this way you end up with a single-argument function that you can compose with. This is called _partial application_ and also called ‘currying’ after the logician Haskell Curry - after whom the Haskell programming language is named as well.

Now, if we were to statically define a new function that calls another function, using static values for some of its arguments, that would be only of very limited utility. For this to an effective programming technique, we need a way to partially apply functions dynamically at runtime, and this is exactly what we do. If it sounds complicated, don’t worry, like most of the things we've seen already, it really is quite simple. Higher-order functions make it very easy to do. Let’s illustrate by defining a function that adds two numbers:

```clojure
(defn add [a b] (+ a b))
```

We can create a new function that adds a static amount by fixing one of the arguments like this:

```clojure
(def add-one (partial add 1))
```

and we see that it produces the right result:

```
user=> (add-one 2)
3
```

But this is not esoteric Clojure magic. To see how trivial it is, let’s do it in Javascript too. Here’s an `add` function:

```javascript
function add(a, b) {
    return a + b
}
```

and here's a version with one of the parameters fixed:

```javascript
function addOne(a) {
    return add(a, 1)
}
```

Okay, so that’s not _exactly_ what we did in Clojure. We had a higher-order function called `partial` which can take _any_ function and fix some of its arguments. Here’s a Javascript example that is closer to the Clojure version. We’ll have to create our own `partial` function, but it’s very simple to do:

```javascript
function partial(f, fixedValue) {
    return function(a) {
        return f(fixedValue, a)
    }
}
```

Then we can use it to return a curried version of the `add` function:

```javascript
var addTwo = partial(add, 2)
undefined
addTwo(3)
5
```

### Using curry to clear mines.

So far so useless. As I said, this only becomes a really effective programming technique when you use it dynamically to create partially applied functions on demand, at runtime. So let’s try an example which makes use of the technique that’s a little more interesting. You may remember the Minesweeper game that used to ship free with Windows (you can still download it free for Windows 10).

![The minesweeper board](functional/minesweeper.png "The minesweeper board")

It presented the player with a grid of squares, each of which may or may not have a mine on it. The idea was that you would left-click on a square and, if it contained a mine, game over. If it did not contain a mine then the square would be uncovered and you continued the game. If the square was not adjacent to a square with a mine in it, it would be blank and what’s more, the game would automatically uncover any adjacent squares that also did not have mines in them. However, if the uncovered square was adjacent to one or more mines, it would show a number indicating how many of its adjacent squares contained mines. In this way you could deduce which squares contained mines and mark them by right-clicking on them. The objective of the game was to uncover all the squares without mines on them.

Anyway, this makes for quite a nice coding exercise: write a program that, given a string representing a minesweeper board, outputs a board of identical dimensions that includes numbers indicating how many of each cell’s neighbours contains a mine. For example, given this input:

```
"      *   \n"
"     *   *\n"
"**        \n"
"  *     * \n"
"  ***   * \n"
"     * *  \n"
"      *   \n"
"          \n"
"  *       \n"
"        * \n"
```

it should produce the following output:

```
"    12*111\n"
"221 1*211*\n"
"**21111122\n"
"24*421 2*2\n"
" 2***223*2\n"
" 1233*3*21\n"
"    12*21 \n"
" 111 111  \n"
" 1*1   111\n"
" 111   1*1\n"
```

We will solve this problem in Clojure, which will make several uses of currying that will hopefully show why this technique is useful.

### Getting to know the neighbours.

The first step is to find the neighbours for any given cell. To make it easier, we will extend the domain by assuming two things:

- The board is infinite.
- Negative coordinates are okay.

Neither of these assumptions will impact the final solution, as we will see. To calculate the neighbours for a cell, we can do:

```clojure
(def neighbours
  [[-1,  1] [0,  1] [1,  1]
   [-1,  0]         [1,  0]
   [-1, -1] [0, -1] [1, -1]])

(defn neighbours-of [x y]
  (set (map (fn [[x-offs y-offs]] [(+ x-offs x) (+ y-offs y)]) neighbours)))
```

We have defined `neighbours` as a vector of coordinate offset pairs corresponding to the eight cells adjacent to any board position. I have formatted it to make this more clear: the hole in the middle represents the board position. The `neighbours-of` function maps a lambda over the `neighbours` in order to add the x and y offsets of each neighbour to the supplied cell. It thus builds a set containing all eight neighbours of the cell, like this:

```
user=> (neighbours-of 2 2)
#{[2 3] [3 3] [1 1] [1 3] [3 1] [2 1] [1 2] [3 2]}
```

which are indeed the coordinates of all the neighbours of cell (2, 2). Having got this, we can construct a board containing the neighbours for just one mine. The idea is that we will examine the input board cell by cell, generate an intermediate board for every cell in the input, and then combine them all into the final result. If the cell under consideration contains a mine then the generated board will contain a 1 in every neighbouring cell; all other cells will contain zeroes. Finally we will reduce all the generated intermediate boards into the result board by summing the corresponding cells in every intermediate board.

### Constructing a board.

In order to construct a board, we need to construct a line, and in order to construct a line we need to construct a cell, so let’s start there:

```clojure
(defn generate-cell [neighbours y x]
  (if (contains? neighbours [x y]) 1 0))
```

The `neighbours` argument is a set of cell positions that are adjacent to a mine, as generated by `neighbours-of`. If the cell under consideration contains a mine then this will contain the positions of its neighbours, otherwise it will be an empty set. The y and x arguments are the coordinates of the cell to be generated. They are in that order for a particular reason, which we will soon see. Apart from that, the function is very simple: if the cell to be generated happens to be adjacent to a mine, it returns 1, otherwise 0:

```
user=> (generate-cell (neighbours-of 2 2) 2 3)
1
user=> (generate-cell (neighbours-of 2 2) 4 5)
0
```

We can thus use `generate-cell` to generate a line of cells by mapping it over a sequence of x positions:

```clojure
(defn generate-line [neighbours width y]
  (map (partial generate-cell neighbours y)
       (range 0 width)))
```

_Now_ we see some currying. We have partially applied the first two arguments to `generate-cell` in order to dynamically create a new function that only takes a single argument, which is the x position of the cell. That is why the x and y arguments were reversed. We then map this new function over the sequence generated by `(range 0 width)` which forms the x coordinates for every cell in a line:

```
user=> (range 0 10)
(0 1 2 3 4 5 6 7 8 9)
```

Now that we have a function that generates a line, by calling this function for a range of y coordinates we can see the board beginning to take shape. To fully understand this example, imagine that we are generating a 5x5 board for the cell at (2, 2) which happens to contain a mine:

```
user=> (generate-line (neighbours-of 2 2) 5 0)
(0 0 0 0 0)
user=> (generate-line (neighbours-of 2 2) 5 1)
(0 1 1 1 0)
user=> (generate-line (neighbours-of 2 2) 5 2)
(0 1 0 1 0)
user=> (generate-line (neighbours-of 2 2) 5 3)
(0 1 1 1 0)
user=> (generate-line (neighbours-of 2 2) 5 4)
(0 0 0 0 0)
```

It should be pretty easy then to see how to write a function to generate an entire board:

```clojure
(defn generate-board [dimensions neighbours]
  (mapcat (partial generate-line neighbours (dimensions :w))
          (range 0 (dimensions :h))))
```

This function expects `dimensions` to be a map containing the width and the height of the board, like this for a 10x10 board: `{:h 10 :w 10}`. Once again, it partially applies the first two arguments (neighbours and width) to generate-line and then maps that partially applied function over the sequence generated by `(range 0 (dimensions :h))` which gives the y coordinates of all the lines.

### Wait. What's mapcat?

You may be wondering what mapcat does. Well, here’s what the `generate-board` function does if we use `map` instead of mapcat:

```
user=> (generate-board {:h 5 :w 5} (neighbours-of 2 2))
((0 0 0 0 0) (0 1 1 1 0) (0 1 0 1 0) (0 1 1 1 0) (0 0 0 0 0))
```

and this is what it does with `mapcat` instead:

```
user=> (generate-board {:h 5 :w 5} (neighbours-of 2 2))
(0 0 0 0 0 0 1 1 1 0 0 1 0 1 0 0 1 1 1 0 0 0 0 0 0)
```

As you can see, it has flattened the list of lists into a single list. In other words, it does the same thing as `Stream.flatMap` does in Java. This will make life easier for us, because as I said earlier, we are going to generate one of these boards for each cell in the input. If the cell contains a mine then the generated board will contain 1 where each of its neighbours are (although it will not contain the mine itself: that will be overlaid on the final result as the last step). Then we will reduce those generated boards to a single board by summing the cell values at each position.

### Generate the intermediate boards.

Here’s the code that takes a single cell from the input and generates its output board:

```clojure
(defn mine? [cell]
  (= \* cell))

(defn board-for-cell [dimensions y x cell]
  (generate-board dimensions (if (mine? cell) (neighbours-of x y))))
```

The `if` form here is lacking an else clause. When the condition yields a falsey value then it returns `nil`, which in this case suits us just fine. As usual, the best way to get a feel for what it does is to execute it in the REPL:

```
user=> (board-for-cell {:w 5 :h 5} 1 1 \space)
(0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0)
user=> (board-for-cell {:w 5 :h 5} 1 1 \*)
(1 1 1 0 0 1 0 1 0 0 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0)
```

Now we are in a position to generate a set of boards for a given input line:

```clojure
(defn boards-for-line [dimensions line y]
  (map (partial board-for-cell dimensions y)
       (range 0 (dimensions :w))
       line))
```

which does this when executed in the REPL with various inputs. The output doesn't really look like this because I have formatted it for clarity, but the structure of the data is accurate:

```
user=> (boards-for-line {:w 3 :h 3} "*  " 0)
((0 1 0 
  1 1 0 
  0 0 0) 
 (0 0 0 
  0 0 0 
  0 0 0) 
 (0 0 0 
  0 0 0 
  0 0 0))
user=> (boards-for-line {:w 3 :h 3} " * " 1)
((0 0 0 
  0 0 0 
  0 0 0) 
 (1 1 1 
  1 0 1 
  1 1 1) 
 (0 0 0 
  0 0 0 
  0 0 0))
user=> (boards-for-line {:w 3 :h 3} "  *" 2)
((0 0 0 
  0 0 0 
  0 0 0) 
 (0 0 0 
  0 0 0 
  0 0 0) 
 (0 0 0 
  0 1 1 
  0 1 0))
```

I formatted the output by breaking the inner lists into 3x3 arrays to help you figure out what is going on. Hopefully it makes sense.

We now have all that we need to assemble the heart of our solution:

```clojure
(let [input-board "*  \n * \n  *",
      lines (clojure.string/split-lines input-board),
      dimensions {:h (count lines), :w (count (first lines))}]
  (mapcat (partial boards-for-line dimensions)
          lines
          (range 0 (dimensions :h))))
```

This produces the following output (formatted a bit to aid comprehensibility):

```
((0 1 0 1 1 0 0 0 0)
 (0 0 0 0 0 0 0 0 0)
 (0 0 0 0 0 0 0 0 0)
 (0 0 0 0 0 0 0 0 0)
 (1 1 1 1 0 1 1 1 1)
 (0 0 0 0 0 0 0 0 0)
 (0 0 0 0 0 0 0 0 0)
 (0 0 0 0 0 0 0 0 0)
 (0 0 0 0 1 1 0 1 0))
```

### Summing the intermediate boards.

That is the set of boards we need to reduce down to a single board by adding the corresponding cell values, which is what we shall do next. First though, the eagle-eyed may have noticed that the curried function `(partial boards-for-line dimensions)` is being mapped over _two_ sequences: `lines` and `(range 0 (dimensions :h))` which is a sequence of integers from `0` to `(number of lines - 1)`. This is a neat thing in Clojure: you can map a function over several sequences at once. The function being mapped needs to accept as many arguments as there are sequences, and the mapping continues until the shortest sequence runs out. For example:

```clojure
(map #(str %1 "-" %2)
     (list 1 2 3 4)
     (list "one" "two" "three"))
```

produces:

```
("1-one" "2-two" "3-three")
```

Note that the mapping stopped after the third element even though the first list has four elements. We will make use of this feature to sum the cells to reduce the boards into one, but first we need a function that takes an arbitrary number of arguments and sums them:

```clojure
(defn sum-up [& vals]
  (reduce + vals))
```

A quick test proves that it works:

```
user=> (sum-up 0 1 1 0 0 1 0 1 1 1 0 0 1 1 1 0 1)
10
```

Now we can use sum-up to reduce the boards down to a single board:

```clojure
(defn draw [input-board]
  (let [lines (str/split-lines input-board),
        dimensions {:h (count lines), :w (count (first lines))}]
    (->> (mapcat (partial boards-for-line dimensions)
                 lines
                 (range 0 (dimensions :h)))
         (apply map sum-up))))
```

with a quick test, formatted again to aid comprehensibility:

```
user=> (minesweeper/draw "*   \n *  \n  * \n   *")
(1 2 1 0 
 2 2 2 1 
 1 2 2 2 
 0 1 2 1)
```

There are two things here we haven’t seen before. One of them is `apply`: what this does is to apply the supplied function to a sequence as if the elements in the sequence were the function’s arguments. For example:

```clojure
(apply str (list "one" "," "two" "," "three"))
```

does the same thing as:

```clojure
(str "one" "," "two" "," "three")
```

In other words, it lets you use any sequence as the argument list to a variadic function, which is very useful indeed. We are using it so that the list of lists is treated as separate arguments to map in order to get the same result as if we did:

```clojure
(map sum-up
     '(0 1 0 1 1 0 0 0 0)
     '(0 0 0 0 0 0 0 0 0)
     '(0 0 0 0 0 0 0 0 0)
     '(0 0 0 0 0 0 0 0 0)
     '(1 1 1 1 0 1 1 1 1)
     '(0 0 0 0 0 0 0 0 0)
     '(0 0 0 0 0 0 0 0 0)
     '(0 0 0 0 0 0 0 0 0)
     '(0 0 0 0 1 1 0 1 0))
```

which yields the result `(1 2 1 2 2 2 1 2 1)`. (NB. The quote marks make Clojure treat the lists literally and not as function invocations).

The other thing not seen before is the thread-last macro `->>`. This is the counterpart to the thread-first macro that we saw in part 4. It is syntactic sugar in Clojure to make composed functions more readable. It allows you to rewrite this:

```clojure
(function-3 (function-2 (function-1 value)))
```

like this:

```clojure
(->> value function-1 function-2 function-3)
```

### Finishing touches.

Now we’re getting close to our desired solution. We need to translate each cell from an integer into text:

```clojure
(->> (mapcat (partial boards-for-line dimensions)
             lines
             (range 0 (dimensions :h)))
     (apply map sum-up)
     (map cell-as-text))
```

where `cell-as-text` replaces zeroes with spaces and converts other values to strings:

```clojure
(defn cell-as-text [cell-value]
  (if (zero? cell-value) \space (str cell-value)))
```

Now the behaviour is:

```
user=> (draw "*   \n *  \n  * \n   *")
("1" "2" "1" \space "2" "2" "2" "1" "1" "2" "2" "2" \space "1" "2" "1")
```

Next we need to break the output up into lines, which we do using `partition`:

```clojure
(->> (mapcat (partial boards-for-line dimensions)
             lines
             (range 0 (dimensions :h)))
     (apply map sum-up)
     (map cell-as-text)
     (partition (dimensions :w)))
```

and that gives us:

```
user=> (draw "*   \n *  \n  * \n   *")
(("1" "2" "1" \space) ("2" "2" "2" "1") ("1" "2" "2" "2") (\space "1" "2" "1"))
```

We now need to string the inner lists together, which is accomplished with more currying:

```clojure
(->> (mapcat (partial boards-for-line dimensions)
             lines
             (range 0 (dimensions :h)))
     (apply map sum-up)
     (map cell-as-text)
     (partition (dimensions :w))
     (map (partial reduce str)))
```

`str` is a function, but because functions are first-class citizens you can pass them as arguments to other functions, and that means there is no reason why you cannot partially apply one function to a second function and make a third function: `(partial reduce str)`. This has the effect of applying `(reduce str)` to each of the inner lists, which gives us this result:

```
user=> (draw "*   \n *  \n  * \n   *")
("121 " "2221" "1222" " 121")
```

We insert newline characters in between the lines:

```clojure
(->> (mapcat (partial boards-for-line dimensions)
             lines
             (range 0 (dimensions :h)))
     (apply map sum-up)
     (map cell-as-text)
     (partition (dimensions :w))
     (map (partial reduce str))
     (interpose \newline))
```

```
user=> (draw "*   \n *  \n  * \n   *")
("121 " \newline "2221" \newline "1222" \newline " 121")
```

and then join the strings together:

```clojure
(->> (mapcat (partial boards-for-line dimensions)
             lines
             (range 0 (dimensions :h)))
     (apply map sum-up)
     (map cell-as-text)
     (partition (dimensions :w))
     (map (partial reduce str))
     (interpose \newline)
     (reduce str))
```

```
user=> (draw "*   \n *  \n  * \n   *")
"121 \n2221\n1222\n 121"
```

### Overlaying the mines.

Now only one thing remains to do: we need to overlay the mines from the original input string on top of the result. That is very simple to do:

```clojure
(defn overlay-cell [top bottom]
  (if (mine? top) top bottom))
```

and if we try it in the REPL we get this:

```
user=> (map minesweeper/overlay-cell 
            "*   \n *  \n  * \n   *" 
            "121 \n2221\n1222\n 121")
(\* \2 \1 \space \newline \2 \* \2 \1 \newline \1 \2 \* \2 \newline \space \1 \2 \*)
```

Our output has come out as a list because that is what `map` always does, so we need to stringify it back together again:

```clojure
(defn overlay-boards [top bottom]
  (reduce str (map overlay-cell top bottom)))
```

Thus our final solution is like this:

```clojure
(defn draw [input-board]
  (let [lines (str/split-lines input-board),
        dimensions {:h (count lines), :w (count (first lines))}]
    (->> (mapcat (partial boards-for-line dimensions)
                 lines
                 (range 0 (dimensions :h)))
         (apply map sum-up)
         (map cell-as-text)
         (partition (dimensions :w))
         (map (partial reduce str))
         (interpose \newline)
         (reduce str)
         (overlay-boards input-board))))
```

which produces this result, formatted by me again for readability:

```
user=> (draw "*    \n *   \n  *  \n   * \n    *")
"*21  \n
 2*21 \n
 12*21\n
  12*2\n
   12*"
```

Rather than reproduce it all here, the [full version of the solution](https://github.com/richardjwild/exercism-clojure/tree/master/minesweeper) can be found on my Github page if you want to see it.

### REPL-driven development.

This has been a significantly more complex example than any other yet in the series, but I feel it was worthwhile to show how functional programming techniques can be applied to a problem more involved than roman numerals or sieving for prime numbers. In particular I hope it has shown that currying is not a mere intellectual curiosity but an essential tool for assembling functional programs, as well as the utility of function composition for structuring your code as pipelines of data transformations.

Another thing I hope to have communicated is the power of REPL-driven development. I certainly don’t advocate it as a replacement for test-driven development: the primary benefit of TDD is the legacy it leaves of a comprehensive machine-executable test suite, which testing in the REPL does not give you. Rather, I see them as complementary. While the TDD cycle period of the TDD cycle is of the order a minute or so, the feedback loop in the REPL takes literally seconds. As a technique for constructing programs that minimises debugging time, it is second to none other that I know of.

### Next time.

As my colleague Jorge likes to say, we are going to infinity...and beyond! In the next article we will examine lazy evaluation, and how it promises you everything - so long as you don’t actually ask for it.

<hr/>

