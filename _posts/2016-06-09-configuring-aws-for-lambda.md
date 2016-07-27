---
layout: post
asset-type: post
name: Configuring-AWS-lambda 
title: 'Configuring Amazon Web Services (AWS) for using Lambda'
date: 2016-06-09 15:07:00 +00:00
author: Alvaro Garcia
image:
    src: /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/lambda-logo.png
    attribution:
      text: an AWS Lambda illustration
      href: https://aws.amazon.com/lambda/details/
tags:
- amazon-web-services
- aws
- guide
- howto
- lambda
- serverless
---

During the  [Software Craftsmanship and Testing conference UK](http://socratesuk.org/index.html), [Mash][mash-twitter] run a session on [AWS Lambda][aws-lambda-info], with examples written in Java and python. Some other people also tried to do it in NodeJS. This session is [here][mash-post-1]

The first part, mostly [accidental complexity][no-silver-bullet-summary], is how to setup the account to be able to use these services. This is the part that most people struggled with, so here is a step-by-step guide.

## Setting up your payment method

  1. Connect to the [AWS Console][AWS Console]

    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-01.png "" %}

  1. Click on your name (top right), then 'My Account' 
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-payment-1.png "" %}

  1.  On the left menu, click 'Payment Methods'
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-payment-2.png "" %}

  1. Add a debit/credit card. This is very important, as you could go over the free tier and they would need to charge you. But with the levels of activity that we'll be using, you are included in the [free tier][lambda-pricing]
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-payment-3.png "" %}

## Setting up your AWS account

  1. Connect to the [AWS Console][AWS Console]

    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-01.png "" %}

  1. Go to Services, choose IAM 
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-02.png "" %}

  1. Create a 'group', to hold these users and policies
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-03.png "" %}

  1. Click 'Create a new group'
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-04.png "" %}

  1. Pick a name for the group
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-05.png "" %}

  1. Click next, choose these policies:
     * AWSLambdaFullAccess
     * IAMFullAccess
     * AmazonAPIGatewayAdministrator

    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-06.png "" %}

  1. Next. See this page: 
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-07.png "" %}

  1. Click Create group
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-08.png "" %}

  1. Find your new group
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-09.png "" %}

  1. Click on 'Users' tab. It won't have any users, as you just created it.
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-10.png "" %}

  1. Create new users: go to the menu on the left 'Users', click the button 'Create new users'
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-11.png "" %}

  1. You need to generate as many users as you want. For a test, with one is enough. Pick a name for those users. In my case, 'test1_' 'and test2_'. Select 'Generate an access key for each user' 
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-12.png "" %}

  1. Click 'Show User Security Credentials', to see the credentials. You'll use those to authenticate against AWS. 
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-13.png "" %}

  1. In any case, it's better to download the credentials
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-14.png "" %}

  1. A CSV with the tokens
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-15.png "" %}

  1. Go to Groups, again
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-16.png "" %}

  1. Click 'users' tab, then 'Add users to this group'
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-17.png "" %}

  1. Find or filter the users that you want
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-18.png "" %}

  1. Select them
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-19.png "" %}

  1. Click 'Add Users'
    {% img /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/aws-20.png "" %}

### Installing and configuring the AWS CLI

   1. Find the installer at [AWS CLI][aws-cli-installation]
   1. Configure it, with this [help page][aws-cli-configuration]
     * A sample of that

    ````
    $ aws configure
    AWS Access Key ID [****************TEST]: ##$YOUR_ACCESS_KEY##
    AWS Secret Access Key [****************TEST]: ##$YOUR_SECRET_ACCES_KEY##
    Default region name [eu-west-1]: eu-west-1 #or any other zone
    Default output format [None]: #just type enter
    ````

   1. Check that the CLI is correctly configured:

    ````
    $ aws lambda list-functions
    {
        "Functions": []
    }
    ````

   1. You can use the services. The series continue at the [next post][mash-post-1] 

[AWS Console]: https://console.aws.amazon.com
[aws-cli-installation]: http://docs.aws.amazon.com/cli/latest/userguide/installing.html
[aws-cli-configuration]: http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html
[mash-post-1]: /2016/05/11/aws-lambdas
[mash-twitter]: https://twitter.com/mashooq
[no-silver-bullet-summary]: https://en.wikipedia.org/wiki/No_Silver_Bullet#Summary
[aws-lambda-info]: https://aws.amazon.com/lambda/details/
[lambda-pricing]: https://aws.amazon.com/lambda/pricing/
