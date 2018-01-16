---
layout: post
name: have-you-met-the-cli 
title: Have you met the CLI?
date: 2016-08-20 10:00:00 +00:00
author: Halima Koundi
image:
   src: /assets/custom/img/blog/cli/tower_of_Babel.jpg
attribution:
      text: Tour of Babel by Lucas Van Valckenborch
      href: https://commons.wikimedia.org/wiki/File%3ATower_of_Babel_cropped_square.jpg
tags:
- framework 
- windows 
- standard
- cli
- csharp
- cross-platform
categories:
- technology
- architecture

abstract: 'What enables code written in C#, F# and VB.Net to run within the same application? And what is .Net anyway?'

---

What enables code written in C#, F# and VB.Net to run within the same application? And what is .Net anyway?

### A standardised specification

When I was working on a legacy website, developed in VB.Net, I had to implement [PayPal Payments Pro](https://developer.paypal.com/webapps/developer/docs/classic/lifecycle/sdks/).  After some searching, I found out that the PayPal team provided several SDKs for different platforms, including .Net, to consume their [API](https://developer.paypal.com/webapps/developer/docs/classic/). And guess what? The .Net SDK was developed in C#… 
But in the .Net world, that’s not a problem.
I just referenced the [dll](https://msdn.microsoft.com/en-us/library/ms682589.aspx) (compiled .net library, similar to the Java equivalent .jar containing .class files) in my project and was good to go. No need to build a client API and re-invent what was already implemented by brilliant developers!

All thanks to the CLI.

[The ECMA Common Language Infrastructure](http://www.amazon.co.uk/Language-Infrastructure-Annotated-Microsoft-Development/dp/0321154932/ref=sr_1_1?ie=UTF8&qid=1428168490&sr=8-1&keywords=common+language+infrastructure) (CLI) is an international standard that gives a specification for executable code and the execution environment. The CLI sets standards and rules to allow different languages to be used and run regardless of the operating system, relying on the virtual execution system in which it runs.
The elements specified in the standard are: the Common Type System (CTS), the Common Language Specification (CLS), Metadata, Portable file system, Common Intermediate Language (CIL) and the Virtual Execution System (VES).

<img src="{{site.baseurl}}/assets/custom/img/blog/cli/common_language_infra.jpg" alt="" class="img-responsive"/>

### .Net as a propriatary implementation of the specification

Ok, fair enough, but what does .Net have to do with this?
The .Net framework is Microsoft’s implementation of the CLI. 
Through the platform-specific Common Language Runtime (CLR).Net provides the VES which among other things, compiles Intermediate Language code (assembly code) to machine-readable code.

The CLR is somewhat equivalent to the Java Virtual Machine as it compiles the Intermediate Language code, previously compiled from C# or F# , into machine code. But the CLR does more than that: it provides services to managed code such as exception handling, garbage collection, security…
But what is managed code? [Managed code](http://en.wikipedia.org/wiki/Managed_code) is code written in a language that is compliant with the CLS specification such as C# or .Managed C++, and thus can be compiled to Intermediate Language. ([read more](http://www.developer.com/net/cplus/article.php/2197621/Managed-Unmanaged-Native-What-Kind-of-Code-Is-This.htm))

To sum up, what makes possible for C#, F#, J#, VB.Net, [Clojure](http://www.clojure.org/about/clojureclr) , and other .Net languages to run together is that they are all compiled to the identical intermediate code. The compilation of code in .Net is done twice: first to compile from the language specific code to the Common Intermediate Language; and secondly from the CIL to native machine code [at runtime](https://msdn.microsoft.com/en-us/library/ht8ecch6%28v=vs.90%29.aspx).

If you want to explore other implementations of the Common Language Infrastructure specification, you can have a look at the open source [Mono platform](http://www.mono-project.com/docs/about-mono/), or at Microsoft’s open source implementation [.Net Core](https://www.microsoft.com/net/core/platform).

