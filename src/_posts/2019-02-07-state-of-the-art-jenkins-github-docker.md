---
layout: post
asset-type: post
name: state-of-the-art-jenkins-github-docker
title: State of the art Continuous Integration and Deployment Pipeline with Jenkins, GitHub, and Docker
date: 2019-02-07 07:00:00 +00:00
author: Francesco Gigli
image:
    src: /assets/custom/img/blog/2019-02-07-state-of-the-art-jenkins-github-docker/jenkins.jpg
tags:
    - continuous-integration
    - continuous-deployment
    - jenkins
    - github
    - docker
categories:
    - training
abstract: The best configuration for Continuous Integration and Deployment that I have seen so far, explained in some details. 
alias: [/2019/02/07/state-of-the-art-jenkins-github-docker]
---

## Setting the stage

For the last two years I've worked in a Node project using GitHub for source management, Jenkins for continuous integration, and a [custom built tool](https://mergermarket.github.io/cdflow/) based on Docker and Terraform for the deployment.

We have done a few improvements to the configuration 

> TODO finish this section

## Caveat Emptor

State of the art does not mean perfect. It is just the best thing I know of right now, I fully expect to learn more and look back at this as a good step toward something better.

Jenkins is the tool I’ve used the most in this space. It is very possible that better results can be obtained with different tools but my experience is the limiting factor.

Branches and Continuous integration? Yes, branches are a form of delayed integration. Be mindful of the tradeoffs. Merge to master soon and often.

## Features

The configuration of the build pipeline is versioned together with the source code
* Backups
* Atomic changes
* Use branches to experiment with the configuration itself

Building on branches
* Can look at the build during code review
* Know if a change is going to break the build before merging to master
* Integration with Github (and BitBucket which I have no experience with)
* Can automate merge of non breaking changes

Less queue time
* The build is defined as a sequence of steps rather than jobs so it does not re-enter the queue

## Drawbacks

Jenkinsfile
* You need to learn the syntax of the Jenkinsfile
* There are two different syntax options (scripted and declarative) which you need to be aware of
* The documentation on how to use the plugins is not always clear

## The app

I’ve created [a simple Node web application](https://github.com/codurance/jenkins-pipeline-blog) to serve as an example. This app has no external dependency so the build is simpler. If there is interest I will write a followup about extending this configuration to cope with external dependencies such as databases or other services. [twitter]

## The Dockerfile

> TODO

It is one of the standard for deployment.

It makes it possible to replicate what happens in CI.

Works well as a cache.

For this build the deployment will be just the publishing of the image to hub.docker.com.

## The Jenkinsfile

> stick the source here, commented?

This file replaces the long web form normally used to configure jobs in Jenkins. The pipeline has three stages (Build, Test, Deploy) each implemented by steps. The Deploy stage runs only when the master (aka Trunk) branch is affected.

The pipeline also has a `post` section which integrates naturally with messaging systems, such as Slack.
> The word 'post' has a meaning in the domain of messaging which can be confused with its pipeline meaning
> Exapand the paragraph to solve the issue

## The Jenkins setup

Jenkins needs access to GitHub. To do that create a username & password credential in Jenkins, using a new GitHub personal token as the password. More details on https://support.cloudbees.com/hc/en-us/articles/224543927

Having configured the credentials it is time to create a new Multibranch Pipeline.

[image: pipeline creation]

The defaults offered by Jenkins are sensible for my workflow so I made very few modifications to it. Adapt it to suite your needs.

[image: pipeline setup]

If you are used to freestyle Jenkins job you will probably be surprised by the small amount of options available. That is because we have already defined the entire build pipeline in the Jenkinsfile!

Once you save the config it is a good idea to check the webhook in GitHub. Jenkins will configure a webhook in the repository in order to trigger the pipeline as soon as a commit is pushed or a PR is created. It requires Jenkins to be reachable from Internet, preferably with a valid SSL certificate.

[image: webhook]

You can configure which commits, branches, or PRs trigger the pipeline from the Branch Sources configuration in Jenkins. With the setup we looked at so far the pipeline will be triggered when pushing to master, pushing to branches, and when creating PRs. 

[image: branches jenkins]
[image: branches github]
 
In the case of PRs the pipeline is ran after a merge with master and it is visible together with the PR conversation.

[image: pr jenkins]
[image: pr github]
 
GitHub can also be configured to protect as a gatekeeper so that PRs with failing tests cannot be merged.

[image: branch protection]

## Where to go from here?

> TODO

Add additional testing steps (eg. Performance tests)

Plug-in your deployment instructions

Manage external dependencies

## Resources

* Example node project: https://github.com/codurance/jenkins-pipeline-blog
* Jenkinsfile syntax: https://jenkins.io/doc/book/pipeline/syntax/
* Jenkinsfile steps reference: https://jenkins.io/doc/pipeline/steps/
* Multibranch pipeline: https://jenkins.io/doc/book/pipeline/multibranch/
