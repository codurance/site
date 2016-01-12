---
layout: post
name: clojure-vim-environment
title: 'Clojure VIM Environment'
date: 2016-01-10 00:20:00 +00:00
author: Mashooq Badar
image:
    src: /assets/img/custom/blog/vimenv.png
tags:
- clojure 
- vim
- craftsmanship
---

The [Cursive](https://cursive-ide.com/) plugin for Clojure is now out of its beta testing phase. I have been using it throughout its beta program and, I must say, it is pretty good. Sure, the refactoring capabilities are not quite on a par with those of IntelliJ for Java, but then Clojure is dynamic and asking for that kind of power is asking for the impossible.

I, on the other hand, have found myself going back to vim more often when I am working with Clojure. I have always found the vim shortcuts more powerful. I even use the vim plugin in IntelliJ IDEA / Cursive. Luckily there are couple of plugins available that make Clojure development in vim a joy. These are [Vim Clojure](https://github.com/vim-scripts/VimClojure) and [Fireplace](https://github.com/tpope/vim-fireplace). 

The basics I ask from a development environment are:

1. Syntax Highlighting
2. Fast keyboard based navigation through source code
3. Jump to source and docs for third-party libs
4. Fast test execution

Vim with Fireplace satisfies the basic and goes beyond that. My favourite is the block editing feature that allows me to manipulate blocks of code (e.g. replace everything within function call, copy all declarations inside a let block etc.). The plugin also automatically connects to a running repl and allows me to execute any Clojure code directly through vim. I find these features much more useful then the rudimentary refactoring such as “change function name”, although I do miss it sometimes. Note that Cursive also has an integreated repl. There is a very good tutorial for Fireplace [here](http://clojure-doc.org/articles/tutorials/vim_fireplace.html).

Here’s what my vim Clojure dev environment looks like:

<img class="img-responsive" src="/assets/img/custom/blog/vimenv.png"></img>

I have found that some investment into learning better vim usage has allowed me to become more productive than I was with Cursive, although it will not suit everyones taste. The codebases I work on are relatively small and I may still prefer Cursive for larger codebases. Having said that, I like the argument that we should never have a single large codebase. At least for now vim is my new favourite editor for Clojure. Then again! I have not tried Emacs … yet!
