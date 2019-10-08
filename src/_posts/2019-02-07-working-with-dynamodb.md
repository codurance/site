---
author: André Guelfi Torres
layout: post
asset-type: post
title: "An introduction to DynamoDB and its SDK"
date: 2019-02-13 00:00:00
description: Migrating a ToDo app to DynamoDB
image: 
    src: /assets/custom/img/blog/2019-02-13-working-dynamodb.png
    thumbnail: /assets/custom/img/blog/2019-02-13-working-dynamodb-thumbnail.png
    alt: Console application printing to do list
abstract: In this post we are going to migrate an CLI application from local storage to DynamoDB
tags: 
- dynamodb 
- aws
---

DynamoDB is a NoSQL database provided by Amazon, it works as a key-value store or document database with really fast response times. It's fully managed, taking this burden from you and it has many features built in. In this post, we are going to migrate a CLI application from using local storage to use DynamoDB and go through the basic operations of its SDK in the JVM. 

## Part 0 - The application. 

We have this application called **Tasqui** that can be found in [THIS](https://github.com/andre2w/tasqui) repository. It is another todo list for the command line. I know, very creative. 

Right now this application has 3 main actions `add`, `tasks`, `remove`. 

```shell
$  tasqui
Usage: tasqui [OPTIONS] COMMAND [ARGS]...

Options:
  -h, --help  Show this message and exit

Commands:
  add     Add new task
  tasks   Prints all tasks
  delete  Delete a task
```

It's a very simplistic application and everything is saved to a JSON file. Recently I thought that having everything synced between my personal and work laptops would be a great idea. 

Using a relational database for that would be very annoying. I don't want to deal with a schema right now and I don't want to be stuck with my past decisions. Since the application is already saving a JSON file, DynamoDB is a good option (and if I chose an RDBMS, I could not write about DynamoDB).

## Part 1 - Getting access to DynamoDB and the `aws` CLI

We need access to our application to read and write. Is good pratice to have a user for each application, so we will create one and assign a role to it.

When creating a user for your application you must know which kind of permissions you will give to him, starting with the `Access Type`. In this case we are creating a user for our application, so we don't have any reason to give access to the AWS Management Console. 

![Create user screen]({{ '/assets/custom/img/blog/2019-02-13-create-user.png' | prepend: site.baseurl }})

Going forward we have to deterine the level of access our user will need and choose appropriate roles. The application is Reading and Writing from a single DynamoDB table, the `AmazonDynamoDBFullAccess` you will grant access to all tables and features. If you need to be more restrictive, it is possible to create a custom policy just to grant access the desired resource. 

![Add role to user]({{ '/assets/custom/img/blog/2019-02-13-add-role.png' | prepend: site.baseurl }})

After the user is created we will be provided with an `Access Key ID` and a `Secret Access Key`, you need to keep those two keys in a safe place because you will need to use them to connect to DynamoDB. If something happens to the key pair you will have to create a new key pair.

In case you don't have the `aws` cli installed and configured you can follow these steps:
- [Installing the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
    
Now we have everything set up, we can move forward and start the work at our application. 

> Reminder: Always give the [least previlege](https://en.wikipedia.org/wiki/Principle_of_least_privilege) possible to a user, if your access keys leak you will have less trouble to recovery.

## Part 2 - Rolling with the changes

Is possible to do those changes in a test-driven way by writing integration tests for all the methods that are going to be needed. The only question is:

    How we are going to test our changes?

Fortunately, Amazon provides a local version of DynamoDB that can be used with docker, so I think we should use it.

#### 2.0 - Setting up DynamoDB docker container

We can start creating a `docker-compose.yml` and mapping the ports, no other changes are required since the default configuration is what we want for testing. You can start the db using `docker-compose up`.

```yml
version: '3.1'

services:

dynamo:
    image: amazon/dynamodb-local:1.11.475
    ports:
    - "8000:8000"
```

The default configuration is:

```shell
Port:	8000 # => Default port
InMemory:	true # => The database will be saved in memory, everytime your container stops you will lose all the data
DbPath:	null # => Path of the database file, can't be used with InMemory
SharedDb:	false # => Use the same database independent of region and credentials
shouldDelayTransientStatuses:	false # => It's a delay to simulate the database in a real situation
CorsParams:	* # => CORS configuration to give access to foreign resources
```

We can see if everything is working by executing in our command line: 

```shell
$ aws dynamodb list-tables --endpoint-url http://localhost:8000
{
    "TableNames": []
}
```

The `--endpoint-url http://localhost:8000` is very important, without this option the request will be redirected to the default endpoint.

With the container running we can start to think about how we are going to set up our tests for the feature. The first thing is to bring the DynamoDB sdk to our project: 

```
implementation 'software.amazon.awssdk:dynamodb:2.4.0'
```

### 2.1 - The First Integration Test

Now we can finally start to write some code, we already have a repository and we want to be able to switch between implementations. So let's extract an interface from `LocalFileTaskRepository` with the method `save`. 

First, we extract an `interface` from our repository with the method `save`. 

```kotlin
interface TaskRepository {
    fun save(task: Task)
}
```

Let's make a test for our repository. Starting our test we are going to need to connect to the database and create the table before doing any testing. 

```kotlin
class DynamoDBTaskRepositoryShould {

    @Test
    internal fun `add Task to table`() {
        val endpoint = "http://localhost:8000"

        val dynamoDbClient = DynamoDbClient.builder()
            .endpointOverride(URI.create(endpoint))
            .build()        
    }
}
```

The connection is very straightforward since we don't have to authenticate to connect to our local DynamoDB, the only thing that we have to do is to set our endpoint to be `http://localhost:8000`. With the `dynamoDbClient` now we can proceed to create the table.  

```kotlin
class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {
        ...
        dynamoDbClient.createTable { builder ->
            builder.tableName("tasqui")

            builder.provisionedThroughput { provisionedThroughput ->
                provisionedThroughput.readCapacityUnits(5)
                provisionedThroughput.writeCapacityUnits(5)
            }

            builder.keySchema(
                KeySchemaElement.builder()
                    .attributeName("task_id")
                    .keyType(KeyType.HASH)
                    .build()
            )

            builder.attributeDefinitions(
                AttributeDefinition.builder()
                    .attributeName("task_id")
                    .attributeType(ScalarAttributeType.N)
                    .build()
            )
        }
    }
}
```

So, what's going on in this `createTable` method? Let's break down command by command and see:

```kotlin
builder.tableName("tasqui")
```

This is a fairly easy part, we are just setting the name of the table, then we have:

```kotlin
builder.provisionedThroughput { provisionedThroughput ->
    provisionedThroughput.readCapacityUnits(5)
    provisionedThroughput.writeCapacityUnits(5)
}
```

This part is seeting the throughput for the table, which is the ability to read and write things to the db. We are setting the read and write throughput to 5, but 5 what exactly? How the throughput is calculated? 

The throughput is measured in `units`, each `unit` might have different values depending on which kind of operation you are doing. For reads, each `unit` is 4Kb/s for consistently strong read, and 8Kb/s for eventually consistent. Writes are a bit easier, 1 `unit` is 1Kb/s and you don't have any difference between strong or eventual consistency. 

In this case, 5 was chosen since is the default value that Amazon gives to you in the free tier.  

Moving to our actual table, we have to set the Primary Key:

```kotlin
builder.keySchema(
    KeySchemaElement.builder()
        .attributeName("task_id")
        .keyType(KeyType.HASH)
        .build()
)

builder.attributeDefinitions(
    AttributeDefinition.builder()
        .attributeName("task_id")
        .attributeType(ScalarAttributeType.N)
        .build()
)
```

This sets the Primary Key to be named `task_id` and to have a `Partition Key` only by defining the `keyType` to `HASH`, then we set the type of our key, in this case, is an `integer` so we set as `ScalarAttributeType.N`. You can also set has a `string` or `binary`.

Now everything is ready we can start writting our assertion. We want the repository to save a task in the database, so we can query for the object that we just saved to see if it is really there. 

```kotlin

class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {
        ...
        val task = Task(1, "Task description")

        val item = dynamoDbClient.getItem(
                GetItemRequest.builder()
                    .tableName("tasqui")
                    .key(mapOf("task_id" to AttributeValue.builder().n("1").build()))
                    .build()).item()

        val storedTask = Task(item["task_id"]!!.n().toInt(), item["description"]!!.s())

        Assertions.assertEquals(storedTask, task)
    }
}
```

The sdk provides the method `getItem` to query specific items from the database, we have to build a `GetItemRequest` passing the `tableName` and the `key`. 

The `key` is a map with the name of your Primary Key and the value that you want to query. The return of `getItem` is a `GetItemResponse` that has only two methods `item` and `consumedCapacity`. In this case we get the `item` which is `Map<String, Attribute>` where we can map to our Task object. Building the `AttributeValue` isn't very complex but the naming behind the methods isn't the best, so you can look at the [docs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeValue.html) to know what they do. Finally, we compare the task from the database with our task. 

The only thing missing is our actual class and the call for the save method between the setup and the assert. 

```kotlin

class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {
        ...
        val task = Task(1, "Task description")

        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDbClient)
        dynamoDbTaskRepository.save(task)

        val item = dynamoDbClient.getItem(
        ...
    }
}
```

```kotlin
class DynamoDbTaskRepository(private val dynamoDbClient: DynamoDbClient) : TaskRepository {

    override fun save(task: Task) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

}
```

Run the tests, and see them failing for the right reason. 

```shell
kotlin.NotImplementedError: An operation is not implemented: not implemented

	at com.github.andre2w.tasqui.DynamoDbTaskRepository.save(DynamoDBTaskRepository.kt:8)
	at com.github.andre2w.tasqui.DynamoDbTaskRepositoryShould.add Task to DynamoDB$com_github_andre2w_tasqui_main(DynamoDbTaskRepositoryShould.kt:47)
...
```

Now we are ready to implement the production code. We have the `dynamoDBClient` being injected in the repository, so the next steps are:

1. Creating an `item` to be inserted
1. Insert the item using `putItem`

```kotlin
class DynamoDbTaskRepository(private val dynamoDbClient: DynamoDbClient) : TaskRepository {

    override fun save(task: Task) {
        val item = mapOf(
            "task_id" to AttributeValue.builder().n(task.id.toString()).build(),
            "description" to AttributeValue.builder().s(task.description).build()
        )

        dynamoDbClient.putItem(
            PutItemRequest.builder()
                .tableName("tasqui")
                .item(item)
                .conditionExpression("attribute_not_exists(task_id)")
                .build())
    }
}
```

We transform the `Task` into `Map<String, AttributeValue>` and we use the `putItem` method with a `PutItemRequest` that we build to insert the item in the table. The insertion seems to be very straight forward beside the `.conditionExpression("attribute_not_exists(task_id)")`.  This `conditionExpression` method is a way to filter or create checks before we make a change in our items, we don't want to override a task if that task already exists, you can see the documentation about `conditionExpression` [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html).

With everything ready, we run the tests, not the jewels, again and this happens: 

```
software.amazon.awssdk.services.dynamodb.model.ResourceInUseException: Cannot create preexisting table (Service: DynamoDb, Status Code: 400, Request ID: d9056558-bb38-4119-a89d-d2323e859a68)
```

Wait, why? This is a tutorial, things are supposed to work out fine without errors, if I wanted errors I could have gone elsewhere. This error is happening because we created the table in the previous test, and every time we run the tests we need a new table, a table so fresh that will move to Bel-Air to live with his uncle. So this time we are doing a `docker-compose down` to erase our container and set up again with `docker-compose up -d`. Now our tests should be passing. 

The test is passing but is relying on the fact that the table doesn't exist. This isn't great, so must be fixed by deleting the table before the tests start. This piece of code is added before the `createTable call` and run the test more than once with the same container (or just keep running the tests furiously to see them passing one after another). 

```kotlin
class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {
        ...

        val tableExists = dynamoDbClient.listTables()
            .tableNames()
            .contains("tasqui")

        if (tableExists) {
            dynamoDbClient.deleteTable(
                DeleteTableRequest.builder()
                .tableName("tasqui")
                .build())
        }

        dynamoDbClient.createTable { builder ->
        ...
        }
    }
}      
```

### 2.2 - Refactoring

With the first test passing, it's time to move to the next step, we need to refactor our code. The first thing noticeable is all the DynamoDB code inside the test, creating the connection, deleting and creating the table, retrieving the Task, all that stuff should not be inside the test, instead, a new helper class could be created. 


#### 2.2.0 Introducing the `DynamoDBHelper`

The helper class that has all the methods that the tests are going to use encapsulated, so there is no need to worry with the implementation. 
The first step is to create the class and make that generate the `DynamoDBHelper` class with `DynamoDbClient` as a property. 

Add the `DynamoDBHelper` with the property, and create a static function that connects to the database and create a new instance of `DynamoDBHelper`, and back in the test class just change the old `dynamoDbClient` variable to use
the one from the helper. 

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {
    
    companion object {

        fun connect(endpoint: String = "http://localhost:8000"): DynamoDbHelper {
            val dynamoDbClient = DynamoDbClient.builder()
                .endpointOverride(URI.create(endpoint))
                .build() ?: throw IllegalStateException()

            return DynamoDbHelper(dynamoDbClient)
        }
    }
}
```

```kotlin
    @Test
    internal fun `add Task to DynamoDB`() {

        val dynamoDbHelper = DynamoDBHelper.connect()
        val dynamoDbClient = dynamoDbHelper.dynamoDbClient
        ...
    }
```

If all tests are passing, and they should be (I think), then it's time to move to the next step.

#### 2.2.1 Creating the table

In this step, we have to move code from the test class to the initialization of the helper. Start by extracting all the code for the table (create/delete) into a method.

```kotlin
class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {

        val dynamoDbHelper = DynamoDBHelper.connect()
        val dynamoDbClient = dynamoDbHelper.dynamoDbClient

        setupTable(dynamoDbClient)
        ...
    }

    private fun setupTable(dynamoDbClient: DynamoDbClient) {
        //all that code to delete and create the table
    }
}
```

Move that method to the `DynamoDBHelper` class, change so it can use the `dynamoDbClient` from the helper, and make the test call the method in the helper:

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {
    fun setupTable() {
        val tableExists = dynamoDbClient.listTables()
            .tableNames()
            .contains("tasqui")

        if (tableExists) {
            dynamoDbClient.deleteTable(
                DeleteTableRequest
                    .builder()
                    .tableName("tasqui")
                    .build()
            )
        }

        dynamoDbClient.createTable { builder ->
            builder.tableName("tasqui")

            builder.provisionedThroughput { provisionedThroughput ->
                provisionedThroughput.readCapacityUnits(5)
                provisionedThroughput.writeCapacityUnits(5)
            }

            builder.keySchema(
                KeySchemaElement.builder()
                    .attributeName("task_id")
                    .keyType(KeyType.HASH)
                    .build()
            )

            builder.attributeDefinitions(
                AttributeDefinition.builder()
                    .attributeName("task_id")
                    .attributeType(ScalarAttributeType.N)
                    .build()
            )
        }
    }
}
```

```kotlin
    @Test
    internal fun `add Task to DynamoDB`() {

        val dynamoDbHelper = DynamoDBHelper.connect()
        val dynamoDbClient = dynamoDbHelper.dynamoDbClient

        dynamoDbHelper.setupTable()

        val task = Task(1, "Task description")

        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDbClient)
        dynamoDbTaskRepository.save(task)

        val item = dynamoDbClient.getItem(
                GetItemRequest.builder()
                    .tableName("tasqui")
                    .key(mapOf("task_id" to AttributeValue.builder().n("1").build()))
                    .build()).item()

        val storedTask = Task(item["task_id"]!!.n().toInt(), item["description"]!!.s())

        Assertions.assertEquals(storedTask, task)
    }
```

The tests are passing, everything is going fine in the code but having to set up the table manually isn't the best option, so just move that `setupTable` to the initialization of `DynamoDBHelper` and make it private.

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {

    init {
        setupTable()
    }
    ...
}
```

```kotlin
class DynamoDbTaskRepositoryShould {

    @Test
    internal fun `add Task to DynamoDB`() {

        val dynamoDbHelper = DynamoDBHelper.connect()
        val dynamoDbClient = dynamoDbHelper.dynamoDbClient

        val task = Task(1, "Task description")

        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDbClient)
        dynamoDbTaskRepository.save(task)

        val item = dynamoDbClient.getItem(
                GetItemRequest.builder()
                    .tableName("tasqui")
                    .key(mapOf("task_id" to AttributeValue.builder().n("1").build()))
                    .build()).item()

        val storedTask = Task(item["task_id"]!!.n().toInt(), item["description"]!!.s())

        Assertions.assertEquals(storedTask, task)
    }

}
```

#### 2.2.2 Getting a Task from the DB

This part is like the previous one where the method will be moved to the helper and the test will use the newly created method. 

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {

    init {
        setupTable()
    }

    fun findById(taskId: String): Task {
        val item = dynamoDbClient.getItem(
            GetItemRequest.builder()
                .tableName("tasqui")
                .key(mapOf("task_id" to AttributeValue.builder().n(taskId).build()))
                .build()
        ).item()

        return buildTask(item)
    }

    private fun buildTask(item: MutableMap<String, AttributeValue>) =
        Task(item["task_id"]!!.n().toInt(), item["description"]!!.s())

    ...
}
```

```kotlin
    @Test
    internal fun `add Task to DynamoDB`() {

        val dynamoDbHelper = DynamoDBHelper.connect()
        val dynamoDbClient = dynamoDbHelper.dynamoDbClient

        val task = Task(1, "Task description")

        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDbClient)
        dynamoDbTaskRepository.save(task)

        val storedTask = dynamoDbHelper.findById(task.id.toString())

        Assertions.assertEquals(storedTask, task)
    }
```

Kotlin allows the creation of extension functions, so it's possible to change the `buildTask` method to be something more idiomatic like `Task.from(item)` while making the method only visible inside the helper.

Start adding a `companion object` inside the Task class:

```kotlin
data class Task(val id: Int, val description: String) {
    companion object
}
```

add them insde the helper add the extension method: 

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {
    ...
    fun findById(taskId: String): Task {
        val item = dynamoDbClient.getItem(
            GetItemRequest.builder()
                .tableName("tasqui")
                .key(mapOf("task_id" to AttributeValue.builder().n(taskId).build()))
                .build()
        ).item()

        return Task.from(item)
    }

    ...
    private fun Task.Companion.from(item: MutableMap<String, AttributeValue>) =
        Task(item["task_id"]!!.n().toInt(), item["description"]!!.s())
}
```

#### 2.2.3 Final changes

Now the test isn't cluttered with all the database code, the only thing missing is to remove the `dynamoDbClient` and extract the strings inside the helper. 

```kotlin
    @Test
    internal fun `add Task to DynamoDB`() {
        val dynamoDbHelper = DynamoDBHelper.connect()
        val task = Task(1, "Task description")

        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDbHelper.dynamoDbClient)
        dynamoDbTaskRepository.save(task)

        val storedTask = dynamoDbHelper.findById(task.id.toString())
        assertEquals(storedTask, task)
    }
