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

Lets say we apply one or more of the above techniques to the below block of code:

```java
public void updateQuality(Item[] items) {
    for (Item item : items) {
    	// O
        if (item.name.equals(AGED_BRIE)) {
            item.increaseQuality();
        } else if (item.name.equals(BACKSTAGE_PASSES)) {
            item.increaseQuality();

            if (item.name.equals(BACKSTAGE_PASSES)) {
                if (item.expiresIn(ELEVEN_DAYS)) {
                    item.increaseQuality();
                }

                if (item.expiresIn(SIX_DAYS)) {
                    item.increaseQuality();
                }
            }
        } else {
            if (item.name.equals(SULFURAS)) {

            } else {
                item.decreaseQuality();
            }
        }

        // P
        if (item.name.equals(SULFURAS)) {

        } else {
            item.decreaseSellIn();
        }

		// A
        if (item.name.equals(AGED_BRIE)) {
            if (item.isExpired()) {
                item.increaseQuality();
            }
        } else {
        	// B
            if (item.name.equals(BACKSTAGE_PASSES)) {
                if (item.isExpired()) {
                    item.setQualityToMinimum();
                }
            } else {
            	// C
                if (item.name.equals(SULFURAS)) {
                    if (item.isExpired()) {
                        continue;
                    }
                } else { // D
                    if (item.isExpired()) {
                        item.decreaseQuality();
                    }
                }
            }
        }
    }
}
```

We can see that the code blocks are not all at the same level of abstraction but also there is duplication across them all. All our tests are green so we can move blocks around without fear as we will be alerted if we break existing functionality. To me the above blocks (O, P, ABCD) appear like the below mathematical expression, and can be merged like this expression:

```P (A + B + C + D) = PA + PB + PC + PD```

but not in this order:

```P (A + B + C + D) = AP + BP + CP + DP``` 

as it won't just work due to the change in order of the blocks, due to the order of execution which is important. In terms of code we get the below compact version, where the order and logic is preserved and duplication is removed (blocks are merged):

```java
// A
if (item.name.equals(AGED_BRIE)) {
    item.decreaseSellIn(); // P
    if (item.isExpired()) {
        item.increaseQuality();
    }
} else { 
    // B
    if (item.name.equals(BACKSTAGE_PASSES)) {
        item.decreaseSellIn(); // P
        if (item.isExpired()) {
            item.setQualityToMinimum();
        }
    } else {
        // C <=== P is not necessary to be applied here
        if (item.name.equals(SULFURAS)) {
            if (item.isExpired()) {
                continue;
            }
        } else {
            // D
            item.decreaseSellIn(); // P
            if (item.isExpired()) {
                item.decreaseQuality();
            }
        }
    }
}
```

But this is just one of the steps, as we haven't removed all of the duplications yet, we have brought the behaviours together into one block of ```if...else``` (merging P with ABCD). Now we can merge O and ABCD much easily, apply the same principle or the mathematical expression and you get the below:


```java
if (item.name.equals(AGED_BRIE)) {
    item.increaseQuality(); 
    item.decreaseSellIn(); 
    if (item.isExpired()) {
        item.increaseQuality();
    }
} else { 
    if (item.name.equals(BACKSTAGE_PASSES)) {
    	item.increaseQuality();

        if (item.name.equals(BACKSTAGE_PASSES)) {
            if (item.expiresIn(ELEVEN_DAYS)) {
                item.increaseQuality();
            }

            if (item.expiresIn(SIX_DAYS)) {
                item.increaseQuality();
            }
        }
    	item.decreaseSellIn();
        if (item.isExpired()) {
            item.setQualityToMinimum();
        }
    } else {
        if (item.name.equals(SULFURAS)) {
            if (item.isExpired()) {
                continue;
            }
        } else {
            item.decreaseQuality();
            item.decreaseSellIn();
            if (item.isExpired()) {
                item.decreaseQuality();
            }

        }
    }
}
```

On a passing note, you might think why I didn't mention ```Extract method``` as a technique to apply. In my experience when applied to legacy code only took us through a lot more iterations of pomodoros to reach to some solution. Instead I learnt that focusing on removing primitive obsessions from the code base is a better approach and with time can help notice the emergence of DDD concepts and domain names (I'll try to share more about this in another post). We can now apply 'removal of primitive obsessions' to the above compact block of code.

I hope this share is helpful, and hope to share more such insights in future posts.

<br/>
####Resources
- [Gilded Rose Requirements](https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/master/GildedRoseRequirements.txt)
- [Gilded Rose Github Repo](https://github.com/emilybache/GildedRose-Refactoring-Kata)
- [Gilded Rose blog post](http://coding-is-like-cooking.info/2013/03/writing-good-tests-for-the-gilded-rose-kata/)
- Gilded Rose videos: 
   - [C#](https://www.youtube.com/watch?v=iwWqlqXzrwU)
   - [Java](https://www.youtube.com/watch?v=HMvue3TMgSk)
- [The Gilded Rose Kata and the Approval Tests Library](https://chrismelinn.wordpress.com/category/refactoring/)
- [Improving Code – Remove “Primitive Obsession”](https://chrismelinn.wordpress.com/2012/01/31/improve-code-by-removing-primitive-obsession/)
- [Primitive Obsession from Corey Haines](http://vimeo.com/9870277)
