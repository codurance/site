---
layout: post
name: changing-scalatra-and-sbt-default-directories
title: Changing Scalatra and sbt default directories 
date: 2015-11-22 23:54:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/2015-11-21-folders-small.jpg
tags:
- scalatra
- scala
- sbt
- craftsmanship
- design
- domain driven design
- DDD
---

Conventions are not always good. I recently started a new internal web project
at Codurance and I decided to use Scala. As I'm not a fan of big
frameworks, I chose [Scalatra](http://www.scalatra.org/) as a micro web framework. 

The first challenge was that I wanted to organise my application with a
different directory structure. By default, [sbt](http://www.scala-sbt.org/) and Scalatra use the same convention used by [maven](https://maven.apache.org/):

	> /src/main/scala       // source code
	> /src/main/resources   // production resources
	> /scr/test/scala       // tests
	> /scr/test/resouces    // test resources

For the past few years I've been experimenting with different directory structure for my projects. I want my directories to be more meaninful when it comes to explain the business domain. The new directory structure is part of what I call _Interaction Driven Design (IDD)_ and a full talk on it can be found in our [videos area](http://codurance.com/videos/). I give a lot of details about the rational behind the new directory structure on that talk. 

The directory structure I would like to use for this new project is:

	> /src/core/scala          // source code for my core domain
	> /src/core-test/scala     // tests for my core domain

	> /src/data/resources      // resources for data migration and test data
	> /src/data/scala          // code for data migration and test data

	> /src/web/resources       // delivery mechanism resources
	> /src/web/scala           // delivery mechanism code (controllers, API, etc)
	> /src/web/webapp          // web files (WEB-INF folder, css, javascript, Jade templates, etc)
	> /src/web-test/scala      // tests for my delivery mechanism

Once again, the directory structure above will make more sense if you watch the [Interaction Driven Design (IDD) talk](http://codurance.com/videos/).

The biggest challenge was to rename the default directory _main_ to _web_. That broke the whole world. Here are the changes I had to make to fix it all: 

**build.sbt**

```scala
unmanagedSourceDirectories in Compile := Seq((baseDirectory.value / "src/core/scala"),
											 (baseDirectory.value / "src/data/scala"),
											 (baseDirectory.value / "src/web/scala"))

unmanagedResourceDirectories in Compile += baseDirectory.value / "src/data/resources"

unmanagedSourceDirectories in Test := Seq((baseDirectory.value / "src/core-test/scala"),
										  (baseDirectory.value / "src/web-test/scala"))

webappSrc in webapp <<= (baseDirectory in Compile) map { _ / "src/web/webapp" }

webappDest in webapp <<= (baseDirectory in Compile) map { _ / "src/web/webapp" }
```

The last two lines _webappSrc_ and _webappDest_ were needed because I also use a class that starts [Jetty](http://www.eclipse.org/jetty/) by hand where I hook the Scalatra listener. 

**JettyLauncher.scala**

```scala
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.webapp.WebAppContext
import org.scalatra.servlet.ScalatraListener

object JettyLauncher {

	def main(args: Array[String]) {
		val port = if(System.getenv("PORT") != null) System.getenv("PORT").toInt else 8089

		val server = new Server(port)
		val context = new WebAppContext()
		context.setClassLoader(JettyLauncher.getClass.getClassLoader)
		context setContextPath "/"
		context.setResourceBase("src/web/webapp")
		context.addEventListener(new ScalatraListener)
		context.addServlet(classOf[DefaultServlet], "/")

		server.setHandler(context)

		server.start
		server.join
	}
}
```  

When executing this class, the _ScalatraBootstrap_ could not be found and that's why I had to add the following line to my _JettyLauncher_:

	> context.setClassLoader(JettyLauncher.getClass.getClassLoader)

Scalatra relies on the default directory _main_ to find _ScalatraBootstrap_ and this is how I managed to make sure the _ScalatraBootstrap_ could be found.

Note that I also had to change the resource base, pointing to the _web_ folder instead of _main_:

	> context.setResourceBase("src/web/webapp")

As I use [Jade](http://scalate.github.io/scalate/documentation/jade.html) templates via [Scalate](http://scalate.github.io/scalate/), I had to change the Scalate template configuration on **build.scala**.

**build.scala**

```scala
object MonitorBuild extends Build {
	val Organization = "com.codurance"
	val Name = "monitor"
	val Version = "0.1.0-SNAPSHOT"
	val ScalaVersion = "2.11.6"
	val ScalatraVersion = "2.4.0.RC1"

	lazy val project = Project(
		"monitor",
		file("."),
		settings = ScalatraPlugin.scalatraSettings ++ scalateSettings ++ Seq(

			// dependencies and some other stuff here

			scalateTemplateConfig in Compile <<= (sourceDirectory in Compile) { base =>
				Seq(
					TemplateConfig(
						new RichFile(new File("src")) / "web" / "webapp" / "WEB-INF" / "templates",
						Seq.empty, 
						Seq(
							Binding("context", "_root_.org.scalatra.scalate.ScalatraRenderContext", importMembers = true, isImplicit = true)
						), 
						Some("templates")
					)
				)
			}
		)
	)
}
```

The important line above is:

	> new RichFile(new File("src")) / "web" / "webapp" / "WEB-INF" / "templates"

Which makes Scalate find the templates in the _web_ directory instead of _main_.

Make sure you have these lines in the **plugins.sbt**

	> addSbtPlugin("com.mojolly.scalate" % "xsbt-scalate-generator" % "0.5.0")
	>
	> addSbtPlugin("org.scalatra.sbt" % "scalatra-sbt" % "0.4.0")

I didn't need to change anything on my **web.xml** and **ScalatraBootstrap**.

The configuration described above allows me to run the application via 

	> ./sbt container:start

that is how I normally run the application locally and also allows me to create a fat jar file and execute the _JettyLauncher_ class that is how I run in production:

	> java -cp <myapplication>.jar com.codurance.JettyLauncher

The fat jar file is created via:

	> ./sbt assembly	

This is how the collapsed directory structure looks on [IntelliJ IDEA](https://www.jetbrains.com/idea/):

<img src="/assets/img/custom/blog/2015-11-21-folder-structure-collapsed.jpg" style="max-height: 98px"/>

and this is how it looks when expanded:

<img src="/assets/img/custom/blog/2015-11-21-folder-structure-expanded.jpg" style="max-height: 500px;"/>

Although it took me a while to figure all this out, I'm happy to be able to structure my project the way it makes sense to us.