```

All the references for `task_id` and `tasqui` are using the variable instead of the string now. 

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {

    init {
        setupTable()
    }

    private val primaryKey = "task_id"
    private val tableName = "tasqui"
    ...
    fun findById(taskId: String): Task {
        val item = dynamoDbClient.getItem(
            GetItemRequest.builder()
                .tableName(tableName)
                .key(mapOf(primaryKey to AttributeValue.builder().n(taskId).build()))
                .build()
        ).item()

        return Task.from(item)
    }
    ...
}
```

## 3 - Retrieving data. 

Moving forward with the changes, it's time to implement the retrieval of the data from Dynamo. In the first test, a query was implemented but to get all the data from the table a `scan` operation will be needed. 

### 3.0 To Query or to Scan? 

- Query: A query searches the table based on the Primary Key, a sort key can be used to refine the results, and the results are always sorted by the sort key. All queries are eventually consistent(unless said otherwise) and always scanned forward.

- Scan: Examines every item in the table and return all data attributes. It's possible to use `ProjectionExpression` parameter to refine the scan. Since Scan dumps the entire table, then filter out the results, the operation will get slower if the table grows.

### 3.1 Implementation

Scan is the right option for the `all()` method, and the test can be approached in the following way:

```kotlin
    @Test
    internal fun `retrieve all Tasks`() {
        val task1 = Task(1, "Task description")
        val task2 = Task(2, "Another task description")
        val dynamoDBHelper = DynamoDBHelper.connect()
        val dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDBHelper.dynamoDbClient)
        dynamoDBHelper.save(task1, task2)

        val tasks = dynamoDbTaskRepository.all()

        assertEquals(listOf(task2, task1), tasks)
    }
```

