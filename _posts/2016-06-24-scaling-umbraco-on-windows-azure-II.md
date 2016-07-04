---
layout: post
name: scaling-umbraco-on-windows-azure 
title: Scaling Umbraco On Windows Azure Part II
date: 2016-07-03 13:02:00 +00:00
author: Halima Koundi
image:
   src: /assets/img/custom/blog/2016-06-20-umbraco-on-azure/umbraco-on-azure.jpg
categories:
- technology
tags:
- cloud 
- windows-azure 
- cms
- umbraco
---

In this second post of the three parts series about how to scale an Umbraco website on Windows Azure, we will install the CMS on our cloud platform.


### A one-click process, maybe a few more clicks

If you don't have one yet, create your [Windows Azure Free Trial subscription](https://azure.microsoft.com/en-gb/pricing/free-trial/), then log into your portal.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/03.png "" %}

Create a new web site and install Umbraco.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/04.png "" %}

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/05.png "" %}

Make sure you chose the right pricing for the database! For the demo, the free price tier is enough.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/06.png "" %}

Configure the server.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/07.png "" %}

Add the  App settings.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/08.png "" %}

We're all set up. Click create, your app is being deployed.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/09.png "" %}

After few minutes the deployment is complete.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/10.png "" %}

You can find the link to your website on the all resources link on the left hand side menu.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/11.png "" %}

The default app page will first appear, whilst the umbraco install is launching..
It should eventually prompt you for the login details you want to set up for the very first admin user of your umbraco installation.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/12.png "" %}

Now is the time for you to grab a coffee and check your [twitter feed](https://twitter.com/cats?lang=en-gb).

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/13.png "" %}

And here we are , ready to manage our website!
After a successful installation, we are taken to the admin page of our Umbraco CMS.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/14.png "" %}

### Ready to use layout template

Since we installed the default template along with the Umbraco install, we have a starter kit, named Fanoe with layout template and site structure already built for us.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/15.png "" %}

We can study, in the admin of the website accessed via the ```/umbraco path``` , the structure of our website.
We have a Homepage that is our Higher level page, and it contains ```Learn, Explore and Extend``` as children items.
Each of those nodes are documents that are of a specific type and which are linked to a given template.
In our case, the Home document, is an instance of the Home Document Type and will be rendered through the Home Template.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/16.png "" %}

The Home Document Type (DT) is defined in the settings menu of the Umbraco website.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/17.png "" %}

The Home DT has two tabs defined, in the site tab we have a Site Description property of type Textarea, a Site Title property of type Textstring.

The Home Template, is accessible under the Template folder of the Umbraco Settings menu.
It is nested under a master Template called ```Master``` and it contains the code to display when the Home page is rendered.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/18.png "" %}

Here the home page references a child template to display content from Grid data types.

{% img /assets/img/custom/blog/2016-06-20-umbraco-on-azure/19.png "" %}

### Up and running in less than an hour : start adding pages

We have installed our Umbrao website and we are now familiar enough with how it works to be able to start adding content.
In the next part of this series, we will see how to scale our application on Windows Azure.

