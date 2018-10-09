---
layout: post
name: learning-from-our-failures
title: Learning from our failures
date: 2015-07-14 17:00:00 +00:00
author: Franziska Sauerwein
image:
    src: /assets/custom/img/blog/failure.jpg
    attribution:
        text: Ahhhhhhh CC-BY Kenny Louie
        href: https://flic.kr/p/88qwuz
tags:
- failure
- learning
- github
- travis
- company-culture
---

On my second day at Codurance, I managed to delete the repository with [Codurance's GitHub Pages](http://codurance.com/) on it. This made the website unavailable for the first time in a long time, and during best business hours.
I passed by all the checks Github does to make sure you know what you're doing, thinking I was about to delete the fork I accidentally created. When I saw afterwards that the fork was still there, I immediately realized what I had done.

Now it was time to make a decision: Should I to fix the problem by myself and hope no one noticed it, or confess what I did and get help solving it?
Fortunately, I chose the latter. Mortified, I told the founders what I had done.
Their reaction was very calm. No shaming, no shouting, no blaming.
They immediately started to work on getting the website back up as fast as possible and even tried to reassure me that those kind of things happen.
According to them, everyone makes mistakes and this was an opportunity to learn.

And indeed it was! I found out, that you can [ask the GitHub support](http://stackoverflow.com/a/28982367) to restore your repository with all the pull requests, auth tokens etc. on it, which is supposed to be a very fast way to recover everything.
Since no one really cared that the issue and pull request history was gone, and there were no open issues or pull requests, we restored the code and git history from a local machine. Together with another apprentice, I learned how to encrypt new auth tokens and configure [Travis](https://evansosenko.com/posts/automatic-publishing-github-pages-travis-ci/) to be able to push again. Because the auth tokens were gone from the repository, we had to create new ones.
I reconfigured the [Slack GitHub integration](http://www.shadabahmed.com/git/2015/03/06/integrating-slack-with-github-enterprise/) and asked the team to have a look at other things that might need reconfiguring.
In the end, the problems weren't as bad as I thought they were, and we could fix the issues together.

Should Codurance not have given me as many rights to modify the repository as they did? It depends on what you consider a good company culture. Allowing every team member to modify the website counters micro-managing, encourages self-organization and shows the trust placed in us. And that trust didn't waver after I made my mistake. Since then I was able and motivated to fix several issues on the website.
Of course an important factor in dealing with the problem was the fact that the website was build in such a way that it was easily recovered. This is how it's supposed to be to counter the fear of breaking stuff when you are changing things.

The reaction I got for admitting my mistake gives me the courage to admit the next failure when it occurs, allows me to move on and others to learn from it. Only through trying to remove the fear of failure, [innovation is possible](http://www.forbes.com/sites/darden/2012/06/20/creating-an-innovation-culture-accepting-failure-is-necessary/). I'm glad I joined a company with this culture.
