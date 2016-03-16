---
layout: post
name: code-smells-part-one
title: Code Smells – Part I
date: 2016-03-16 12:10:00 +00:00
author: Ana Nogal
canonical:
    name: my personal blog
    href: http://www.ananogal.com/blog/code-smells-part-one/
image:
    src: /assets/img/custom/blog/code-smells.jpg
    attribution:
        text: Via Flickr/Creative Commons/Brian Fitzgerald
tags:
- bloaters
- code smells
- long classes/methods
---
Last weekend I was at the [SoCraTes Canaries](https://twitter.com/hashtag/socracan16) and I gave my first talk ever...oh boy! How nervous was I! But now that that has passed I was wondering what I should do with all information I collected: and then I thought, maybe it's a good idea to put it all in a nice blog post...well I guess I'll do it in more than one because it's a very big topic. Essentially if you want to develop in some subtopics as I do. So let's start and see where this can lead us to.

# Bloaters

Bloaters can be big methods or classes, primitive obsessions, data clumps, or long parameters list.

### Long Parameter List/Data Clumps

The Long Parameter List is when you have a method that has more than 3 parameters. Sometimes we see that when we receive an object, and instead of passing it all we pass some of its data. In this case, the best policy is to pass the whole object. Data Clamps are a bit different: they are, in general, primitive values that start do "get together". A good example of this is a startDate and endDate... Maybe it's worth creating a DateRange.

### Primitive Obsession

This case is when we use primitives instead of small objects for simple tasks. Sometimes the use of primitives starts to be reasonable, but when you start to have behaviour attached to this primitives, then it's time to stop and think that maybe a value type is in order. A simple example is a currency: we tend to put it in a float/double, instead of encapsulating it in a value type.

### Long Method / Large Class
This kind of code smell happens when you have a big method. But, when do you know that a method has become too big? Well, I have the rule that with more than 5 lines, you should, at least, look at it again. But, as [Sandro](https://twitter.com/sandromancuso) told me before, the right number of lines are just enough lines so a method only does one thing.

To do this blog I started to look at my old code when I hadn't woken up yet to craftsmanship: If it was working that was good enough for me. Here's the code in Objective-C:

`````
- (void) postToServer
{
    PostSerializer* postSerializer = [[PostSerializer alloc] init];
    NSString *post = [postSerializer serializePostWithTitle:self.txtTitle.text description:self.txtDescription.text author:self.txtUser.text game:self.game];

    NSMutableDictionary *postParams = [NSMutableDictionary dictionary];
	[postParams setObject:txtTitle.text forKey:@"title"];
	[postParams setObject:post forKey:@"data"];
	[postParams setObject:txtUser.text forKey:@"username"];
    [postParams setObject:txtPassword.text forKey:@"password"];

	NSArray *args = [NSArray arrayWithObjects:[NSNumber numberWithInt:0], postParams, nil];

#ifdef DEBUG_LOG
    XMLRPCRequest *request = [[XMLRPCRequest alloc] initWithURL:
                              [NSURL URLWithString:@"http://localhost:8888/letsbasket/xmlrpc.php"]];
    DLog(@"Debug");
#else
    XMLRPCRequest *request = [[XMLRPCRequest alloc] initWithURL:[NSURL URLWithString:[UtilsHelper localizeString:@"UrlXmlRPCKey"]]];
    DLog(@"Producao");
#endif

	[request setMethod:@"letsBasket.AddPost" withParameters:args];

    NSError *error = nil;
	XMLRPCResponse* result = [XMLRPCConnection sendSynchronousXMLRPCRequest:request error:&error];

    //DLog(@"%@", [request body]);
    //DLog(@"%@", [result body]);

    UIApplication *app = [UIApplication sharedApplication];
    app.networkActivityIndicatorVisible = NO;

    [self dismissWaitingAlert];

    if(error != nil || [[result body] rangeOfString:@"<name>error</name>"].location != NSNotFound)
    {
        int location_start = [[result body] rangeOfString:@"<string>"].location + 8;
        int location_end = [[result body] rangeOfString:@"</string>"].location;

        NSString *message = [[[result body] substringWithRange:NSMakeRange(location_start, location_end- location_start)] unescapedString];
        NSString* title = [UtilsHelper localizeString:@"PublishVC_ErrorRetreivingAlertTitle_key"];
        [self showAlertWithErrorMessage:message Title:title];
	return;
	}

    [self processPublishResult:result];
}
`````

Wow! This is really a big method. And this is inside a ViewController class, so definitely this should be extracted into a service class, so we have a correct separation of concerns. But for the sake of the brevity, let's focus on how can we refactor this big method.
The refactoring technique to apply here is **Extract Method**: you can aggregate code together and extract then to a new method. So let's see what we can come up with:

We can start with grouping the code that refers to serializing a post:

````
- (NSString *)serializePost
{
    PostSerializer* postSerializer = [[PostSerializer alloc] init];
    NSString *post = [postSerializer serializePostWithTitle:self.txtTitle.text description:self.txtDescription.text author:self.txtUser.text game:self.game];
    return post;
}

````

Then we can do it for the parameters of the request:

````
- (NSArray *)createPostParams:(NSString *)post
{
    NSMutableDictionary *postParams = [NSMutableDictionary dictionary];
    [postParams setObject:txtTitle.text forKey:@"title"];
    [postParams setObject:post forKey:@"data"];
    [postParams setObject:txtUser.text forKey:@"username"];
    [postParams setObject:txtPassword.text forKey:@"password"];

    NSArray *args = [NSArray arrayWithObjects:[NSNumber numberWithInt:0], postParams, nil];
    return args;
}

````

With all this in place we are now ready to create a XMLRPCRequest:

````
- (XMLRPCRequest *)createXMLRPCRequestWithArgs:(NSArray*)args {

    XMLRPCRequest *request;

#ifdef DEBUG_LOG
   request = [[XMLRPCRequest alloc] initWithURL:
                              [NSURL URLWithString:@"http://localhost:8888/letsbasket/xmlrpc.php"]];
    DLog(@"Debug");
#else
    request = [[XMLRPCRequest alloc] initWithURL:[NSURL URLWithString:[UtilsHelper localizeString:@"UrlXmlRPCKey"]]];
    DLog(@"Producao");
#endif

    [request setMethod:@"letsBasket.AddPost" withParameters:args];

    return request;
}

````
We can also extract a method with some display updates:

````
- (void)updateDisplay
{
    UIApplication *app = [UIApplication sharedApplication];
    app.networkActivityIndicatorVisible = NO;

    [self dismissWaitingAlert];
}
````
And last but not least we can extract the preparation for displaying the error message:

````
- (void)showError:(NSString*)bodyResult {

    int location_start = [bodyResult rangeOfString:@"<string>"].location + 8;
    int location_end = [bodyResult rangeOfString:@"</string>"].location;

    NSString *message = [[bodyResult substringWithRange:NSMakeRange(location_start, location_end- location_start)] unescapedString];
    NSString* title = [UtilsHelper localizeString:@"PublishVC_ErrorRetreivingAlertTitle_key"];
    [self showAlertWithErrorMessage:message Title:title];
}
````
With all these extractions our method now looks pretty neat:

````
- (void) postToServer
{
    NSString *post = [self serializePost];
    NSArray *args = [self createPostParams:post];
    XMLRPCRequest *request = [self createXMLRPCRequestWithArgs: args];
    NSError *error = nil;

	XMLRPCResponse* result = [XMLRPCConnection sendSynchronousXMLRPCRequest:request error:&error];

    [self updateDisplay];

    if(error != nil || [[result body] rangeOfString:@"<name>error</name>"].location != NSNotFound)
    {
        [self showError:[result body]];
		return;
	}

    [self processPublishResult:result];
}
````

Hum... we can do this even better... let's look at the method createXMLRCPRequest and see if we can call the others from there...in this case, it makes sense to have all together.

````
- (XMLRPCRequest *)createXMLRPCRequest {

    NSString *post = [self serializePost];
    NSArray *args = [self createPostParams:post];

    XMLRPCRequest *request;

#ifdef DEBUG_LOG
   request = [[XMLRPCRequest alloc] initWithURL:
                              [NSURL URLWithString:@"http://localhost:8888/letsbasket/xmlrpc.php"]];
    DLog(@"Debug");
#else
    request = [[XMLRPCRequest alloc] initWithURL:[NSURL URLWithString:[UtilsHelper localizeString:@"UrlXmlRPCKey"]]];
    DLog(@"Producao");
#endif

    [request setMethod:@"letsBasket.AddPost" withParameters:args];

    return request;
}
````

And our original method now looks like this:

````
- (void) postToServer
{
    XMLRPCRequest *request = [self createXMLRPCRequest];
    NSError *error = nil;

	XMLRPCResponse* result = [XMLRPCConnection sendSynchronousXMLRPCRequest:request error:&error];

    [self updateDisplay];

    if(error != nil || [[result body] rangeOfString:@"<name>error</name>"].location != NSNotFound)
    {
        [self showError:[result body]];
		return;
	}

    [self processPublishResult:result];
}
````
Well, here you go: a method with more than 5 lines and I think that's ok. :)
As we can see it's really easy to let a method grow. But it's really easy to refactor and have a cleaner code too.

### Conclusion
In general, bloaters are viewed as code that, over time, "get out of hands".  
Remember, code smells sometimes can't be removed, but it's good to know that they are there and you know **why** they are there.
