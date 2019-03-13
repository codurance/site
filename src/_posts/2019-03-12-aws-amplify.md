---
layout: post
asset-type: post
name: aws-amplify 
title: AWS Amplify
date: 2019-03-12 07:00:00 +00:00
author: Mashooq Badar
image:
    src: /assets/custom/img/blog/aws-amplify.jpg
tags:
    - aws 
    - cloud
abstract: According to Amazon, AWS Amplify is the fastest way to scale web apps! We have noticed that a lot of AWS Documentation has been updated to promote Amplify. I took it for a quick spin to see if it lives up to the premise.
---

Lately I spent a bit of time tinkering with AWS Amplify. It's a framework that provides a library, command line tools, and UI components to quickly get started with basic features that are common in most applications. The framework supports iOS, Android, Web and React Native applications. I concentrated on the Web part of the framework that has support for React, Angular, and Vue.

The provided library features Storage (DB and file), APIs (Gateway/Lambda and AppSync based), Authentication (Cognito), Analytics, and PubSub/Notifications.

## A React Project
The quick start guides are pretty comprehensive. I used the [React Guide](https://aws-amplify.github.io/docs/js/react). Installing the Amplify command-line and configuring with my AWS account was very straight forward. In less than 15 minutes I had a simple React project deployed on S3 with Signup/SignIn Auth enabled. The signup process uses Cognito to manage User Pools and provides Email or Text based user verifications. 

Adding Analytics is quite straight forward as well. Amplify uses AWS Pinpoint to auto-track user behaviour. You can send these events to Kinesis for processing in real-time if needed.

When you initialise Amplify inside your React project using the ```amplify init``` command, the framework create a few IAM roles, Cloud Formation Stack, and S3 bucket for hosting deployments. It will also store the current configuration under the ```amplify``` directory in your project root.

## Backend APIs
Amplify has support for REST and GraphQL APIs. For GraphQL, it uses AppSync, for REST it creates a Lambda and API Gateway endpoints. Following the defaults in both cases, the data eventually ends up in a DynamoDB table. In case of AppSync you can also direct to Lambda, RDS etc. In case of REST you are also free to create your custom Lambda code behind the API.

I found the REST solution to be quite cumbersome, error prone, and frankly the provided code for the default Lambda for DynamoDB operation does not look well engineered. The Create and Update worked for the REST API and the List operation didn't work as expected. I will need to dig deeper into the Lambada code to see what's going wrong there. The  GraphQL solution looks cleaner, as apposed to REST, with less custom generated code. 

As with most frameworks, where code is generated, my discomfort grows as the complexity of generated code increases. The generated code is usually quite opaque and often does not follow Simple Design and Clean Code guidelines. It also falls into the gap between vendor managed vs bespoke code and leads to problems later when certain aspects don't work as expected or there's a need to customise in a direction that is not explicitly supported by the framework. 

Another problem here is that unit testing setup for your Lambda is not very clear. The Lambda is managed as an Amplify configuration artefact, held under the ```amplify``` directory in your project and deleted if you invoke the amplify delete command!

I advise, if you need to create a REST API then don't use the "CRUD Lambda" option, instead use the option where it creates a skeleton lambda function behind API gateway or even better don't use Amplify at all for that purpose. I would however recommend managing your GraphQL API (AppSync) configuration through Amplify because there is very little "glue code" that you need to worry about.

## The JS Library
I found the Amplify JS library to be quite intuative. Using the libary to authenticate with Cognito and then call other IAM authorised services, such as AppSync, API Gateway, Lambdas etc. is a very intersting. It seems that it is the recommneded way by Amazon to invoke their services from the browsers or your native apps. The libaray of course can be used independent of the Amplify Cli and UI Components.

## The UI Components
The framework comes with the Authentication, Storage (Photo Picker/Album), and Chatbot components. I tried out the Auth and Storage components. The Auth component is very mature and the only one worth mentioning. It allows for look-and-feel customisation as well as catpture of mandatory fields during Sign-up process. The component also provide for Social Media logins if you are using the Federated Identities feature of Cognito. The Storage components are pretty basic at the moment.

## The Command Line
The CLI is easy to configure and working with DEV/TEST/PROD environments is straight forward. There is not a lot of documentation at the moment in what it does behind the scenes. Although you can work some of that out from the command-line output, and Cloud Formation stack, and other configuration in the ```amplify``` directory. It does a pretty good job of removing all cloud resources on ```amplify delete``` but does leave a few behind like the deployment S3 bucket and few IAM roles. As discussed in Backend API section, the main problem I see with this is the opaque nature of what it does and the quality/complexiy of some of the code that it generates.

## Testing and Test Environments
Unlike [Serverless](https://serverless.com/) and [ClaudiaJS](https://claudiajs.com/), Amplify has very little support for automated testing. It allows multiple environments where you can follow the Git workflow from Dev to Test to Prod. However, for now, there is no way to stub out more cumbersome infrastructure or provide a local equivalent that is fast. The lack of support for providing a self-contained environment for testing purposes severely reduces the suitability of Amplify for larger more strategic projects in my view.

## Conclusion
In general I found Amplify to be great at getting a project/proof-of-concept started with User Auth and Analytics already baked in. It's about time we stopped reinventing the Authentication / Authorization / User Management wheel. I don't recommend managing your REST API through Amplify but GraphQL/AppSync is a good fit (only if that fits your problem of course). The customisation options for your UI components is quite comprehensive so your application/proof-of-concept can mature quite considerably before you feel the need for a more bespoke solution.


I found the JS Libaray and the Auth UI component to be the most promising part of the framework and would use that if I need to quickly get started in future projects.


The lack of support for automated testing stops me from recommending the full Amplify Framework as a viable solution for more strategic projects, hopefully that and the UI Components will improve in the future.
