# [Codurance Web Site](http://codurance.com/)

This is the source of the Codurance web site. It is built and pushed to the [*gh_pages*](https://github.com/codurance/site/tree/gh-pages) branch.

## Initialisation

Run `bundle install` to install the required Gems. If you are using RVM, you should create a *gh-pages* gemset first using the command `rvm gemset create gh-pages`.

The *_site* directory is a submodule pointing to the gh-pages branch. When the site is built, it is built into this directory and then committed. Initialise it using the following commands:

```shell
git submodule init
git submodule update
```

## Building

To build the site, run `bundle exec jekyll build`. You will not often have to do this manually, as it's handled by the `commit` command (see *Committing*).

## Serving the Web Site Locally

The following command will serve the web site at [http://localhost:4000/][]. Run it in the background so you can test your changes.

```shell
bundle exec jekyll serve --watch
```

## Committing

Because both the *master* and *gh-pages* branches need to be committed, it's easiest to use a separate script. Instead of `git commit`, type `./commit`. For example:

```shell
./commit -m 'I did a thing!'
```

## Deploying to Production

Just type `./deploy` to push both the *master* and *gh-pages* branches.
