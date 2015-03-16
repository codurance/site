---
layout: post
name: installing-prezto-a-quick-guide
title: How to install Zsh Prezto - A guide customising your OSX terminal.
date: 2015-03-16 22:49:00 +00:00
author: Amir Bazazi
image:
    src: /assets/img/custom/blog/prezto-shell.png
tags:
- customisation
- personal
---

Once and a while, whether it be by someone I'm pairing with or someone who's just peeked over my shoulder, I'll get asked how I "got my terminal to look like that". From now on I'm just going to direct them to this post as I'm going to take a short while to explain how I achieved the colourful canvas I log into every day.

## What are Shells, Zsh and Prezto?

### Shells

For the uninitiated, I think it's worth providing a quick explanation of what you'll be tinkering with. If you already have some understanding of unix shells, you can just skip over some of these sections.

So what is a shell? In short, a shell is an interface that allows a user to communicate with your operating system. They can come in two forms, those being GUIs (Graphical User Interfaces) and CLIs (Command Line Interfaces). Microsoft Windows is a good example of a common GUI, Windows provides a desktop, task bar, start menu as well as a file browser, all of which aid the user in communicating with their operating system. CLIs are not so complex and are limited to a simple command line that takes keyboard inputs from the user to perform various tasks, although this may seem like a more primitive way of doing things, you'd be surprised how much more efficiently you can get things done once you're experienced with the command line.

### Bash and Zsh

Bash and Zsh (Z-shell) are different types of CLI shells. Unix-based systems (that includes Mac OS X) use [Bash](http://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) by default. Many of you will have learnt how to navigate your terminal using bash. To tailor our terminal to be more awesome, we're going to be changing our default shell to [Zsh](http://en.wikipedia.org/wiki/Z_shell).

### My terminal is fine, why should I use Zsh?

Zsh offers a plethora of additional features on top of bash that you may find a little more convenient and easy to navigate, and as a result might save you some time or increase your efficiency a tad. If you're someone who prefers using the default bash shell, that's perfectly fine, you're entitled to your opinion, even if it is wrong.

Some features of note that I found particularly useful when I first made the switch are:

<img style="float: right" height="200px" width="400px" src="/assets/img/custom/blog/cd-completion.png">

*    'cd' auto-completion
*    'cd' navigation
*    Syntax highlighting (including file-type distinction)
*    Command history sub-string search
*    Path expansion/replacement
*    Spelling auto-correction
*    Recursive deletion confirmation

Again, these features aren't necessary by any means, but they certainly help me navigate my terminal more effeciently and maybe they'll do the same for you. If you're still not convinced, some of these features are explained in a bit more detail in the presentation, ["Why Zsh is Cooler than your shell"](http://www.slideshare.net/jaguardesignstudio/why-zsh-is-cooler-than-your-shell-16194692) by Brendan Rapps.

### So what's Prezto?

