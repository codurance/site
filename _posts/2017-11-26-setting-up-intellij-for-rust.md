---
author: Dan Cohen
date: 2017-11-26 08:00:00 +00:00
layout: post
asset-type: post
slug: rusting-IntelliJ 
title: Setting up IntelliJ for Rust
canonical:
    name: hacking dan
    href: http://blog.hackingdan.com/2017/11/setting-up-IntelliJ-for-rust
description: Instructions on how to set up IntelliJ for Rust as an IDE conducive to TDD
tags: 
- TDD
- rust
- IntelliJ
- environments
---
This post is a part of the upcoming codurance series on different ways of setting up your Rust development environment. This time it's IntelliJ.

## Why IntelliJ?
There are lots of good options for Rust development. The classics are perhaps CLion and vim/emacs. IntelliJ has one important feature that none of these have. Refactoring. As you might expect, the refactoring tools are not as fully featured as those for Java - but they're there and nobody else has them.

## My Environment

* Fedora 26
* Virtual Box 5.2.0r118431
* High Sierra (host OS) v10.13.1

## Basic Setup

1.  [invent the universe](https://www.youtube.com/watch?v=7s664NsLeFM), followed by computers and the internet
2.  install Rust [https://www.rust-lang.org/en-US/install.html](https://www.rust-lang.org/en-US/install.html)
    *   this will give you cargo, rustc, rustup etc
    *   follow instructions for default installation
    *   remember to set up your current shell (instructions at end of installation), if it doesn't work, just reboot your machine
3.  `cd` to parent directory you want for your project
4.  `cargo new my-project`
5.  install IntelliJ [https://www.jetbrains.com/idea/](https://www.jetbrains.com/idea/)
6.  install "Rust" plugin from the IntelliJ plugin repositories
7.  open project in IntelliJ by opening the project directory
    *   keep an eye on the notifications panel at the top of the editor window
    *   IntelliJ may complain about not finding a cargo project
    *   try to attach it to the `cargo.toml` in your project root directory by following the promps in the notifications panel
    *   This may not get rid of the warning - the plugin should still be working as expected though

There you are - you now have a functional Rust environment. With code completion, code generation, syntax highlighting, suggestions and a test runner. Everything you need to get started.  

## Advanced Setup

If you want your environment to do more, here are some of the tools I use to improve the work flow in Rust and IntelliJ.

### Format on save ([rustfmt](https://crates.io/crates/rustfmt/))

1.  `cargo install rustfmt`
2.  Install the "Save Actions" plugin in IntelliJ
3.  Configure Save Actions like this
    *   You want to activate save actions on shortcut - IntelliJ does a lot of autosaving which will result in your code being reformated while you are still typing it if you use activate on save
    *   If you use the VIM emulator, `:wa` will not trigger the reformatting - you must use the save shortcut
4.  (Optional) Rebind the default `ctrl+shift+s` shortcut to `ctrl+s` for more convenience

### Clippy linting hinting ([clippy](https://crates.io/crates/clippy))

![picture of clippy from microsoft word](http://images.dailytech.com/nimage/19706_Clippy3.jpg)

Clippy is... clippy but for Rust. It will make suggestions about improvements to be made to your code. The only difference between clippy and Rust's clippy is that Rust's clippy is actually useful.  

1.  `rustup toolchain install nightly`
2.  `rustup run nightly cargo install clippy`
3.  `cd` to root directory of your project
4.  `rustup run nightly cargo clippy`

### Watch tasks ([cargo-watch](https://crates.io/crates/cargo-watch))

When I'm writing code - I hate having to flip to the terminal to compile and run the tests and ensure it's all good. I like to use watch tasks to continuously run my tests. Rust has an option for this.  

1.  `cargo install cargo-watch`
2.  `cd` to root directory of your project
3.  `cargo watch -x test`

### Integrating watch and clippy into IntelliJ

This is all well and good, but the watch tasks and clippy aren't integrated into IntelliJ, they're run separately on a terminal, and only one at a time! Well it's possible to bring them into your IDE so everything is in the same place and running together.  

1.  Ensure the "Terminal" plugin is installed and enabled in IntelliJ
2.  open the terminal in IntelliJ
3.  `cargo watch -s "rustup run nightly cargo clippy && cargo test"`

## Done!

Now you have a Rust environment capable of  

* refactoring
* syntax highlighting
* code completion
* code generation
* error highlighting
* linting suggestions
* format on save
* continuous testing

You should be aware that IntelliJ does not support Rust debugging. If that's important to you, consider using another IDE such as VSCode, CLion, vim or emacs. If you are attached to IntelliJ then you can use `rust-lldb` (installed by default with rustup) from the terminal.
## Questions ?
Any questions ? Ask on [https://users.rust-lang.org/](https://users.rust-lang.org/) and ping me the link to the post on [Twitter](https://twitter.com/hackingdandan) or email it to me at dan.cohen@codurance.com. This way the answer will be visible to everyone in the community.

Keep on Rusting !
