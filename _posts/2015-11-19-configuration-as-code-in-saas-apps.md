---
layout: post
name: configuration-as-code-in-enterprise-apps
title: 'Configuring an enterprise app sucks'
date: 2015-11-19 09:00:00 +00:00
author: David Hatanian
canonical:
    name: my personal blog
    href: https://david-codes.hatanian.com/post/2015/11/19/configuration-as-code-in-enterprise-apps
image:
    src: /assets/img/custom/blog/configuration-as-code-in-saas-apps/asterix-and-obelix-passierschein38.jpg
---

There has been quite a lot of discussion over the last years about how configuration should be managed as code, be it software settings or infrastructure configuration :

 * For infrastructure, all the cool kids now use Docker, Vagrant or some other tool that allows you to store your infra's configuration as text files. You can find more on [this Thoughworks article](https://www.thoughtworks.com/insights/blog/infrastructure-code-reason-smile)
 * For software settings, it is now commonly accepted that anything that is not specific to the environment (secrets, IP addresses, ports) should be stored along with the code in the source code repository. Some teams even store environment-specific settings in the same repository.

But when one configures an enterprise application, be it an open-source one or something purchased from a vendor, or even a Software As A Service solution, one is guaranteed to end up with all those levers, buttons and knobs to adjust and fiddle with. But that makes sense, enterprise applications need to be tweaked according to each company's specificities. So the best option is to shove all the configuration possibilities in an maze of screens, tabs, checkboxes and helpful tooltips, right ?

I think that is wrong. This way of configuring software is a guarantee that something wrong will happen at some point. Even collaboration tools such as Google Apps, who thrive on usability, provide administrators with overly complex settings options hidden deep withing a web interface. Identity and Access management tools such as OpenAM, IBM Tivoli Identity Manager and others suffer from the same plague.

TODO include pics of openam and google apps

Those configuration screens are wrong on a lot of levels :

 * **It is hard to look for a specific setting**. You often have to search several screens and sections, each of those potentially relevant to your subject. Some configuration interfaces provide a search tool to allow you to find the screen where you can configure a given setting, which gives you an idea of how hard it can be to navigate the interface in the first place.
 * **Keeping track of the changes performed on the configuration is complicated**. Any serious enterprise application will provide an audit track, unfortunately the track is usually a log of atomic events such as "Administrator Michael changed setting X to value A". There rarely is a way to have an overview of the complete configuration at the moment of this change. Did this change make sense at the time ? If some setting Y was dependent on the setting X, was Y also correctly set ?
 * For any use case but the most trivials, the administrators of those applications will want to setup and maintain several environments. At the very least there will be one pre-production environment where admins test new settings before enabling them in production. Usually, the configuration is done in the test environment through a mazelike user interface, and each step is documented along with screenshots in a change document. Once the change is validated (i.e. when the business is happy with the feature), the change document is used to reproduce the same steps in production. This means that :
   * **It is hard to keep environments in sync**. If an environment's configuration drifts from configuration, there's no easy way to detect it, and it can invalidate your future tests.
   * **The process of moving from one environment to another is error prone**. An admin who misses a box to check will break production without knowing it.
   * **The process is slow**. Updating all the settings for a single change can take several minutes, up to one hour for very complex change. During that time, the application is in some kind of untested, probably-still-works state. Or it was taken offline for the time of the maintenance, which means that user are now blocked and waiting for the change to complete.
   * Since the process is error prone, you can be sure that at some point, something will go wrong and you will need to rollback your change. Guess what ? **Rolling back is at least as slow** as performing the change, if not worst. So the application remains available for a longer time.

We need to configure our enterprise applications the same way we manage other software settings or modern infrastructure : we need to move from an imperative configuration administration composed of manual steps like this :

```Change setting A to value X```

to a declarative style that basically says :

```Here's a complete description of the configuration I expect, now make it happen```

The good news is that we already have the tools for this : uploading the configuration as a text file in a simple human-readable format such as json or yaml would be enough. This solves all the issues we've seen :

 * Looking for a specific setting ? Use the search feature of your preferred text edit, or even the `grep` command line tool !
 * The application can let administrators track changes on its configuration by providing a source control system similar to Git. You would know who changed a given line, when, and could in one click have an immediate view of the resulting configuration after this change.

TODO image of a git diff with name of user and date

 * Moving from one environment to another becomes trivial : it is a matter of transferring the configuration file to the new environment, which is much faster and less error prone. Since the settings history is kept, rolling back to the previous state becomes trivial : just tell the application to revert back to the previous version of the settings.
 * As a plus, your configuration is easy to export and backup. This would allow competing platforms to let you import the configuration from your previous solution when you migrate. Want to migrate from CloudFileServer&trade; to SAASEnterpriseFileManager&trade; ? Just import your old configuration and be ready to start in minutes !

Obviously some configuration items are specific to a given environment (typically addresses of services to integrate with, secrets). But it is something we've solved in development and system administration a long time ago through environment variables. So you'll need another file that will be environment-specific and will contain in just a few lines all the relevant environment variables. The main file will simply refer to those variables when required.

As software engineers, we've progressed a lot in the field of ad hoc developments, we have industrialized the way we deploy our applications and manage our servers, we keep most of the configuration safely stored and tracked in source repositories. But when we provide platforms to our customers in the form of enterprise and/or SAAS applications, we still let then manage those like we're in the 90's. It is time to provide them with a proper way to manage their IT solutions.
