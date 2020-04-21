---
layout: post
asset-type: post
name: terraform-with-multiple-environments
title: Terraform With Multiple Environments
date: 2020-04-13 10:00:00 +00:00
author: Jorge Gueorguiev Garcia
description: The couple of options that I have used in production to handle multiple enviroments.

image:
    src: /assets/custom/img/blog/railway.png
    attribution:
        text: Public domain photo from Pixabay
        href: https://pixabay.com/photos/rails-soft-gleise-railway-3309912/
tags:
    - infrastructure
    - devops
    - terraform
    - practices
abstract: I have used a couple of different approaches to support multiple environments for Terraform deployments. We will investigate them here.
---


I haven't written on my company blog for quite a while (been paying attention to the podcasts and my personal one), but I thought it was time to add a blog post.

The reason why I wanted to write comes because of this post that I have just discovered: [Recommended Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/part1.html). On it Hashicorp is recommending the use of workspaces to control different environments. 

Back at the beginning of 2019 I started using Terraform for an AWS project. The basis of the infrastructure I was doing was quite similar to a previous project that I worked on (both in Clojure), but that project used extensively bash scripts to deal with the creation of an ELB environment. You don't want to use bash scripts for everything. So I decided to learn and use terraform. Terraform is awesome

