---
layout: post
name: appropriate-rigour 
title: 'Clojure (Prismatic) Schemas are Swagger'
date: 2015-09-14 13:00:00 +01:00
author: Mashooq Badar
image:
    src: /assets/img/custom/blog/2015-09-14-swagger-clojure/swagger-clojure.jpg
tags:
- clojure
- swagger
- REST
---

Recently, I decided to include Swagger documentation to our time sheet application. Although Swagger provides tools to help clients integrate with your REST API the most powerful feature, in my opinion, is that it acts as "living documentation" for the API. Adding Swagger to my the application had a couple of pleasant side-effects:

Idiomatic Clojure encourages the use of data structures such as maps. This work really well because JSON to/from Clojure Map translation, and persistence becomes straight forward whether you are using the [org.clojure/java.jdbc](https://github.com/clojure/java.jdbc) or persisting to a document database such as MongoDB. However, The problem with this approach is that understanding your entities becomes difficult. You often need to resort to the DDL for this purpose and in case of some databases you may not even have that. In cases where you are using migrations - your DDL may be scattered across many migrations over time. The Swagger support provided by [metosin/compojure-api](https://github.com/metosin/compojure-api) uses [prismatic/schema](https://github.com/Prismatic/schema) to define your API. Here is an example of what Activity and a list of Activities looks like in my time sheet application:

```clojure 
(def Activity {
  :id s/Num
  :name s/Str
  :description s/Str
  :activitytype (s/enum "Daily" "Hourly") })

(def Activities [Activity])
```
Prismatic Schema provides other features such as attribute optionality, value optionality, custom schema types etc. See [README](https://github.com/Prismatic/schema) for more details. 

Now that I have a single place where I can go to fully understand how my entities/value-objects looks like. The same entities/value-objects are used in my route definitions to define the REST API.

```clojure
(GET* "/activity" []
  :return Activities
  :summary "All activities in the system"
  (ok (auth #(controller/get-activities))))

(PUT* "/activity" []
  :body [activity Activity]
  :summary "Update an activity"
  (ok (auth #(controller/update-activity activity))))
``` 

Here I am creating two routes for GET and PUT HTTP requests. In case of GET, I will return Activities and in case of PUT I expect an Activity in the body and return nothing. In both cases I return a HTTP OK code. The 'auth' call allows me to authenticate the user before the call to the controller is made. The Compojure API can generate the full Swagger UI, allowing client developers to explore and invoke the API (if they have the right access of course!).  

The generated Swagger UI looks like the following. 

![Generated Swagger Documentation]({{site.baseurl}}/assets/img/custom/blog/2015-09-14-swagger-clojure/swagger-doc.png)

The Compojure API validates every request/response against the model so that any violation of the API will result in a failure. This brings me to the second side-effect; you can validate the model against your tests! In my case I validate the model against my controllers:

```clojure
(defn ^:always-validate get-activities :- Activities []
  (model/get-activities))

(defn ^:always-validate update-activity [activity :- Activity]
  (model/update-activity activity))
```

Using the ```^:always-validate``` meta data will validate my tests against the model. In this case my functional tests are testing the system from controllers to the database allowing me to enforce the schema at build time.

Clojure is a dynamic language. One of its main criticisms is a lack of types. Although there is some good work in progress by the [Typed Clojure](http://typedclojure.org/) project, I think the Prismatic Schema library provides a very good compromise and the fact that it plays nicely with Swagger is an icing on the cake.
