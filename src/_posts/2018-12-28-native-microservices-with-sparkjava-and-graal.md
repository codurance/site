---
layout: post
asset-type: post
name: native-microservices-with-sparkjava-and-graal
title: Native microservices with SparkJava and Graal
date: 2018-12-28 10:20:00 +00:00
author: John Hearn
description: Using SparkJava and Graal to compile microservices to native binaries.
image: 
    src: /assets/custom/img/blog/graalvm-banner.png
tags: 
- microservices
- graalvm
- java
- kotlin
- clojure

---

Microservices written with [SparkJava] are just plain Java code using a standard Java library. No annotation magic, just code. The advantage of this simple style of programming is that it is, well, simple. It's so simple that **the [Graal] native compiler just compiles it without blinking**, something which is currently very difficult with more complex frameworks like Spring, for example. 

The SparkJava/Graal combination is interesting in its own right and people's experiences with it are [beginning](https://royvanrijn.com/blog/2018/09/part-2-native-microservice-in-graalvm/) to [appear](https://zeringue.io/post/graalvm-gradle-docker/). Furthermore as a Java library it should be possible to use it from other JVM based languages and I was wondering how Graal would cope with that. In fact it turned out to be straightforward and in this post we'll see how easy it is to build **native microservice binaries for Java, Kotlin and even Clojure**.

# Getting started

If you haven't come across Graal before I suggest you head over to their [website](https://www.graalvm.org/) and take a look at what it offers. Here we are using the native compilation feature but in reality that's just scratching the surface. 

To use Graal first you'll need to install the latest version of the Graal SDK. As of writing this is `1.0.0-rc9`. I did it using [SdkMan]:

```
sdk install java 1.0.0-rc9-graal
```
And from then on

```
sdk use java 1.0.0-rc9-graal
```

Then create a basic Gradle project and add the minimum dependencies:

```groovy
dependencies {
    compile "com.sparkjava:spark-core:2.7.2"
    compile "org.slf4j:slf4j-simple:1.7.13"
}
```

(I'll assume you are already familiar with Gradle, if you prefer you can [do it with Maven](http://john-hearn.info/articles/native-sparkjava-graal). Note that it's important the Slf4j implementation you choose matches the version required by SparkJava.)

With SparkJava a microservice endpoint is essentially a binding, or `route` between a path and a callback in the form of a lambda expression. This is the standard "hello world" example we'll be using as a base. Real world services would, of course, make use of the request and response objects. See the [documentation](http://sparkjava.com/documentation#getting-started) for more detailed information.

```java
import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        get("/sayHello", (req, res) -> "Hello world!");
    }
}
```

To run it as a command line program it's convenient to copy all the dependencies together into the same directory. We can also do that with Gradle.

```groovy
task copyDependencies(type: Copy) {
    from configurations.default
    into 'build/libs'
    shouldRunAfter jar
}

assemble.dependsOn copyDependencies
```

Build the service and run it to check it works.

```
> ./gradlew clean assemble
```
```
> java -cp "build/libs/*" HelloWorld
...
[Thread-0] INFO org.eclipse.jetty.server.Server - Started @363ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

Let's compile it to a native binary using Graal. The command is thankfully very similar to the `java` command:

```
> native-image -cp "build/libs/*" HelloWorld
...
Build on Server(pid: 31197, port: 52737)*
[helloworld:31197]    classlist:   2,142.65 ms
[helloworld:31197]        (cap):   2,154.21 ms
...
...
[helloworld:31197]        write:     443.13 ms
[helloworld:31197]      [total]:  56,525.52 ms
```

Now we should have our native binary in the current directory. Let's run it:

```
> ./helloworld
...
[Thread-2] INFO org.eclipse.jetty.server.Server - Started @2ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

The executable is 14Mb but look at that start time, **2ms**, basically instantaneous! Memorywise, it wouldn't be wise to pay too much attention to `top` but it is clear that removing the JVM from the runtime has its advantages. This is especially important in microservices systems where a large number of independent processes are deployed.

# How about Kotlin?

[Kotlin] is a JVM language that is picking up momentum and not without reason. Its mix of functional style and OO features, seamless Java interoperability and terse syntax make it a good language for general use and obvious replacement for Java. To build our service with Kotlin first we to add the Kotlin library dependency to Gradle (as of writing the version is v1.3.10).

```groovy
dependencies {
...
    compile "org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.3.10"
}
```

And to use the Kotlin compiler plugin.

```groovy
plugins {
    id 'org.jetbrains.kotlin.jvm' version '1.3.10'
}
```

With Kotlin our absurdly simple microservice becomes even simpler.

```kotlin
import spark.Spark.*

fun main(args: Array<String>) {
    get("/sayHello") { req, res -> "Hello World!" }
}
```

Build the service and run it to check it works.

