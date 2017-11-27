---
layout: post
asset-type: post
name: setting-up-vscode-for-rust
title: Setting up Rust development environment using VSCode on a Mac
description: A guide to setting up VSCode as the central point of your Rust development experience
date: 2017-11-26 00:00:00 +00:00
author: Cyryl Płotnicki
image:
   src: 
tags:
- rust
- vscode
---

This post is a part of the upcoming series on different ways of setting up your Rust development environment. It's time for VSCode.

## Completion and highlighting

While on Linux VSCode with the Rust plugin seems to work more or less out of the box, on a Mac I needed to spend some time configuring it.

First things first though, let's start by installing Rust version manager, rustup.

```
curl https://sh.rustup.rs -sSf | sh
```

We will be using nightly version of rust as to have one version that can compile all of our tools. This is mostly due to [`clippy`](https://github.com/rust-lang-nursery/rust-clippy) requiring a nightly compiler.

```
rustup install nightly
rustup default nightly
```

We will need Rust Language Server to provide the code completion.

```
rustup component add rls-preview --toolchain nightly
rustup component add rust-analysis --toolchain nightly
rustup component add rust-src --toolchain nightly
```

For a more wholesome experience, please have some tools as well:

```
cargo install clippy rustfmt rustsym
```

Now finally, for the VSCode itself, press `cmd-p` and `ext install vscode-rust`. I'm using the new `Rust` extension as `Rusty Code` has been discontinued.

If you're lucky - that's it, you should have working completion and highlighting in Rust files. Check this by opening any Rust source code file. 
If you're greeted by this message: `You have chosen RLS mode but neither RLS executable path is specified nor rustup is installed` - then we need to get the extension to get to know your setup a bit:

In VSCode go to `Settings` using `cmd-,` and put the following config elements there:

```
{
    "rust.cargoPath": "/Users/yourusername/.cargo/bin/cargo",
    "rust.cargoHomePath": "/Users/yourusername/.cargo",
    "rust.rustfmtPath": "/Users/yourusername/.cargo/bin/rustfmt",
    "rust.rustsymPath": "/Users/yourusername/.cargo/bin/rustsym",
    "rust.rustLangSrcPath": "/Users/yourusername/.rustup/toolchains/nightly-x86_64-apple-darwin/lib/rustlib/src/rust/src",
    "rust.mode": "rls",
    "rust.rls": {
        "executable": "/Users/yourusername/.cargo/bin/rls",
        "useRustfmt": true
    }
}
```
As the paths in the config need to be absolute, remember to adjust to your situation (system username) accordingly.

Now when you reload and start editing a Rust file you should see `RLS: Analysis finished` on the bottom bar and the completion and highlighting should all work. Yay !

## Building and testing

VSCode has a system of tasks that we can leverage to run the build and test from within VSCode.
If you go to `Tasks->Configure` tasks it will create an empty `tasks.json` file in your repository.
Change it to the following to allow for `cargo` to be hooked up as your build tool and test runner.

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "cargo build",
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": []
        },
        {
            "label": "test",
            "type": "shell",
            "command": "cargo test",
            "group": {
                "kind": "test",
                "isDefault": true
            }
        }
    ]
}
```

You can use `cmd-shift-b` to run the build now.

## Debugging

For the native debugger to work we need to install another extension to VSCode called ['LLDB Debugger'](https://github.com/vadimcn/vscode-lldb/blob/master/MANUAL.md). That would be `cmd-p` and `ext install vadimcn.vscode-lldb`.

After reloading VSCode you should be able to set breakpoints on the side gutter and run the program using debugger by pressing `F5`. First time doing this will result in the debugger choice window. Choose `LLDB Debugger` as your debugger and you will be greeted with a JSON configuration file in which you need to tell the debugger a few details on your project. It may look like this:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Debug",
            "program": "${workspaceRoot}/target/debug/name_of_your_executable",
            "args": [],
            "cwd": "${workspaceRoot}",
            "preLaunchTask": "build"
        }
    ]
}
```

And that should be it !

Now you should be able to set breakpoints and debug through the code.

Start the debugging session by pressing `F5` again - this should result in the build proceeding and then the debugger launching.

## Questions ?

Any questions ? Ask on [https://users.rust-lang.org/](https://users.rust-lang.org/) and ping me the link to the post on [Twitter](https://twitter.com/cyplo) or email it to me at [cyryl@codurance.com](mailto:cyryl@codurance.com). This way the answer will be visible to everyone in the community.

Keep on Rusting !
