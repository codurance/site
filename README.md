# [Codurance Web Site](http://codurance.com/)

This is the source of the Codurance web site. It is built and pushed to the [*gh-pages*](https://github.com/codurance/site/tree/gh-pages) branch.

## Initialisation

Run `bundle install` to install the required Gems. If you are using RVM, you should create a *gh-pages* gemset first using the command `rvm gemset create gh-pages`, which will help you isolate your gems from your standard Ruby installation.

## Building

To build the site, run `rake build`. You will not often have to do this manually; more often, you'll want a server in the background so you can verify your changes are as expected.

## Serving the Web Site Locally

Running `rake serve` will serve the web site at [http://localhost:4000/](http://localhost:4000/). Run it in the background so you can test your changes.

## Running the Tests

There are some tests around the custom Jekyll plugins for navigation. Run them with `rake spec`.

## Deploying to Production

When you push the *master* branch, Travis CI will kick off [the deployment build](https://travis-ci.org/codurance/site), which will run the tests, generate the site and push it to the *gh-pages* branch.

If you want to push code without deploying a new version of the site, make sure you work in a feature branch, rather than on *master* directly.
