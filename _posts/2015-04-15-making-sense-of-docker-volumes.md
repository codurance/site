---
layout: post
name: making-sense-of-docker-volumes
title: 'Making Sense of Docker Volumes'
date: 2015-04-15 10:00:00 +01:00
author: Toby Retallick
canonical:
    name: my personal blog
    href: http://tobyret.github.io/Docker-Volumes/
image:
    src: /assets/img/custom/blog/2015-04-15-docker-volumes/docker-graphic.png
    attribution:
        text: Mark van Holsteijn & Adé Mochtar, Xebia
        href: http://xebia.github.io/docker-introduction/slides/img/docker-filesystems-busyboxrw.png
tags:
- docker
- volumes
---

[Docker](http://www.docker.com) is a platform that allows users to build, ship, and run distributed applications. Applications are stored inside <strong>docker containers</strong>.

A docker container uses a <strong>Union File System</strong> which consists of read-only layers and a read / write layer on top.

Whilst the container is running, it is possible to write information to disk, however, when the container is removed that information does not persist.

In order to persist information it is necessary to **mount a volume**. A volume operates outside of the Union File System - any information written to the read/write layer will be copied to the volume. 

The great thing about volumes is that they decouple the life of the data being stored in them from the life of the container that created them. The volume continues to be accessible on the host machine even if the container is removed or no longer running. 


## Mounting a Volume

Volumes can be mounted to container at run time ...

```
docker run -d -P --name javaContainer -v /myVol bin/echo "Doing java stuff" > /myVol/java_activity.txt

```

... or from within the docker file.

```
FROM java
RUN mkdir /myvol
RUN echo "Doing java stuff" > /myvol/java_activity.txt
VOLUME /myvol

```

But what if you have multiple instances of the application that need to access the same volume? You need to make the most of the sharability that Docker provides. 

## The Data Container Pattern

Rather than mounting a volume to your application's container, the Data Container Pattern closely follows the single responsibility principle. 

It involves setting up a volume in a separate <strong>data container</strong>. Your application container then points to the data container to read and write information (using the <strong>volume-from</strong> command). This is a common practice when working with databases. 


## The Lifecycle of a Data Container      

The data container only runs whilst it is needed and is does next to nothing in terms of work. The application container mounts the volume contained inside the data container, once this is done the data container shuts down.

## Preventing Problems

When creating a data container (e.g for storing information from a database application) it's wise to use the same base image in both your application container and data container. This will prevent any file permission issues as the data container will seed the application container with the correct file permissions and brings about greater efficiency as you are reusing the image.

## Further reading
- [Docker Documentation](https://docs.docker.com/userguide/dockervolumes/) 
- [Persistent volumes with Docker - Data-only container pattern](http://container42.com/2013/12/16/persistent-volumes-with-docker-container-as-volume-pattern/)
- [Understanding volumes in Docker](http://container-solutions.com/2014/12/understanding-volumes-docker/)
- [Docker Indepth: Volumes](http://container42.com/2014/11/03/docker-indepth-volumes/)


##Thanks
<em>Many thanks to Rob Taylor and Mash Badar for proof-reading this article</em>
