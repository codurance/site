---
layout: post
name: what-you-can-learn-when-you-pair-and-collaborate
title: 'What you can learn when you pair and collaborate'
date: 2015-11-03 09:00:00 +00:00
author: Mani Sarkar
image:
    src: /assets/img/custom/blog/why-collaborate.png
    attribution:
        text: None of us is as smart as all of us - Kenneth H. Blanchard
        href: https://kostiukg.files.wordpress.com/2014/12/why-collaborate.png
---

Its been over a month since I joined 'Codurance', a formidable force, and its about time that I share my experiences with my fellow mates and the community around me.

During my first few weeks at Codurance I have been busy learning various things that has been chalked out for becoming a craftsman (an Apprentice on its journey to craftsmanship).

Among the various katas I have been doing, the Gilded Rose Kata [[blog](http://coding-is-like-cooking.info/2013/03/writing-good-tests-for-the-gilded-rose-kata/)|[requirements](https://github.com/emilybache/GildedRose-Refactoring-Kata/tree/master/GildedRoseRequirements.txt)|[github](https://github.com/emilybache/GildedRose-Refactoring-Kata)] is one of them, I would like to talk about and share my experiences with you. In the process I learn a lot of refactoring techniques, design principles and gotchas, and using various libraries and methods to write your golden master (i.e. bringing your legacy code-base under a regression test suite - something that will safeguard you through the refactoring process).

I did the kata under these environmental settings:
- paired or mobbed with other craftsmen
- used pomodoros whilst refactoring and writing tests (both working on my own and with a mob of developers)
- had a lot of discussions and retrospective after trying different approaches

I will be sharing what I learnt, a technique or two that you can go away with and apply in your daily work or teach it to someone. Here are some refactoring tips and hints to share, that I made notes of whilst doing the kata:

- Refactor the deepest branch first
- Look for quick wins (removal of magic numbers, naming to reveal intent, etc...)
- Reorder / reorganise if and else blocks (manually)
- Reverse if and else blocks without loosing its meaning (automatic IDE refactoring)
- Combine if blocks with similar conditions (manually)
- Decompose if-else blocks into simpler if blocks without loosing its meaning

To share a practical insight coming from the above, whilst looking at the block block of legacy code from the Gilded Rose Kata code base:

```

```

You might think why I didn't mention ```Extract method```, which in my experience when applying to legacy code only took us through a lot more iterations of pomodoros to reach to some solution. Instead I learnt that focusing on removing primitive obsessions from the code base is a better approach and with time can help notice the emergence of DDD concepts and domain names (I'll try to share more about this in another post).

I hope this share is helpful, and hope to share more such insights in future posts.