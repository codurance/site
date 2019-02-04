---
layout: post
asset-type: post
name: an-extensive-introduction-to-dynamodb-part-1
title: An (extensive) introduction to DynamoDB - Part 1
date: 2019-02-04 15:55:00 +00:00
author: Bartomeu Galmés
description: An example of what is learned in the first few weeks of the apprenticeship with the Mars Rover kata.
image: 
    src: /assets/custom/img/blog/2019-02-04-an-extensive-introduction-to-dynamodb-part-1/00-cloud.jpg
tags: 
- dynamodb
- amazon web services
- aws
- databases
- cloud

---

DynamoDB has been kind of a buzzword on the last years so after years working on Relational and Document-oriented databases I decided to give it a try. There are certain things that work differently from what I was expecting so the aim of these series is that you know them before deciding if DynamoDB suits your next project.

In this series of posts, we will start diving through DynamoDB and see some of its insights, which can differ a little from other databases. On this first post we will talk about what DynamoDB is and how its Primary key approach works. On the second one we will dive into one of the most confusing parts for people coming from relational or document oriented databases: Data retrieval. It is a little different from them but with a little help from indexes we can achieve most of the use cases. The third and last part of this series will be focused on availability and scalability which are one of the advantages of DynamoDB as AWS handles them for us.

But before getting started let’s see where DynamoDB lives inside the database categories.

![alt text]({{site.baseurl}}/assets/custom/img/blog/2019-02-04-an-extensive-introduction-to-dynamodb-part-1/01-dynamodb-db-tree.jpg "DynamoDB inside the DB family")

# What is DynamoDB?

DynamoDB is a NoSQL, high-available, low latency, scalable database that supports both key-value and document store models. It follows the serverless approach, meaning that it is offered as a service, so its infrastructure is fully managed by AWS and works out-of-the-box with little configuration. That frees the user of managing instances, applying security patches and other infrastructure-related tasks. In addition, as there is no dedicated instance, the pricing is lower as it follows a pay-per-use model instead of charging for provisioned computing resources.

DynamoDB shines on supporting high workloads without performance impact as it handles reads and writes throughputs independently. For this, it is aimed to analytical operations but even though it can work as a cheap, quick configuration solution for simple CRUD applications.

For an easy use, AWS provides an SDK for several languages such as Java, .NET, Node.js, PHP, Python, Ruby, Go, C++, JavaScript for browsers and IoT devices. In addition, requests could be done over HTTP using JSON.

# What is it not?

Although being capable of handling documents, don’t think of DynamoDB as a replacement for MongoDB. As it is built around the key-value data model it bears more similarity with Redis or Memcached. 

A key difference is that by default not all attributes can be queried efficiently, only those that belong to a Primary Key or an Index.  The reason behind this is that its high efficiency comes in when searching for a specific element by its key, rather than filtering on other attributes. Moreover, DynamoDB does not support querying embedded data structures, nor provide full-text search or other helpers such MapReduce or Date functions.

# The DynamoDB Primary Key approach
 
As in most databases, DynamoDB enforces you to define a Primary Key, which has to be unique among the whole table. The use DynamoDB does of Primary Keys is slightly different from other databases as it has a direct impact on how data is physically stored, which on its turn key for its performance as will be explained on the second part of this series.  Similarly to relational databases this Primary Key can be simple or composite, the latter being compound of two attributes.

DynamoDB uses custom names for the keys.  When it is a simple one it is called a Partition Key and when having a composite one the first part is called (and behaves such a) Partition Key, and the second part is the Sort Key.

DynamoDB will create a physical partition on an SSD disk for each Partition Key. When retrieving data, this value will be used by a Hash Function in order to determine in which partition the data is stored.  


In case the Primary Key is composed, the second part will act as the Sort Key. This means that items will be stored together in the same partition and ordered by the Sort Key.

As a result of this, when using composite keys a good practice is choosing high-cardinality partition keys so physical partitions can be the smallest possibly leading to an increase of efficiency when querying data.

As an example see how it works when looking for Jimi:

![alt text]({{site.baseurl}}/assets/custom/img/blog/2019-02-04-an-extensive-introduction-to-dynamodb-part-1/02-finding-jimi.jpg "Findin Jimi")
        
Keep in tune for the second post of these series where we will talk about data retrieval and indexation.