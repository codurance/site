---
layout: post
asset-type: post
name: test-driving-a-cdn
title: Test Driving a CDN
date: 2019-12-31 10:00:00 +00:00
author: Christopher Eyre
image:
    src: /assets/custom/img/blog/swan.png
tags:
    - varnish
    - CDN
    - TDD
abstract: How to test drive a CDN
alias: [/2019/12/31/test-driving-a-cdn]
---

# How to test drive a Content Delivery Network

## The problem being solved

How not to break the internet:  

<iframe width="560" height="315" src="https://www.youtube.com/embed/T73h5bmD8Dc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introduction

A CDN is a cache that sits between your website and the user.

This is useful when your site becomes popular and you don't want to have to keep scaling up your webserver to handle the load. This avoids the 'breaks the internet' moment when a website fails due to excessive load. My niece received a christmas present of an `invisibility cloak` that needs an app to make it `work`. The website could not handle the load of the majority of the sold products being activated on Christmas morning. Careful use of a CDN (amoung other techniques) can be used to avoid embarrasing mistakes.

Content Delivery Networks are a great way to massively increase the peformance of your website.

![CDN Diagram: Client to CDN to Origin]({{site.baseurl}}/assets/custom/img/blog/cdn.png)

Your website is the origin in this diagram. 

By default this will start caching every request. Once you start adding cache headers to your pages then you can control how the CDN will cache the page. 

The advantage of this is that the CDN will be able to provide content to your users far faster than you can as they will be closer to them. In addition the majority of the load on your site will be removed (the only visitors are the CDN nodes with an expired cache). If the site is static and the cache has been warmed up (each page visited) then it is possible to briefly turn off the origin site and still have the site up. This makes deploying a site that is under heavy load possible.

Another benefit is that you can set the CDN to serve stale content. This means that should a cached page subsequently start to fail then the server will return the previously cached version. This will greatly increase the reliability of your site. 

One site that I worked on was able to handle heavy loads (tens of thousands of concurrent sessions on google analytics) despite the website being served from a single heroku node. This site was able to publish updates in around a second. We explicitly managed what we needed to cache, applied the update to our site and then told the CDN to invalidate the changed pages.

Typically a CDN will allow you to have brief bursts of heavy load and will only charge a small amount for the additional usage - which is much cheaper than having to keep scaling up servers.

There are several CDN's available to use, the one that I am most familar with is Fastly. Fastly is a distributed version of Varnish cache. Varnish cache is available to run as a docker image. This means that it is possible to test drive your CDN! 

I am going to demonstrate how to configure the express web server to be cached via Varnish in a set of docker images. This will allow tests to be written to demonstrate that the caching is working as expected before deploying to a real environment.

The sample code can be found here: 

`https://github.com/chriseyre2000/cdn-experiment/`

This consists of a simple express application that is being run in a docker container. 
Docker Compose is used to create linked docker images.

This can be started using:

`docker-compose build && docker-compose up`

The raw application is exposed on port 3000
The cached application is exposed on port 5000

This is an endpoint that is cached:

```
curl -v localhost:5000/now
```

Returns

```
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5000 (#0)
> GET /now HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< ETag: W/"d-ALnVQnzapyFibAJUsj/ugNkTGeo"
< Date: Tue, 31 Dec 2019 08:54:54 GMT
< X-Varnish: 32775
< Age: 0
< Via: 1.1 varnish-v4
< Accept-Ranges: bytes
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
1577782494578* Closing connection 0

```

A repeated call will return the same result:

```
curl -v localhost:5000/now
```

```
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5000 (#0)
> GET /now HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< ETag: W/"d-ALnVQnzapyFibAJUsj/ugNkTGeo"
< Date: Tue, 31 Dec 2019 08:54:54 GMT
< X-Varnish: 32778 32776
< Age: 39
< Via: 1.1 varnish-v4
< Accept-Ranges: bytes
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
1577782494578* Closing connection 0
```

Notice that the body is the same yet the age is reported.

This version has cache headers and will not be cached:

```
curl -v localhost:5000/now-nocache
```

```
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5000 (#0)
> GET /now-nocache HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Cache-control: private, max-age=0, no-cache
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< ETag: W/"d-rBzErqEgrVIYGMP1QHJVW2pE10k"
< Date: Tue, 31 Dec 2019 08:56:38 GMT
< X-Varnish: 32780
< Age: 0
< Via: 1.1 varnish-v4
< Accept-Ranges: bytes
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
1577782598029* Closing connection 0
```

repeating the call gives:

```
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 5000 (#0)
> GET /now-nocache HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Cache-control: private, max-age=0, no-cache
< Content-Type: text/html; charset=utf-8
< Content-Length: 13
< ETag: W/"d-FVW0D0z387XypqaGgxU3K6yNXX4"
< Date: Tue, 31 Dec 2019 08:57:19 GMT
< X-Varnish: 6
< Age: 0
< Via: 1.1 varnish-v4
< Accept-Ranges: bytes
< Connection: keep-alive
< 
* Connection #0 to host localhost left intact
1577782639781* Closing connection 0
```

This demonstrates how to test a cdn in a docker container. This will become more useful if you want to have greater control over the configuration. Varnish is configured using Varnish Configuaration Language (see `https://varnish-cache.org/docs/2.1/tutorial/vcl.html`) - which allows complete control over how a website behaves. 

For example you can check for a cookie and return a different page depending upon the value (logged in users get one, unauthenticated get another). 

It's possible to conditionally add headers (so that the origin, while public will only respond if sent the correct header). This allows developers to check that the origin is healthy - which will makes isolating problems much easier.

You can also change the response so that details about the application are masked. It is amazing how many sites advertise the exact version of a webserver that they are using. 
This can be seen simply using curl: `curl -v bbc.co.uk`

You can use the CDN to alter the behaviour of a hosted website without changing the hosted site itself. This can allow you to apply a quick fix for a problem while a real solution is being prepared. For example you can put a holding page up for a specific url.

It's advisable not to tell a CDN to cache forever as any mistakes may reside in a browser indefinately - this can be a problem if you are caching a javacript library and accidently cache a broken version.

I would also recommend configuring your CDN programatically so that it is testable and repeatable. Be very careful of having the CDN do too much work as you will encounter odd edge conditions such as having an error page cached.

Make sure that you know how to purge a specific page. The site that I worked on added this to a chatbot in slack. It was able to purge a page by sending it a slack message - this was ideal when you had to support a problem and were away from your machine.

## Learnings while preparing the sample.

Alpine docker images are reasonably fast to start and download compared to the full fat versions. These are the very small docker images

The tests need to wait on the varnish server being started. Normally I would have used the wait-for-it.sh script that allows waiting for a given service to be completed. However since I am using an alpine docker container we don't have bash available. This means that I have used the golang `waitforit` utility. 

Also note the various network options used in the docker-compose. You can use an alias of another docker container name as a local dns entry if it is listed in the depends_on section. This is even accessable to the tests run inside the container.

## What about other CDNs

Now if you really want to test a real life CDN there is this project: `https://github.com/Mahoney/wiremock-heroku`

This allows you to deploy wiremock into Heroku.

If you configure your CDN to serve this Heroku app as the origin then you can completely test the behaviour of the CDN.
Wiremock gives you a programmable web server that gives you an API that allows the response to change, so it's possible to have a page return a fix value once then start returning errors. This provides the ability for you to test the entire of the HTTP spec should you wish to do so, but this is beyond the scope of this article.

Typically the CDN is controlled by an infrastructure team within your organisation. Allowing the configuration to be test driven will allow you to use far more of the advanced features of the CDN.
