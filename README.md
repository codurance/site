# [Codurance Web Site](https://codurance.com/)

Trello board: [https://trello.com/b/Z6YDy6bw/2018-website-project](https://trello.com/b/Z6YDy6bw/2018-website-project)
This link is old please visit if you aim for past documentation: [https://trello.com/b/0wWmhd6A/improving-our-website](https://trello.com/b/0wWmhd6A/improving-our-website)

## Tests

### Backend unit tests

We have a small corner of functionality covered by [RSpec](https://rspec.info/) tests.
This is a good base for adding more coverage of Ruby based logic within the application.

- Build the docker-compose-override site image with:
  `docker-compose -f docker-compose.override.yml build`

- You only need to do that once. Now you can run the tests with:
  `docker-compose -f docker-compose.override.yml run site bundle exec rspec`

### Frontend unit tests

Where we have Javascript coverage it is tested using [Jest](https://jestjs.io/)

- Asssuming you have [Node](https://nodejs.org/en/) installed then run:
  ```bash
  npm install
  npm test
  ```

### Visual regression tests

We're using [Backstop](https://garris.github.io/BackstopJS/)

This command sets up a Docker image with the website and Backstop running side-by-side:

```
npm test:visual
```

Approve intended changes with `npm test:visual-approve`

_Reference files should already exist but if you do need to regenerate them run `./tools/snapshots/create-visual-regression-references.sh`_

## Setup the ~development~ writing environment

You can serve the site through [docker](#building-if-you-like-docker) or [natively](#building-if-you-like-ruby) on your machine.

### Building if you like Docker

#### TL;DR

1. [Install docker](https://www.docker.com/community-edition)
1. [Install docker compose](https://docs.docker.com/compose/install/) (on Mac and Windows it comes with docker)

Build image:

`docker-compose build`

Run container in a watch and auto rebuild mode:

`docker-compose up`

Stop container:

`docker-compose stop`

Destroy container:

`docker-compose down`

##### Detailed docker commands

You need to do this only once - this builds the image with all the dependencies inside.
If you change the project dependencies (Gemfile) then rebuild the image again.

`docker-compose build`

Run this to run the container with only the latest posts (faster rebuild).
Source files are mounted inside the container from your host machine.
Site will be rebuilt automatically when you change the source code.

`docker-compose up`

Open site:

`localhost:4000`

Run this if you want all posts (slower rebuild):

`docker-compose run --service-ports site rake serve`

If you want to start the container with a different command use:

`docker-compose run --service-ports site <command>`

Destroy the container and all volumes for this project.
Run this if your container is broken.

`docker-compose down`

##### Notes for Windows users

As docker "18.06.0-ce-win72 (19098)", you need to setup COMPOSE_CONVERT_WINDOWS_PATHS environment variable and restart the docker service before running `docker-compose build`:

```bash
SET COMPOSE_CONVERT_WINDOWS_PATHS=1
net stop com.docker.service
net start com.docker.service
```

Then you can run `docker-compose build`

You will need to add the root source directory in docker desktop to allow binding volumes to it *(Settings => Resources => File Sharing in docker desktop)* ([docs](https://docs.docker.com/docker-for-windows/#file-sharing))

Starting the container with `docker-compose up` doesnt seem to work but you can run the container directly using the following command.
```bash
docker run -p 4000:4000 -v %cd%:/usr/local/src codurance/site:latest rake servepolling
```

You can use the rake task ```servepollingquick``` to build only the last 10 posts.

---

### Building if you like ruby

Install GSL (GNU Scientific Library) for Ruby:

- Debian/Ubuntu: `apt-get install libgsl0-dev`
- Fedora/SuSE: `yum install gsl-devel`
- Gentoo: `emerge sci-libs/gsl`
- OS X: `brew install gsl`

Install [Ruby Version Manager](https://rvm.io/), Ruby and Bundler:

- `rvm install ruby`
- `rvm use ruby`
- `gem install bundler`

Now run Bundler and serve the site locally:

- `bundle install`
- `rake servequick`

The site should now be running on http://localhost:4000

In case of problems, refer to the [troubleshooting section](#troubleshooting).

## Flight Rules

### Adding a post

To do a post in the website you need to follow the following guidelines:

1. Add a file with the following name format `YYYY-MM-DD-name-of-post.md` in `src/_posts`. the name of the file will also
   be the url of the post. `eg. https://url.com/YYYY/MM/DD/name-of-post`

2. Create a folder with the same name in `src/assets/custom/img/blog` where your images will be stored

3. The following metadata is needed for technical and SEO purposes.

- `author: John Doe` (Same name on the `team.yml` so we can redirect to all your posts)
- `date:` (format YYYY-MMM-DD 00:00:00)
- `layout: post`
- `asset-type: post`
- `title` this is the displayed title on the website
- `abstract` this is a subtitle that is displayed only in the post page, try to make is concise.
- `description` this is needed for sharing purposes, do a quick summary of what is the post about
- `image: src:` this is the banner's picture path
- `tags` add the tags that you feel go according to the post, is important that you don't repeat other tags with different
  spelling, to check the tags that exist you can run the python script `src/list-tags.py`.

You can see an example here:

```
---
author: John Doe
layout: post
asset-type: post
title: This is the title of my post
date: 2020-02-19 00:00:00
description: This is the description of the example post, it will appear when someone share's it.
image:
    src: /assets/custom/img/blog/2020-02-19-example-post/banner.png

abstract: Small subtitle under the title in the post
tags:
    - life at codurance
    - another tag
    - yet another
---
```

### Adding links in your post

Links can be added to a post in a couple of ways. The preference is to make sure that `target="_blank"` is used so that any links open in a new browser tab and do not take the user away from the blog post or the website.

Javascript on the website will add target blank to any external links when the DOM loads, so you can use markdown style links like this:

```markdown
[Link Example](https://www.example.com)
```

To explicitly set the target of a link you can use HTML in the markdown like this:

```html
<a href="https://www.example.com" target="custom">Link Example</a>
```

### Adding a video to the publications

- Add an md file to the folder: `videos/_posts` (You can use older videos post as a template)
- Do not forget the attribute `video-url`, for youtube videos, use following format: `https://www.youtube.com/embed/<video-id>`
- Add an image to the video, for youtube videos, make a screenshot [here](http://youtubescreenshot.com/), the image is used on the home page and the carousel. The image is to be saved under `/assets/custom/img/videos/`

## Previewing changes for a pull request

![illustration of how to go the site preview](docs/assets/how-to-go-to-site-preview.png)

We have a bot that makes a preview of the site for every branch that you create.

If you don't have a PR, you can just replace the branch name in the link below:

`http://codurance-site-pr.s3-website-eu-west-1.amazonaws.com/site-[branch-name]`

## Troubleshooting

### Problem with ruby dependencies in docker

If after a pull you can't get docker compose to work and it's complaining about `Bundler::GemNotFound` or similar.

This probably means that the docker image has been updated and you local machines "latest" is not in fact the latest.

This can be fixed with:

```bash
docker system prune -a
```

After this the next docker operation will download the correct image.

### Problem with using rake servequick

If after installing ruby you get this following error when doing bundle install

```
An error occurred while installing libv8 (3.16.14.19), and Bundler cannot continue.
Make sure that `gem install libv8 -v '3.16.14.19' --source 'https://rubygems.org/'` succeeds before bundling.
```

you'll need to run the following commands to fix the error

```bash
$ brew install v8@3.15
$ bundle config build.libv8 --with-system-v8
$ bundle config build.therubyracer --with-v8-dir=$(brew --prefix v8@3.15)
$ bundle install
```  

### Problem with files permissions in docker (linux)

When using `selinux` (e.g. on Fedora) you may encounter an error that a mounted file cannot be accessed from a docker container.

Example error:

```bash
$ docker-compose up
Starting site_site_1 ... done
site_1  | /usr/local/bundle/gems/bundler-1.16.6/lib/bundler/definition.rb:33:in `build': /usr/local/src/Gemfile not found (Bundler::GemfileNotFound)
```

Problem is with permissions for mounted files and folders.
To check the files permissions inside container run:

```bash
$ docker-compose run site ls -la
-??????????  ? ?    ?        ?            ? Gemfile
-??????????  ? ?    ?        ?            ? Rakefile
-rw-rw-r--.  1 root root  6269 Jun 28 13:07 README.md
```

If you see questions marks like in the example above for the mounted files it could mean that selinux prohibits docker from accessing them from your disk.

To fix this problem change selinux policies for the whole project:

`sudo chcon -Rt svirt_sandbox_file_t site/`

### Header files for ruby not found

This problem happens with Linux systems:

`header files for ruby at /usr/lib/ruby/include/ruby.h not found`

in case `ruby-dev` package is not installed:

`sudo apt-get install ruby-dev`

### extconf.rb failed

`zlib` is necessary for building `libxml2`:

`sudo apt-get install zlib1g-dev`

### Gem problems

If other things don't make sense - [follow this guide to clear out your cached gems and start the process again](https://coderwall.com/p/x3z2ag/cleanup-rvm)

### Problems with installation of ffi gem on MacOS

To install ffi gem in the newer versions of MacOS you need install Xcode tool first. After restarting your terminal, the following command need to be executed:

`brew install libtool automake autoconf`

### CI docker images preparation

There are two images used to build and deploy the application. The necessary commands to update them is here. Be aware that if you do it using the tag latest it will affect the master branch at the moment

```bash
docker build --file=Dockerfile_build_base -t codurance/website_build_base:latest .
docker push codurance/website_build_base:latest
```

```bash
docker build --file=Dockerfile_deployment_base -t codurance/website_deployment_base:latest .
docker push codurance/website_deployment_base:latest
```

## Feature Toggles

We are using [toggles.yml](src/_data/toggles.yml) to set toggles "on" or "off".

```yml
feature-my-feature: "on"
feature-some-other-feature: "off"
```

The simpliest use of toggles would be a simple conditional:

```liquid
{% if site.data.toggles.my-feature == 'on' %}
  {% include my-component.html %}
{% endif %}
```

### Tidy up

It should go without saying that once a feature has been switched on in production and is considered stable the toggle should be removed from the codebase.
