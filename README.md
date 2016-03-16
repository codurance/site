# [Codurance Web Site](http://codurance.com/)

This is the source of the Codurance web site. It is built and pushed to the [*gh-pages*](https://github.com/codurance/site/tree/gh-pages) branch.

## Initialisation

### Installing on the MacOSX / Linux

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

To build the site, run `rake build` from the root directory of the project. You will not often have to do this manually; more often, you'll want a server in the background so you can verify your changes are as expected.

## Serving the Web Site Locally

Running `rake serve` will serve the web site at [http://localhost:4000/](http://localhost:4000/). Run it in the background so you can test your changes.

To run and watch the site continuously for changes, run `jekyll serve --watch`.

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


## Running the Tests

There are some tests around the custom Jekyll plugins for navigation. Run them with `rake spec`.

## Deploying to Production

When you push the *master* branch, Travis CI will kick off [the deployment build](https://travis-ci.org/codurance/site), which will run the tests, generate the site and push it to the *gh-pages* branch.

If you want to push code without deploying a new version of the site, make sure you work in a feature branch, rather than on *master* directly.
