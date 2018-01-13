---
layout: post
name: google-plus-sign-in-with-scalatra
title: Google+ Sign-In with Scalatra
date: 2014-07-10 15:35:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/custom/img/blog/scalatra_googleplus.png
tags:
- oauth
- google-plus
- scala
- scalatra
- jade
---

### The requirements

For one of our internal pet-projects at Codurance, we decided to have authentication and authorisation using [Google+ Sign-in](https://developers.google.com/+/). Google+ Sign-In is able to authenticate anyone with a Google email account (gmail or business) using OAuth 2.0. However, we wanted to restrict the application to Codurance craftsmen only, that means, people with a Codurance email address.

The application had also to redirect us to the desired URL, in case we tried to access a deep URL without being authenticated.

### Technology stack

In this project we are using:

* [Scala](http://www.scala-lang.org/)
* [Scalatra](http://www.scalatra.org/) as a web micro-framework
* [Jade](http://jade-lang.com/) as template engine
* [sbt](http://www.scala-sbt.org/) as our build tool.
* [json4s](https://github.com/json4s/json4s) for JSON manipulation
* [Newman](https://github.com/stackmob/newman) as HTTP client library

### Implementation

#### Authentication Filter

First we need to add an AuthenticationFilter to our Scalatra application.

{% highlight scala %}
import javax.servlet.ServletContext

import com.codurance.cerebro.controllers.MainController
import com.codurance.cerebro.security.AuthenticationFilter
import org.scalatra._

class ScalatraBootstrap extends LifeCycle {
    override def init(context: ServletContext) {
        context.mount(new AuthenticationFilter, "/*")
        context.mount(new MainController, "/*")
    }
}
{% endhighlight %}

Then, in the AuthenticationFilter, we need to redirect to the sign-in page when we don't have a user in the session. We also need to exclude the pages and URLs that don't need a user to be logged in.

{% highlight scala %}
package com.codurance.cerebro.security

import org.scalatra.ScalatraFilter

class AuthenticationFilter extends ScalatraFilter {
    before() {
        if (isProtectedUrl && userIsNotAuthenticated) {
            redirect("/signin?originalUri=" + originalURL)
        }
    }

    def originalURL(): String = {
        val url = Option(request.getRequestURI).getOrElse("/main")
        if (url.startsWith("/signin")) "/main" else url
    }

    def userIsNotAuthenticated: Boolean = {
        request.getSession.getAttribute("user") == null
    }

    def isProtectedUrl(): Boolean = {
        val url = request.getRequestURI();
        !(url.equals("/signin") || url.equals("/authorise") || url.equals("/not-authorised"))
    }

}
{% endhighlight %}

For more information about filters, check the [Scalatra](http://www.scalatra.org/) documentation.

#### signin.jade

Then we need a sign-in page, that is displayed when the user is not authenticated.

{% highlight jade %}
- attributes("title") = "Cerebro"
- attributes("layout") = "/WEB-INF/templates/layouts/no-header.jade"

-@ val originalUri: String

h1 Welcome to Cerebro!

p= "Please sigin in using google id!"
p URI: #{originalUri}

:!javascript
    function onSignInCallback(authResult) {
        if (authResult['access_token']) {
            $.ajax({
                type: 'POST',
                url: '/authorise',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                data: {authCode: authResult.code },
                success: function(result) {
                    window.location.replace('#{originalUri}');
                },
                error: function(result) {
                    window.location.replace('/not-authorised');
                }
            });
        }
    }

#gConnect
    button(class='g-signin'
    data-scope='https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
    data-requestvisibleactions='http://schemas.google.com/AddActivity'
    data-clientId='<<YOUR_CLIENT_ID>>'
    data-accesstype='offline' data-callback='onSignInCallback'
    data-theme='dark'
    data-cookiepolicy='single_host_origin')

script(src='https://plus.google.com/js/client:plusone.js')
script(src='//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js')


{% endhighlight %}

If you are not using Jade or want more details, check the [official documentation](https://developers.google.com/+/web/signin/add-button) about how to [add the sign-in button](https://developers.google.com/+/web/signin/add-button) to your page.

This should be enough to trigger the Google authentication form when clicking on the Sign-In button. Once the authentication is done, the callback function will send us a POST with the "authCode".

#### Main Controller

We then need a controller that will respond to all these requests, displays the respective pages, and do the authorisation.

{% highlight scala %}
package com.codurance.cerebro.controllers

import javax.servlet.http.{HttpServletResponse, HttpServletRequest}

class BaseController extends CerebroStack {

    def display(page: String, attributes: (String, Any)*)(implicit request: HttpServletRequest, response: HttpServletResponse): String = {
        contentType = "text/html"
        val all_attributes = attributes :+ ("user", session.getAttribute("user"))
        jade(page, all_attributes: _*)
    }

}
{% endhighlight %}

{% highlight scala %}
package com.codurance.cerebro.controllers

import com.codurance.cerebro.security.CoduranceAuthorisation.authorise

import scala.Predef._

class MainController extends BaseController {

    get("/") {
        display("main")
    }

    get("/main") {
        display("main")
    }

    get("/signin") {
        display("signin", "originalUri" -> request.getParameter("originalUri"))
    }

    get("/not-authorised") {
        display("not-authorised")
    }

    post("/authorise") {
        val authCode: String = params.getOrElse("authCode", halt(400))
        authorise(authCode)
    }

}
{% endhighlight %}

The MainController responds to "/authorise", which invokes the authorisation function defined inside CoduranceAuthorisation. Note that we receive the "authCode" from the Google+ authentication. Once the user was authenticated, we had to make the application available just for users using a Codurance email. For that, we had to invoke the [Google+ People API](https://developers.google.com/+/api/latest/people) to get more information (email address, domain, etc).

The authorise function would then check if the user belongs to the Codurance domain and add her to the session.

{% highlight scala %}
package com.codurance.cerebro.security

import java.net.URL
import javax.servlet.http.{HttpSession, HttpServletResponse, HttpServletRequest}
import javax.servlet.http.HttpServletResponse._

import com.google.api.client.googleapis.auth.oauth2.{GoogleAuthorizationCodeTokenRequest, GoogleTokenResponse}
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson.JacksonFactory
import com.stackmob.newman._
import com.stackmob.newman.dsl._

import scala.concurrent.Await
import scala.concurrent.duration._

object CoduranceAuthorisation {

    implicit val httpClient = new ApacheHttpClient

    val GOOGLE_PLUS_PEOPLE_URL = "https://www.googleapis.com/plus/v1/people/me?fields=aboutMe%2Ccover%2FcoverPhoto%2CdisplayName%2Cdomain%2Cemails%2Clanguage%2Cname&access_token="
    val CLIENT_ID: String = "<<YOUR_CLIENT_ID>>"
    val CLIENT_SECRET = "<<YOUR_CLIENT_SECRET>>"
    val API_KEY = "<<YOUR_API_KEY>>"
    val APPLICATION_NAME = "<<YOUR_APP_NAME>>"
    val JSON_FACTORY = new JacksonFactory()
    val TRANSPORT = new NetHttpTransport()

    def authorise(authCode: String)(implicit session: HttpSession, response: HttpServletResponse): Unit = {
        val user = userFor(authCode)
        user.domain match {
            case Some(Domain("codurance.com")) => {
                session.setAttribute("user", user)
                response.setStatus(SC_OK)
            }
            case _ => response.setStatus(SC_UNAUTHORIZED)
        }
    }

    def userFor(authCode: String): User = {
        val tokenResponse: GoogleTokenResponse =
            new GoogleAuthorizationCodeTokenRequest(
                TRANSPORT, JSON_FACTORY, CLIENT_ID, CLIENT_SECRET, authCode, "postmessage"
            ).execute
        val url = new URL(GOOGLE_PLUS_PEOPLE_URL + tokenResponse.getAccessToken)
        val userInfo = Await.result(GET(url).apply, 10.seconds)
        GooglePlusJSONResponseParser.toUser(userInfo.bodyString, tokenResponse.toString)
    }

}
{% endhighlight %}

__Note__ that in the GOOGLE_PLUS_PEOPLE_URL we specify all the fields we are interested in, including the _domain_ and _emails_.

__GooglePlusJSONResponseParser__ is a class that we created to parse the JSON response and convert into a User object. We are not showing it in order to keep this post short and focused. You can create your own JSON parser. :)

__IMPORTANT:__ Don't forget to import add the Google+ APIs to your sbt build file.

{% highlight scala %}
    "com.google.apis" % "google-api-services-oauth2" % "v2-rev59-1.17.0-rc",
    "com.google.apis" % "google-api-services-plus" % "v1-rev115-1.17.0-rc",
{% endhighlight %}

That's about it. You now can display the name of the user on all your pages, using a default layout.

{% highlight scala %}

-@ val title: String
-@ val headline: String = title
-@ val body: String
-@ val user: com.codurance.cerebro.security.User

!!!
html
    head
        title= title
    body
        header
            div
                span Hello #{user.name.displayName}
        div
            h1= headline
            != body
{% endhighlight %}
