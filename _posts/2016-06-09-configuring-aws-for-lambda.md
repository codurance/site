---
layout: post
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

---

{% comment %}
    TODO add link to mash
    TODO folder for images: /assets/img/custom/blog/2016-06-09-configuring-aws-lambda/
{% endcomment %}

During the  [Software Craftsmanship and Testing conference UK](http://socratesuk.org/index.html) Mash run a session on AWS Lambda, with examples written in Java and python. Some other people also tried to do it in NodeJS.

The first part, mostly accidental complexity, is how to setup the account to be able to use these services. This is the part that most people struggled with, so here is a step-by-step guide.

## Setting up your account

 1. Connect to the [AWS Console][AWS Console]

````
alvaros-MacBook-Pro:~ alvaro$ aws configure
AWS Access Key ID [****************TEST]: AKIAJT6V4JYWUUS26WMQ
AWS Secret Access Key [****************TEST]: 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
Default region name [eu-west-1]: eu-west-1
Default output format [None]: 
alvaros-MacBook-Pro:~ alvaro$ 
````

````
alvaros-MacBook-Pro:~ alvaro$ aws lambda list-functions
{
    "Functions": []
}
````


[AWS Console]: https://console.aws.amazon.com