The setup is basically the same thing from the previous one but the Task must be persisted using the `DynamoDBHelper`. The code from the repository can be used here: 

```kotlin
    fun save(vararg tasks: Task) {
        tasks.forEach {
            dynamoDbClient.putItem(
                PutItemRequest.builder()
                    .tableName(tableName)
                    .item(it.toAttributeMap())
                    .conditionExpression("attribute_not_exists(task_id)")
                    .build())
        }
    }
```

> To make easier to insert multiple tasks `vararg` can be used, it translates to the spread operator in java like `Task ...tasks`. 
    
Running the tests, everything is failing for the right reason, time to go for the production code. 

```kotlin
class DynamoDbTaskRepository(private val dynamoDbClient: DynamoDbClient) : TaskRepository {

    override fun all(): List<Task> {
        val scanResponse = dynamoDbClient.scan { scan ->
            scan.tableName("tasqui")
            scan.limit(1)
        }

        return scanResponse.items().map { it.toTask() }
    }
    ...
    private fun MutableMap<String, AttributeValue>.toTask() =
        Task(this["task_id"]!!.n().toInt(), this["description"]!!.s() )
}
```

This should make the tests to pass without any problem.

### 3.1 Refactor

Both tests are creating a new connection to the database, we have to fix that to connect only once and to remove duplications of elements that will be used in the other tests. 

