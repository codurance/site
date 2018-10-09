---
layout: post
name: big-data-skills-spectrum 
title: 'Big Data Skills Spectrum'
date: 2015-06-13 19:00:00 +01:00
author: Mashooq Badar
image:
    src: /assets/custom/img/blog/big-data-spectrum-main.jpg
tags:
- Big-Data
- Agile
- Team
---

Big Data has been a hype for many years. I’ve seen a few “Big Data” projects start in the past with a lot of fanfare and promise.The promise has always been that “we will start getting a holistic picture of our departmental silos and gain numerous insights from our data that will help us get ahead of our competitors”. The promise was rarely, if ever, fulfilled and the “Big Data” team slowly faded into the rest of the melting pot that we call the “IT department” in most large enterprises.    

Part of the problem is how we build these Big Data teams. The technology and expertise in these teams have been primarily Java / C# developers, Relational DBAs, some Business Objects type skills (essentially basic reporting), ETL primarily using SQL and Stored Procedures. Recently I’ve seen use of less traditional databases, such as Mark Logic with XQuery, taking the place of SQL as well as compute grids and data grids like Gigaspaces and Gemfire. In all of these cases the solutions or the skills in the team were not aligned with the aspiration of the business.

Recently we have had the chance to build a Big Data team for one of our clients. We know we have very large quantities of data to deal with. Some of the processing can happen in batch but other aspects needs to happen in real-time. We have a few ideas for the kind of insights that we are looking for but also know that mostly we don’t know what kind of insights the data can provide and how it will help us drive better features for our customers.

We are lucky that the Big Data space has matured in the past few years. From technology point of view certain leaders have emerged. Hadoop and Cassandra have been around for a while. We have Kafka for highly scalable events processing, we have Spark, Storm, Scalding etc. for ETL and machine style jobs. Machine Learning libraries are maturing, languages such as R are gaining wider adoption, and Data Science is emerging as a bonafide profession.

## Team Skills Spectrum
Creating a modern Big Data team requires a spectrum of skills:

![Skills Spectrum]({{site.baseurl}}/assets/custom/img/blog/big-data-spectrum.jpg)

### Fine Tuning
Big Data, if you truly have big data, requires a scalable solution. Solutions of this size, open source or commercial, will require some fine tuning with regards to performance, reliability, security, and maintainability. The way you use underlying technologies will need be sympathetic to how the technology works best. Fine Tuning happens throughout the lifecycle of your software and not just in production. You will require expertise in the technologies you are using. At least a subset of the team must have a working understanding in this area but that is not enough. It is advisable to have regular, not necessarily full-time, fine tuning expertise available in your team.

### Data Modeling
Good Data Modelling is a dying skill in my experience but not any less important. In fact with Big Data this skill is more and more relevant. How you model data from different perspectives is paramount to its usefulness. This skill is essentially one of a good Business Analyst with an emphasis on data. The role also requires an innate understanding of the business. Modelling, visualising, adapting, and evolving data according to the business needs is a role in its own right and must not be overlooked.

### Deployment Automation
Big Data solutions are generally very complex and have many moving parts. Deployment Automation is absolutely necessary to keep control of these highly distributed environments. Environment provisioning and deployment automation will not only reduce the risk of things going wrong in production but also enable more comprehensive testing — both automated and exploratory. 

### ETL Development
I call this ETL development for want of a better term. ETL in the traditional sense is only a part of this role. This is the software development part of your software. Some aspects will require more traditional Extract-Transform-Load of data, other aspects will require productionising of the Data Science algorithms. XP development practices such as TDD ad Continuous Integration are as applicable here as much as any other type of software development.

### Practical Data Science
These are ETL developers who have a good understanding of data mining and predictive analytics fields or Data Scientist who are also good developers. They may also have a good grasp of Data Modelling. An excellent grasp of both development and data science is quite rare however people who specialise in one but also have a good grasp of the other are not so rare.

### Theoretical Data Science
These are hardcore specialists who live and breath statistical modelling and Data Mining theory. Their job is come up with novel answers from the data which can then be productionised by the developers. It is very important that they are provided with suitable environments where they can experiment with different models using representative data. They are effectively the research and development end of the team.

## The whole Team
A well balanced team is as always made up of [T-Shaped](https://en.wikipedia.org/wiki/T-shaped_skills) skills where each team member contributes across disciplines with other experts in the team. Extreme Programing practices and Software Craftsmanship principles are as appropriate here as on any other software development team. 

It is very important to understand that a Big Data team has its own specialist spectrum of skills. Some of these skills are very different to the ones found in most general software development teams. Taking a general development team and calling them them “The Big Data team” will not bring the benefits of “Big Data” to your organisation. You will need to ensure that the spectrum of skills listed here are also part of that team.
