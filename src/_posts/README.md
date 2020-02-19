## Posting in the website

To do a post in the website you need to follow the following guidelines:

1) Add a file with the following name format `YYYY-MM-DD-name-of-post.md` in `src/_posts`. the name of the file will also
 be the url of the post. `eg. https://url.com/YYYY/MM/DD/name-of-post`
 
2) Create a folder with the same name in `src/assets/custom/img/blog` where your images will be stored

3) The following metadata is needed for technical and SEO purposes.

  - `author: John Doe` (Same name on the `team.yml` so we can redirect to all your posts) 
  - `date:` (format YYYY-MMM-DD 00:00:00)
  - `layout: post`
  - `asset-type: post`
  - `title` this is the displayed title on the website
  - `abstract` this is a subtitle that is displayed only in the post page, try to make is concise.
  - `description` this is needed for sharing purposes, do a quick summary of what is the post about
  - `image: src:` this is the banner's picture path
  - `tags` add the tags that you feel go according to the post, is important that you don't repeat other tags with different
   spelling, to check the tags that exist you can run the python script `src/list-tags.py`.

You can see an example here:

```
---
author: John Doe
layout: post
asset-type: post
title: This is the title of my post
date: 2020-02-19 00:00:00
description: This is the description of the example post, it will appear when someone share's it.
image:
    src: /assets/custom/img/blog/2020-02-19-example-post/banner.png

abstract: Small subtitle under the title in the post
tags:
    - life at codurance
    - another tag
    - yet another
---
```