The helper is being created every test and with the helper, a new connection is being created, this is a good thing to be created only once and at the start of the tests, also the `DynamoDBTaskRepository` can be instantiated every new test by junit. 

```kotlin
class DynamoDbTaskRepositoryShould {

    private val dynamoDBHelper: DynamoDBHelper = DynamoDBHelper.connect()
    private lateinit var dynamoDbTaskRepository: DynamoDbTaskRepository

    @BeforeEach
    internal fun setUp() {
        dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDBHelper.dynamoDbClient)
    }

    @Test
    internal fun `add Task to DynamoDB`() {
        val task = Task(1, "Task description")

        dynamoDbTaskRepository.save(task)

        val storedTask = dynamoDBHelper.findById(task.id.toString())
        assertEquals(storedTask, task)
    }

    @Test
    internal fun `retrieve all Tasks`() {
        val task1 = Task(1, "Task description")
        val task2 = Task(2, "Another task description")
        dynamoDBHelper.save(task1, task2)

        val tasks = dynamoDbTaskRepository.all()

        assertEquals(listOf(task2, task1), tasks)
    }
}
```

Now with `DynamoDBHelper` and `DynamoDbTaskRepository` extracted as fields, the other change needed is to delete the table before each test. Recreating the table is easy since there is no way to delete all the items the best way is to delete the table and create a new one. This is something that the repository is already doing, the changes that were done to have everything set is: 

