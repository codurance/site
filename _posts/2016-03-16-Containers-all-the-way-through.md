---
layout: post
asset-type: post
name: containers-all-the-way-through
title: Containers all the way through...
date: 2016-03-16 00:00:00 +00:00
author: Mani Sarkar
image:
    src: /assets/img/custom/blog/2016-03-16-containers-all-the-way-through/cover-image.png
    attribution:
        text: Worlds within droplets by Susanne Nilsson (Creative Commons - Attribution-ShareAlike 2.0 Generic license)
        href: https://www.flickr.com/photos/infomastern/15698020069/in/photolist-pVbssr-7y21ES-7MKVTx-72WHSu-2FDMjK-4ih5va-9FGj9H-5pb999-6qLMSa-r1ZrVo-6Nxy6v-bQ5oUk-5aJy7i-6eC8zA-2CeMYe-7QAYH1-48NPqf-6TgPFX-6qy3JC-7QxC9e-88rFEc-7MKVJv-8SR56h-7fvqLb-8SR7FQ-pex9oz-83DVKi-8SMVLD-5uNTcf-jsE9W-e8UREj-cbgFh3-8wD7uS-fFDSGi-5TBDmA-7AoqGR-8SR9g5-7QARjW-eivw71-ePZC8-95Zb2L-axKyf8-9raf22-srvYZY-5WapzP-6WSbQj-ohBjPp-rkqgFT-4HZ3er-8SN1WX
canonical:
    name: my personal blog
    href: https://neomatrix369.wordpress.com/2016/03/13/containers-all-the-way-through/
tags:
- bare metal
- container
- hypervisor 
- kernel
- virtual machine 
- devops
- Docker
- virtualisation
- operating system
--- 

<br/>

In this post I will attempt to cover fundamentals of **Bare Metal Systems**, **Virtual Systems** and **Container Systems**. And the purpose for doing so is to learn about these systems as they stand and also the differences between them, focusing on how they execute programs in their respective environments.

### Bare Metal Systems

Let's think of our Bare Metal Systems as desktops and laptops we use on a daily basis (or even servers in server rooms and data-centers), and we have the following components:

*   the hardware (outer physical layer)
*   the OS platform (running inside the hardware)
*   the programs running on the OS (as processes)

Programs are stored on the hard drive in the form of executable files (a format understandable by the OS) and loaded into memory via one or more processes. Programs interact with the kernel, which forms a core part of the OS architecture and the hardware. The OS coordinate communication between hardware i.e. CPU, I/O devices, Memory, etc… and the programs.

<img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/bare-metal-systems.png" alt="Bare Metal Systems" title="Bare Metal Systems" class="img img-center img-responsive style-screengrab">


A more detailed explanation of what programs or executables are, how programs execute and where an Operating System come into play, can be found [on this Stackoverflow page [2]](http://stackoverflow.com/questions/1599434/how-does-program-execute-where-does-the-operating-systems-come-into-play).

### Virtual Systems

On the other hand Virtual Systems, with the help of Virtual System controllers like, _Virtual Box_ or _VMWare_ or [_a_ _hypervisor [1]_](https://en.wikipedia.org/wiki/Hypervisor) run an operating system on a bare metal system. These systems emulate bare-metal hardware as software abstraction(s) inside which we run the real OS platform. Such systems can be made up of the following layers, and also referred to as a Virtual Machines (VM):

*   a software abstraction of the hardware (Virtual Machine)
*   the OS platform running inside the software abstraction (guest OS)
*   one or more programs running in the guest OS (processes)

It's like running a computer (abstracted as software) inside another computer. And the rest of the fundamentals from the Bare Metal System applies to this abstraction layer as well. When a process is created inside the Virtual System, then the host OS which runs the Virtual System might also be spawning one or more processes.

<img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/virtual-systems.png" alt="Virtual Systems" title="Virtual Systems" class="img img-center img-responsive style-screengrab">

### Container Systems

Now looking at Container Systems we can say the following:

*   they run on top of OS platforms running inside Bare Metal Systems or Virtual Systems
*   containers which allow isolating processes and sharing the kernel between each other (such isolation from other processes and resources are possible in some OSes like say Linux, due to OS kernel features like [_cgroups_](https://en.wikipedia.org/wiki/Cgroups)[3] and [_namespaces_](http://man7.org/linux/man-pages/man7/namespaces.7.html))[4]

A container creates an OS like environment, inside which one or more programs can be executed. Each of these executions could result in a one or more processes on the host OS. Container Systems are composed of these layers:

*   hardware (accessible via kernel features)
*   the OS platform (shared kernel)
*   one or more programs running inside the container (as processes)

<img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/container-systems.png" alt="Container Systems" title="Container Systems" class="img img-center img-responsive style-screengrab">

### Summary

Looking at these enclosures or rounded rectangles within each other, we can already see how it is containers all the way through.

<div class="row blog-boxes">
   <div class="blog-box homepage-blog-thumb col-md-4"> 
    <img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/bare-metal-systems.png" alt="Bare Metal Systems" title="Bare Metal Systems" class=" img-responsive style-screengrab" style="max-height: 100%; max-width: 100%;"> 
   </div>
   <div class="blog-box homepage-blog-thumb col-md-4">
    <img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/virtual-systems.png" alt="Virtual Systems" title="Virtual Systems" class="img-responsive style-screengrab" style="max-height: 100%; max-width: 100%;">
   </div>
   <div class="blog-box homepage-blog-thumb col-md-4">
    <img src="/assets/img/custom/blog/2016-03-16-containers-all-the-way-through/container-systems.png" alt="Container Systems" title="Container Systems" class="img img-responsive style-screengrab" style="max-height: 100%; max-width: 100%;"> 
  </div>
</div>

There is an increasing number of distinctions between **Bare Metal Systems**, **Virtual Systems** and **Container Systems**. While Virtual Systems encapsulate the Operating System inside a thick hardware virtualisation, Container Systems do something similar but with a much thinner virtualisation layer.

There are a number of pros and cons between these systems when we look at them individually, i.e. portability, performance, resource consumption, time to recreate such systems, maintenance, et al.

### Word of thanks and stay in touch

Thank you for your time, feel free to send your queries and comments to [theNeomatrix369](http://twitter.com/theNeomatrix369). Big thanks to my colleagues, our DevOps craftsman [Robert Firek](https://twitter.com/robertfirek) and craftsman [David Hatanian](https://twitter.com/dhatanian) from [Codurance](http://codurance.com/company/) for giving invaluable feedback on my post and steering me in the right direction.

### Resources

* [1] [Wikipedia page for Hypervisor](https://en.wikipedia.org/wiki/Hypervisor)
* [2] [Stackoverflow page for "How does a program execute? Where does the operating systems come into play ?"](http://stackoverflow.com/questions/1599434/how-does-program-execute-where-does-the-operating-systems-come-into-play)
* [3] [Wikipedia page on cgroups](https://en.wikipedia.org/wiki/Cgroups)
* [4] [Linux man page on namespaces](http://man7.org/linux/man-pages/man7/namespaces.7.html)
