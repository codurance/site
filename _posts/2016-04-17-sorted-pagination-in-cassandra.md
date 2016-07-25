---
layout: post
asset-type: post
name: Sorted-pagination-in-Cassandra
title: 'Sorted pagination in Cassandra'
date: 2016-04-17 00:20:00 +00:00
author: Felipe Fernández
image:
    src: /assets/img/custom/blog/cassandra.png
    attribution:
      text: bricked rainbow by fusion-of-horizons
      href: https://www.flickr.com/photos/fusion_of_horizons/3549626324
tags:
- distributed systems
- cassandra
- data modeling

---

Cassandra is a fantastic database for different use cases. There are different situations when you need to twist Cassandra a little and studying one of those could be a helpful exercise to better understand what is Cassandra about. Databases are complex beasts, approaching them with the right level of abstraction is vital. Their final goal is not storing data per se, but make that data accessible. Those read patterns will define which database is the best tool for the job.

## Time series in Cassandra

A time series is a collection of data related to some variable. Facebook's timeline would be a great example. A user will write a serie of posts over time. The access patterns to that data will be something like 'return the 20 last posts of user 1234'. The DDL of a table that models that query would be:

```
CREATE TABLE timeline (
	user_id uuid,
	post_id timeuuid,
	content text,
	PRIMARY KEY (user_id, post_id)
)
WITH CLUSTERING ORDER BY (post_id DESC);
```

In Cassandra Primary Keys are formed by Partition Keys and Clustering Keys. Primary keys enforce the uniqueness of some cells in a different way to relational databases. There is no strong enforcement of that uniqueness, if you try to insert some cell related to an already existing primary key, that will be updated. Also the other way around: a 'missing' update will end up as insert. That's called upsert.

Partition keys ensure in which node of the cluster the data is going to live. If you include at least one clustering key, the partition key will identify N rows. That could be confusing for someone coming from traditional relational databases. Cassandra does its best trying to bring its concepts into SQL terminology, but sometimes it could be weird for newbies. An example of Timeline table would be:

```
user_id--------------------------------post_id--------content
346e896a-c6b4-4d4e-826d-a5a9eda50636---today----------Hi
346e896a-c6b4-4d4e-826d-a5a9eda50636---yesterday------Hola
346e896a-c6b4-4d4e-826d-a5a9eda50636---one week ago---Bye
346e896a-c6b4-4d4e-826d-a5a9eda50636---two weeks ago--Ciao
```

In order to understand the example I converted post_id values into something that makes sense for the reader. As you can see there are several values with the same partition key (user_id) and that works as we defined a clustering key (post_id) that clusters those values and sorts them (descending in this case). Remember that uniqueness is defined by the primary key (partition plus clustering key) so if we insert a row identified with '346e896a-c6b4-4d4e-826d-a5a9eda50636' and 'today' the content will be updated. Nothing gets really updated in disk as Cassandra works with immutable structures in disk, but at read time different writes with the same primary key will be resolved in descending order.

Let's see some queries to finish this example:

```
SELECT * FROM timeline
where user_id = 346e896a-c6b4-4d4e-826d-a5a9eda50636
```
-> It will return four rows sorted by post_id DESC

```
SELECT content FROM timeline
where user_id = 346e896a-c6b4-4d4e-826d-a5a9eda50636 LIMIT 1
```
-> It will return 'Hi'

```
SELECT content FROM
timeline where user_id = 346e896a-c6b4-4d4e-826d-a5a9eda50636 and post_id > today LIMIT 2
```
-> It will return 'Hola' and 'Bye'

As you can see implementing sorted pagination is extremely easy when modeling Time Series in Cassandra. Besides it will be super performant as Cassandra stores all the rows identified by a single partition key in the same node, so a single roundtrip will be needed to fetch this data (assuming read consistency level ONE)

Let's see what happens when we want to implement sorted pagination in a different use case.

## Sorted sets in Cassandra

If we think in the previous example at data structure abstraction level, we can see that we just modeled a Map whose values are Sorted Sets. What happens if we want to model something like a Sorted Set with Cassandra?

Our scenario is the following. The users of our system can be suspended or unsuspended through some admin portal. The admins would like to have a look into the last users that have been suspended along the suspension's reason in order to verify that decision or revoke it. That's pretty similar to our previous paginated queries so let's how we can model that with Cassandra.

```
CREATE TABLE suspended_users (
	user_id uuid,
	occurred_on timestamp,
	reason text
)
```

I've deliberately left out the Primary Key from this DDL so we can discuss different options.

## Understanding Clustering Keys

Previously we used clustering keys to provide some order into our data. Let's go with that option:

```
PRIMARY KEY (user_id, occurred_on)
```

Can you see what is wrong with this? Forget about implementation details for a second and answer this question, how many times a user will appear in this table? As your self-elected product owner I'll say that only one. Once a user is unsuspended I'd like to remove the user from that table and a user that is suspended can't be suspended again. Next question: where do we want to keep some order? Not inside users (even less in this case, as our single user will be always 'ordered'), but amongst users. This design won't work.

## Understanding Partition Keys and Partitioners

I have a new bit of information that might help you. This table will be updated in real time, so that means that this table should keep some kind of logical insertion order. As we didn't get into the details of Cassandra we could think that the following will work:

```
PRIMARY KEY (user_id)
```

