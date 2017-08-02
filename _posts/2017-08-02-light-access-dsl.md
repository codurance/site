---
layout: post
name: light-access-dsl
title: Light Access - A simple JDBC DSL
date: 2017-08-02 12:00:00 +00:00
author: Sandro Mancuso
image:
   src: /assets/img/custom/blog/2017-06-13-how-do-I-convince.jpg
tags:
- craftsmanship
- cleancode
- jdbc
- postgresql
---

I prefer not to couple my entities (or data structures as I prefer to call them) to my database, neither via [annotations][1] nor via frameworks that use naming convention. I like to have total freedom to map whatever data in whatever format I have stored to whatever data structure I want to use in each business flow. As I like to test-drive everything I do, I also like to have full control of my code. However, I don’t want to write a lot of boiler plate code. For that reason I decided to externalise a library I created in one of our internal projects at Codurance. [Light Access][2] is a very simple [DSL][3] on top of [JDBC][4] that I use to in my [repositories][5].


## A quick overview of some of the features

_For a full view of all the features, please check [Light Access GitHub repository][2]_

The main class to look at is [LightAccess][6]. I recommend to have this class injected into your repositories.

LightAccess receives a [DataSource][7] in its constructor and you can pass a connection pool to it. Let's do it using [h2][8].  

```Java
import com.codurance.lightaccess.LightAccess;
import org.h2.jdbcx.JdbcConnectionPool;
``` 

```Java
JdbcConnectionPool jdbcConnectionPool = JdbcConnectionPool.create("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", "user", "password");
LightAccess lightAccess = new LightAccess(jdbcConnectionPool);
``` 


### Executing DDL statements

First let's define a DDL statement which creates a table called `products` with 3 fields: 

```java
    private static final String CREATE_PRODUCTS_TABLE = 
        "CREATE TABLE products (id integer PRIMARY KEY, name VARCHAR(255), date TIMESTAMP)";
```

So now, the only thing we need to do is to use the LightAccess to execute this DDL command.

```java
    lightAccess.executeDDLCommand((conn) -> conn.statement(CREATE_PRODUCTS_TABLE).execute());
``` 

And that's it. No exception handling or dealings with database connections. It is all handled for you.

Alternatively, you can extract the lambda to a method. 

```java
    private DDLCommand createProductsTable() {
        return (conn) -> conn.statement(CREATE_PRODUCTS_TABLE).execute();
    }
```

And use it like this. 

```java
    lightAccess.executeDDLCommand(createProductsTable());
```


### Executing DML statements

Let's assume we have an object `Product` that we want to populate with data stored in the `products` table. 

```java
    public class Product {
        private int id;
        private String name;
        private LocalDate date;    
        
        Product(int id, String name, LocalDate date) {
            this.id = id;
            this.name = name;
            this.date = date;
        }
    
        // getters
        // equals and hashcode    
    }
```   


#### Select - multiple results 

Let's take the following select statement:

```java
    private static final String SELECT_ALL_PRODUCTS_SQL = "select * from products";
```

Now let's create a method that returns a lambda:

```java
    private SQLQuery<List<Product>> retrieveAllProducts() {
        return conn -> conn.prepareStatement(SELECT_ALL_PRODUCTS_SQL)
                            .executeQuery()
                            .mapResults(this::toProduct);
    }
```

For mapping the database results to Product objects we need to pass a lambda `toProduct`:

```java
    private Product toProduct(LAResultSet laResultSet) {
        return new Product(laResultSet.getInt(1),
                           laResultSet.getString(2),
                           laResultSet.getLocalDate(3));
    }
```

Now we just need to invoke the query. 

```java
    List<Product> products = lightAccess.executeQuery(retrieveAllProducts());
```

And in case you prefer the inlined version:

```java
    List<Product> products = lightAccess.executeQuery(conn -> 
        conn.prepareStatement(SELECT_ALL_PRODUCTS_SQL)
			.executeQuery()
            .mapResults(this::toProduct));
```


#### Update

Let's say that we wan to update the name of the given product.

```java
private static final String UPDATE_PRODUCT_NAME_SQL = "update products set name = ? where id = ?";
```

Now we can execute the update:

```java
    lightAccess.executeCommand(updateProductName(1, "Another name"));
```

```java
    private SQLCommand updateProductName(int id, String name) {
        return conn -> conn.prepareStatement(UPDATE_PRODUCT_NAME_SQL)
                            .withParam(name)
                            .withParam(id)
                            .executeUpdate();
    }
```

## Further documentation

For the full documentation on how to execute multiple DDL statements, return a single record, map joins, normalise one-to-many relationships, execute INSERT, DELETE, UPDATE statements, return value from sequences, please check [Light Access GitHub repository][2].



[1]: https://docs.oracle.com/javase/tutorial/java/annotations/
[2]: https://github.com/codurance/light-access
[3]: https://en.wikipedia.org/wiki/Domain-specific_language
[4]: http://www.oracle.com/technetwork/java/overview-141217.html
[5]: https://martinfowler.com/eaaCatalog/repository.html
[6]: https://github.com/codurance/light-access/blob/master/src/main/java/com/codurance/lightaccess/LightAccess.java  
[7]: https://docs.oracle.com/javase/8/docs/api/javax/sql/DataSource.html
[8]: http://www.h2database.com/html/main.html 







