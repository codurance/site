--- 
layout: post 
name: resist-just-in-case 
title: Resist the "Just in Case"
date: 2014-02-08 16:50:00.000000000 +00:00 
author: Mashooq Badar
blogimage: /assets/img/blog/premature-optimisation.jpg
tags:
- Craftsmanship
---

Of all the projects I have worked on a big regret has been; adding complexity where it was not needed. I was recently reminded of, how easy it is to fall into that trap. 

We are in the process of developing a new feature for a brand new system. As part of the feature we need to run a map reduce query on a data grid. We discovered that we could optimise the query if we maintained an in-memory cache. 

The cache was pretty simple - backed by a a couple of hash maps. This part of the system is multithreaded and that is where we saw a possible race condition. So before we added synchronisation we wanted to force the race condition from our tests. 

Reliably creating a race condition is obviously very tricky. We looked at the excellent [MultithreadedTC](http://www.cs.umd.edu/projects/PL/multithreadedtc/overview.html) library but in this case it was not suitable. In the end we created a test from scratch that, although complicated, did the job. We added read/write locking to make the test pass. And we were done! We could feel good about ourselves. 

__Hang on!__ We just added a a lot of complexity but for what? We made an assumption that the query will need optimisation. But does it really? We don not know until we have a performance environment to test the query with expected volumes. This is why we create premature optimisations because we shy away from creating a __failing performance test__ before creating the optimisation. Often we don not even have a performance environment that is a good reflection of production and even if we do we are not always comfortable with writing performance tests. So we optimise __just in case__ adding complexity where it is probably not required.

In our case we have removed this 'premature optimisation'. It is amazing how much code we manage to remove! We have communicated with our sponsor that there is a risk in this feature not performing under peak conditions and we need to create a performance environment along with the tests to understand if optimisation is needed. We also communicated that this performance environment will be required for subsequent features and forms an important part of our testing landscape. It is now on our backlog as a high priority.