```
> ./gradlew clean assemble
```
```
> java -cp "build/libs/*" HelloWorldKt
...
[Thread-0] INFO org.eclipse.jetty.server.Server - Started @363ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

Let's compile it natively. Because it *is* Java, the command is nearly identical to the Java version (the Kotlin compiler automatically adds the Kt suffix to generated classes).

```
> native-image -cp "build/libs/*" HelloWorldKt
Build on Server(pid: 53242, port: 51191)
[helloworldkt:53242]    classlist:     783.03 ms
[helloworldkt:53242]        (cap):   2,139.45 ms
...
[helloworldkt:53242]        write:     591.88 ms
[helloworldkt:53242]      [total]:  53,074.15 ms
```

And run it:

```
> ./helloworldkt
...
[Thread-2] INFO org.eclipse.jetty.server.Server - Started @2ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

The executable is nearly identical in size and start-up speed to the Java version, as would be expected since it's essentially the same code.

This is a basic example but the combination of *Kotlin* for **implementation simplicity**, *SparkJava* for **microservice simplicity** and *Graal* for **deployment simplicity** is a very attractive proposition for microservice development. 

Nonetheless, apart from a nicer syntax, Kotlin is very similar to Java. There are other JVM languages which we can use which might push Graal further.

# The need for Clojure

Using Clojure to build microservices is an interesting idea. Services are naturally functional in nature, in fact a service *is* a function and the dynamic nature of the language might make it ideal for some data-centric situations.

Rather than using Gradle, we'll start with a new [Leiningen] project:

```
lein new hello-clojure
```

The dependencies go in the main `project.clj` file as well as the name of the main class that we'll run to start the server. 

```clojure
  :dependencies [[org.clojure/clojure "1.9.0"]
                 [com.sparkjava/spark-core "2.7.2"]
                 [org.slf4j/slf4j-simple "1.7.13"]]
  :main hello_clojure.core)
```

Clojure is interoperable with Java but not to the same extent that Kotlin is. To overcome the differences I wrote a couple of adapters to allow idiomatic clojure code to use SparkJava's classes.

```clojure
(ns hello_clojure.core
  (:gen-class)
  (:import (spark Spark Response Request Route)))

(defn route [handler]
  (reify Route
    (handle [_ ^Request request ^Response response]
      (handler request response))))

(defn get [endpoint routefn]
  (Spark/get endpoint (route routefn)))
```

(I later found a nice [article](https://lispchronicles.com/shortn.html) with a complete service using Clojure and SparkJava. Their adapters were slightly better than mine so I've incorporated some ideas from that article in what follows.)

Then we're ready to create the controller which we do from the main method so that it's easy to invoke from the command line. Note also that in the above we used the `gen-class` directive to ensure the main class is specified in the Manifest:

```clojure
(defn -main []
  (get "/sayHello" (fn [req resp] "Hello World!!")))
```

To simplify the generation of the service we can build a self-contained jar using Leiningen. 

```
> lein clean && lein uberjar
```

As before, we first check that the service works as normal Java:

```
$ java -cp target/hello-clojure-0.1.0-SNAPSHOT-standalone.jar hello_clojure.core
...
[Thread-0] INFO org.eclipse.jetty.server.Server - Started @1033ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

Compiling to a native image is as simple as the previous examples with Java and Kotlin.

```
> native-image -cp target/hello-clojure-0.1.0-SNAPSHOT-standalone.jar hello_clojure.core
Build on Server(pid: 35646, port: 53994)*
[hello_clojure.core:35646]    classlist:   2,704.82 ms
[hello_clojure.core:35646]        (cap):     909.58 ms
...
[hello_clojure.core:35646]        write:     647.23 ms
[hello_clojure.core:35646]      [total]:  54,900.61 ms
```

And run it:

```
> ./helloworld_clojure
...
[Thread-2] INFO org.eclipse.jetty.server.Server - Started @2ms
```
```
> curl localhost:4567/sayHello
Hello World!
```

Once again the native binary is roughly 15M and again the start-up time is almost instantaneous. 

## Conclusion

This use of Graal with other JVM based languages is a very attractive proposition and worth more investigation, however I do have some concerns about production use. Mainly if something were to go wrong there is very little information in the public domain to help you out, and still less outside of pure Java. On the other hand these are all open source projects so nothing is hidden :)

Another limitation is that many libraries simply don't work with Graal. This is not altogether negative because it will encourage us to go back to simple coding practices however you may have a dependency which you can't change and this could cause major hassle. I think the main drawback initially will be reflection driven mapping, whether of the serialisation or ORM varieties. Quite a lot of effort is already being done to make many libraries and [frameworks](https://github.com/micronaut-projects/micronaut-core/issues/329) [compatible](https://jira.spring.io/browse/SPR-16991) with Graal but it's still early days.

A third, primarily practical, consideration is the extremely slow compilation of the native image. Even this very simple example takes almost a minute to build. Of course you could do development compiling only to bytecode but then compatibility problems could slip through. A continuous build pipeline and comprehensive tests would be a way to mitigate this risk.

Obviously there is a lot more to do to make this a fully functional service, and appropriate considerations to be made before moving to production use, but if we choose to keep using simple code then problems will be minimised.

[SparkJava]: http://sparkjava.com/
[SdkMan]: https://sdkman.io/
[Graal]: https://www.graalvm.org/
[Kotlin]: https://kotlinlang.org/
[Leiningen]: https://leiningen.org/