---
layout: post
name: 2017-12-21-docker-multistage-haskell
title: Shrinking Haskell Docker images using multi-stage builds
description: Shrinking Haskell Docker images using multi-stage builds
date: 2017-12-21 08:00:00 +00:00
author: Liam Griffin
layout: post
asset-type: post
image:
    src: /assets/custom/img/blog/2017-12-21-docker-multistage-haskell.jpg
canonical:
    name: my personal blog
    href: https://medium.com/@Gryff
tags:
- haskell
- docker
- functional programming
---

I have recently discovered Docker's new [multi-stage build](https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds) feature. This has been a great help in answering my question of how to reduce the size of my haskell images for deploying, as the main [haskell image](https://hub.docker.com/_/haskell/) on Docker Hub is over 1GB before you start adding things. This also means you don't have to maintain two Dockerfiles.

With multi stage builds we can use the `haskell` docker image to build our distributable executable, then copy this to a smaller image (in this case `phusion/baseimage`).

Here's an example Dockerfile for a project called `haskell-example`:

```
FROM haskell as build-env
WORKDIR /opt/server
RUN cabal update
COPY haskell-example.cabal .
RUN cabal install --only-dependencies -j4
ADD . .
RUN cabal install

FROM phusion/baseimage
WORKDIR /opt/server
COPY --from=build-env /opt/server/dist .

CMD ./build/haskell-example/haskell-example
```

Before, using just the haskell image: 1.87GB.

After, using multi-stage with baseimage: 249MB. 

## Image caching

There's just one problem with this method - the intermediate images are all marked as dangling. This means that if you do a `docker system prune` and rebuild, you will have install all your dependencies again, which takes a lot of time in the haskell world.

The workaround for this is to build an image using the `build-env` stage. This is done by specifying the target when building.

```
docker build -t haskell-example-dev --target build-env .
```

This keeps the image in the cache so it won't be `prune`'d. 

## Next steps

So we've shrunk our deployable image using `phusion/baseimage`, can we go further? The next step would be to use something like alpine as the production image, a mere 4.14MB. That's what I'll talk about next time :) 
