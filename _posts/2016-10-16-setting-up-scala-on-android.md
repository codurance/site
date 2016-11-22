---
layout: post
asset-type: post
name: setting-up-scala-on-android
title: Setting up Scala on Android
date: 2016-10-16 00:20:00 +00:00
author: Sergio Rodrigo Royo
canonical:
    name: my personal blog
    href: http://srodrigo.me/setting-up-scala-on-android/
image:
    src: /assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/post-image.png
tags:
- android
- scala

---

Scala can be used to build Android applications, as an alternative to Java or Kotlin. Unlike them, setting up an Android project in Scala with SBT is not straightforward, and can give us some headaches to get it right. To show how this can be done, we are going to create new project template using the Android SDK Plugin for SBT.

##Required tools
In order to develop Android apps in Scala, you need a minimum set of tools: [SBT](http://www.scala-sbt.org/) and [Android SDK](https://developer.android.com/studio/index.html).

###Install SBT
You can install SBT on Mac OSX using [Homebrew](http://brew.sh/).

```bash
$ brew install sbt
```

To install SBT on other operating systems, you can follow the [instructions](http://www.scala-sbt.org/0.13/docs/Setup.html) on the official documentation.

###Install the Android SDK
You can just download the latest version of the Android SDK from the [Developer website](https://developer.android.com/studio/index.html) and follow the installation instructions.
Alternatively, you can install [Android Studio](https://developer.android.com/studio/index.html), which comes with the Android SDK and emulators.

###Set the ANDROID_HOME environment variable
On Mac OSX/Linux, you can just export the variable

```bash
$ export ANDROID_HOME=path_to_your_android_sdk
```

or add it to your `bash_rc` or `bash_profile`.

NOTE: On Mac OSX, if Android Studio is installed, the Android SDK is usually located at `/Users/your_user_name/Library/Android/sdk/`

##Add SBT plugin
The easiest way to install the Android SDK Plugin for SBT is to do it globally. For this, you'll need to create a file in the SBT plugins folder:

```bash
~/.sbt/0.13/plugins/android.sbt
```

and add the following line:

```bash
addSbtPlugin("org.scala-android" % "sbt-android" % "1.7.0")
```

##Create the Android project
Let's create a folder for our Android project:

```bash
$ mkdir my-project
$ cd my-project
```

Now, we are going to use the SBT plugin to create a template project. First, run SBT:

```bash
$ sbt
```

Then, use the plugin to create the project.

```bash
> gen-android <package_name> <project_name>
```

For example:

```bash
> gen-android com.codurance scala_on_android
```

The project structure created looks like this:

```text
my-project/
|-- project/
|   |-- android.sbt
|   |-- build.properties
|-- src/
|   |-- androidTest/
|       |-- java/
|           |-- com/
|               |-- codurance/
|                   |-- Junit3MainActivityTest.java
|                   |-- Junit4MainActivityTest.java
|   |-- main/
|       |-- res/
|           // Android resorces folders
|       |-- scala/
|           |-- com/
|               |-- codurance/
|                   |-- MainActivity.scala
|       |-- AndroidManifest.xml
|-- build.sbt
|-- lint.xml
```

The SBT plugin creates a project structure with the minimum files needed to run an Android project, plus a setup for running instrumentation tests. Notice that the test classes generated are in Java, and the `MainActivity` is in Scala.

The most interesting file is `build.sbt`. I've added some comments to explain what's the purpose of each line.

```java
// Version of the Scala runtime
scalaVersion := "2.11.8"

// Use the Android plugin
enablePlugins(AndroidApp)
// Add support for vector drawables
useSupportVectors

// Android version code (Same as versionCode on Gradle projects)
versionCode := Some(1)
// Android version name (Same as versionName on Gradle projects)
version := "0.1-SNAPSHOT"

// Instrumentation tests runner (Same as testInstrumentationRunner on Gradle projects)
instrumentTestRunner :=
  "android.support.test.runner.AndroidJUnitRunner"

// Android platform target (Same as targetSdkVersion on Gradle projects)
platformTarget := "android-24"

// Java compile options
javacOptions in Compile ++= "-source" :: "1.7" :: "-target" :: "1.7" :: Nil

// Libraries
libraryDependencies ++=
  "com.android.support" % "appcompat-v7" % "24.0.0" ::
  "com.android.support.test" % "runner" % "0.5" % "androidTest" ::
  "com.android.support.test.espresso" % "espresso-core" % "2.2.2" % "androidTest" ::
  Nil
```

We don't even need to use the SBT plugin to generate this template. If we prefer to craft our own minimum project, we could just create the project structure for SBT and Android manually, and add only the setup that we need.

##Run the project
You will need to have an [connected Android device](https://developer.android.com/studio/run/device.html) or an [running emulator](https://developer.android.com/studio/run/emulator.html).

Once this is done, the final step is to run the application from sbt:

```bash
> android:run
```

You can also run it from the terminal, instead of from SBT:

```bash
$ sbt android:run
```

##More options on build.sbt
There are other interesting options that can be included in the `build.sbt` file. A few of them are:

```java
// Application name
name := "scala_on_android"
```

```java
// Min Android SDK version supported
minSdkVersion := "15"
```

```java
// Override 'android:run', to use just 'run' instead
run <<= run in Android
```

##Integration with Android Studio
From this point, you could develop your Android apps in Scala using a text editor and sbt. But it would be good to be able to use the official IDE, which offers a lot of useful tools. It's also possible to use IntelliJ, but I won't go into this detail in this post.

Before we start, we'll need to install both the [Scala](https://plugins.jetbrains.com/plugin/1347) and [SBT plugins](https://plugins.jetbrains.com/plugin/5007) for Android Studio.

To import our project, open Android Studio and select `Import project (Eclipse, ADT, Gradle, etc.)`.

Select `Import project from external module`, and `SBT`:

<img src="/assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/scala-on-android_import-sbt.png" alt="Import project" class="img-responsive"/>

Select your Android SDK on the Project SDK option, and check `Sources`, `Javadocs` and `Sources for SBT and plugins`:

<img src="/assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/scala-on-android_import-sdk.png" alt="Import project" class="img-responsive"/>

On `Project Settings`/`Modules` select the project module and click on `+`, and Add `Android` under the `Framework` section. On the Structure tab, replace all `/.idea/modules` paths with `/src/main`:

<img src="/assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/scala-on-android_proj-structure-module.png" alt="Project structure" class="img-responsive"/>

Now that the project is set up, we can try to run it. Create a new Run/Debug Configuration. Select `Android App` and give it a name (e.g. `app`).

On the `General` tab, select the Module. We also need to configure how to run the app with SBT. On the `Before launch` section, remove the default `Gradle-aware Make` task clicking on `-`:

<img src="/assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/scala-on-android_run-debug-config.png" alt="Run/Debug configuration" class="img-responsive"/>

Finally, click on `+`, create a new `SBT` task, and add `android:run`. Leave the `Run in current module` option checked:

<img src="/assets/img/custom/blog/2016-10-16_setting-up-scala-on-android/scala-on-android_run-before-launch-sbt-android-run.png" alt="Before launch SBT android run" class="img-responsive"/>

From now, you can run the application in the same way as any app written in Java or Kotlin.

##Conclusion
Kotlin still looks like a better fit for Android: Among other benefits, it has an easier setup, better IDE support and smaller runtime. However, the possibility of using Scala and SBT can allow developers who build their backends in Scala or want to use high level Functional Programming features to build complex apps.
