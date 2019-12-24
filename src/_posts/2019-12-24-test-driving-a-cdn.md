---
layout: post
asset-type: post
name: test-driving-a-cdn
title: Test Driving a CDN
date: 2019-12-24 10:00:00 +00:00
author: Christopher Eyre
image:
    src: /assets/custom/img/blog/swan.png
tags:
    - varnish
abstract: How to test drive a CDN
alias: [/2019/12/24/test-driving-a-cdn]
---

# How to test drive a Content Delivery Network


Content Delivery Networks are a great way to massively increase the peformance of your website.

A CDN is a cache that sits between your website and the user.

![CDN Diagram]({{site.baseurl}}/assets/custom/img/blog/cdn.png)

By default this will start caching every request. Once you start adding cache headers to your pages then you can control how the CDN will cache the page. The advantage of this is that the CDN will be able to provide content to your users far faster than you can as they will be closer to them. In addition the majority of the load on your site will be removed (the only visitors are the CDN nodes with an expired cache). If the site is static and the cache has been warmed up (each page visited) then it is possible to briefly turn off the origin site and still have the site up. This makes deploying a site that is under heavy load possible.

Another benefit is that you can set the CDN to serve stale content. This means that should a cached page subsequently start to fail then the server will return the previously cached version. This will greatly increase the reliability of your site. 

There are several CDN's available to use, the one that I am most familar with is Fastly. Fastly is a distributed version of Varnish cache. Varnish cache is available to run as a docker image. This means that it is possible to test drive your CDN.

I am going to demonstrate how to configure the express web server to be cached via Varnish in a set of docker images. This will allow tests to be written to demonstrate that the caching is working as expected before deploying to a real environment.

The sample code can be found here: 

https://github.com/chriseyre2000/cdn-experiment/

This consists of a simple express application that is being run in a docker container. Docker Compose is used to create linked docker images.

This can be started using:

docker-compose build && docker-compose up

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

This demonstrates how to test cache headers.
