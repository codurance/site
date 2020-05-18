---
layout: post
asset-type: post
name: promises-and-lies
title: Promises and Lies
date: 2020-05-19 10:00:00 +00:00
author: Christopher Eyre
description: Adding timeouts to promises in Javascript.
image:
    src: /assets/custom/img/blog/lie.png
    attribution:
        text: Public domain photo from Pixabay
        href: https://pixabay.com/photos/lying-promises-deception-dishonesty-1562272/
tags:
    - javascript
    - node
    - reliability
abstract: Adding timeouts to promises in Javascript. Introducing lie.js 
alias: [/2020/05/19/promises-and-lies]
---

## Promises in Javascript

Promises were added to Javascript as a standard means to avoid nesting callback functions.
Without promises each function could have its own functions to be called once the job is complete. They are mostly used for asynchronous events. They are not a means of lazy evaluation or for process control. Functions that have an async result typically now return a Promise.

Promises have the following format:

```javascript
const promise = new Promise(executor);
```

where executor is a function that looks like:

```javascript
function(resolutionFunc, rejectionFunc){
    // typically, some asynchronous operation.
}
``` 

Promises are used like this:

```javascript
promiseObj.then(console.log('It worked'))
          .catch(console.log('It failed'))
          .finally( console.log('It is over') )
```

It is possible to return a promise from a promise so that they can be chained. Note that the catch at the end of a chain will catch whichever reject happens first.

Once a promise has resolved to a value, then it will always resolve to the same value.
You can therefore call then on a given promise multiple times and it will always return the same result. I'll come back to this concept later.

Promises also have no means of being cancelled. The only output of them is through actions of the resolve or reject functions. This means that it is possible to cache a promise - just note that the cached promise could have already failed!

## The Promise class

The javascript promise class has the following static functions:

```Javascript
Promise.all( ) 
```

This will turn an iteratable of Promises into a Promise that will either return an iteratable of the success values or the first failure condition.

```Javascript
Promise.allSettled()
```

This will take an iteratable of Promises and returns a Promise that will return an iteratable of the results (either resolved or rejected).

```Javascript
Promise.race()
```

This will take an iteratable of Promises and returns a Promise that will return the result of the first resolved or rejected Promise.

```Javascript
Promise.reject()
```

This returns a Promise that has been rejected with the given reason.  

```Javascript
Promise.resolve()
```

This will either return the result of a supplied promise or will return a Promise that has resolved the supplied data.

## What is missing?

The standard library has no built-in concept of timeout. This means that each usage must consider (or more likely ignore) this important concept. Without a controlled timeout you have no means of ensuring that a given ```then()``` will ever return.

Serverless functions are one example of where a fixed timeout is essential. The serverless framework adds a timeout value that defaults to 6 seconds. It is important that you get to choose how you handle failure rather than just having the function fail.
More importantly you are charged on execution time so waiting for a function to return costs money. 

## Introducing lie.js

This is where [lie.js](https://www.npmjs.com/package/lie.js) comes in. It provides a standard means of adding timeouts to Promises. These are very small functions that bring in no additional dependencies.

It currently provides two helper functions that are intended to be used in a Promise.race with an existing promise.

orReject

```javascript
Promise.race([yourPromise, orReject('bang', 1)])
```

This will reject the promise with the given value after the timeout.

orTimeout

```javascript
Promise.race([yourPromise, orTimeout('bang', 1)])
```

This will succeed the promise with the given value after the timeout.

These two simple functions allow you to add timeout functionality to any Javascript promise.

## Promises do not have a cancel option!

I did promise that I would come back to the multiple evaluation point. You because a promise in a race has been timed out does not mean that you can't try to get the result later.

```javascript
import {orTimeout, orReject} from  'lie.js'

const timeoutPromise = orTimeout('bang', 1);
const rejectPromise = orReject('fail', 2);

Promise.race([timeoutPromise, rejectPromise])
.then( result => {
  console.log(result);
  rejectPromise.then( () => {}, x => console.log('second', x) );
 });

 rejectPromise.then( () => {}, x => console.log('first', x) );
```

This will output:

```
bang
first fail
second fail
```

This means that you can break a slow process down into chunks where you get the option to do something else such as call an alternative function, log or update the UI. 

Consider using [lie.js](https://www.npmjs.com/package/lie.js) when you next need to use a Promise. Controlling the way that your functions fail is the only way to create reliable systems.
Having a standard means of controlling timeout behaviour is very important.