Make the `setupTable` public available:

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {
    fun setupTable() {
        deleteTable()
        createTable()
    }
}
```

and make the test recreate the table before every test: 

```kotlin
class DynamoDbTaskRepositoryShould {

    private val dynamoDBHelper: DynamoDBHelper = DynamoDBHelper.connect()
    private lateinit var dynamoDbTaskRepository: DynamoDbTaskRepository

    @BeforeEach
    internal fun setUp() {
        dynamoDbTaskRepository = DynamoDbTaskRepository(dynamoDBHelper.dynamoDbClient)
        dynamoDBHelper.setupTable()
    }
    ...
}
```

> It's important to mention here, `Scan` will return the items in descending order. So if the order is something important for you, a sorting step will have to take place after retrieving the items for the database. In case of a `Query` instead of a `Scan` the parameter `ScanIndexForward` can be set `true` and DynamoDB will return the items in ascending order.

## 4 - Deleting Tasks

To err is human, to delete is forgetting. It's time to implement the delete method. As always, we start with a test inserting something to the database, deleting what we just inserted and checking if that isn't in the database. 

```kotlin
class DynamoDbTaskRepositoryShould {
    @Test
    internal fun `delete Task from the table`() {
        val task = Task(1, "Task description")
        dynamoDBHelper.save(task)

        dynamoDbTaskRepository.delete(task.id)

        assertThrows<ItemNotFoundInTable> {
            dynamoDBHelper.findById(task.id.toString())
        }
    }
}
```

```kotlin
class DynamoDBHelper(val dynamoDbClient: DynamoDbClient) {
    fun findById(taskId: String): Task {
        val item = dynamoDbClient.getItem(
            GetItemRequest.builder()
                .tableName(tableName)
                .key(mapOf(primaryKey to AttributeValue.builder().n(taskId).build()))
                .build()
        ).item()

        if (item.isEmpty())
            throw ItemNotFoundInTable()

        return Task.from(item)
    }
}
```

The only new thing in this test is the `assertThrows<ItemNotFoundInTable>`, this checks if a method call will throw an exception, and the `ItemNotFoundInTable` is an exception created to be thrown by the helper in case there is no item returned. 
Running the tests, they are failing for the right reasons, so it's time to move to the implementation. 

```kotlin
class DynamoDbTaskRepository(private val dynamoDbClient: DynamoDbClient) : TaskRepository {

