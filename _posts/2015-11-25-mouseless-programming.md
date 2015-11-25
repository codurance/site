---
layout: post
name: mouseless-programming
title: 'Mouseless Programming'
date: 2015-11-25 17:00:00 +00:00
author: Tomaz Tekavec
image:
    src: "/assets/img/custom/blog/dilbert.jpg"
    attribution:
        text: Scott Adams, Still Pumped from Using the Mouse SC 
        href: https://d1466nnw0ex81e.cloudfront.net/n_iv/600/1038055.jpg
tags:
- mouseless
- programming
- productivity
- IDE
---

## Mouseless Programming

To be honest, I used to be quite a power mouse user. Looking back and trying to figure out why I got infected, it probably happened when Microsoft released Word 6.0 with its twenty-some toolbars with thirty-some buttons in each toolbar. I didn't remember many shortcuts, except ctrl+c, ctrl+v, and ctrl+s, which I did learn and instantly became a full-stack Word guru in the eyes of toolbar-only users.

Slowly, but inevitably, IntelliJ IDEA and Visual Studio replaced my command-line Turbo Pascal and Fortran compilers, few years later one good guy showed me ReSharper... Still, I'd rather made jokes about 3,721 IDE shortcuts and Spiderman skills to execute 9-fingers keyboard combinations instead of learning one shortcut per week – and hence my right hand became a devoted Logitech docking station.

But the truth is, when we're coding, by each move from the keyboard to the mouse and back, we lose some time. It might not be a big number in terms of seconds, but during the day it's not a negligible sum. And there's another side effect – if you need mouse often, it's tempting to have several toolbars and nice gadget frames visible, which in turn decreases the available space for our core business, coding. 
To get rid of this bad habit, I recorded two cases, a comparison between performing some common coding tasks using a mouse, and without it. In the videos below, you can see the result.

#### Part I - Programming With Mouse and Keyboard

<iframe width="694" height="390" src="https://www.youtube.com/embed/g6kfdlUZARs" frameborder="0" allowfullscreen></iframe>

#### Part II - Programming With Keyboard Only

<iframe width="694" height="390" src="https://www.youtube.com/embed/Rcf6cwP_J8M" frameborder="0" allowfullscreen></iframe>


The comparison is of course not a precise scientific experiment. Some actions were slower with one scenario, one with another, but overall they should have more or less equal effect. I used only standard IDE and ReSharper with IntelliJ IDEA keyboard scheme, except moving an open document to a new vertical tab group. I use this action often, that's why I created a custom shortcut for it. I also take advantage of my custom [File Template](https://www.jetbrains.com/resharper/help/Templates__Applying_Templates__Creating_Files_from_Templates.html) and two [Live Templates](https://www.jetbrains.com/ruby/help/creating-and-editing-live-templates.html), which I created in the ReSharper Template Explorer.  I'll write more detailed about them in my next post – 'Setting up a productive programming environment'.

To eliminate or at least minimise the bad habit, you can use a simple healing method – a 10 to 15 minutes 'mouseless' session per day with these simple rules:
* Use only keyboard.
* If you encounter a situation where you would usually use a mouse, search for a shortcut – in the IDE itself or on the internet, with a side-effect of getting accustomed with your default internet browser's shortcuts.
* If you can't find appropriate shortcut in approx. 3 minutes, use mouse to continue.

It could be a bit stressful in the beginning, sometimes you had to even hide the mouse in a drawer to keep the discipline. But it gets better after each session as new keyboard shortcuts are being memorised and gradually mouse become more and more obsolete, while productivity increases. Several tools can help finding a substitute for the mouse clicks. For example, Java developers have [Key Promoter](https://plugins.jetbrains.com/plugin/4455?pr=idea), .NET developers might take a look at [Presentation Assistant](https://github.com/JetBrains/resharper-presentation-assistant) etc.

It should not take long to be able to use your favourite IDE in the full-screen mode, without any toolbars, focusing solely on coding. Moreover, if you are used to handle source control actions through visual dialogs, you might find out it's much faster to use command line tools (e.g. Git Bash instead of GitHub extension) and switching back to normal IDE view will become very rare event, reserved for operations, which are slower or, at certain stage, too complex to be handled by he keyboard.

Additional resources for the most common shortcuts:
[Open, wiki-style Reference Database for Keyboard Shortcuts](http://www.shortcutworld.com)
[Visual Studio keyboard shortcuts](http://visualstudioshortcuts.com)
[IntelliJ ReSharper Default Keymap Visual Studio Scheme](https://www.jetbrains.com/resharper/docs/ReSharper_DefaultKeymap_VSscheme.pdf)
[IntelliJ ReSharper Default Keymap IDEA Scheme](https://www.jetbrains.com/resharper/docs/ReSharper_DefaultKeymap_IDEAscheme.pdf)
[IntelliJ IDEA Keymap Scheme](https://www.jetbrains.com/idea/docs/IntelliJIDEA_ReferenceCard.pdf)

