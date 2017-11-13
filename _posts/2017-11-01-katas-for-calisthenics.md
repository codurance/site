---
author: Jorge Gueorguiev Garcia
comments: true
date: 2017-11-11 15:00:00 +00:00
layout: post
asset-type: post
slug: katas-for-functional-calisthenics
title: Katas For Functional Calisthenics
image:
    src: /assets/img/custom/blog/lambda.png
tags:
- functional programming
---
# The Setup

While working on katas to test the [functional calisthenics]({% post_url 2017-10-12-functional-calisthenics %}) I realized that some of the rules were not going to be covered by the rules for the katas that I had choosen. Therefore, some additional rules/premises/requirements to the katas were needed. Here I have three of the katas that we have used in the past for OOP and one kata that came out of the [HN discussion](https://news.ycombinator.com/item?id=15507081) on the post.
# The Katas

 * [Tennis](#tenniskata)
 * [Mars Rover](#marsroverkata)
 * [Bank](#bankkata)
 * [8 Queens](#8queenskata)
 
## <a class="anchor" name="tenniskata"></a><img src="{{ site.baseurl }}/assets/img/custom/blog/lambda_small.png" class="bullet-image">Tennis Katas

### Rules

- A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
- The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.
- If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.
- If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.

### Changes

- A game will be played interactively.
- All interaction will happen on the console.
- For each point the system will request to have the winner of the point.
- After each point has been submitted the system will display the current score, using the style described on basics.
- Once a player wins, the game should stop and will display the results.

### Why

The easiest kata in this post (on its original form), but still difficult enough to pose a bit of a challenge. The main point of the changes revolves around the interactivity of the system. Probably this change makes it the more difficult of the lot to handle using the rules.

## <a class="anchor" name="marsroverkata"></a><img src="{{ site.baseurl }}/assets/img/custom/blog/lambda_small.png" class="bullet-image">Mars Rover Katas

### Rules

- You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
- The rover receives a character array of commands.
- Implement commands that move the rover forward/backward (f,b).
- Implement commands that turn the rover left/right (l,r).
- Implement wrapping from one edge of the grid to another. (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.

### Changes

- The set of instructions will be provided from the console
- Before the rover moves there will be three expected inputs: Size of the world, location and direction o fthe rover, the full set of commands expected to be carried by the rover. They will be introduced separately
- Once all the inputs have been provided, the rover will output on the screen the location after it moves
- If there was an obstacle, the mars rover will output the last position before the obstacle and a text saying an obstacle was found.

### Why

Of the katas on this post is the one on which more concepts are present. Which makes it interesting when comparing the solution with OOP. Use of the [side effects at the boundaries]() is explicit with the changes introduced to the rules.


## <a class="anchor" name="bankkata"></a><img src="{{ site.baseurl }}/assets/img/custom/blog/lambda_small.png" class="bullet-image">Bank Katas
### Rules

- Deposits and withdrawals can be maded into an account
- Each deposit or withdrawal will have the amount of the operation and the date of the operation
- At any point a balance can be asked, which will show a header with the title of the different columns and all the entries on descending date order. Each column will be separated by aligned vetical bars (|)

### Changes

- The information must be stored on a file or database.

### Why

The kata itself is interesting because of the already present dependency on date. The change added is to reflect the rule of [side effects at the boundaries](). Also, because of the use of an external file/database is easy to think about the use of [infinite sequences]().

## <a class="anchor" name="8queenskata"></a><img src="{{ site.baseurl }}/assets/img/custom/blog/lambda_small.png" class="bullet-image">8 Queens Katas

### Rules

The objective is to place 8 chess queens on chess board without the queens checking each other

### Changes

None

### Why

The only time I have completed this kata I used recursion with backtracking. But one of our rules says [no use of explicit recursion]({% post_url 2017-10-12-functional-calisthenics %}#noexplicitrecursion). I am currently working on it, so a pointer for you is the use of reduce in which the accumulator is a collection of boards with the state at each time. I have also to look into Philip's Wadler paper regarding the [*List of successes method*]()(paywall)