    private val tableName = "tasqui"

    override fun delete(id: Int) {
        dynamoDbClient.deleteItem { delete ->
            delete.tableName(tableName)
            delete.key(mapOf("task_id" to id.toAttributeValue()))
        }
    }
    ...
}
```

This is the easiest operation to do, only the `tableName` and the `key` need to be informed, and the deletion will happen. This part there isn't much to refactor, so we can skip for now. 

## 5 - The final countdown (or counter)

The last method to be implemented is `nextId`, this words as the Primary Key generator. The last item has to be retrieved and then we increment 1 to the item id. 
In this case, a `Scan` limited to one item would have the desired effect since the `Scan` is in descending order. 

The first test can start on a happy path where there's already an item in the database: 

```kotlin
class DynamoDbTaskRepositoryShould {
    @Test
    internal fun `retrieve the last inserted id plus one`() {
        val task = Task(1, "Task description")
        dynamoDBHelper.save(task)

        val nextId = dynamoDbTaskRepository.nextId()

        assertEquals(2, nextId)
    }
}
```

and the implementation would be:

```kotlin
class DynamoDbTaskRepository(private val dynamoDbClient: DynamoDbClient) : TaskRepository {

    private val tableName = "tasqui"

    override fun nextId(): Int {
        val items = dynamoDbClient.scan { scan ->
            scan.tableName(tableName)
            scan.attributesToGet("task_id")
        }.items()

        val lastId = items
            .map { it["task_id"]!!.n().toInt()  }
            .max() ?: 0

        return lastId + 1
    }
}
```

It's a `Scan` operation like the one in `all()` but with `scan.attributesToGet("task_id")` so the response will only contain the `task_id` and will be smaller in general. Then that result is converted to the biggest integer. Kotlin has the elvis operator `?:` that helps to handle `null` values, so if there is no items returned the value will be zero. To cover that case we add a test without inserting any task in the arrange part: 

```kotlin
class DynamoDbTaskRepositoryShould {
    @Test
    internal fun `first id should be 1`() {
        val nextId = dynamoDbTaskRepository.nextId()

        assertEquals(1, nextId)
    }
}
```

There isn't much to do, just check if the response from DynamoDB is empty and return 1 for it. 

All tests are passing, everything for the repository is implemented, the only thing missing is a real connecting to the DynamoDB client. 

## 6 - Papers Please!

With all the methods of the repository implemented, its possible to change the application to use the `DynamoDBTaskRepository`. 

```kotlin
class Runner {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val taskRepository = DynamoDbTaskRepository()
            val console = Console()

