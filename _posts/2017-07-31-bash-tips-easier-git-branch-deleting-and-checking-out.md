---
layout: post
name: bash-tips-easier-git-branch-deleting-and-checking-out
title: 'Bash tips: Easier git branch deleting and checking out'
date: 2017-07-31 00:00:00 +00:00
author: Liam Griffin
canonical:
    name: my personal blog
    href: https://medium.com/@Gryff/bash-tips-easier-git-branch-deleting-d93da0f0acec
image:
    src: /assets/custom/img/blog/git_logo.png
    attribution: 
        text: Git logo
        href: https://www.scm-manager.com/wp-content/uploads/2013/04/git-logo.png
tags: 
- bash
- git
---

I aspire to be a true lazy programmer.

Every repetitive action I try to automate. Every task that doesn’t translate to automation I try to shrink, saving as many keystrokes as possible. Such it is with deleting git branches.

## Easier deleting

If you use pull requests in your daily coding life, you’ll know about having to clean up unneeded branches after finishing your task and merging the PR. I created a function to make this easier:

```
function git_branch_delete_like () {
  # get all local branches
  git for-each-ref --format='%(refname:strip=2)' refs/heads/* | \ 
  # filter for the matching pattern  
  grep $1 | \
  # delete all matching branches
  xargs git branch -D 
}
```

The delete like also solves the problem of "Damn I can’t remember the name of my branch, but it was something like fix-terrible-bug". Just do `git_branch_delete_like bug`. Of course, by putting this in your `~/.bashrc` you have autocompletion so you don’t need to type the whole function name out, however I still find it a bit to flow-disrupting to do `git_b<TAB>`, so I aliased it to `gbd`.

```
alias gbd="git_branch_delete_like"
```

And my branch deleting laziness is complete.

```
$ gbd bug
Deleted branch fix-super-terrible-bug (was 6dd0640).
```

## Easier checking out

Following on from this, here’s a way to checkout a branch matching against a pattern, for when you can’t remember the actual name of a branch.

I’ve also added a little extra functionality to try and checkout a remote branch if there is no matching branch locally.

```
function git_checkout_like() {
  MATCHING_LOCAL_BRANCH=$(git for-each-ref --format='%(refname:strip=2)' refs/heads/* | grep $1)
  if [ -n "$MATCHING_LOCAL_BRANCH" ]
  then
    git checkout $MATCHING_LOCAL_BRANCH
  else
    # try and find a matching remote branch
    git for-each-ref --format='%(refname:strip=3)' refs/remotes/** | \
    grep $1 | \
    xargs git checkout
  fi
}
```

As before, I’ve aliased this to something short:

```
alias gcl=git_checkout_like
```

Now I can checkout with ease!

```
$ git branch
* master
  my-feature
  my-other-feature
$ gcl other
Switched to branch 'my-other-feature'
$ git branch -r
  origin/HEAD -> origin/master
  origin/master
  origin/coworkers-feature-that-he-wants-you-to-check
$ gcl coworkers
Branch coworkers-feature-that-he-wants-you-to-check set up to track remote branch coworkers-feature-that-he-wants-you-to-check from origin.
Switched to a new branch 'coworkers-feature-that-he-wants-you-to-check'
```

### Caveats
If there is more than one branch that matches your pattern you’ll get an error. I did think about just checking out the first available branch that matches the pattern, but as it might not be the branch you were after I decided to leave it out.

Stay lazy.

