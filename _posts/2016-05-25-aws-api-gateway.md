---
layout: post
asset-type: post
name: aws-lambdas-with-api-gateway 
title: AWS Lambda with API Gateway
date: 2016-05-25 00:20:00 +00:00
author: Mashooq Badar 
image:
   src: /assets/img/custom/blog/aws-api-gateway.png
tags:
- microservices 
- devops 
- aws
- serverless
---

In a [previous post](/2016/05/11/aws-lambdas) I showed you how to create and deploy an AWS Lambda. We will continue that work and look at updating just the code for that lambda. We will also add a REST endpoint to the AWS Lambda using [AWS API Gateway](https://aws.amazon.com/api-gateway). 


So before you continue ... if you haven't already, please follow the instruction in the [previous post](/2016/05/11/aws-lambdas) to make sure you have a running AWS Lambda instance.

### Step 1: Update your lambda 
Paste the following in ```update-lambda.sh```

```shell
#!/bin/bash

### Create the lambda package
zip -j helloworld.zip *.py

function_name="helloworld"
package_file=helloworld.zip

### Update the lambda code
aws lambda update-function-code \
  --function-name $function_name \
  --zip-file fileb://$package_file
```

or for Java 

```shell
#!/bin/bash

### Create the lambda package
mvn package

function_name="helloworld"
package_file="target/lambda-java-example-1.0-SNAPSHOT.jar"

### Update the lambda code
aws lambda update-function-code \
   --function-name $function_name \
   --zip-file fileb://$package_file
```

Make the script executable ```chmod +x update-lambda.sh``` and update your lambda ```./update-lambda.sh```. 


### Step 2: Pass something to your lambda

Now that we know how to update the lambda in the cloud, lets make a change so we can pass something as a parameter. Rather than saying "hello world!" we want it to say hello to whomever.

In Python:

```python
def lambda_handler(event, context):
    return "Hello {}!".format(event['to'])
```

or like the following in Java:

```java
package example;

import com.amazonaws.services.lambda.runtime.Context;

public class Hello {
  public String lambdaHandler(Request request, Context context) {
    return "Hello " + request.getTo() + "!";
  }
}

class Request {
  private String to;
  public void setTo(String to) { this.to = to; }
  public String getTo() { return to; }
}
```

### Step 3: Tell the lambda to say hello to whomever
 
```shell
aws lambda invoke --invocation-type RequestResponse --function-name helloworld --payload '{"to": "whomever"}' output.txt
```

You should see _Hello whomever!_ in output text

### Step 4: Lets add the rest API
Paste the following script into a file such as ```create-api.sh```, change permissions for the file to execute, and execute the script. Take a deep breath ...

_Note: this script expects the AWS_REGION and AWS_ACCOUNT_ID environment variables to be defined_

```shell
#!/bin/bash
set -e

region=$AWS_REGION
account_id=$AWS_ACCOUNT_ID

echo "Creating a new API and capturing it's ID ..."
api_id=$(aws apigateway create-rest-api \
   --name HelloWorldAPI \
   --description "Hello World API" \
   --output text \
   --query 'id')
echo "> API ID is: $api_id"

echo "Storing the API ID on disk - we'll need it later ..."
echo $api_id > api_id.txt

echo "Geting the root resource id for the API ..."
root_id=$(aws apigateway get-resources \
   --rest-api-id "${api_id}" \
   --output text \
   --query 'items[?path==`'/'`].[id]')
echo root_id=$root_id

echo "Creating a resource for the /hello path"
resource_id=$(aws apigateway create-resource \
  --rest-api-id "${api_id}" \
  --parent-id "${root_id}" \
  --path-part hello | jq -r .id) 
echo "Resource id is $resource_id"

echo "Creating the GET method on the /hello resource"
aws apigateway put-method \
  --rest-api-id "${api_id}" \
  --resource-id "${resource_id}" \
  --http-method GET \
  --authorization-type NONE 

echo "Integrating the GET method to lambda. Note that the request tempalate uses API Gateway template language to pull in the query parameters as a JSON event for the lambda."
aws apigateway put-integration \
  --rest-api-id "${api_id}" \
  --resource-id "${resource_id}" \
  --http-method GET \
  --type AWS \
  --request-templates '{ "application/json": "{\n  #foreach($param in $input.params().querystring.keySet())\n    \"$param\": \"$util.escapeJavaScript($input.params().querystring.get($param))\" \n   #end\n  }" }' \
  --integration-http-method POST \
  --uri arn:aws:apigateway:${region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${region}:${account_id}:function:helloworld/invocations

echo "Creating a default response for the GET method"
aws apigateway put-method-response \
  --rest-api-id "${api_id}" \
  --resource-id "${resource_id}" \
  --http-method GET \
  --status-code 200 
     
echo "Creating a default response for the integration"
aws apigateway put-integration-response \
  --rest-api-id "${api_id}" \
  --resource-id "${resource_id}" \
  --http-method GET \
  --status-code 200 \
  --selection-pattern ".*"

echo "Adding permission for the API to call the lambda for test so we can use the console to make the api call"
aws lambda add-permission \
  --function-name helloworld \
  --statement-id apigateway-helloworld-get-test \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${region}:${account_id}:${api_id}/*/GET/hello"

echo "Adding permission for the API to call the lambda from any HTTP client"
aws lambda add-permission \
  --function-name helloworld \
  --statement-id apigateway-helloworld-get \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:${region}:${account_id}:${api_id}/api/GET/hello"

echo "Creating a deployment"
aws apigateway create-deployment \
  --rest-api-id "${api_id}" \
  --stage-name api 

echo "All done! you can invoke the api on https://${api_id}.execute-api.${region}.amazonaws.com/api/hello?to=whomever"
```

### Step 5: Invoke the API
The last output of the scripts provides the URL that you can paste into the browser. You should see the response "Hello whomever!" once you hit enter in the brower.

### Step 6: The Cleanup
You can use the ```delete.sh``` script created in the previous post to delete the lambda. To delete the api: Paste the following script and execute as as per usual.

```shell
#!/bin/bash
echo "Reading API id that I store in my create-api script"
api_id=$(<api_id.txt)

echo "Removing the permissions from the lambda"
aws lambda remove-permission \
  --function-name helloworld \
  --statement-id apigateway-helloworld-get
aws lambda remove-permission \
  --function-name helloworld \
  --statement-id apigateway-helloworld-get-test

echo "Deleting the API"
aws apigateway delete-rest-api \
  --rest-api-id "${api_id}"
```

### Step 7: Relax ... its over ;)
... for now!!!
