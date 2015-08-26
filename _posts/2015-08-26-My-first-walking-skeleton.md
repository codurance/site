---
layout: post
name: My-first-walking-skeleton
title: My first walking skeleton
date: 2015-08-26 09:00:00 +00:00
author: Franziska Sauerwein
image:
    src: /assets/img/custom/blog/squirrel-skeleton.jpg
    attribution:
        text: Picture of a squirrel skeleton
        href: https://commons.wikimedia.org/wiki/File:Die_vergleichende_Osteologie_(1821)_Sciurus_vulgaris.jpg
tags:
- Walking Skeleton
- TDD
- Continuous Integration
- Continuous Deployment
- Domain Driven Design
- Heroku
- Scala
- SBT
- Cucumber
- Travis
---

<blockquote>A Walking Skeleton is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components. The architecture and the functionality can then evolve in parallel.
 <footer> <cite><a href="http://alistair.cockburn.us/index.php/Walking_skeleton">Alistair Cockburn</a></cite></footer>
</blockquote>

One of the goals I had for my apprenticeship was to learn more about Continuous Integration and Continuous Deployment. Building my own little pet project fit in nicely with that, and I wanted to try a couple of new things with it.
A concept I was very curious about was the [Walking Skeleton](http://blog.codeclimate.com/blog/2014/03/20/kickstart-your-next-project-with-a-walking-skeleton/). I read about it in [Growing Object-Oriented Software Guided by Tests](http://www.growing-object-oriented-software.com/) and as I understood it, it was a way to test-drive my architecture and reduce risk in the beginning of my project.

### Taking on the challenge

I had started the project in [Scala](http://www.scala-lang.org/) and used [SBT](http://www.scala-sbt.org/) as a build tool, both of which I'd never used before in a project. As I had limited experience with functional programming, I watched the videos from the Coursera Lectures on [Functional Programming Principles in Scala](https://www.coursera.org/course/progfun). Solving some of the riddles there was quite fun! Unfortunately, that didn't help with the hurdles and hiccups of using SBT and a couple of plugins that didn't play well with the newest Scala version. Quite a couple of times I got stuck and had to ask my mentor for help. But pairing with him always brought a great deal of motivation and progress.

### Making the first steps

The next task was to decide how to get the integration up and running quickly.
I first set up a simple [Hello World](https://en.wikipedia.org/wiki/%22Hello,_World!%22_program) and deploying it to [Heroku](https://devcenter.heroku.com/articles/getting-started-with-scala#set-up). I decided to pass on using play and use as few plugins and frameworks as possible.

My initial steps were:

- create a [repository](https://github.com/codurance/gr8craft) for my project
- open a console in the directory of the local clone of the repository
- install SBT with ```brew install sbt```
- create a [simple HelloWorld and SBT config](https://github.com/codurance/gr8craft/tree/7bcf1bfb42ec87cfddeb48cf8c5160b4834adbd4)
- install Heroku with ```brew install heroku``` and ```heroku login```
- create the app on Heroku with ```heroku create``` (I renamed it later)
- deploy with ```git push heroku```
- show the log with ```heroku logs```

 Of course, not everything worked as intended from the start. As you can see from my commit history, it took a few tries and pairing with my mentor to get the app really working and the Hello World output to show up in the logs.
 SBT was particularly challenging, as it was so unfamiliar. Once I got it working on my machine, it was easy to deploy and run on Heroku, though.

### Defining the domain

The idea I wanted to implement was a [small bot](https://twitter.com/gr8craft) helping developers to remember good design principles while they were reading twitter. I registered a twitter account and, with the help of my mentor, decided on it's first feature:

```
Feature: Hourly Article Tweet
  As a follower of gr8craft
  I want hourly tweets to software design articles in my timeline
  so that they inspire me to do better design
```

I described the initial domain:

```
"Clock" reaches "Full Hour" triggers "Tweet" contains "Link" points to "Article" is stored in "Shelf".
```

And I wrote an acceptance test for the feature:

```
Scenario: Hour reached
    Given the next article on the shelf about "DDD" can be found at "http://t.co/lqJDZlGcJE"
    When the hour is reached
    Then gr8craft tweets "Your hourly recommended article about DDD: http://t.co/lqJDZlGcJE"
```

### Test-driving the skeleton

I set up my first test with [Cucumber](https://cucumber.io/), tweeting against the real Twitter API using [twitter4j](http://twitter4j.org) and asserting that the last tweet was actually the expected one. I set up a testing account especially for this purpose. Before each test run, I clean up the timeline so as not to run into the problem of having twitter reject duplicated tweets. Another problem was that Twitter shortened the link I posted, making it hard to test if it was actually the link I was expecting. By using the shortened version directly I avoided setting up a complicated assertion to see that the shortened version was redirecting to the same location.
The ApplicationRunner was developed test-driven using mocks.

Initially, I didn't know how the scheduling would work. That's why I started with a fake scheduler that would use the real clock to set up a trigger for new tweets. When I got a little further in I realized that using a scheduled thread executor was much simpler and easier to tests, so I changed that.

I implemented the application and went on to figure out the scheduling. My first refactoring was ahead - I started by test-driving the new way of scheduling: updating the  [ScheduledExecutor](https://github.com/codurance/gr8craft/commit/9ec1e4b8a479a4055e373c6e7295abdc08edd22e) and using [TweetRunner](https://github.com/codurance/gr8craft/commit/9bab89bc5768b4803b1c797d5c869863a56aea84) to do the actual work. I wanted to test the scheduler, so I made the time interval configurable and used Scala Test's [Eventually](http://doc.scalatest.org/2.0/index.html#org.scalatest.concurrent.Eventually$) to give it a few tries:

```
@RunWith(classOf[JUnitRunner])
class ScheduledExecutorShould extends FunSuite with Matchers with Eventually with BeforeAndAfter with OneInstancePerTest {

  var wasScheduled = false
  val scheduler = new ScheduledExecutor(NANOSECONDS, new Runnable {
    override def run(): Unit = wasScheduled = true
  })

  after(scheduler.shutdown())

  test("schedule the runnable") {
    scheduler.schedule()

    ensureRunnableWasScheduled
    scheduler.isShutDown shouldBe false
  }

  test("shutdown the runnable") {
    scheduler.schedule()
    ensureRunnableWasScheduled

    scheduler.shutdown()

    scheduler.isShutDown shouldBe true
  }

  def ensureRunnableWasScheduled: Unit = {
    eventually(timeout(5.seconds), interval(1.seconds)) {
      wasScheduled shouldBe true
    }
  }
}
```

All that was left is to change my Cucumber steps and application to use the new Scheduling mechanism and TweetRunner. The tests were green and I could see the result on the [testing account](https://twitter.com/gr8crafttest). Success!

### Making it run properly

To make the new application run on Heroku, I needed to [configure the twitter4j environment variables](http://twitter4j.org/en/configuration.html) there. I didn't want to publish them by adding them to the github repository and had used a file to configure them locally.
Heroku allows for easy configuration of environment variables via the website or the command line. I chose the latter and configured them by simply executing

```
heroku config:add oauth.consumerKey=**********
heroku config:add oauth.consumerSecret=************
heroku config:add oauth.accessToken=**************************************************
heroku config:add oauth.accessTokenSecret=******************************************
$ git push heroku master
```

### Logging the essentials
It is important to log the interaction with external resources like Twitter and the Scheduler, and to record errors in the right place. If you wait to do this for too long, it can make maintaining your application a real pain. I already benefitted from having the logging to localize problems.

I introduced [slf4s](http://slf4s.org/) and [logback](http://logback.qos.ch/) into the mix. This allowed me to easily log from any Scala class by using the *Logging* trait:

```
class TwitterApiService(twitter: Twitter) extends TwitterService with Logging {
  ...
  def sendToTwitter(tweet: String): Unit = {
    log.info("sending tweet to Twitter: " + tweet)

    twitter.updateStatus(tweet)

    log.info("successfully tweeted " + tweet)
  }
  ...
}
```

Since twitter4j was generating a lot of noise communicating with the Twitter API, I had to create a logback configuration file and set it to a different logging level:

```
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <logger name="twitter4j" level="INFO"/>

    <root level="debug">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

### Setting up Continuous Integration

There were a few tasks left to making the whole thing run not only by manually running the cucumber test in the IDE. I noticed not all the tests were executing in the IDE. That's because it was looking for JUnit tests. This was an easy fix by adding ```@RunWith(classOf[JUnitRunner])```. Now to make the cucumber tests run when I executed ```sbt test``` on the console, I needed to add [JUnit Interface](https://github.com/sbt/junit-interface) to my SBT dependencies. I had decided against using a SBT Cucumber plugin, as the ones I found were incompatible with the newest version of Scala.

To set up Continuous Integration, I installed ```brew install travis``` and created a simple [Travis](http://docs.travis-ci.com/user/languages/scala/) configuration file:

```
language: scala
scala:
- 2.11.7
```

Fortunately, Travis can use SBT to automatically build and test without further configuration. The only thing I don't like is that all dependencies have to be loaded again for every build, which makes it kind of slow.
Travis needed to know the authentication for the twitter4j configuration too. I thought this would be easy to do just by encrypting the variables in [travis.yml](http://docs.travis-ci.com/user/environment-variables/#Encrypted-Variables).
However, since Travis uses bash, it doesn't allow for dots in the variable name. I created a workaround by setting custom environment variables and using them to programmatically configure twitter4j:

```
def createTwitter(suffix: String = ""): Twitter = {
   val configuration = new ConfigurationBuilder()
     .setDebugEnabled(true)
     .setOAuthConsumerKey(readEnvironmentVariable(suffix, "twitter4jconsumerKey"))
     .setOAuthConsumerSecret(readEnvironmentVariable(suffix, "twitter4jconsumerSecret"))
     .setOAuthAccessToken(readEnvironmentVariable(suffix, "twitter4jaccessToken"))
     .setOAuthAccessTokenSecret(readEnvironmentVariable(suffix, "twitter4jaccessTokenSecret"))
     .build()

   new TwitterFactory(configuration).getInstance()
 }
```

The suffix is used so that I can have a different configuration for the production code and the tests, which run on a different Twitter account. Of course, I had to set these variables in my local command line, IDE and on Heroku as
well.

I added the variables to the Travis config automatically via

```
travis encrypt twitter4jconsumerKey4testing=********** --add env.matrix
```

Still, the tests were failing on Travis since the retry timeout was not high enough. Once the problem was found, it was easy to fix and the build was finally green.

### Deploying to Heroku automatically

That was surprisingly easy! I just used the [wizard provided by Travis](http://docs.travis-ci.com/user/deployment/heroku/):

```
travis setup heroku
```

I answered three simple questions and it automatically added the [necessary information](https://github.com/codurance/gr8craft/commit/2570086f4ba9927f956141a552bc64cd932b10dd) to my travis.yml. It just worked!

### Configuring alternative step definitions for Cucumber
Since I am running my Cucumber tests via JUnit, I could configure them with options to provide a location for the StepDefinitions. This way, I could use the same scenario definition with both the real Twitter API and a mocked version:

```
@RunWith(classOf[Cucumber])
@CucumberOptions(glue = Array("gr8craft.features"))
class CucumberFeatures {
}
```

### Coming to a conclusion
My next goal is to introduce a database with multiple articles, so that the bot will provide value to followers. I will then expand the domain and move along to the next feature, which will allow the bot to answer to mentions.

One of the lessons I learned in the last weeks was, again the value of pairing and code reviews. When I was stuck, pairing with my mentor or asking him for advice helped me instantly. He could see things from a different perspective, cover my blind spots, give encouragement and ideas and provide insights. I am very grateful for this support.

With this approach, I quickly found that my idea of how scheduling would work was off and I could easily refactor to cater for it. And I figured out the quirks of setting up the automatic testing, integration and deployment, which will pay off with every change I make.

I think the Walking Skeleton approach is a lot of effort at the start and it takes some time to see it work. But it's worth it, but once it runs you get a very rewarding feeling. And you reduce the risk of something going wrong later on when you don't expect it and didn't plan for it.

I encourage you to try a Walking Skeleton when you start your next project!
