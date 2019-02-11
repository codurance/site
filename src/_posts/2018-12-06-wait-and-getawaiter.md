---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Await vs GetAwaiter"
date: 2018-12-06 05:00:00
description: A tiny bit of async in your life
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- CSharp
---

While I take my time to put the effort on my Safety Musings part 2 post, I have decided to talk about a small little thing regarding the retrieval of results on C# while using async.

This came to mind as I was looking at someone add `Wait()` to get the result of the async method. It triggered some memory about it, and I decided to play a bit to confirm what I remembered (my memory ain't great).

So lets have some small piece of code, that does nothing of interest, but throws an exception within the async call.

```C#
 class Program
    {
        static void Main(string[] args)
        {
            var thing = new TheThing();
            try
            {
                thing.CallingAsync().Wait();
                //thing.CallingAsync().GetAwaiter().GetResult();
            }
            catch (ArgumentException e)
            {
                Console.WriteLine("This is an argument exception");
                Console.WriteLine($"Message: {e.Message}");
                Console.WriteLine($"Stack: {e.StackTrace}");
            }
            catch (AggregateException e)
            {
                Console.WriteLine("This is an aggregate exception");
                Console.WriteLine($"Message: {e.Message}");
                Console.WriteLine($"Stack: {e.StackTrace}");
            }

            Console.WriteLine("Press any key");
            Console.ReadKey();
        }
    }
    
    public class TheThing
    {
        public async Task CallingAsync()
        {
            for (int i = 0; i < 4; i++ ) {
                Receiving(i);
                Console.WriteLine("This is Calling {0}", i);
            }
        }

        public void Receiving(int number)
        {
            Console.WriteLine("This is Receiving {0}", number);
            if (number == 2)
            {
                throw new ArgumentException("Hey, this is an exception");
            }
        }
    }
```

If we run it like it is, with `thing.CallingAsync().Wait();` the results are as follow:

```
This is an aggregate exception
Message: One or more errors occurred. (Hey, this is an exception)
Stack:    
   at System.Threading.Tasks.Task.Wait(Int32 millisecondsTimeout, CancellationToken cancellationToken)
   at System.Threading.Tasks.Task.Wait()
   at AwaitForMe.Program.Main(String[] args) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 14
```

If we comment the line mentioned and uncomment `thing.CallingAsync().GetAwaiter().GetResult()` the results change:

```
This is an argument exception
Message: Hey, this is an exception
Stack:   
   at AwaitForMe.TheThing.Receiving(Int32 number) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 52
   at AwaitForMe.TheThing.CallingAsync() in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 40
   at AwaitForMe.Program.Main(String[] args) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 15
```


So `Wait()` collects exceptions into an `AggregateException`, while `GetAwaiter().GetResult()` returns the exception thrown. The problem with the `AggregateException` is that the type of Exception and the Stack Trace become hidden within the `InnerException`. So, for example, if you need to log the exception that is being thrown, unless the logger knows how to unroll the exception, `Wait()` gives you back information that is not very useful. Which one should you use will then depend on the rest of the system that you are using.

Oh, additional bit, if you wonder what happens with `Result` on a task that returns a value, the issue is the same as with `Wait()`.
