# Snapshot Testing: backstopjs

This is a tool that can be used for regression testing of css changes.

The tool that we are using is backstop.js

```
npm install -g backstopjs
```

This is the key commands needed to test the site:

```
backstop reference
backstop test
```

This will open a browser showing the differences.
Differences are highlighted in purple.

Currently these tests are set up to compare local development with the production site.

You may need to extend backstop.json to handle specific test case you may have.

The two main sections are the *viewports* and the *scenarios*.
Note that the number of tests run is viewports times scenarios.

You can use extra options in the scenarios to mask out parts of the page using jquery syntax.
It is also possible to add viewports within scenarios to exercise specific conditions without slowing down
all of the tests.

Care needs to be taken when choosing pages to compare. Dynamically generated lists will frequently differ between reference and actual. We have also set a 0.15% global difference threshold to allow some variation. This may need to be reduced for specific tests.

## Using backstop for a docker container instead of local installation

backstopjs provides a docker container that allows you to run without installing it. 

Found here: https://blog.docksal.io/visual-regression-testing-with-backstopjs-in-a-docker-container-dfd1b9ae8582

I have created three bash scripts to abstract the running of backstopjs without deploying it:

```
docker-backstop-setup.sh
docker-backstop-reference.sh
docker-backtop-test.sh
```