# [Codurance Web Site](http://codurance.com/)

This is the source of the Codurance web site. It is built and pushed to the [*gh-pages*](https://github.com/codurance/site/tree/gh-pages) branch.

## Initialisation

### Installing on the MacOSX / Linux

Note: you might have to [update Ruby to 2.3](http://stackoverflow.com/a/33883667) first.

Run the below commands to install the necessary gems (you might need to prefix the commands with `sudo`):

```
gem install bundler
gem install rspec-core -v '3.4.1'
gem install jekyll
bundle install
```

In case the `bundle install` command aborts, with a message about a missing gem, install the missing gem indicated in the message and re-run `bundle install`. Repeat this for the number of times missing gems are notified. 

Note: this should take a bit of time to install the gems.

If you are using RVM, you should create a *gh-pages* gemset first using the command `rvm gemset create gh-pages`, which will help you isolate your gems from your standard Ruby installation; you should then run `rvm gemset use gh-pages` when you start a new terminal session.

## Building

To build the site, run `rake build` or `jekyll serve` from the root directory of the project. You will not often have to do this manually; more often, you'll want a server in the background so you can verify your changes are as expected.

## Serving the Web Site Locally

Running `rake serve` will serve the web site at [http://localhost:4000/](http://localhost:4000/) and watch for incremental changes in the background so you can test your site. If you want your page generated quicker then run `rake servequick` which will only generate the most recent 3 blogs and the rest of the site.

The above commands should be executed from the root directory of the project.

## Serving the Web Site from Docker

**[Docker Installation required]**

To build and serve the site from Docker you need to build a local image based. 
Dockerfile for is ready to use in directory `docker`. 

You need to execute the following command to prepare an image and run a container:

```
docker build --tag codurance-site:local -f ./docker/Dockerfile-local ./docker/
docker run -d -v <<root_directory_of_this_project>>:/site -p 4000:4000 --name codurance-site codurance-site:local
```

#### !!! IMPORTANT !!!
The site doesn't start immediately, because the container executes commands `bundle install` and `rake serve`.
You can trace the progress of the start process by executing the following command:

```
docker logs -f codurance-site
```

#### !!! Docker-machine users !!!

1. `<<root_directory_of_this_project>>` must be stored in a directory available from `docker-machine` (e.g. `/User/<<user_name>>`).
2. [Virtualbox Driver] If you want to edit files from a host system (e.g. OS X or Windows) after each change you have to execute:

    ```
    docker exec -ti codurance-site touch /site/<<path_to_changed_file>>
    ```

    Refresh takes some time and you can trace the progress by running command `docker logs -f codurance-site`. 
    The root cause of this problem is describe in this *[issue report](https://www.virtualbox.org/ticket/10660)*.  

## Deploying to Production

When you push the *master* branch, Jenkins will kick off the deployment build, which will run the tests, generate the site and push it to the *gh-pages* branch.

If you want to push code without deploying a new version of the site, make sure you work in a feature branch, rather than on *master* directly.

# Flight Rules

### Adding a post

  * Remember to add the tag `asset-type: post` to the post metadata

### Adding an abstract to a post

  * See [Jenkins example post](/site/blob/master/_posts/2014-10-03-guide-to-deploying-artifacts-with-jenkins.md), especially the ``abstract`` field.
  * Note: comments can only be single line
  * Note: Even if they are too long, they'll be cut to 30 words

### Adding a video to the publications

  * Add an md file to the folder: `videos/_posts` (You can use older videos post as a template)
  * Do not forget the attribute `video-url`, for youtube videos, use following format: https://www.youtube.com/embed/<video-id>
  * Add an image to the video, for youtube videos, make a screenshot [here](http://youtubescreenshot.com/), the image is used on the home page and the carousel. The image is to be saved under `/assets/img/custom/videos/`