            Tasqui()
                .subcommands(Add(taskRepository),Tasks(taskRepository, console), Delete(taskRepository))
                .main(args)
        }
    }

}
```

The only problem is that when we try to create a new repository a `DynamoDbClient` need to be injected. We don't have any production code for that, so we have to create a some. 
There's already a connection being created in the helper, we can use the repository: 

```kotlin
class DynamoDBConnection {
    companion object {
        fun connect() : DynamoDbClient  {
            return DynamoDbClient.builder()
                .build() ?: throw IllegalStateException()
        }
    }
}
```

```kotlin
class Runner {
    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            val taskRepository = DynamoDbTaskRepository(DynamoDBConnection.connect())
            val console = Console()

            Tasqui()
                .subcommands(Add(taskRepository),Tasks(taskRepository, console), Delete(taskRepository))
                .main(args)
        }
    }
}
```

And change the commands to use the `TaskRepository` interface instead of the implementations. 

```kotlin
class Tasqui : CliktCommand() {
    override fun run() = Unit
}

class Add(private val taskRepository: TaskRepository) : CliktCommand("Add new task") {
    private val description by argument("description", "Task description")

    override fun run() {
        taskRepository.save(Task(taskRepository.nextId(), description))
    }
}

class Tasks(private val taskRepository: TaskRepository, private val console: Console)
    : CliktCommand("Prints all tasks") {

    override fun run() {
        val tasks = taskRepository.all()

        tasks.map { "${it.id} - ${it.description}" }
            .forEach(console::print)
    }
}

class Delete(private val taskRepository: TaskRepository) : CliktCommand("Delete a task") {
    private val taskId by argument(help = "Id of the task to be deleted").int()

    override fun run() {
         taskRepository.delete(taskId)
    }
}

```

This is a very simplistic way of doing the connection, it will get the `default` profile credentials from your `.aws/credentials` file in the home folder.
Amazon provide the `ProfileCredentialsProvider` if you want a different profile. You can see more about other ways of authenticating [here](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html).

## Packging our application

After doing all the changes you really want to use that as an application, you can package using gradle and the command `gradle assembleDist` will generate a `zip` and a `tar` inside the `build/distributions` folder. You can use the `tasqui` inside that folder without having to call `java -jar` or passing any extra arguments besides the ones for the application.