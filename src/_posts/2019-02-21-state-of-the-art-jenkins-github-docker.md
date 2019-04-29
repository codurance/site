---
layout: post
asset-type: post
name: state-of-the-art-jenkins-github-docker
title: State of the art Continuous Integration and Deployment Pipeline with Jenkins, GitHub, and Docker
date: 2019-02-21 07:00:00 +00:00
author: Francesco Gigli
image:
    src: /assets/custom/img/blog/state-of-the-art-jenkins-github-docker/jenkins_bg.jpg
tags:
    - Continuous Integration
    - Continuous Deployment
    - Jenkins
    - github
    - docker
categories:
    - training
abstract: The best configuration for Continuous Integration and Deployment that I have seen so far, explained in some details. 
alias: [/2019/02/21/state-of-the-art-jenkins-github-docker]
---

## Setting the stage

For the last two years I've worked in a Node.js project using GitHub for source management, Jenkins for continuous integration, and a [custom built tool](https://mergermarket.github.io/cdflow/) based on Docker and Terraform for the deployment.

We have done a few improvements to the configuration during this time and one of the change that I think had a positive impact was to run the CI pipeline on branches and to see the feedback in GitHub.

Checking the outcome of the build before merging a PR prevents a lot of breakages due to tiny mistakes (forgot to run the linter, to add a given file, etc.). Later, once we started automating the update of dependencies (see [Taming dependabot]({{ site.baseurl }}{% post_url 2019-02-29-taming-dependabot %})), the feedback enabled a quicker and safer automation.

From that experience comes the idea for this post: what is the ideal CI pipeline, for me, at this moment in time?

## Caveat Emptor

State of the art does not mean perfect. It is just the best thing I know of right now, I fully expect to learn more and look back at this as a good step toward something better.

Jenkins is the tool I’ve used the most in this space. It is very possible that better results can be obtained with different tools but my experience is the limiting factor.

Branches and Continuous integration? Yes, branches are a form of delayed integration. Be mindful of the tradeoffs. Merge to master soon and often.

## Features

The configuration of the build pipeline is versioned together with the source code meaning you get:

* History of old configs and ability to rollback
* Atomic changes of config and source
* Use of branches to experiment with the configuration itself

Building and feedback from branches means you can:

* Look at the outcome of the build during code review
* Prevent branches from being merged if they break the build
* Automate merge of non breaking changes

Other minor things:

* The build is defined as a sequence of steps rather than jobs so it does not re-enter the queue once it starts
* Most of the configuration is done from a file on your local development environment instead of the Jenkins UI

## Drawbacks

Jenkinsfile

* You'll need to learn the syntax of the Jenkinsfile
* There are two different syntax options (scripted and declarative) which you need to be aware of
* The documentation on how to use the plugins is not always clear, with examples, and easy to use

## The app

I’ve created [a simple Node web application](https://github.com/codurance/jenkins-pipeline-blog) to serve as an example. This app has no external dependency so the build is simpler. If there is interest I will write a followup about extending this configuration to cope with external dependencies such as databases or other services. [twitter]

## The Dockerfile

``` dockerfile
FROM node:lts-slim
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 8080
CMD yarn start
```

It is one of the standard for deployment.

It makes it possible to replicate what happens in CI.

Works well as a cache.

For this build the deployment will be just the publishing of the image to hub.docker.com.

> TODO: finish this section

## The Jenkinsfile

``` groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t codurance/jenkins-pipeline-blog:latest .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker run codurance/jenkins-pipeline-blog:latest yarn test'
            }
        }

        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                sh 'docker push codurance/jenkins-pipeline-blog:latest'
            }
        }
    }

    post {
        failure {
            echo 'build is broken. notify team!'
        }
    }
}
```


This [groovy](http://groovy-lang.org/syntax.html) file replaces the long web forms normally used to configure jobs in Jenkins. The pipeline in this example has three stages (Build, Test, Deploy) each implemented by steps. The Deploy stage runs only when the master (aka Trunk) branch is affected.

The pipeline also has a section called `post` with steps such as `always` and `failure` which are triggered after the build completes. These are intuitive extension points to integrate messaging systems, like Slack, in your workflow.

## The Jenkins setup

Jenkins needs access to GitHub. What worked in my case was to create a username & password credential, in Jenkins, using a new GitHub personal token as the password. YMMV. I found a detailed explanation on the [CloudBees knowledge base](https://support.cloudbees.com/hc/en-us/articles/224543927)

Having configured the credentials it is time to create a new Multibranch Pipeline.

![Pipeline creation in Jenkins]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/pipeline_creation.jpg)

The defaults offered by Jenkins are sensible for my workflow so I made very few modifications to it. Adapt it to suite your needs.

![Pipeline setup in Jenkins]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/pipeline_setup.jpg)

If you are used to freestyle Jenkins job you will probably be surprised by the small amount of options available. That is because we have already defined the entire build pipeline in the Jenkinsfile!

Once you save the config it is a good idea to check the webhook in GitHub. Jenkins will configure a webhook in the repository in order to trigger the pipeline as soon as a commit is pushed or a PR is created. It requires Jenkins to be reachable from Internet, preferably with a valid SSL certificate.

![Webhook in GitHub]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/webhook.jpg)

You can configure which commits, branches, or PRs trigger the pipeline from the Branch Sources configuration in Jenkins. With the setup we looked at so far the pipeline will be triggered when pushing to master, pushing to branches, and when creating PRs. 

![Branches in Jenkins]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/branches_jenkins.jpg)
![Branches in GitHub]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/branches_github.jpg)
 
In the case of PRs the pipeline is ran after a merge with master and it is visible together with the PR conversation.

![Pull Requests in Jenkins]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/pr_jenkins.jpg)
![Pull Requests in GitHub]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/pr_github.jpg)
 
GitHub can also be configured to protect as a gatekeeper so that PRs with failing tests cannot be merged.

![Branch Protection in GitHub]({{site.baseurl}}/assets/custom/img/blog/state-of-the-art-jenkins-github-docker/branch_protection.jpg)

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
