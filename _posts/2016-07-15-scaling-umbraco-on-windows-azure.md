---
layout: post
name: scaling-umbraco-on-windows-azure 
title: Scaling Umbraco On Windows Azure Part III
date: 2016-07-15 10:20:00 +00:00
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

This is the last part of the series about how to scale an Umbraco website on the Windows Azure platform.


### You’re being successful, cater for more visits

One of the benefits of platforms as a service like Windows Azure, is that you don’t have to know in advance how many sites your company will have, or how popular and resource consuming your application will be. 
The platform provides you a way to [adapt your hosting](https://azure.microsoft.com/en-gb/blog/scaling-up-and-scaling-out-in-windows-azure-web-sites/) to whatever the needs are at a given time. 
In the Windows Azure platform you can scale your sites on the fly.

### Scaling Up

Scaling up will allow your application to get more resources on the same instance.

### Scaling Out
	
Scaling out on Windows Azure consists of spinning additional instances of the application. 
Load balancing between the instances is provided by the platform and thus does not require further configuration. 
The application must therefore be multi-instance safe. This requires extra care to ensure that items such as how the data is consumed by the application, the handling of user sessions and access to resources are thread safe. 
Sticky-sessions are not managed out of the box by the Azure platform, one way to ensure continuity of sessions on multi-instances is to store sessions in the [Azure session state provider](https://msdn.microsoft.com/library/azure/gg185668.aspx) or in the Azure Redis Cache; another way would be to leverage the [routing capabilities in Windows Azure](https://channel9.msdn.com/shows/Cloud+Cover/Cloud-Cover-Episode-24-Routing-in-Windows-Azure/) to route requests to stateful instances.

Go to the application settings on your Windows Azure Web Service (WAWS) platform and look for the App service plan menu. There you will find the Scale out menu.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/20.png" alt="" class="img-responsive"/>

Unfortunately scaling functionality is not part of the Free Service Plan.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/21.png" alt="" class="img-responsive"/>

So we need to select the S1 Standard plan to be able to access scaling options and configure the scaling of our application. We can see that for the moment we have only one instance running.
We can manually add another instance of our application. Or we can scale given the CPU usage in percentage of our application.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/22.png" alt="" class="img-responsive"/>

I modified the home page template to add some dummy code and get the page to fetch blog posts multiple times, triggering many requests to the server.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/23.png" alt="" class="img-responsive"/>

Looking back into the Azure portal, we can see that the scaling took place.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/24.png" alt="" class="img-responsive"/>

And I even received an email letting me know that my application is scaling.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/25.png" alt="" class="img-responsive"/>

After about twenty minutes without activity on the website, and having removed the code that caused extra load on the CPUs, our application has been automatically scaled back down to one instance.

<img src="{{ site.baseurl }}/assets/img/custom/blog/2016-06-20-umbraco-on-azure/26.png" alt="" class="img-responsive"/>

In this part of the series, we have showed how to automatically scale an Umbraco installation, without having to worry about anything other than the cost.
However scaling an application requires you to manage the its state at a global level. 
For Umbraco for example, the main pain points are handling the session state, the Lucene index files and the config file. 
Depending on the version of Umbraco you run, [some of those concerns](http://blog.orbitone.com/post/Does-Umbraco-really-loves-Windows-Azure) have been addressed.
Notice that we did not need any Visual Studio IDE, nor did we need to install IIS, we have a scalable website within a few clicks.
This is the peace of mind that well-built software should give you.
Always remember that a hundred-instance production software system might have different needs than a ten-instance one.
Maybe you need more powerful tools to monitor and inspect the state of your platform.




