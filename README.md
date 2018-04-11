# [Codurance Web Site](https://codurance.com/)

## Setup the <del>development</del> writing environment 

You can serve the site through [docker](#installing-if-you-like-docker) or [natively](#installing-if-you-like-ruby) on your machine.

### Installing if you like Docker

##### TL;DR
1. [Install docker](https://www.docker.com/community-edition)
1. [Install docker compose](https://docs.docker.com/compose/install/) (on Mac and Windows it comes with docker)

Build image:

    docker-compose build

Run container:

    docker-compose up

Stop and remove container:
    
    docker-compose down


##### More details

You need to do this only once - this builds the image with all the dependencies for running the site:
    
    docker-compose build

Run this every time you want to stand up the local server inside the container- it should watch for changes in the local files/folders mounted to the container automatically:

    docker-compose up

Run this if you want to run the whole site (not just the latest posts):

    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

If you want to start the container with a different command use:

    docker-compose run site <command>

If you change the project dependencies (Gemfile) then rebuild the image again.

----

### Installing if you like ruby

1. install rvm https://rvm.io/
- `rvm install ruby`
- `rvm use ruby`
- `gem install bundler`
- `bundle install`


run locally:

1. `bundle exec rake servequick`

In case of other problems, refer to the [troubleshooting section](#troubleshooting).


## Flight Rules

### Adding a post

  * Remember to add the tag `asset-type: post` to the post metadata

### Adding an abstract to a post

  * See [Jenkins example post](/site/blob/master/_posts/2014-10-03-guide-to-deploying-artifacts-with-jenkins.md), especially the ``abstract`` field.
  * Note: comments can only be single line
  * Note: Even if they are too long, they'll be cut to 30 words

### Adding a video to the publications

  * Add an md file to the folder: `videos/_posts` (You can use older videos post as a template)
  * Do not forget the attribute `video-url`, for youtube videos, use following format: https://www.youtube.com/embed/<video-id>
  * Add an image to the video, for youtube videos, make a screenshot [here](http://youtubescreenshot.com/), the image is used on the home page and the carousel. The image is to be saved under `/assets/custom/img/videos/`

## Previewing changes for a pull request

![illustration of how to go the site preview](how-to-go-to-site-preview.png)

We have a bot that makes a preview of the site for every branch that you create. 

If you don't have a PR, you can just replace the branch name in the link below:

`http://codurance-site-pr.s3-website-eu-west-1.amazonaws.com/site-[branch-name]`


# Troubleshooting

## Header files for ruby not found

This problem happens with Linux systems:

```
header files for ruby at /usr/lib/ruby/include/ruby.h not found
```

in case `ruby-dev` package is not installed:

```
sudo apt-get install ruby-dev
```

## extconf.rb failed

`zlib` is necessary for building `libxml2`:

```
sudo apt-get install zlib1g-dev
```

## Gem problems?

If other things don't make sense - follow this guide to clear out your cached gems and start the process again: https://coderwall.com/p/x3z2ag/cleanup-rvm
