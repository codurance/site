---
layout: post
name: containers-all-the-way-through
title: Containers all the way through...
date: 2016-03-14 00:00:00 +00:00
author: Mani Sarkar
image:
    src: /assets/img/custom/blog/2016-03-14-Containers-all-the-way-through/cover-image.png
    attribution:
        text: Three Worlds by Antonio Martín
        href: https://www.flickr.com/photos/kantor/1496696021/in/photolist-3hfXzP-a87pjq-8QWboE-q9qo4E-rxeaKe-e4ptkx-nt5Wrg-oUBVJ-5Mw3mT-xFS8Ce-5Yvqna-p1qtN6-89uJwD-fq8cAT-7infm8-99Vgr9-fq7Dd6-Ccfjc-4XzbbF-myN1gx-fqnmC1-fqnzUs-rjbHB-94XmvH-76Y5De-8zeNK4-fqntzo-fqmNJ1-7TFSFX-fq8WG6-fqnjD3-fq7y9e-7CvEFX-7inRbY-7fgioS-7SGTT8-nSbooQ-772ZQA-ruRCgW-fq83QP-fq7DYM-fqngvq-7fVEdo-7redyP-8jidK7-7fRJgv-6gsSek-7fVDVd-9RLPEJ-edKCdV/
canonical:
    name: my personal blog
    href: https://neomatrix369.wordpress.com/2016/03/13/containers-all-the-way-through/
tags:
- bare metal system
- cgroups
- container
- container system
- executable
- hypervisor 
- kernel
- namespaces 
- operating system
- process 
- shared operating system
- shared resources
- virtual hardware
- virtual machine 
- virtual system
- vm
--- 

### **Introduction**

In this post I will attempt to cover fundamentals of **Bare Metal Systems,** **Virtual Systems** and **Container Systems**. And the purpose for doing so is to learn about these systems as they stand and also the differences between them, focussing how they execute programs in their respective environments.

### **Bare metal systems**

Lets think of our bare metal systems as desktops and laptops we use on a daily basis, and we have the following components:

*   The hardware (outer layer)
*   The OS platform (running inside the hardware)
*   programs running as processes on the OS

Programs are stored on the hard drive in the form of executable files (a format understandable by the OS) and loaded into memory via one or more processes*. The programs interact with the kernel, which forms a core part of the OS architecture and the hardware. The OS coordinate communication between hardware i.e. CPU, I/O devices, etc… and programs.

<img src="/assets/img/custom/blog/2016-03-14-containers-all-the-way-through/bare-metal-systems.png" alt="Bare Metal Systems" title="Bare Metal Systems" class="img img-center img-responsive style-screengrab">


A more detailed explanation what programs or executables are, how programs execute and where does an Operating System come into play, can be found [here [2]](http://stackoverflow.com/questions/1599434/how-does-program-execute-where-does-the-operating-systems-come-into-play).

### **Virtual systems**

On the other hand virtual systems, with the help of virtual system controllers like, _Virtual Box_ or _VMWare_ or [_a_ _hypervisor [1]_](https://en.wikipedia.org/wiki/Hypervisor) to run an operating system running on the bare metal. These systems emulate bare-metal hardware as software abstraction(s) inside which we run the real OS platform. Such systems can be made up of such layers, and also referred to as Virtual Machines (VM):

*   a software abstraction of the hardware (virtual machine)
*   the OS platform running inside the software abstraction (guest OS)
*   one or more programs running as processes in the guest OS

Its like running a computer (abstracted as software) inside another computer. And the rest of the fundamentals from the bare metal system applies to this abstraction layer as well. When a process is created inside the virtual system, then the host OS which runs the virtual system might also be spawning one or more processes on the host OS in relation to this process.

<img src="/assets/img/custom/blog/2016-03-14-containers-all-the-way-through/virtual-systems.png" alt="Virtual Systems" title="Virtual Systems" class="img img-center img-responsive style-screengrab">

### **Container systems**

Now looking at container systems we can say the following:

*   they run on top of OS platforms running inside bare metal systems or virtual systems
*   containers which allow to isolate processes and share the kernel between each other (such isolation from other processes and resources are possible in some OSes like say Linux, due to OS kernel features like _cgroups_ and _namespaces_)

A container creates an OS like environment, inside which one or more programs can be executed. Each of these executions could result in a one or more processes on the host OS. Container systems are composed of these layers:

*   hardware (shared)
*   the OS platform (shared kernel)
*   one or more programs running inside the container

<img src="/assets/img/custom/blog/2016-03-14-containers-all-the-way-through/container-systems.png" alt="Container Systems" title="Container Systems" class="img img-center img-responsive style-screengrab">

### **Summary**

Looking at these enclosures or rounded rectangles within each other, we can already see how its containers all the way through.

There is an increasing number of distinctions between Bare Metal Systems, Virtual Systems and Container Systems. While Virtual Systems encapsulate the operating system inside a thick hardware virtualisation, Container systems do something similar but with a much thinner virtualisation layer.

There are a number of pros and cons between these systems when we look at them individually, i.e. portability, performance, resource consumption, time to recreate such systems, maintaining these systems, et al.

### **Word of thanks and stay in touch**

Thank you for your time, feel free to send your queries and comments to [theNeomatrix369](http://twitter.com/theNeomatrix369). Big thanks to my colleague, and our DevOps craftsman [Robert Firek](https://twitter.com/robertfirek) from [Codurance](http://codurance.com/aboutus/ourcompany/) for proof-reading my post and steering me in the right direction.

### **Resources**

* [1] [Hypervisor](https://en.wikipedia.org/wiki/Hypervisor)
* [2] [How does a program execute? Where does the operating systems come into play ?](http://stackoverflow.com/questions/1599434/how-does-program-execute-where-does-the-operating-systems-come-into-play)