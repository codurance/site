--- layout: post name: installing-io-language-on-ubuntu title:
Installing Io language on Ubuntu time: 2011-10-23 02:15:00.000000000
+01:00 --- Since I'm new to Ubuntu and I had a hard time installing [Io
language](http://iolanguage.com/), I've decided to record my steps.
Hopefully I'll remember all of them and other people won't struggle as
much as I did. I'm running Ubuntu 11.10.\
\
The main problem I had was that I did not have all the dependencies
needed to install Io and the installation was failing. The dependencies
are [yajl](https://github.com/lloyd/yajl) and
[libevent](http://libevent.org/)\
\
If you've got then installed, you can skip the next steps.\
\
**NOTE**: You will need to have cmake and make. You can install them
running the following commands from the terminal:\
sudo apt-get install cmake\
sudo apt-get install make\
\
**Installing yajl**\
\

Download yajl from
here: [https://github.com/lloyd/yajl/downloads](https://github.com/lloyd/yajl/downloads)

1.  In my case it was: lloyd-yajl-2.0.1-0-gf4b2b1a.zip

Extract it into a folder.

Open the terminal and go to the folder you extracted yajl

Run the following commands

1.  mkdir build
2.  cd build
3.  cmake ..
4.  sudo make install

\
For more information, please check:\
[https://github.com/lloyd/yajl](https://github.com/lloyd/yajl)\
[https://github.com/lloyd/yajl/blob/master/BUILDING](https://github.com/lloyd/yajl/blob/master/BUILDING)\
\
**Installing libevent**\
\

Download libevent from
here: [http://libevent.org/](http://libevent.org/)

1.  In my case it was: libevent-2.0.15-stable.tar.gz

Extract it into a folder

Open the terminal and go to the folder you extracted libevent

Run the following commands

1.  ./configure
2.  make
3.  sudo make install

\
For more information please check:\
[http://libevent.org/](http://libevent.org/)\
Also check the README file inside the .tar.gz for your version\
\
**Installing Io language**\
\
You can go to the [Io language website](http://iolanguage.com/) and
download the language or click
[here](http://github.com/stevedekorte/io/zipball/master) to go start
downloading it. As there is no Ubuntu package for that, you will be
downloading the Io's source code. This will point to [Steve Dekorte's
version](https://github.com/stevedekorte/io). I ended up downloading
[Jeremy Tregunna's version](https://github.com/jeremytregunna/io). It
should work the same. Check each one is the most up-to-date.\
\

Download the Io version
here: [https://github.com/jeremytregunna/io/zipball/master](https://github.com/jeremytregunna/io/zipball/master)

Extract it into a folder.

Open the terminal and go to the folder you extracted Io

Run the following commands:

1.  mkdir build
2.  cd build
3.  cmake ..
4.  sudo make install

\
**IMPORTANT**: When running 'cmake ..', you may get a few errors. Even
then, try to run 'sudo make install'. Some libraries may fail to compile
because they are OS specific.\
\
For mode information please check:\
[http://iolanguage.com/](http://iolanguage.com/)\
[https://github.com/stevedekorte/io](https://github.com/stevedekorte/io)\
[https://github.com/jeremytregunna/io](https://github.com/jeremytregunna/io)\
**\
**\
**Updating ld.so.conf**\
\
Now we just need to update ld.so.conf so Io can be accessed from
anywhere in your computer.\
\

1.  From the terminal, type the following command: sudo gedit
    /etc/ld.so.conf
2.  Add the following line to the file: include /usr/local/lib
3.  Save and close the file
4.  From the terminal run the following command: sudo ldconfig

\
**Running Io**\
\
That's it. Hopefully now you will be able to open a terminal window and
type: io\
You should see the Io runtime environment: Io\> \_
