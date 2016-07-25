---
layout: post
asset-type: post
name: highly-strung
title: Highly Strung
date: 2014-10-02 13:00:00 +00:00
author: Samir Talwar
canonical:
    name: my personal blog
    href: http://monospacedmonologues.com/post/98472746240/highly-strung
image:
    src: /assets/img/custom/blog/highly-strung.jpg
tags:
- design
- correctness
- security
---

This blog post is way overdue.

A couple of months ago, I wrote a talk entitled [Highly Strung][] for the [Virtual Java User Group (vJUG)][Virtual Java User Group] on when and how to use strings in your code.

Spoiler: don't.

So this blog post is really just to ask you to check it out if you're interested. The link's up top, and has the talk in essay form, the slides *and* the video, lovingly recorded by the folks who run the vJUG.

Go on, [check it out][Highly Strung]. I want to tell you something else, but afterwards.

---

OK, now the cool bit. Go back to that page and click on the "Presentation" link in the top-right corner, and watch as the page *doesn't* reload.

OK, funky JavaScript. Who cares?

Well, that's because the essay and the slides are the same HTML document (give or take). It's just markup and a little bit of JavaScript to get the ball rolling.

If you look at the HTML source of the document, you'll see that there are lots of `<section>` blocks. Each one is a slide in the presentation. Inside those are lots of `<div>` blocks with a class of `notes`. In presentation mode, these are hidden. And it's [all Markdown][index.md] under the hood, rendered by GitHub Pages, so it's just a static site.

And, well, that's about it. All that "Presentation" link does is change the CSS class on the `<body>` to tell the document to hide the notes (and show a few extra things), and load up [reveal.js][]. Shiny, huh?

The only thing I'm missing is a way to get back to the essay form. Currently I reload the page, because there seems to be no way to unload reveal.js once it's loaded, but that's not so bad, y'know.

[Highly Strung]: http://samirtalwar.github.io/talks/highly-strung.html
[index.md]: https://github.com/SamirTalwar/talks/blob/gh-pages/index.md

[Virtual Java User Group]: http://virtualjug.com/
[reveal.js]: https://github.com/hakimel/reveal.js
