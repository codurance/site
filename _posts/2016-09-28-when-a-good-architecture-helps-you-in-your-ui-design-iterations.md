---
author: Ana Nogal
comments: true
date: 2016-09-28 10:00:00 +00:00
layout: post
asset-type: post
slug: when-a-good-architecture-helps-you-in-your-ui-design-iterations
name: When a good architecture helps you in your UI design iterations
title: 'When a good architecture helps you in your UI design iterations'
canonical:
    name: my personal blog
    href: http://www.ananogal.com/blog/when-a-good-architecture-helps-you-in-your-ui-design-iterations/
image:
    src: /assets/img/custom/blog/server-side-swift.png

tags:
- swift
- Memento
- VIPER
- Separation of conserns
- UI design
- Clean architecture

---

Currently, I'm doing an internal app for Codurance: I've started a long time ago while I was still in the client and was just a pet project. I've started with one idea in my mind: to make it work. After six or seven months of trying to put it all together, I could come up with a working app. At that time I wasn't satisfied we my work, even though I had made everything with TDD and had all my ViewControllers as light as I could imagine, I thought I wasn't enough.
So I decided to do a big refactoring and apply to it the VIPER architecture.

## So what's VIPER?

VIPER stands for View, Interactor, Presenter, Entity, and Rooter, and it's the [clean architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) applied for iOS.
 It's not my intention to talk about VIPER in deep in this article, but if you are interested in know more, [here](https://www.objc.io/issues/13-architecture/viper/), you have a good definition of the architecture, and [here](https://swifting.io/blog/2016/03/07/8-viper-to-be-or-not-to-be/) you have a good explanation that can help you decide if you want to use it in your app or not. The section "Benefits of VIPER" in [this article](https://brigade.engineering/brigades-experience-using-an-mvc-alternative-36ef1601a41f#.d8zy2b507) explain quite well why I decided to use VIPER.

## Make it work
So as I explain, my main objective was to make it work. And I did. With my big refactoring in place, I finished my goals for the app in no time, having the big features working:

- Retrieve Activities from the server
- Search activities by name
- Retrieve TimeEntries from the server
- Show TimeEntries in a list
- Add new TimeEntries
- Delete TimeEntries

Here is how the app looked at that time:
<div>
<img src="/assets/img/custom/blog/2016-09-28-memento-first-version.png" alt="first version" width="169" height="300" style="float='left'" />

<p  style="float='left'" >This version had several problems: The way to add or delete new TimeEntries was completely obscure for a new user: you had to swipe the cell to see the buttons. I was using this pod: [SWTableViewCell](https://github.com/CEWendel/SWTableViewCell) to achieve this.
I was happy because my app was working, but I was sad because it wasn't an app that I would like to show off. So I had a talk with our [UI expert](https://twitter.com/GiuliaMantuano), and we decided to start iterating till we get to a point we would like the app.</p>
</ div>

## First Iteration: Copy Google Calendar

<img src="/assets/img/custom/blog/2016-09-28-memento-second-version.png" alt="second version" width="169" height="300" />

Even though this app is not a calendar app, it all revolves around a calendar. So we first look at apps that had the objective of entry time slots of work, but really some of then were more like Excel sheets than apps. And because my initial idea was to have a list of TimeEntries, we looked at the [Google Calendar App](https://itunes.apple.com/gb/app/google-calendar/id909319292?mt=8) and the simplicity and clean design call to us. So we decided that could be a good first step to do a similar design and see how it would go.  
It looks better, doesn't it? But I still got the problem of the usability... I was insisting on having this swipe version because as a user, I prefer apps that have all at hand and I don't have to go into several different views to achieve something. So I was kind of insisting on just having a one view app.

## Second Iteration: Remove hided functionality

<img src="/assets/img/custom/blog/2016-09-28-memento-third-version.png" alt="third version" width="169" height="300" />

So with this in mind, and playing a little with colors (must confess that the colors here are my fault :) ), we add the functionality to the only view of our app. [Giulia](https://twitter.com/GiuliaMantuano) helped me to have the usability in consideration and for the first interaction on that, I think that we didn't had that much problem in remove the pod and add this functionality. She decided to have 3 views since we really have 3 kinds of users: the ones that everyday update their hours, the ones that  do it by week, and the ones that only do it once per month.


## Third Iteration: Trying to have insertion in just one line

<img src="/assets/img/custom/blog/2016-09-28-memento-fouth-version.png" alt="fourth version" width="169" height="300" />

As you can see I'm very bad in choosing colors, but right then we were more worried about having everything that was related to a new insertion in just one line. And to keep it simple. The delete functionality stayed in the swipe, but that is an expected behavior from an iOS app, so we were ok with that.

## Fourth iteration: Playing with colors

<img src="/assets/img/custom/blog/2016-09-28-memento-fifth-version.png" alt="fith version" width="169" height="300" />

Finally, [Giulia](https://twitter.com/GiuliaMantuano) dedicated some time to me (I guess she was horrified with my colors choices :P ) and decide to have a look at the colors. Notice the difference? Me too...
But we were not happy yet with the insertion line. The field to search activities was too small and the stepper was too big in comparison.

## Fifth Iteration: Add a picker view

<img src="/assets/img/custom/blog/2016-09-28-memento-sixth-version.png" alt="sixth version" width="169" height="300" />

The fact that now we have a pickerView, gave us the space we need it to have a big text field. And so the app now looked like and harmonious app and still doing what I had in mind: Just use one view to do everything in the app.

## What VIPER had to say in all of this

As you may notice, I had to change several times the UI and some were radical changes (we had a version that we try to put the insertion line in the bottom, after the list). And because I had everything really independent and a good separation of concerns, I just needed to change my UI elements, connected then correctly in my ViewController and there you go, everything else would work like a charm. The longest that took me to make this changes were like two days and because I had some problems with AutoLayout. And even though I say I have everything just in one view, in reality I have 3 ViewControllers: The Home which as the SignIn functionality (We are using [Google Sign in Pod](https://developers.google.com/identity/sign-in/ios/start-integrating)), The Activities controller that is the only view that you see, and the TimeEntries controller which is an ContainerView on the Activities controller:

<img src="/assets/img/custom/blog/2016-09-28-memento-storyboard.png" alt="storyboard" width="300" height="185" />

This permit me to have a good separation of concerns for listing and insertion of TimeEntries.

## Conclusion

The decision to adopt the VIPER architecture was a good decision, and even though I don't have a big set of new features coming up, I really appreciate the fact that I always know exactly where I have to go to find something in the app.
We still have some functionality that we want to add to the app, but I think that what concerns design is really done. And another thing that I felt was that I didn't want to "kill the designer" when Giulia appear with new ideas that would make me change all of the design. It was really simple to adopt and painless. And that's a thing that it's good to have.
