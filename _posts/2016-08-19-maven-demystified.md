---
layout: post
asset-type: post
name: Maven-demystified 
title: 'Maven demystified' 
date: 2016-08-19 10:00:00 +00:00
author: Carlos Morera de la Chica
image:
    src: /assets/img/custom/blog/maven/maven-logo.png
    attribution:
      text: Maven 
      href: https://maven.apache.org/
 
tags:
- build system
- automation

---

Due to my Android development background, I am more used to [Gradle](https://gradle.org/) than to [Maven](https://maven.apache.org/). Although I knew that Gradle was based on Maven, I had never investigated what was going on behind the scenes. During the last week, I have been trying to understand the details and find out what are the different Maven's components.

## What is Maven

> Maven is a build and dependencies management system used primarily for Java projects. 

Key features include:

* Create new projects through [archetypes](#archetype_plugin).
* Project configuration in [POM file](#pom) and [Settings file](#settings)
* Project building using [lifecycles](#lifecycles), [phases](#phases), [plugins](#plugins), [goals](#goals) and [build profiles](#profiles). 
* Dependency management through [repositories](#repositories)
* Deployment with the [release plugin](#release_plugin).

## <a name="pom"></a> The Project Object Model

The [Project Object Model](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html) or POM is the fundamental unit of work in Maven. It is an XML file, usually defined in the project root directory, that contains information about the **project** and the **configuration** used by Maven to build the project.

The configuration that can be included in the POM file is as follows:

* Plugins and goals
* Dependencies
* Repositories
* Build profiles
* Project metadata such as version, description, developers, etc.

To facilitate a default configuration for all project, Maven provides what is known as the [Super POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM). The Super POM is Maven's default POM. All POMs extend the Super Pom thus inheriting the configuration specified in the Super POM.

## <a name="settings"></a> The Settings File

As mentioned above, the POM file contains the project configuration, whilst the [Settings file](https://maven.apache.org/settings.html) contains the user specific configuration. There can be two settings files, the Global settings file, situated in the Maven install directory, and the user's settings file that is situated in the user's home directory.

The settings file can provide the following configuration:

* [Simple values](https://maven.apache.org/settings.html)  
* [Plugin groups](https://maven.apache.org/settings.html#Plugin_Groups)
* [Server credentials](https://maven.apache.org/settings.html#Servers)
* [Proxies](https://maven.apache.org/settings.html#Proxies)
* [Profiles](https://maven.apache.org/settings.html#Profiles)

## <a name="lifecycles"></a> Build Lifecycles

Maven build process is based on [lifecycles](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html). The lifecycle provides a clearly defined process for building and distributing project artifacts.

There are three different lifecycles in Maven.

* Default: Handles project building and deployment. 
* Clean: Handles project cleaning.
* Site: Handles project's site docs.

### <a name="phases"></a> Phases

Each lifecycle is defined by a series of stages named [build phases](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Lifecycle_Reference). A build phase is responsible for a specific step in the lifecycle, but the way it carries out its duty depend on the plugin goals bound to the phase.

### <a name="plugins"></a> Plugins

[Plugins](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Plugins) are artifacts that provide goals for the build phases. Dividing the phases into goals, provided by plugins, make the build process really flexible and customizable.

A plugin can provide one or more goals. Each goal represents a capability of that plugin.

For example, Maven only supports a single source and test directories for a project. If we decided to add additional directories to the project, we could use a plugin that provides goals to [add source and test directories](http://www.mojohaus.org/build-helper-maven-plugin/usage.html) to the build process.

### <a name="goals"></a> Goals

Goals are responsible for executing specific tasks during each phase.

Some phases have default goals. For the default lifecycle, default goals are provided by the [packaging option](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Built-in_Lifecycle_Bindings), defined in the project's POM file. 

In addition to the default goals, extra goals can be defined by configuring plugins in the project's POM file. Therefore, a particular build phase can be composed of multiple goals. If a phase does not have any goals, it won't be executed as part of the lifecycle.

<p align="center" >
<img src="/assets/img/custom/blog/maven/maven-lifecycle.png" alt="Build lifecycle"/>
</p>

## Standalone Plugins

Most of the plugins provide goals that are bound to build phases. However, there are some plugins that provide goals which are meant to be executed separately, not as part of the build lifecycle.

### <a name="archetype_plugin"></a> The Archetype Plugin

If you happen to be an IntelliJ user, you may have seen that when creating a new Maven project the first option is a list of archetypes. Have you ever wonder what is it for? I have to say that I did not until I found what archetypes are by digging into Maven features.

An archetype is simply an existing project template. The [Archetype plugin](http://maven.apache.org/archetype/maven-archetype-plugin/) provides Maven project templates. It creates the project structure and POM file based on standard templates. The process of creating a new project is done in an interactive way by just providing project specific configuration such as groupid, artifact name, etc.

It helps to apply project or organisation's best practices. New users can have, in seconds, a working project to use as a walking skeleton. 

The plugin has additive support, meaning that can be used to add pieces to existing projects, i.e. Maven site archetype can quickly create a documentation site for the project.

Users can create their own archertypes in their organisation's repository and use them as a base for new projects.

Being a standalone plugin, the archetype plugin provides goals that are not bound to any lifecycle. The goals are executed directly, as opposed to what is done when using the lifecycle, where goals are executed as part of the lifecycle phases.

### <a name="release_plugin"></a> Release Plugin

Provide a standard mechanism to release project artifacts.

The [Release plugin](http://maven.apache.org/maven-release/maven-release-plugin/) has two main goals.

#### Prepare

1. Verify there are not uncommitted changes.
2. Prompt user to provide a tag, release, and development version names.
3. Modify and commit release info in the POM file.
4. Tag entire project.

#### Perform

1. Extract file revisions under new tag name
2. Execute the Maven lifecycle on the extracted project instance
3. Deploy the artifacts to local and remote repositories

## <a name="repositories"></a> Repositories

Maven uses repositories to hold build artifacts and dependencies.

Maven [Repositories](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) are used as in Git, but storing build and dependencies artifacts instead of source code. Doing so, users can easily consume your project artifacts from the repositories.

There are two types of repositories `local` and `remote`, both are structured the same way. The local repositories live in the users' local machines and are used as a cache of the remote repositories, providing offline building capabilities. The remote repository can be divided into two subgroups, `public` and `internal`. Public repositories hold artifacts that are publicly available, whilst internal repositories are created in organisations to share internal artifacts between development teams.

It's strongly recommended that when using maven, dependencies JARs are not stored in source control, but in the repositories. Doing so, Maven is able to handle transitive dependencies, as all dependencies information is available through the POM file and the Maven repositories.

## <a name="profiles"></a> Build Profiles
 
Maven [Build Profiles](http://maven.apache.org/guides/introduction/introduction-to-profiles.html) are used to facilitate portable builds. The build profiles modify the POM file at build time to provide equivalent-but-difference parameters that are environment dependent. For example, it is the perfect place to define filesystem references that are different for each user.

Profiles provide properties that can be referenced in the POM file. The properties are defined in the `<properties>` section in the profile declaration.

Build profiles can be declared in the POM file, as a per project definition, or in the Settings files. Build profiles defined in the Global Settings file are available for all users of the machine, whilst the ones defined in the User Settings file are available only for a particular user.

Profiles are triggered in different ways:

* Explicitly: Running a Maven build through the command line, including -P option.
* Maven settings: Including the profile in the `<active profiles>` section. When using this option the profile is always active.
* `<activation>` section in profile declaration: The activation section can activate a certain profile based on environment variables, OS settings, and missing or present files.

## Conclusion

There are many areas where Maven can ease development effort:

* Easy build process
* Uniform build system
* Rich project information
* Guidelines for best development
* Transparent migration to new features

I realised how many Maven features I was not aware of until recently, and I invite you to check them yourself. You will not be disappointed. 

