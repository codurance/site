---
layout: post
asset-type: post
name: Make Your Webpack Bundles Clean and Lean
title: 'Make Your Webpack Bundles Clean and Lean'
date: 2017-04-24 09:00:00 +00:00
author: Toby Retallick
image:
  src: /assets/img/custom/blog/2017-04-26-webpack-bundles/webpack_visualiser.png
tags:
- Webpack
- Javascript
- Dependency management
- Clean code

---

##Four simple steps to reduce your Webpack bundle size ... 


A team from [Codurance](http://www.codurance.com) (including myself) are currently helping out a client on a Javascript [brownfield](https://en.wikipedia.org/wiki/Brownfield_(software_development)) project. It’s a news application with a worldwide customer base and has a stack that includes [ReactJS](https://facebook.github.io/react/), [Express](https://expressjs.com/), [Webpack](https://Webpack.github.io/) and a host of other libraries. 

Recently a member of the team noticed that certain parts of the application were serving up bundles of **nearly 2mb!** I was quite new to Webpack at the time and jumped at the opportunity to get to know Webpack better and see if I could try and solve the problem. 

This blog is the result of that process - four simple steps to reduce the size of your Webpack bundles. If you are working on a **large enterprise project** that uses a lot of dependencies on the front end (including Webpack) then I hope my experiences will be useful to you on your own project. 

###The problem with choice
Today we are spoiled for choice when it comes to front end development within the javascript ecosystem. The number of open source libraries available to us are endless. On the plus side, this allows us to continue to innovate and provide new or improved functionality for the end user. 

Obviously, there are downsides too. 

The more libraries we incorporate into our front end application, the more code that needs to be downloaded by the end user to access this functionality. More code results in bigger files and the user may be waiting longer before the application is up and running. The size of ReactJs alone is enough to make you weep. 

In the UX world, site or application loading is still a major bug-bear for users and quite often, the first experience with a site counts. A user that experiences a slow site may not end up returning. Site loading times are an important consideration for all developers, but in large Enterprise projects, optimisation can sometimes take on a whole new meaning and can be bench-marked in milliseconds rather than seconds.

###Managing dependencies with Webpack
Managing your dependencies is usually done with the help of another library. Webpack is one of a number available tools that helps package all of your dependencies. Webpack goes through all your dependencies and can combine them into one single file (i.e **a bundle**), applying useful transformations along the way. For example, removing any unreachable code, splitting your code base, turning the code into something the browser can understand etc. 

The rest of this post assumes you have some familiarity with Webpack. If you are new to Webpack you want a in depth tutorial from the ground up then I strongly recommend you check out [Survive Webpack](https://survivejs.com/Webpack/introduction/). It’s a great tutorial that's ideal for getting to grips with Webpack basics.

To assist you in this tutorial I have uploaded an [example Webpack configuration](https://github.com/TobyRet/webpack-example) that implements the steps below.

Now we are ready to continue. 

Let's look at a process for making your Webpack bundles clean and lean.

###Applying 'C.A.R.E' to your Webpack bundles
Yep. I came up with a cheesey acronym to sum up the key steps for making your Webpack bundles clean and lean (for which I do not apologise).

Question: What does C.A.R.E stand for? 

Answer: Clean, Analyse, Reduce, Externalise

Nice huh?

So in order to make your bundles smaller, go through the steps as defined in C.A.R.E. 

*Note: Even though I have specified an order here, make up your own mind as to what order makes most sense for you.*
 
###Clean
If you are familiar with the term [clean code](https://dzone.com/articles/what-clean-code-%E2%80%93-quotes) then this should be a no-brainer. 

Put simply, <strong>clean code</strong> is well-written code. 

By that I mean: 
- easy to read and understand
- easy to change
- contains only what is essential to run the application (for example, no dead code).

So what are we cleaning exactly? 

In this step, we want to clean the Webpack configuration. This is the file that defines Webpack’s custom behaviour and functionality. Often developers apply clean code principles to their code base. There is no reason why this thinking should not be extended to your Webpack configuration. 
 
The key takeaways here are three-fold:
 
1. Get rid of any unused dependencies … now! I appreciate this does not make your Webpack bundle smaller (as Webpack only bundles libraries that are used) but this is more in the interests of maintaining sanity of any developer that works on the code base in future. To find out what dependencies are no longer used then I recommend taking a look at the [DepCheck library](https://github.com/depcheck/depcheck).
2. Upgrade any remaining dependencies where you can. On the particular project I worked on some of the dependencies where more than 4 major versions behind. Among the obvious benefits like better reliability and security, sometimes more recent versions will have optimisations that result in less code.
3. Finally, its worth have a review of your Webpack configuration to see if this can be cleaned up further. If you have one large Webpack configuration for all environments (dev and prod), then consider splitting it. [Check out the example I uploaded to Github](https://github.com/TobyRet/webpack-example). 
   
###Analyse
So by now you have a nice readable Webpack configuration and you have upgraded your dependencies and removed any ones that are no longer required. The next step is to <strong>analyse</strong> your bundle to see what is taking up the most space.
 
A simple visual tool for examining your bundle is the [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/). It provides a provides a nice looking pie chart of your bundle composition allowing you to quickly understand which dependencies contribute to the size of the overall result. 

For the less visual, and for other useful alternatives take a look at [Survive JS](https://survivejs.com/webpack/optimizing/analyzing-build-statistics).

Once you have a picture of your dependencies and their weight, then start thinking about **which ones are really required**.
 
Each dependency has the potential to be a wolf in sheep's clothing. Yes they provide some handy functionality, but there is often a price — lots of code. As mentioned earlier, libraries like ReactJS are going to be fairly big, and beyond some optimisations that I will discuss shortly, there is little you can do unless you externalise the dependency. Be aware that you may be using only a **fraction** of the functionality provided by a library, but at the same time you are getting all the the library's code regardless. [Lodash](https://lodash.com/) is a good example here (Do you really need that map function?!). Perhaps you can write some helper functions yourself in vanilla Javascript? Check and see if your chosen library is available as a suite of sub-libraries giving you the option to import only the functionality you require (Lodash is available in this format). 

###Reduce
Now that you are only using the dependencies that are absolutely essential the next step is to reduce their weight further by adding a couple of plugins to your Webpack configuration.
        
The [Dedupe plugin](http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin) searches for equal or similar files and de-duplicates them in the output.

The [Uglify plugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyplugin) minifies your code. Be aware that this can end up making making it pretty unreadable when debugging in your browser's dev tools. Adding [source maps](http://webpack.github.io/docs/build-performance.html#sourcemaps) provides a way to convert it back to the original source code.


The above plugins are just two of many that can help reduce the weight of your code. There are also minimisers for css files and its worth checking out this option if it applies.

###Externalise
Finally, if you a lucky enough to be using a [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network)(CDN) then it may be worth considering externalising any large remaining dependencies (for example, ReactJs, jQuery, Moment ...).

Rather than installing and providing a large library like jQuery locally, you instead serve it on your CDN, link to it and declare this relationship in your Webpack configuration. This can significantly reduce your bundle size.

But at this point you may be scratching your head.

You maybe thinking 'If I make a dependency external doesn’t this just move the dependency (and the loading problem) elsewhere?'

Yes. But there is an additional advantage.

Browsers have the ability to load files in parallel. So rather than require the browser to load one big bundle you can get some further optimisation by allowing the browser to download two smaller files in parallel.  The CDN also provides caching benefits, so enable faster loads on subsequent visits.

## The end result
Once you have applied the steps above and build your application (don’t forget to run the -p parameter), hopefully you should now see some big differences in the build output in your terminal. It was through this process that our team was able to reduce the size of five application bundles from the 2mb mark down to around 300kb, making the internet a happier and safer place for all.

