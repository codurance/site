---
layout: post
name: CommandPromptEnvy
title: 'Command Prompt Envy'
date: 2016-02-08 00:20:00 +00:00
author: Pedro Santos
image:
    src: /assets/custom/img/blog/babun_screenshot.png
tags:
- command 
- prompt
- Babun
- Consolas
---

I'm spending my time between Mac OS and Windows, and when I go back to my Windows machine I always feel the lack of my Mac command prompt. 

Almost a year ago [Amir](https://twitter.com/amirbazazi) [posted](http://codurance.com/2015/03/16/installing-zprezto-a-quick-guide/) how you can get a nice command prompt on a Mac. I've always wanted a post like that, but for a Windows machine. Today I stumbled upon [Babun](http://babun.github.io/), gave it a try and TADA! I was able to get a command prompt exactly like the one I have on my Mac.

###Follow these steps to get your shiny Windows command prompt:
1. Download Babun from http://babun.github.io/ (272 MB) 
 (Do not use Google Chrome to download since, for some reason, it will download the file but marks it as unsafe and deletes it).
2. Unzip the downloaded archive
3. Execute "install.bat" to install Babun to C:\Users\YOURUSER\\.babun or execute "install.bat /t PATH_TO_INTALLATION_LOCATION"
 When the installation finishes you should be greeted with this ... <img src="https://raw.githubusercontent.com/babun/babun.github.io/master/images/screenshots/screen_welcome.png" class="img img-responsive style-screengrab ">

### One more tweek
We already have a cool prompt, try to navigate to a git repository. We want just a bit more :) Let's try a more colourful theme.
Let's use the "Bullet train" [theme](https://github.com/caiogondim/bullet-train-oh-my-zsh-theme)

Execute the folowing commands
 ```
 cd
 cd .oh-my-zsh/themes/
 wget https://raw.githubusercontent.com/caiogondim/bullet-train-oh-my-zsh-theme/master/bullet-train.zsh-theme
 cd
 vim .zshrc 
 ```
 (nano is also available by default in Babun if you prefer it to vim)
 
1. Change this line ```ZSH_THEME="your current theme"``` to ```ZSH_THEME="bullet-train"```
2. Save the file and exit your editor
3. Close and reopen Babun
4. You will be greeted with... a disappointing result :( 

But don't despair, we will fix it :)

You need a font that supports powerline. I suggest [Consolas for powerline](https://github.com/runsisi/consolas-font-for-powerline), but any font that supports powerline should work. 

1. Download it, double click it and select install on the dialog: <img src="http://imgur.com/0vQXJyS.png" class="img img-responsive style-screengrab">

2. Right click on the top bar of the terminal, you should see a pop up menu, select options <img src="http://imgur.com/GQjMkDe.png" class="img img-responsive style-screengrab">

3. In the dialog select Text on the left and then select a new font. Select Powerline Consolas or just Consolas. Press 'Ok' and 'Ok'. <img src="http://imgur.com/I0KnSVi.png" class="img img-responsive style-screengrab">

4. Marvel at your shiny command prompt :) <img src="http://imgur.com/41klopT.png" class="img img-responsive style-screengrab">
