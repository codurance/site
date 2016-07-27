---
author: Sandro Mancuso
layout: post
asset-type: post
name: lsccs-first-code-retreat
title: "LSCC's First Code Retreat"
date: 2011-09-20 09:59:00 +01:00
---

On September 10th
we had the London Software Craftsmanship Community's [First Code Retreat](http://www.meetup.com/london-software-craftsmanship/events/27600561/).

![Code Retreat](/assets/img/custom/blog/coderetreat01.jpg)

We had 22 passionate and talented developers working in Java, C\#, Ruby,
Python and JavaScript. Some of them travelled two hours, waking up as
early as 5am, to come to the code retreat and many others travelled at
least one hour to be there.

We started at 8am, with breakfast and informal discussions. Then we had
a quick introduction, where I explained the purpose of the day and used
some of Corey Haines wise words. Here's a quick summary:

"In our day-to-day job, we need to get things done. We need to achieve
something and deliver something. And we want and are committed to it. In
order to do so, we end up cutting corners. So that's how we code. We
sacrifice quality in order to deliver "faster".

But now imagine you have all the time in the world and all the knowledge
in the world. Imagine what would be your idea of perfect code. Now
compare it to what you do and how you code in your day-to-day job.


![Perfect Code Gap](/assets/img/custom/blog/PerfectCode_Gap.jpg)

This gap is the measure of how much you suck. The bigger the gap is, the
more you suck. The smaller the gap is, the less you suck. :)

But today, during the code retreat, is the day that we will practice
perfect code. Today we don't need to deliver. Today we have no pressure,
besides writing perfect code. That means the objective of a hands-on
session like that, is not to finish the exercise, but to practice new
approaches, expand our horizons and learn from others. Today we will
reduce the gap from what we do in our day-to-day job and the perfect
code, providing better value for our customers and being better
professionals.


<blockquote>It's not practice that leads to perfection, it's perfect practice that leads to it.</blockquote>


I also explained the four rules of simple design:

-   All tests need to pass
-   No duplication
-   Reveals intention (good naming)
-   Small


<blockquote>I have made this letter longer than usual, only because I have no time to make it shorter.
 <footer><cite>Blaise Pascal (sometimes also attributed to Mark Twain)</cite></footer>
</blockquote>

###Format of the day


![Code Retreat](/assets/img/custom/blog/coderetreat04.jpg)

After a good breakfast, developers formed pairs and worked on the
[Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). We had
three sessions in the morning, then lunch and another three sessions in
the afternoon. Each session lasted 45 minutes and had a retrospective
afterwards where developers discussed their approaches and problems they
faced. Then developers deleted the code from their machines. In each
session new pairs were formed and worked on the same problem.


-   **First session**: It was free. Basically the pairs worked with no
    constraints just to make themselves familiar with the problem.
-   **Second session**: As a challenge, they were asked to use different
    data structure other than arrays and we introduced the concept of
    "primitive obsession".
-   **Third session**: Developers were asked not to use flags and use
    polymorphism instead. This was to promote the exploration of
    abstractions.

-   **Lunch**: We had nice sandwiches and deserts from a good
    delicatesse. We had 1.5 hours for lunch. During lunch time, some
    more senior developers said they haven't been challenged enough so I
    changed the strategy.

-   **Fourth session**: In order to satisfy developers from different
    levels, I asked them to come up with a list of challenges and each
    pair would then decide which challenge they would take on, according
    to their level of expertise. The list they came up with was;
    -   Maximum 3 lines of code per method;
    -   Object-Oriented Programming to extreme.
    -   No getters / setters / properties
    -   Every line must start with "return" or "final" (Java/C\# -
        functional style)

-   **Fifth session**: TDD as if you meant it, that means, all code
    needs to be written inside the test method and then refactored out.
-   **Sixth session**: Developers were free to do whatever they wanted
    again but many decided to use some of the challenges from sesson
    four. 
-   **Pub**


![Code Retreat](/assets/img/custom/blog/coderetreat11.jpg)

During the sessions, I also asked them to try different testing
approaches: outside-in and inside-out. The reason was to compare how
different the design would turn up. They were also encouraged to
pair-program with developers from other languages, what is an amazing
experience and broadens our mind. 

The experiment with each pair choosing the challenge on session four had
a mixed feedback. Some developers enjoyed it because they could push
themselves. Others said that the retrospective was not so good since
pairs were working with different challenges and could not relate to the
problems and solutions exposed by other pairs. This is something I'll
need to think about for future code retreats. How can I balance the
challenges so everyone feels, well, challenged.


![Code Retreat](/assets/img/custom/blog/coderetreat15.jpg)

Overall, we all had a fantastic day. There were many very interesting
discussions during the retrospectives and, according to the feedback,
everyone learnt something. I definitely learnt a lot myself and
facilitating my first code retreat was an amazing experience that I want
to repeat.

I would like to thank [Valtech](http://valtech.co.uk/) for providing the
venue and for the full sponsorship. They provided us everything we
needed for this event and were key for its success.

For the full list of attendees, details about the event and more photos,
please check
[http://www.meetup.com/london-software-craftsmanship/events/27600561/](http://www.meetup.com/london-software-craftsmanship/events/27600561/)