Let's see how that logical insertion order maps into the physical one. Cassandra stores its data in a ring of nodes. Each node gets assigned one token (or several if we use vnodes). When you CRUD some data Cassandra will calculate where in the ring lives that data using a [Partitioner](http://docs.datastax.com/en/cassandra/2.0/cassandra/architecture/architecturePartitionerM3P_c.html) that will hash the Partition Key. When using recommended partitioners [Cassandra rows are ordered by the hash of their value and hence the order of rows is not meaningful](http://docs.datastax.com/en/cql/3.1/cql/cql_using/paging_c.html), so that logical insertion order will be logical and nothing else. That means that this query will return 20 users without any meaningful order:

```
SELECT * FROM suspended_users LIMIT 20;
```

Using the token function we could paginate large sets of data as it was explained in [here](http://docs.datastax.com/en/cql/3.1/cql/cql_using/paging_c.html).

```
SELECT * FROM suspended_users where token(user_id) > token([Last user_id received]) LIMIT 20;
```

However, we want to paginate a sorted set by suspension time and descending.

## Presenting Reverse Lookups

Denormalisation is something usual in Cassandra. In order to overcome restrictions imposed by Cassandra implementation, denormalising our data is a suggested approach. Thanks to our previous example we understood that to keep some order between data we need to cluster it. Nobody forces us to use a suspended_users table even if our domain talks about it. As we need some fixed variable to create a time serie, we'll go with the status:

```
CREATE TABLE users_by_status (
  status text,
  occurred_on timestamp,
  user_id uuid
  reason text,
  PRIMARY KEY (status, occurred_on, user_id)
) WITH CLUSTERING ORDER BY (occurred_on DESC);
```

Partition and clustering keys can be compounded. In this particular key, 'status' will be the partition key and 'occurred_on'/'user_id' the clustering key. Default order is ASC, so that's why we specified 'occurred_on' DESC inside of CLUSTERING ORDER BY. It's important to note that 'user_id' will serve for uniqueness purposes in this design even if it will order rows in the unlikely case of two users being suspended at the very exact time.

Now that we created an 'artificial' clustering, we can paginate in a sorted way like in our first example. This presents several problems though. Cassandra won't split data inside of a row, and the recommended maximum size of rows inside of a partition is 200k. If you foresee that your system will grow more than that you can split the rows with the technique of compounds partitions keys using temporal buckets.

```
CREATE TABLE users_by_status (
  bucket text,
  status text,
  occurred_on timestamp,
  user_id uuid
  reason text,
  PRIMARY KEY ((bucket, status), occurred_on, user_id)
) WITH CLUSTERING ORDER BY (occurred_on DESC);
```

Being the bucket something like MM-YYYY or whatever fine-grained precission that your data will suggest you. Here I present a new bit of CQL (Cassandra Query Language) that is compounded partition keys. As you can see whatever is inside of those nested parentheses will be the partition key.

Next issue is how we will delete or update users that need to be unsuspended. The admin could have the user_id and occured_on and that wouldn't be a problem as he could do a query like this:

```
DELETE FROM users_by_status WHERE status = 'SUSPENDED' and occurred_on = ... and user_id = ...
```

Unfortunately that admin could get a request from some privileged managers to unsuspend a user. The manager don't know when the suspension happened, they only know who is the user. That means that we can't access to the concrete row as we don't have 'occurred_on'. Remember that to query in Cassandra you need to provide the whole partition key (otherwise Cassandra won't know in which node it has to go to fetch the data) and optional parts of the clustering key (but always from left to right).

In order to overcome this issue we could create a secondary index into 'user_id' column. In relational databases, indexes allow us to query faster some data creating a denormalised structure. In Cassandra those secondary indexes allows us query by columns that otherwise will be impossible to use. However, they're disencouraged as they're a great hit in performance, as they require several roundtrips into different nodes.

Next solution is creating our own secondary index manually in something called reverse lookup. Let's see how it looks:

```
CREATE TABLE suspended_users (
  user_id uuid,
  occurred_on timestamp,
  PRIMARY KEY (user_id)
);
```

This table will serve us as reverse lookup. Just having the 'user_id' we'll be able to access to 'occurred_on' value and then we'll be able to query users_by_status table. This approach has some drawbacks. Whenever we insert or delete a user we'll have to go to two tables, but that's a fixed number. With a secondary index we will have to go to N nodes in the worst case. So it goes from O(1) to O(N). Our code will be more complicated also, as we'll have to contact with two different tables.

That presents a more serious drawback that is eventual consistency and transactions in Cassandra. Transactions are not built in the core of Cassandra (there are concepts like lightweight transactions or batches, but those are inefficient too), so that means that our code needs to take care manually about transactions.

If we want to delete a user we should start from users_by_status table. If we start the other way around, and the second deletion fails, we'll be unable to delete in the future that row as we've deleted the reverse lookup entry. We can introduce the Saga pattern that basically defines a rollback nemesis in every single step of a programmatic transaction.

## CONCLUSION

As you could see, something pretty straightforward in a relational database as querying paginated a set of sorted data, could be tricky in Cassandra as soon as we introduce some requirements. If your infrastructure allows it, you should use a polyglot persistence approach that uses the best tool for every use case. Anyway, Cassandra gives you enough flexibility to model data even when it's not its best use case.

