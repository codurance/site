---
author: Mashooq Badar
comments: true
date: 2010-01-06 17:43:37+00:00
layout: post
slug: creating-and-using-a-maven-archetype
title: Creating and using a maven archetype
image:
    src: /assets/img/defaultBlogImg.png
wordpress_id: 25
categories:
- development
tags:
- maven
---

The best way to create a maven archetype is to start with an existing project. In the maven project (simple or multiple-module) directory execute:

{% highlight xml %}
    mvn archetype:create-from-project
{% endhighlight %}




The archetype is created under `target/generated-sources/archetypes` with the following directory structure:

<pre>
<code>
    +---src
        +---main
            +---resources
                +---archetype-resources
                ¦   +---src
                ¦       +---main
                ¦           +---java (directory containing your java sources)
                ¦           +---resources (directory containing your non-java sources)
                ¦           +---webapp
                ¦               +---META-INF
                ¦               +---WEB-INF
                ¦                   +---jsp
                ¦
                +---META-INF
                    +---maven (directory containing archetype-metadata.xml)
</code>
</pre>




The archetype-metadata.xml can used used to further tune the archetype. This file describes filesets of the following format:

{% highlight xml %}
    <fileSets>
      <fileSet filtered="true" packaged="true" encoding="UTF-8">
        <directory>src/main/java</directory>
        <includes>
          <include>**/*.xml</include>
          <include>**/*.java</include>
        </includes>
      </fileSet>
    </fileSets>
{% endhighlight %}

If the `filtered` property is set to true then all `${reference}` are resolved. The built-in references are: `groupId,version,artifactId,rootArtifactId,package ...`. If `packaged` is set to true then a directory tree representing the package is created before the resources are copied. Remember these are Velocity templates so you should  be able to use Velocity control statements (note: I've not tried these yet)

Once you are happy with the archetype you can execute `mvn install` to install the archetype. This archetype should now appear in the list when you execute `mvn archetype:generate`. You can release the archetype if you have your own remote repository. You will however need to create a achetype-catalog.xml if you want other users to use this archetype from your own remote repository. The archetype-catalog.xml file should look like the following:

{% highlight xml %}
    <?xml version="1.0" encoding="UTF-8"?>
    <archetype-catalog>
      <archetypes>
        <archetype>
          <groupId>my.group</groupId>
          <artifactId>an-archetype</artifactId>
          <version>0.0.1</version>
          <description>my example archetype</description>
          <repository>http://repository-host/nexus/content/repositories/releases</repository>
        </archetype>
      </archetypes>
    </archetype-catalog>
{% endhighlight %}



You can then use this archetype to create a project using the following command:



    mvn archetype:generate -DarchetypeCatalog=http://<uri-path>/archetype-catalog.xml

