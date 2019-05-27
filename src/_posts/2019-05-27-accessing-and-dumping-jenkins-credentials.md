---
author: Andrzej Rehmann
layout: post
asset-type: post
title: "Accessing and dumping Jenkins credentials"
date: 2019-05-27 08:00:00
description: "Accessing and dumping Jenkins credentials"
abstract: "Accessing Jenkins credentials from a Jenkinsfile and dumping them directly in logs."
image: 
    src: /assets/custom/img/blog/2019-05-27-accessing-and-dumping-jenkins-credentials/jenkins-credentials-banner-low-res.jpg
    attribution:
       text: Photo by Stefan Steinbauer on Unsplash
       href: https://unsplash.com/photos/HK8IoD-5zpg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags: 
- devops
- Jenkins
- Continuous Integration
---

Most pipelines requires secrets to authenticate with some resources.  
Those secrets should live outside of our code repository and should be fed directly into the pipeline.   
Jenkins offers a credentials store where we can keep our secrets.

## Credentials storage

I did not use the word "secure" anywhere in the introduction because the way any CI server stores credentials is by nature insecure.

CI servers cannot use one-way hashes (like bcrypt) to encode secrets because when requested by the pipeline those secrets needs to be restored back into their original form.  
One-way hashes are then out of the picture, what's left is two-way encryption.  
This means two things:
1. Anyone with "Create jobs" permissions can view secrets in plain form.
2. Jenkins encrypts secrets at rest but keeps the decryption key somewhere on its host.

You may be wondering why Jenkins even bother encrypting the secrets if they can be retrieved just by asking.
The only reasonable idea that comes to my mind is that Jenkins creators wanted to make it a little bit harder to gain access to plain format secrets when the attacker gains ssh access to the Jenkins host.

However, using credentials store is infinitely better then keeping secrets in the project repository.  
Later in this post I will talk about what can be done to minimize the secrets leakage from Jenkins.

## Jenkinsfile access

If you want to run the examples yourself, you can spin up a pre-made Jenkins instance from my [jenkinsfile-examples][0] repository in less then 1min (depending on your bandwidth):

```bash
git clone https://github.com/hoto/jenkinsfile-examples.git
docker-compose pull
docker-compose up

```

Open `localhost:8080` where you should see a Jenkins with couple of jobs.

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-27-accessing-and-dumping-jenkins-credentials/001.png)

We will be focusing on job `130-accessing-credentials`.

[Jenkinsfile][1] used in that job:

```groovy
pipeline {
  agent any
  stages {

    stage('usernamePassword') {
      steps {
        script {
          withCredentials([
            usernamePassword(credentialsId: 'gitlab',
              usernameVariable: 'username',
              passwordVariable: 'password')
          ]) {
            print 'username=' + username + 'password=' + password

            print 'username.collect { it }=' + username.collect { it }
            print 'password.collect { it }=' + password.collect { it }
          }
        }
      }
    }

    stage('usernameColonPassword') {
      steps {
        script {
          withCredentials([
            usernameColonPassword(
              credentialsId: 'gitlab',
              variable: 'userpass')
          ]) {
            print 'userpass=' + userpass
            print 'userpass.collect { it }=' + userpass.collect { it }
          }
        }
      }
    }

    stage('string (secret text)') {
      steps {
        script {
          withCredentials([
            string(
              credentialsId: 'joke-of-the-day',
              variable: 'joke')
          ]) {
            print 'joke=' + joke
            print 'joke.collect { it }=' + joke.collect { it }
          }
        }
      }
    }

    stage('sshUserPrivateKey') {
      steps {
        script {
          withCredentials([
            sshUserPrivateKey(
              credentialsId: 'production-bastion',
              keyFileVariable: 'keyFile',
              passphraseVariable: 'passphrase',
              usernameVariable: 'username')
          ]) {
            print 'keyFile=' + keyFile
            print 'passphrase=' + passphrase
            print 'username=' + username
            print 'keyFile.collect { it }=' + keyFile.collect { it }
            print 'passphrase.collect { it }=' + passphrase.collect { it }
            print 'username.collect { it }=' + username.collect { it }
            print 'keyFileContent=' + readFile(keyFile)
          }
        }
      }
    }

    stage('dockerCert') {
      steps {
        script {
          withCredentials([
            dockerCert(
              credentialsId: 'production-docker-ee-certificate',
              variable: 'DOCKER_CERT_PATH')
          ]) {
            print 'DOCKER_CERT_PATH=' + DOCKER_CERT_PATH
            print 'DOCKER_CERT_PATH.collect { it }=' + DOCKER_CERT_PATH.collect { it }
            print 'DOCKER_CERT_PATH/ca.pem=' + readFile("$DOCKER_CERT_PATH/ca.pem")
            print 'DOCKER_CERT_PATH/cert.pem=' + readFile("$DOCKER_CERT_PATH/cert.pem")
            print 'DOCKER_CERT_PATH/key.pem=' + readFile("$DOCKER_CERT_PATH/key.pem")
          }
        }
      }
    }

  }
}

```


[0]: https://github.com/hoto/jenkinsfile-examples
[1]: https://github.com/hoto/jenkinsfile-examples/blob/master/jenkinsfiles/130-credentials-masking.groovy 
