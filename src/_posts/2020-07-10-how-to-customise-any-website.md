---
layout: post
asset-type: post
name: how-to-customise-any-website
title: How to Customise Any Website
date: 2020-07-10 10:00:00 +00:00
author: Christopher Eyre
description: How to Customise Any Website.
image:
    src: /assets/custom/img/blog/cat.jpg
tags:
    - javascript
abstract: Making changes to any website.
alias: [/2020/07/10/how-to-customise-any-website]
---

## Using Tampermonkey to Change The World

Websites frequently have things that we would like to change.
This can be simple things as wanting the headline text to be bigger.

If you run the website you can make the change (if you can get it approved).
However, if it is someone else's website then you would normally be stuck.

What if I told you that you can make a change to any website, with the limitation that only you get to see the change?

This is where the browser extension Tampermonkey comes in (I am a Chrome user, there also exists a version called Greasemonkey that works on Firefox).

If you install this extension it will allow you to run your own scripts after the page has loaded.

Tampermonkey can be obtained from (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)[Tampermonkey Extension]

## A Useful Example

Codurance is a dynamic company and the staff numbers fluctuate (trending up over time).
Our website shows the current staff (https://codurance.com/about-us/our-people/)[Our People]

I would like to know at a glance how many people do we currently have.

This is not something that we would want to put on the site itself, but is of interest to some people.

My solution to this problem was to go into Tampermonkey by pressing its icon (it looks like an old cassette tape).
Once in the tampermonkey page I pressed the add script button (the big plus symbol)

I then entered the following code (feel free to copy)

```javascript
// ==UserScript==
// @name         Count Codurance Staff
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  How many people do we have?
// @author       Chriseyre2000
// @match        https://codurance.com/about-us/our-people/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('h1').text( 'Our People (' + $('div.g-max-width-800').length + ')'  );
})();
```

Once you enter that and press File | Save then you have an installed script.

Now go and visit this page again: (https://codurance.com/about-us/our-people/)[Our People]

This should now show a count of how many people currently work at Codurance.

This is a small demo of the changes that you can make to a site.

## More Practical Uses

This does also open up the chance to demo potential changes to a clients website without deploying anything. Even if the website belongs to a third party.

At my previous employer we used this to customise the user interface of Contentful to allow us to add a preview button to the content entry screen. Given that we knew the url of the page we were on we could determine where the preview site page would be. Given that our static site generator was listening for changes to the preview site, and it was regenerated within a second by the time the editor had scrolled to the preview button the site was ready. This massively reduced the cycle time of entering content.

## Your Turn Now

Can you think of a website that you could improve? Is the font too small? Is the page in the wrong order? Do you want to rename a company to Evil Corp? All these things are now possible.