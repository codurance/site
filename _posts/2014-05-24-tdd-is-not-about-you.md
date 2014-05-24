---
layout: post
name: tdd-is-not-about-you
title: TDD is NOT (just) about you
date: 2014-05-24 22:18:00.000000000 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/blog/tdd_is_not_about_you.gif
tags:
- Craftsmanship
- TDD
---

Recently, another big debate about TDD started on Twitter and blogosphere. Is TDD dead? (No, that's ridiculous.) Does it improve or damage our design? Does it make us faster or slow us down? [Seb Rose](http://twitter.com/sebrose) compiled a [list of blog posts and tweets](http://claysnow.co.uk/to-tdd-or-not-to-tdd/) about it, so I won’t repeat them here. If you are not aware of the whole discussions, please read all the links Seb collected at the end of [his post](http://claysnow.co.uk/to-tdd-or-not-to-tdd/).

I’ve been using TDD for many years, and although I’m fully convinced of its benefits, I’m not going to describe the pros and cons of TDD from my own point view. That would be a bit selfish. What I hope to do here is to raise a few points that haven’t been raised before in the discussions I’ve seen.

#### "I’m great, you are not."

There is a fair share of developers that think this way. It’s all about "Me! Me! Me!” They are developers that, if they are not already working in isolation, given the option, they would prefer to work on their own instead of a team. After receiving some requirements, they feel more comfortable going to a place where they are not going to be disturbed, and just get on with it. They will code on their own until they feel they are done. They don’t need to pair. They don’t need to write tests. They don’t need to learn new tools and practices because they are already awesome developers. Or so they think.

Developers that fits this description are normally the ones that are more resistant to TDD, if not totally against it. TDD slow them down. TDD damages their pre-conceived idea of good design. TDD doesn’t help them because they know their code base well and can find bugs quite quickly. Since they are the only developers working on the code base, very rarely they make a mistake. They know where to change and how to change.

Am I being unfair? Am I being a jerk? How do I know that certain developers think this way? The answer is simple: I was one of them. That’s exactly how I used to think some years ago.

“This code sucks. Who was the moron that wrote this crap?” How many times have we said (or at least thought) that? Well, here’s some news to you. If you ever worked in a team, or had your code viewed, used, or changed by other developers, be sure that they thought the same thing about you and your code. Yes, it hurts. So now you know how other developers feel.

Another news for you: If you always work on your own, or prefer to work on your own, chances are that you are not as good as you think you are. Other developers are the best judge of your awesomeness, not you.

If you are a developer that don’t normally work as part of team, or don’t have other developers constantly working on the same code base as you, sorry, but you probably have a very biased and unverified opinion, mainly when it comes to TDD and other programming practices.

#### TDD is not about YOU

For the vast majority of my career I worked as part of a team. In the past few years, I worked in large projects with many developers and teams in different parts of the world. There is no “I” in a team. There is no “I don’t do this” in a team. A healthy team is a team where team members respect each other and produce code that meets the standards set by the team.

Software projects, at least the ones I’m used to—not some prototypes, small CRUD web apps, or pet-project mobile app—outlive developers. Projects continue to be developed and maintained while developers come and go. A great developer understands that. She understands that other developers will need to maintain her code, long after she is gone. She understands that different developers have different ideas of what good code means. She understands that software evolves and needs to be changed. And above all, she understands well enough how tough it is to work with a large code base that she knows very little about.

Now, remember that project you joined some time ago. The one which the code was supposedly written by smart people, but unfortunately they are all gone. Or that other project, that was a total mess and no one knew what was going on. Or even that old project, with a huge code base, where the requirements were changing on a daily basis.

"Ah, if at least we had some tests." Tests we could rely on. Tests that could tell us the intent of the code. Tests that could make us feel confident to change that complicated and unknown code base. Tests that would make our experience of working on that code base quite enjoyable, and not our biggest pain. Wouldn’t it nice if we could click a button, and in a few minutes, if not seconds, we could have the confidence that we haven’t broken anything? Ah, if at least those other stupid developers have written some tests. Tests that could tell me what this code is supposed to do. Now we need to deal with this mess having no clue if we will break anything. "If at least the code was decoupled from the frameworks, I could try to write some tests quickly and make sense of all this mess."

#### Don’t be the other stupid developer

I’ve been the other stupid developer in the past. I left stuff behind that potentially caused pain to other developers. Now I know, and it sucks. Today, regardless of what I think about my own skills, I know a software project is not about me. A software project is not about any single person. So, if you still think you don’t need TDD or automated tests, think about all the other developers. Think about the people that will maintain that code once you are gone. Think about your colleagues next to you. Above all, think about yourself joining another large project with no tests, possibly written by developers that think they are as great as you.

If you still don’t want to do TDD, fine. That’s OK. My question for you is: What are you going to do instead that will give other developers the confidence to work on the code you produced? Sorry, but your awesome notion of design is not good enough if not validated and agreed by the rest of the team (and all future developers that will ever work on that code base).
