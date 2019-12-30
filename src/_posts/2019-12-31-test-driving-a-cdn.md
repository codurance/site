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
abstract: How to test drive a CDN
alias: [/2019/12/31/test-driving-a-cdn]
---

# How to test drive a Content Delivery Network


Content Delivery Networks are a great way to massively increase the peformance of your website.

A CDN is a cache that sits between your website and the user.

![CDN Diagram: Client to CDN to Origin]({{site.baseurl}}/assets/custom/img/blog/cdn.png)

Your website is the origin in this diagram. 

By default this will start caching every request. Once you start adding cache headers to your pages then you can control how the CDN will cache the page. 

The advantage of this is that the CDN will be able to provide content to your users far faster than you can as they will be closer to them. In addition the majority of the load on your site will be removed (the only visitors are the CDN nodes with an expired cache). If the site is static and the cache has been warmed up (each page visited) then it is possible to briefly turn off the origin site and still have the site up. This makes deploying a site that is under heavy load possible.

Another benefit is that you can set the CDN to serve stale content. This means that should a cached page subsequently start to fail then the server will return the previously cached version. This will greatly increase the reliability of your site. 

There are several CDN's available to use, the one that I am most familar with is Fastly. Fastly is a distributed version of Varnish cache. Varnish cache is available to run as a docker image. This means that it is possible to test drive your CDN.

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

A repeated call will return the same result:

```
curl -v localhost:5000/now
```

This version has cache headers and will not be cached:

```
curl -v localhost:5000/now-nocache
```

This demonstrates how to test a cdn in a docker container.

## Learnings while preparing the sample.

Alpine docker images are reasonably fast to start.

The tests need to wait on the varnish server being started. Normally I would have used the wait-for-it.sh script that allows waiting for a given service to be completed. However since I am using an alpine docker container (this is the very small docker image) we don't have bash available. This means that I have used the golang `waitforit` utility. 

Also note the various network options used in the docker-compose. You can use an alias of another docker container name as a local dns entry if it is listed in the depends_on section. This is even accessable to the tests run inside the container.

## What about other CDN's

Now if you really want to test a real life CDN there is this project: `https://github.com/Mahoney/wiremock-heroku`

This allows you to deploy wiremock into Heroku.
If you configure your CDN to serve this Heroku app as the origin then you can completely test the behaviour of the CDN.
Wiremock gives you a programmable web server that gives you an API that allows the response to change, so it's possible to have a page return a fix value once then start returning errors. This provides the ability for you to test the entire of the HTTP spec should you wish to do so, but this is beyond the scope of this article.
