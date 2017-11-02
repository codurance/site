# [Codurance Web Site](https://codurance.com/)

# Setup the <del>development</del> writing environment 

**[Docker Installation required]**

You need to execute the following command to prepare an image and run a container:

```
# you need to do this only once - this builds the container with all the dependencies for running the site
docker build --tag codurance-site:local -f ./Dockerfile-local .

# you need to run this every time you want to stand up the local server - it should watch for changes in the local files automatically though
docker run -i -t -v `pwd`:/site -p 4000:4000 codurance-site:local 
```

### advanced usage:

If you want to run a different rake target on the container start use:

```
docker run -i -t -v `pwd`:/site -p 4000:4000 -e RAKE_TARGET="your_target" codurance-site:local
```

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

## Previewing changes in a branch

We have a bot that makes a preview of the site for every branch that you create. Just replace the branch name in the link below:

http://codurance-site-pr.s3-website-eu-west-1.amazonaws.com/site-[branch-name]/