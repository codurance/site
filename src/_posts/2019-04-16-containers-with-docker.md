---
author: André Guelfi Torres
layout: post
asset-type: post
title: "Containers with Docker"
date: 2019-04-16 00:00:00
description: Start using docker in your development environment.
abstract: Today in this post, we build a docker image, docker-compose instantiate a container, and you push an image.
image: 
    src: /assets/custom/img/blog/intro-docker/containers.jpg
    thumbnail: /assets/custom/img/blog/intro-docker/containers.jpg
    attribution:
      text: Photo by Klaus Tan on Unsplash
      href: https://unsplash.com/photos/fN603qcEA7g
tags: 
- containers
- docker
- docker-compose
- devops
---

In this post we are going to see a few things:

- [Working with containers](#working-with-containers)
- [docker-compose](#docker-compose)
- [Building images](#building-images)
    - [Multi-stage build](#multistage-build)
    - [Basic troubleshooting](#basic-troubleshooting)
- [Volumes](#volumes)
- [Making our image more flexible with ARG](#flexible-build)
- [Entrypoints](#entrypoints)
- [Docker hub and container registry](#docker-hub)
- [Sources](#sources)
    

## <a name="docker-containers"></a>Docker: What is it?

I could try to explain what a container is, but, the explanation found in the Docker website probably do a better job. The section [What is a container?](https://www.docker.com/resources/what-container) from the Docker website, describes containers as a unit of software that packages up the code and all its dependencies. This way applications become more reliable when changing from an environment to another. Containers are lightweight, standalone, executable package of software.  

## What is the problem that Docker solves?

Why should I be using docker?

Containers help you to deal with many problems:

- Unlike full virtualization you don't need a Hypervisor and a Guest O.S., all this overhead is excluded and it's way more lightweight than a VM.

- Containers are deterministic, meaning that if the container runs in your machine, it will run everywhere. No problem with people adding or changing a dependency on the VM manually and not informing other people.

- Easy to distribute, with a registry you can upload your container image and distribute easily, so you can have your pipeline to build a new image every time that something is merged to a branch and this will be available to everyone in QA, or you can have all the dev environment inside a container, so when someone new joins they can just pull the latest dev image and start work.

- With an orchestration tool it's really easy to bring external dependencies like PostgreSQL, Redis. So if you have to run integration or end-to-end tests that require an empty database or something like wiremock, with docker-compose it's really easy.

### What this is not?

Before starting I need to clarify some things:

- Docker containers are Linux containers, meaning that when you run Docker on your Windows or Mac it will start a VM under the hood. 
- Docker will not solve all your DevOps problems
- You still need knowledge about your environment to deploy to production
- Like every tool, it isn't a silver bullet

With everything clarified, we can start. 

## <a name="working-with-containers"></a>Working with containers

Docker creates containers based on images that contain all the files needed to run the application, Docker will run the application and after that, the container will be erased, nothing will be saved inside the container.

We can start running our first container with:

```shell
$ docker run hello-world
```
The first thing it will show is that you don’t have the image `hello-world` so it will download it. But where is this image coming from? Docker has a service called `Docker Hub` that stores and versions docker images. It’s basically a GitHub for docker.

```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete
Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
Status: Downloaded newer image for hello-world:latest
```

After the image is downloaded Docker will create a new container, run the application and stop the container when everything is done:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
  1. The Docker client contacted the Docker daemon.
  2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
  3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
  4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
  $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
  https://hub.docker.com/

For more examples and ideas, visit:
  https://docs.docker.com/get-started/
```

This is a very basic thing, and I think we can do better. What about running a web server? We run `docker run -p 8080:80 nginx` and wait for the image to be downloaded.

And then we can access `http://localhost:8080` and we are going to see Nginx’s Welcome page. But wait: this time we passed a new flag (`-p`) with some numbers. What do they mean?

### Port

When dealing with containers that work through ports, we have to bind a local port to a container. Like all web servers, Nginx always runs on port 80. If we want to access that we need to bind this port to localhost. The idea behind binding a port is:

```shell
docker run -p <local port>:<container port> <image>
```

This is probably one of the most used commands that you will encounter.

### Managing containers and Images

We want to be able to delete an image, stop a container that is running, and delete a previous container. To do that we have a set of commands:

- `docker ps`: Show running containers. Add the `-a` flag to show stopped containers.
- `docker rm <container id or name>`: Delete a container.
- `docker images`: Show downloaded images.
- `docker rmi <image id>`: Delete an image.

Now we are able to do housekeeping on our images.

## <a name="docker-compose"></a>docker-compose

Running containers manually works but it isn't helpful as we want to be. We want to be able to create containers easily, with the same configuration every time.

That’s where `docker-compose` enters. `docker-compose` is an orchestration tool that can manage multiple containers at the same time for us. It’s based on a YAML file where we specify the container we want and it does all the work for us.

A basic use case for using `docker-compose` is to help to manage external dependencies of your application in a development environment. You can just set up a `docker-compose` file with your database, cache and SMTP server, and anyone running the application can easily start the containers with those dependencies.

### Real world example

The best way to learn something is by breaking production and the idea now is to use `docker-compose` in a real-life situation. 

We have a java application where we can add and retrieve users through a RESTful API. 

Those users are stored in a PostgreSQL database, but we don’t want to install Postgres. So we are going to use `docker-compose` to provide Postgres to everyone who clones the application.

### Anatomy of a docker-compose script

```yml
  version: '3.1'
  
  services:
  
    db:
      image: postgres:10
      ports:
        - "5432:5432"
      environment:
        POSTGRES_PASSWORD: postgres
        POSTGRES_DB: realworld
```

- `version` tag indicates the minimum version of `docker-compose` that can be used with the script
- `services`: this is where our containers will be declared. We give a name to our service and we specify what we want for that service. In this case, we have a PostgreSQL 10 image. `postgres:10` is the name of the image and the version separated by a colon.
- `ports`: we are binding the port `5432` in the container to the `5432` in our localhost like we did previously with the nginx container.
- `environment`: set environment variables like `POSTGRES_PASSWORD` and `POSTGRES_DB` to define the password and create a database named `realworld`. Usually, you can see possible variables in the documentation for the Docker image in Docker Hub.

Now, if we run `docker-compose up -d` (the `-d` flag means detached so the process keeps running in the background), we will able to see the Postgres instance running.

So if we build a jar of the application it will be possible to run the application without any problem.

```shell
# This will build a jar with all the dependencies
$ ./gradlew shadowJar 

# You can run the application 
$ java -jar build\libs\realworldkata-1.0-SNAPSHOT-all.jar
```

Now, we can access `http://localhost.com:4321/database` and we should see `Tables created!` if everything is working. We can double check by accessing the container and checking if we see the table inside the database.

First, we check the ID of the container:

```shell
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
1180df37d9f1        postgres:10         "docker-entrypoint.s…"   About an hour ago   Up About an hour    0.0.0.0:5432->5432/tcp   realworld_db_1
```
Then we access the container and use the `psql` application to connect to the database and we can list the tables.

```shell
$ docker exec -it 118 /bin/bash

$ root@1180df37d9f1:/# psql -U postgres
psql (10.7 (Debian 10.7-1.pgdg90+1))
Type "help" for help.

$ postgres=# \c realworld
You are now connected to database "realworld" as user "postgres".

$ realworld=# \dt
          List of relations
  Schema | Name  | Type  |  Owner
--------+-------+-------+----------
  public | users | table | postgres
(1 row)
```

## <a name="building-images"></a>Building images

Now we can use images created by other people, but what if we want to use our own images? Can we use Docker to distribute our application? Of course; this isn’t amateur hour.

You can build images through a `Dockerfile` where we are going to specify our dependencies and how to build and run the application.

First, we start to build our `Dockerfile` by specifying a base image. This base image can be a Ubuntu or a Java image. For our application, we are going to use the `adoptopenjdk/openjdk11-openj9` image, which is the OpenJ9 implementation by Eclipse Foundation.

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9
```

With the base image in hand, we can move to gather our source code to build the application. For that, we need to set `WORKDIR` and use the `COPY` command to get our source files.

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9
WORKDIR /realworld
COPY . /realworld
```

We have the sources; we need to build our application now, so we need to `RUN` the command to generate a fat jar with all the dependencies.

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar
```

This is a web application that receives requests in a TCP port. To be able to receive requests in the container we `EXPOSE` the port that we want. The `EXPOSE` will say which port the container should expose to the docker network that `docker-compose` will create and also work as documentation to see which port you have to bind when running a container.

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar
EXPOSE 4321
```

Finally, we can run the application by passing the `CMD` to start

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar
EXPOSE 4321
CMD ["java", "-jar", "build/libs/realworldkata-1.0-SNAPSHOT-all.jar"]
```

With the `Dockerfile` ready, we can build an image and create a container from it.

```shell
$ docker build . --tag "realworld"

$ docker run realworld
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
Exception in thread "main" java.lang.RuntimeException
        at realworld.infrastructure.ConnectionFactory.build(ConnectionFactory.java:14)
        at realworld.persistence.daos.UserDAO.<init>(UserDAO.java:18)
        at realworld.Application.buildUserService(Application.java:41)
        at realworld.Application.setRoutes(Application.java:28)
        at realworld.Application.start(Application.java:24)
        at realworld.Application.main(Application.java:65)
```

The `--tag` flag is to give the image a name. You can also give a tag like `dev` or `staging`.

The application is running as it should; the error is happening because the container doesn't have access to the other container that runs postgres. Now that we know that everything is working, we can start to improve some parts of the container build.

### .dockerignore

Like git that have a `.gitignore`, docker has `.dockerignore`, a file that exclude files from the copy of your container. Let’s create one to not copy the IDE-specific and output folders, so we have a faster build.

```
.gradle/
.idea/
build/
out/
```

### <a name="multistage-build"></a>Multi-stage build

We are creating the docker image with all our source code, and since we just want to run our application we don't have to distribute them with our final jar. 
The source code for the application is inside the container, anyone with the access to the image will be able to see it, also this will make our image bigger without any need. 
To solve this we are going to do a `multi-stage` build. 

#### What is a `multi-stage` build?

A multi-stage build is a way of splitting the process of building an image between multiple containers with distinct steps, kinda like a CI build. To transform your regular build into a `multi-stage` one is easy, you just have to add another `FROM` in your `Dockerfile`. 

In our case, we want to split the environment that builds our application, and a lightweight one that will run. 

First, we are going to deal with the container that we already have. There are a few things that we have to do:

- Give a name for the build stage
    We do that by adding the `as <name>` in front of the base image

- Then we have to remove the things that are to run the application
    For that we remove the `EXPOSE` and the `CMD` from the file but don't delete, we are going to use it later.

Now we can start to create our image that will run the application:

- Defining the image.
    We don't need a complete image with Gradle or Maven. In fact, we don't even need the JDK, we just need the JRE,  so we can use the `adoptopenjdk/openjdk11:jre-11.0.2.9-alpine` image that only has the Java runtime. It's based on a lightweight Linux distro called Alpine. 

- We can have the same `WORKDIR` from the previous stage.
- Now we are going to `COPY` the jar that we build
    In this case, we are going to copy the jar from the container in the previous stage using the `--from=build` before the files that we want to copy.

- Now we just have to put the `EXPOSE` and `CMD` that we saved previously.

Now when we build our container docker will spin up a container build the application and create another image using those files them delete anything from the previous steps, so no need write a cleanup script.

```Dockerfile
FROM adoptopenjdk/openjdk11-openj9 as build
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar

FROM adoptopenjdk/openjdk11:jre-11.0.2.9-alpine
WORKDIR /realworld
COPY --from=build /realworld/build/libs/realworldkata-1.0-SNAPSHOT-all.jar .
EXPOSE 4321
CMD ["java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

## Add the image to docker-compose.yml

Now we have our image being built properly we can add to our `docker-compose.yml`, but unlike the postgres image that we have already, we want to build the image based in the `Dockerfile` and also we need to set up some environment variables to connect to the database. 

So we add a new service to the file. Instead of using `image`, we are going to use `build` and pass the relative path to the `Dockerfile` that we want to build. 

We map the port and add the environment variable for the `DB_HOST` pointing to our `db` service and the postgres port. Finally, we add the `depends_on` saying that we depend on the `db` service. 

```yml
version: '3.1'

services:

  db:
    image: postgres:10
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: realworld

  realworld:
    build: .
    ports:
      - "4321:4321"
    environment:
      DB_HOST: "db"
    depends_on:
      - db
```

When we try to instantiate the containers, it isn't working yet: why? I don't know yet, let's check the logs. 

This is the important part of our logs: `depends_on` waits for the container to be ready but doesn't wait to run things post-initialisation.

```shell
db_1         | fixing permissions on existing directory /var/lib/postgresql/data ... ok
db_1         | creating subdirectories ... ok
db_1         | selecting default max_connections ... 100
db_1         | selecting default shared_buffers ... 128MB
db_1         | selecting dynamic shared memory implementation ... posix
realworld_1  | Picked up JAVA_TOOL_OPTIONS:
db_1         | creating configuration files ... ok
db_1         | running bootstrap script ... ok
realworld_1  | SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
realworld_1  | SLF4J: Defaulting to no-operation (NOP) logger implementation
realworld_1  | SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
db_1         | performing post-bootstrap initialization ... ok
db_1         | syncing data to disk ... ok
```

### <a name="basic-troubleshooting"></a>Basic troubleshooting

In this case, we have the "theory" that the application is trying to connect to the database before everything is ready. We have to test that if we run the application after the database is ready, everything will work. 

The most basic thing that we can do to verify that is to spawn the containers and to start the application manually, but how can we connect to the container using `docker-compose`? 

Just like running a single container in Docker, `docker-compose` provides the `run` method which we can use to access a shell inside our container. 

```shell
# docker-compose run <service> <command>
docker-compose run realworld /bin/sh
```

This will give access to the container with the application allowing us to run:

```shell
$ java -jar realworldkata-1.0-SNAPSHOT-all.jar
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```
if the application doesn't throw any error related to the database, then it is working and we can proceed to create a solution to the problem.

### Hacking our way through

How can this problem be solved? Adding a script that keeps checking if the database is up, and only runs the application when it's ready, will do the work.

> Modern problems, require modern solutions.

```bash
    #! /bin/sh
    
    # Set to exit on error
    set -e
    
    # We need to install the psql application to connect to the db
    apk add --no-cache postgresql-client
    
    # Keep in a loop until connects to the postgres database
    until PGPASSWORD="postgres" psql -h "${DB_HOST}" -U "postgres" -c '\q'; do
      >&2 echo "Postgres is unavailable - sleeping"
      sleep 1
    done
    
    >&2 echo "Postgres is up - executing command"
    # Exec the command with the arguments that were passed
    exec $@
```

We already have an image ready, so we could rebuild with the script and change the run command, but then we would have this check done everywhere that we are using the image, and we don't want that because in other places we might be using a database that isn't in a Docker container. 

So we can override the command from our image and run the script. 

The first thing we have to do is to put the script inside the container, we already have built the image so we can't use `COPY` again, in this case, we can create a volume inside our container. 

### <a name="volumes"></a>Volumes

A volume is a way to mount a folder from the host machine into a container. Everything inside that folder will be mirrored to the container. This is good when you want to save things like logs or to persist in a database that you are running in a container. 

We change the `docker-compose.yml` to add our new features:

```yml
version: '3.1'

services:

  db:
    image: postgres:10
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: realworld

  realworld:
    build: .
    ports:
      - "4321:4321"
    environment:
      DB_HOST: "db"
    depends_on:
      - db
    volumes:
      - "./scripts:/scripts"
    command: ["/scripts/wait-for-db.sh", "java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

We added the `volumes` tag linking the scripts folder inside our application folder to a scripts folder in the root of our container, and we have a new command to be run with the script and the command to run the application. 

## <a name="flexible-build"></a>Making our image more flexible with ARG

Right now the application is exposing the port "4321", which is very inflexible. If any change is needed, the only way to do it would be having the mapping in the `docker-compose` file to map to a different port. This can be made more flexible using `ARG` in the `Dockerfile`. 

What are the changes needed to do that? 

Set the `ARG` keyword in the `Dockerfile`. This will receive the name of the argument and the default value. It's good to set a default value in case you don't want to be passing the value during the build every time.

```Dockerfile
# ARG NAME=<value>
ARG PORT=4321
```

Another thing to take care of when using `ARG` is the scope. You cannot use an `ARG` that is declared in a `FROM` after the one that you are working with. Think like variables during the code: you can't use a variable before it's been declared, nor use a variable that was declared inside another function. 

With the `ARG` created, it's time to set the environment variable PORT so the application knows which port to use. This can be done using the `ENV` keyword.

```Dockerfile
# ENV NAME $arg 
ENV PORT $PORT
```

Finally, we have to change the `EXPOSE` keyword to use the `ARG` instead of the hard-coded value.

```Dockerfile
EXPOSE $PORT
```

The final result would be: 

```Dockerfile
FROM adoptopenjdk/openjdk11:jdk-11.0.2.9 as build
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar

FROM adoptopenjdk/openjdk11:jre-11.0.2.9-alpine
ARG PORT=4321
WORKDIR /realworld
COPY --from=build /realworld/build/libs/realworldkata-1.0-SNAPSHOT-all.jar .
ENV PORT $PORT
EXPOSE $PORT
CMD ["java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

And to build the container passing the argument:

```shell
# docker build . --build-arg ARG=<value>
$ docker build . -t realworld:ports --build-arg PORT=4332
```

To check if the container is running with the right port, you can see the exposed ports with `docker ps` 

```
$ docker run -it realworld:args /bin/sh

$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
10b6105d1db2        realworld:args      "/bin/sh"           5 seconds ago       Up 4 seconds        4332/tcp            gravel_pit
```

You can see in the column `PORTS` that it is exposing `4332/tcp` just like was passed in the build args, but what if you want to do that with `docker-compose`? Is there any way of passing `build-arg` through the yml file? Of course.

Change the `docker-compose.yaml` to pass the argument in the build part using the `args` tag. Now that `build` will have multiple values. The key `context`  has to be added to set the place where your `Dockerfile` will be. 

```yml
# ...
  realworld:
    build: 
      context: .
      args:
        PORT: 4332
    ports:
      - "4332:4332"
    environment:
      DB_HOST: "db"
    depends_on:
      - db
    volumes:
      - "./scripts:/scripts"
    command: ["/scripts/wait-for-db.sh", "java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

With all the changes in place, just run `docker-compose up` and it's possible to check if everything is running in the right port by trying to create the tables

```
$ curl localhost:4332/database
Tables created!
```

## <a name="entrypoints"></a>Entrypoints

`CMD` isn't the only way to start a container in Docker, in fact before the `CMD` is executed a container has an `ENTRYPOINT`. Sometimes you want your container to do a more complex startup and to execute a few commands or scripts before starting your application. Docker will combine the `ENTRYPOINT` with the `CMD` passed to the container, so in the case that we have in the `docker-compose.yml`, the command that was just building the `wait-for-db.sh` could be split from the `java` command. 

So if the Dockerfile looked like this: 

```Dockerfile
FROM adoptopenjdk/openjdk11:jdk-11.0.2.9 as build
WORKDIR /realworld
COPY . /realworld
RUN ./gradlew shadowJar

FROM adoptopenjdk/openjdk11:jre-11.0.2.9-alpine
ARG PORT=4321
WORKDIR /realworld
COPY --from=build /realworld/build/libs/realworldkata-1.0-SNAPSHOT-all.jar .
ENV PORT $PORT
EXPOSE $PORT
ENTRYPOINT ["wait-for-db.sh"]
CMD ["java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

This would be executed like `wait-for-db.sh java -jar realworldkata-1.0-SNAPSHOT-all.jar`. The script can do multiple things and at the end execute the application. 

Postgres does something like this. Instead of having the `postgres` command as the startup point, it executes a script that sets the folder where the data will be stored, sets the password in the right environment variable and checks if there is any `.sql` or `.sh` file to be run before starting the database. 

[docker-library/postgres](https://github.com/docker-library/postgres/blob/ef04f3055bab11b10d3d5c41a659acfacf2c850b/10/docker-entrypoint.sh)

> Don't start your application with `ENTRYPOINT`. Use `CMD` so you can override the command with `docker run`.

## <a name="docker-hub"></a>Docker hub and container registry

Building the same docker image in every machine isn't the most intuitive thing to do. You might want to use the image in another machine without having all the source code, but just with a `docker-compose.yml`. 

The first thing is to register an account on Docker Hub and to login with that account in the command line: 

```shell
$ docker login
```

After the login, you can push the images to the repositories. The repository is based on the tag name that you give when building the image. When building the first image there was the `--tag` flag to give a name to the image; the repository in Docker Hub will use the same name. You can have multiple versions of the same image in a repository by adding a version to it. 

```shell
# docker build . --tag <repository>/<image-name>:<version>
$ docker build . --tag "andretorrescodurance/realworld:0.1" 
```

So we can build the image now, and when everything is set you can push using 

```shell
# docker push <repository>:<version>
$ docker push andretorrescodurance/realworld:0.1
```

> If you don't add the repository before the image name, you might have trouble pushing the image to Docker Hub.

Now instead of building from scratch, you can just use the image from Docker Hub in your `docker-compose.yml` and run without sending the source files anywhere. 

```yml
version: '3.1'

services:

  db:
    image: postgres:10
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: realworld

  realworld:
    image: andretorrescodurance/realworld:0.1
    ports:
      - "4321:4321"
    environment:
      DB_HOST: "db"
    depends_on:
      - db
    volumes:
      - "./scripts:/scripts"
    command: ["/scripts/wait-for-db.sh", "java", "-jar", "realworldkata-1.0-SNAPSHOT-all.jar"]
```

And with that change done, and the containers working, we can end this post. 

### <a name="sources"></a>Sources:

[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

[https://docs.docker.com/develop/develop-images/dockerfile_best-practices/](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

[https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/)
