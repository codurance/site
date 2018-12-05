---
author: Jorge Gueorguiev Garcia
layout: post
asset-type: post
title: "Await vs GetAwaiter"
date: 2018-12-04 22:00:00
description: A tiny bit of async in your life
image: 
    src: /assets/custom/img/blog/2018-09-03-rest-review/relaxfortwo.jpg
tags: 
- C#
---

While I wait to put the effort on my Safety Musings part 2 post, I decided to talk about a small little thing regarding the retrieval of results on C# while using async.

```C#
 class Program
    {
        static void Main(string[] args)
        {
            var thing = new TheThing();
            try
            {
                thing.Calling().Wait();
                //thing.Calling().GetAwaiter().GetResult();
            }
            catch (ArgumentException e)
            {
                Console.WriteLine("This is an argument exception");
                Console.WriteLine($"Message: {e.Message}");
                Console.WriteLine($"Stack: {e.StackTrace}");
            }
            catch (Exception e)
            {
                Console.WriteLine("This is a base exception");
                Console.WriteLine($"Message: {e.Message}");
                Console.WriteLine($"Stack: {e.StackTrace}");
            }

            Console.WriteLine("Press any key");
            Console.ReadKey();
        }
    }
    
    public class TheThing
    {
        public async Task Calling ()
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
                throw new Exception("Exception");
            }
        }
    }
```

```
This is a base exception
Message: One or more errors occurred. (Hey, this is an exception)
Stack:    at System.Threading.Tasks.Task.Wait(Int32 millisecondsTimeout, CancellationToken cancellationToken)
   at System.Threading.Tasks.Task.Wait()
   at AwaitForMe.Program.Main(String[] args) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 14
```

```
This is an argument exception
Message: Hey, this is an exception
Stack:    at AwaitForMe.TheThing.Receiving(Int32 number) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 52
   at AwaitForMe.TheThing.Calling() in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 40
   at AwaitForMe.Program.Main(String[] args) in C:\Users\akira\code\tests\AwaitForMe\AwaitForMe\Program.cs:line 15
```
