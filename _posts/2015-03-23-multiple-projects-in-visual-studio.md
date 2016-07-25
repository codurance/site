---
layout: post
asset-type: post
name: visual-studio-projects
title: Multiple projects in Visual Studio solutions considered harmful
date: 2015-03-23 22:49:00 +00:0
author: Pedro Santos
image: 
    src: /assets/img/custom/blog/visual-studio-projects.jpg
tags:
- c#
- .NET
- Visual-Studio
- practices
---

# Multiple projects in Visual Studio solutions considered harmful

I agree with [Chad Myers](https://lostechies.com/chadmyers/author/chadmyers/) when he defines a common project anti-pattern [“Many projects in a Visual Studio Solution”](https://lostechies.com/chadmyers/2008/07/16/project-anti-pattern-many-projects-in-a-visual-studio-solution-file/).

## Fast feedback loop

Too many projects increase both the load and build time of your solution. Also a solution will take longer to start executing in debug due the overhead of loading/resolving multiple assemblies with associated PDB’s and symbols. This has an impact on the fast feedback loop we should strive to achieve. When I write code I want feedback as fast as possible. This includes compiling, and executing tests. Solutions with multiple projects affect the fast feedback loop.

## Logical boundary != Physical boundary

An assembly is a unit of deployment in .Net. A Visual Studio project has a 1 on 1 relation with an assembly. We should have boundaries in our solutions, but we should not confuse logical boundaries with physical boundaries. A project in Visual Studio creates a physical boundary; this is often needed, but also open to abuse. Physical boundaries are all about deployment and versioning. If you are not deploying and versioning a part of your code independently, there is no reason to create a physical boundary. Multiple layers != multiple assemblies.

## Dependency management

I don't want to reference System.Web across all code, so I create a separate assembly where I "isolate" the code that depends on that assembly. When I hear this argument, most of the time it equates to distrust among team members. Or, I don't trust other developers, so to avoid them referencing System.Web on business classes, I segregate them in another project that does not reference System.Web. Can you hear yourself? There may be a compelling reason to isolate a dependency in a separate assembly, but the reason should not be: to avoid other developers making a mess.

## How do I do it?

My solutions start with two projects one for production code and one for tests. The question to ask before creating a project is: Do I need to deploy and version this part of the code independently? Only if the answer is yes do I create a new project.

## Conclusion

This subject has been discussed in the community for a long time but I still don’t see any change. I’m continuously faced with solutions with dozens even hundreds of projects. In fact I would say this is the norm, unfortunately. I still see shocked faces, when I propose rearranging a solution using folders and namespaces instead of projects. So I’m adding my voice to other voices.

Some authors propose a number between 15-20 maximum projects in a Visual Studio Solution to be a good compromise. I disagree; my proposal is one for production code and a separate project for tests. Adding any other project to a solution should be considered very carefully.

Thanks to Tom Male and Eric Li Koo for reading drafts of this.

#### References

[http://ayende.com/blog/3158/the-two-project-solution](http://ayende.com/blog/3158/the-two-project-solution)
[http://geekswithblogs.net/FrostRed/archive/2008/10/03/125628.aspx](http://geekswithblogs.net/FrostRed/archive/2008/10/03/125628.aspx)
[http://codebetter.com/jeremymiller/2008/09/30/separate-assemblies-loose-coupling/](http://codebetter.com/jeremymiller/2008/09/30/separate-assemblies-loose-coupling/)
[http://www.hanselman.com/blog/AssemblyFiefdomsWhatsTheRightNumberOfAssembliesLibraries.aspx ](http://www.hanselman.com/blog/AssemblyFiefdomsWhatsTheRightNumberOfAssembliesLibraries.aspx)
[https://lostechies.com/chadmyers/2008/07/16/project-anti-pattern-many-projects-in-a-visual-studio-solution-file/](https://lostechies.com/chadmyers/2008/07/16/project-anti-pattern-many-projects-in-a-visual-studio-solution-file/)