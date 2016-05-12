---
layout: post
name: aws-lambdas 
title: AWS Lambda for Beginners
date: 2016-05-11 00:20:00 +00:00
author: Mashooq Badar 
image:
   src: /assets/img/custom/blog/aws-lambda.png
tags:
- microservices 
- devops 
- aws
---

AWS Lambda is a compute service from Amazon. It makes deployment and provisioning very simple and fits very well with microservices based architecture. You can find out more about AWS Lambda [here](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html). Currently supported platforms are JVM, Node JS and Python. 

The programming model for AWS Lambda consists of **Handler, Context Object, Logging and Exceptions**. These are described [here](http://docs.aws.amazon.com/lambda/latest/dg/programming-model-v2.html). An instance of AWS Lambda must not hold state because it will be stopped, started and replicated as needed. Persistent state should be stored in a service that is outside the lifecycle of the lambda such as Amazon DynamoDB, S3 etc.

First of all follow the instructions [here](http://docs.aws.amazon.com/lambda/latest/dg/setup.html) to setup an AWS Account and AWS Command-line Interface and note down your account id. 

### Step 1: The Code
The most basic lambda will look like the following in Python:

```python
def lambda_handler(event, context):
  return "Hello World!"
```

or like the following in Java:

```java
package example;

import com.amazonaws.services.lambda.runtime.Context; 

public class Hello {
    public String lambdaHandler(String event, Context context) {
        return "Hello World!";
    }
}
```


You can follow the, somewhat lengthy, instructions [here](http://docs.aws.amazon.com/lambda/latest/dg/get-started-create-function.html) to deploy this function … but that’s no fun! Let’s do it devops style ;)

Paste the above Python code in a file called ```helloworld.py```. If you want to use the Java version then follow the instructions [here](http://docs.aws.amazon.com/lambda/latest/dg/java-create-jar-pkg-maven-no-ide.html) to build your lambda and create a deployment package using Maven.

### Step 2: The Role
Create a ```trust.json``` file . The trust allows our function to assume the [role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) of an AWS Lambda. 

In ```trust.json``` we are allowing the function to assume the role of a ```lambda.amazonaws.com``` service.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "",
    "Effect": "Allow",
    "Principal": {
      "Service": "lambda.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
  }]
}
```

### Step 3: The Deployment 

Create the following script (```deploy.sh```). _Note: the script assumes that you have the ```AWS_ACCOUNT_ID``` environment variable set._ 

```shell
#!/bin/bash

### Create the lambda package
zip -j helloworld.zip *.py

### Create the role for the lambda to assume
role="helloworld_exec_role"
trust="trust.json"
aws iam create-role --role-name $role --assume-role-policy-document file://$trust
aws iam update-assume-role-policy --role-name $role --policy-document file://$trust

### Create the lambda function
function_name="helloworld"
handler_name="helloworld.lambda_handler"
package_file=helloworld.zip
runtime=python2.7
aws lambda create-function \
  --function-name $function_name \
  --handler $handler_name \
  --runtime $runtime \
  --memory 512 \
  --timeout 60 \
  --role arn:aws:iam::${AWS_ACCOUNT_ID}:role/$role \
  --zip-file fileb://$package_file
```

or for java

```shell
#!/bin/bash

### Create the lambda package
mvn package

### Create the role for the lambda to assume
role="helloworld_exec_role"
trust="trust.json"
aws iam create-role --role-name $role --assume-role-policy-document file://$trust
aws iam update-assume-role-policy --role-name $role --policy-document file://$trust

### Create the lambda function
function_name="helloworld"
handler_name="example.Hello::lambdaHandler"
package_file="target/lambda-java-example-1.0-SNAPSHOT.jar"
runtime="java8"
aws lambda create-function \
  --function-name $function_name \
  --handler $handler_name \
  --runtime $runtime \
  --memory 512 \
  --timeout 60 \
  --role arn:aws:iam::${AWS_ACCOUNT_ID}:role/$role \
  --zip-file fileb://${package_file}
```

Make the script executable ```chmod +x deploy.sh``` and deploy your lambda ```./deploy.sh```. You may get the following error: "The role defined for the function cannot be assumed by Lambda." This is because the role has not been replicated through in the Amazon infra. Just run the deploy script again. It will complain that the role already exists but this time the lambda creation should pass. In the future we will look at a staus check to make sure that the role has been fully created before we deploy the function.

### Step 5: The Execution!

Invoke your lambda with the below command. You should see the result in the file called ```output.txt```
 
```shell
aws lambda invoke --invocation-type RequestResponse --function-name helloworld --payload '[""]' output.txt
```

### Step 6: The Cleanup

To delete the lambda function and then the role paste the following in ```delete.sh```

```shell
#!/bin/bash
role="helloworld_exec_role"
function_name="helloworld"
aws lambda delete-function --function-name $function_name
aws iam delete-role --role-name $role
```

Then make the script executable ```chmod +x delete.sh``` and execute ```./delete.sh```

### Step 7: Relax ... you have arrived ;)
... and wait for the next post on AWS frolics 
