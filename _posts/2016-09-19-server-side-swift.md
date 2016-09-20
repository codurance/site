---
author: Ana Nogal
comments: true
date: 2016-09-20 10:00:00 +00:00
layout: post
asset-type: post
slug: server-side-swift
name: Server side Swift
title: 'Server side Swift'
canonical:
    name: my personal blog
    href: http://www.ananogal.com/blog/server-side-swift/
image:
    src: /assets/img/custom/blog/server-side-swift.png

tags:
- swift
- open source
- server side
- Web services
- Perfect
- Vapor
- Kitura
- Zewo

---

In December 2015 Apple open-sourced Swift, which has been a real success. Many developers are contributing, not only via pull requests directly into the [source code](https://github.com/apple/swift), but also by helping to define the shape of the language in the [swift-evolution repository](https://github.com/apple/swift-evolution/tree/master/proposals).
One of the things that came with Swift was server-side development. There's a new version of Swift developed for Linux with a toolset that includes a package manager, the LLDB debugger, and the REPL. This opens a whole set of new possibilities for a lot of companies, such as IBM who are currently made a huge investment in its framework [Kitura](https://github.com/IBM-Swift/Kitura).

## So why?

- Comparable to Python or Ruby - it is super fast and is a type-safe language.
- Is a language which allows developers to write expressive code.
- As an iOS developer, you can stay in the same stack of development. If you need to do a Web service so your app can get access to it and retrieve data, you can write that in the same language, using the same tooling...
- Devs love Swift :)

## So, what's on the market?

There's a lot of small frameworks that take advantage of these new possibilities, so have a look in [here](https://stormpath.com/blog/swift-on-the-server-today) where [Edward Jiang](https://twitter.com/edwardstarcraft) does a great job of introducing four of the more promising frameworks already in the market. I'm divided between Vapor and Kitura:

- The first one is growing in popularity and is starting to be the one to used in all tutorials that I've picked up:
    - It's inspired by Laravel
    - Aims to be expressive and simple to use
    - Has a great documentation

- The second, Kitura, is from IBM, which reveals the extent of their belief in the advantages of this approach to application development. Alongside the core framework, IBM has also invested in:
    - A package manager, which allows developers to add their own packages
    - A sandbox environment, to allow developers to test Swift on the server-side
    - A Cloud server that is specialised for deploying Swift

Kitura is based on Express.js, so if you are already used to using it you will find almost no differences at project level structure and so on.
If you want to have a look of all the stack that IBM has, you can go [here](https://developer.ibm.com/swift/).

## Can you convince me?

You are a backend developer and you thinking: "Nah... I'm not going to learn a new whole language..."
Well, don't forget that Swift, first of all, is a type-safe language. And it's a hybrid: it supports Object-Oriented and Functional programming. A huge advantage of this is the ability to introduce yourself into functional programming, but still be "safe" in your object-oriented skills.
Yes, you would have to learn a new language... But it's Swift!
Not convinced yet? Take a look at these 2 articles that compare server side Swift (in this case Vapor) with a lot of other well-known languages:

- [Server Side Swift vs. The Other Guys — 1: Input](https://medium.com/@qutheory/server-side-swift-vs-the-other-guys-1-input-ec48d7be37b7#.pjqw1mint)  
- [Server Side Swift vs. The Other Guys — 2: Speed](https://medium.com/@qutheory/server-side-swift-vs-the-other-guys-2-speed-ca65b2f79505#.iiykwonuy)



Please note that these tests were made before Swift 3.0 came out.

## Conclusion

If you are a iOS developer, and you need to have a Web service for your app, you should definitely consider one of these options, since you won't need to learn another language to deploy your Web service.
If you are a backend developer, you can always learn a new, type-safe, language and then who knows? Maybe start creating your own iOS apps?
