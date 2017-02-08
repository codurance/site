---
layout: post
name: property-based-testing
title: 'Property based testing'
date: 2015-11-25 09:00:00 +00:00
author: Alessandro Di Gioia
image:
    src: "/assets/img/custom/blog/2015-12-01-Faran-crane-truck.jpg"
    attribution:
        text: Faran crane truck (13) by Aleksander Stein
        href: https://www.flickr.com/photos/aleksander_se/4395710462/in/photolist-7Grazq-u8FeRe-aqN7wn-quFTva-59p1jo-fCcGpb-7pZsgL-wQaXfD-8dcvpw-7GravJ-55WvHY-mQNY6-cavBq7-tatNgX-ybwDP-73JJXP-zbo2F9-x74s1Q-5RuhNR-7K2Ppz-59KLFw-6RoBFb-hJCjcV-qMhRKv-oD2dvE-b4TNGV-56ah5u-6bGXrN-e9qotr-4Bz52Z-7K6KNU-ma811D-bBeGjZ-rbmUEf-4TsmqM-ejPJ3o-3YCK6v-55WzgW-iKD8Yb-dCt5Er-55WA8A-cavy1G-8dGnzC-55SmLZ-4bSdwh-9WUchN-4Bz4PF-6UVh7x-cavM6y-6h2Q2n/
tags:
- NCrunch
- Resharper
- FsCheck
- Visual-Studio
---

### Background
Craftsmanship in software strives for high, predictable, repeatable and affordable quality. This is the reason why we care about design, code reviews and of course testing. 
Test Driven Development helps us create a flexible implementation that meets the expectations of our clients in terms of features, performance and quality. As professionals we have to master as many tools as possible to reach our goal of steadily providing value. 
	
### Property based testing
The above is the reason why I am exploring Property Based Testing. I like to think about it as *"Let the machine do the heavy lifting for you"* or as [John Huges] says *"Don't write tests, generate them"*.

I am not claiming that you should stop writing unit tests. I find that when driving the design [Outside-in] hence declaring the relations between my components, unit tests are the tool to use.
Sometimes when I want to discover deeper properties of my domain, I am faced with features that have more edge cases than my brain could handle. 
In such cases, generating a wide array of inputs to test my program is appealing. This is where I think property testing becomes a viable tool.

	
If you are asking "How can I set up a development environment in .NET that would allow me to experiment and work with this tool?" the following tutorial is for you. 

### Development environment details

* Windows 10 Home Edition
* Visual Studio 2013 version 12 Update 5
* Resharper version 8.2.3
* NCrunch version 1.48.0.5
* FsCheck version 2.2.2
* FsCheck.NUnit version 2.2.2
* NUnit version 2.6.4

### Steps
1. Open Visual Studio and create an F# Project
2. Open the Nuget Package Manager following *TOOLS > Nuget Package Manager > Package Manager Console* from the main menu and type
    1. ```Install-Package FsCheck```
    2. ```Install-Package FsCheck.Nunit```
3. Comment out the content in **FsCheckAddin.fs** file to allow [NCrunch] to run the tests
    
	``` fs
        //[<NUnitAddin(Description = "FsCheck addin")>] 
		//type FsCheckAddin() = 
		//  interface IAddin with 
		//      override x.Install host = 
		//          let tcBuilder = new FsCheckTestCaseBuilder() 
		//          host.GetExtensionPoint("TestCaseBuilders").Install(tcBuilder) 
        //          true 
   ```
   
4. In your test file add the following
    
	``` fs
        module Properties = 
        
            open NUnit.Framework 
            open FsCheck
    ```
	
5. Add this test to enable [NCrunch]
    
	``` fs
            //Needed to enable NCrunch 
            [<Ignore>][<Test>] 
            let ignoreMe() = () 
    ```
	
6. Create a static class whose methods are the properties you want to test. For this example I'll test an incorrect implementation of a list - **the reverse of a list is always equal to the original**.
    
	``` fs
            type ListProperties =     
                // Note: should fail     
                static member reverseIsAsTheOriginal (xs:int list) =          
                    List.rev xs = xs
    ```
	
7. Add the following test to verify the property defined in the ```ListProperties``` type
    
	``` fs
            [<Test>] 
            let verifyAll () =      
                Check.QuickThrowOnFailureAll<ListProperties>()
    ```
	
8. 	Enable [NCrunch] following *NCRUNCH > Enable NCrunch* from the main menu and let the engine catch the error
9. If everything is in place you should see the visual error for the feedback
	<center><img class="img-responsive" class="img-responsive" src="{{ site.baseurl }}/assets/img/custom/blog/2015-11-25-Property-based-testing/NCrunch-visual-feed-back-error.png"></center>
10. Run All Tests in the Resharper Runner to check the output
	<center><img src="{{ site.baseurl }}/assets/img/custom/blog/2015-11-25-Property-based-testing/Resharper-tests-run-error.png" class="img-responsive"></center>
11. You should read a message similar to
    
	```
        --- Checking ListProperties ---
		System.Reflection.TargetInvocationException : Exception has been thrown by the target of an invocation.
		  ----> System.Exception : ListProperties.ReverseOfReverseIsAsTheOriginal-Falsifiable, after 6 tests (3 shrinks) (StdGen (1165808905,296086422)):
		Original:
		[-1; 2; -2]
		Shrunk:
		[1; 0]
    ```
	
12. This shows that the property was falsifiable (as expected) but let's try to gather more informations to address the issue
13. Change the test so that it provides a verbose output when failing
    
	```
            [<Test>] 
    		let verifyAll () = 
                Check.VerboseThrowOnFailureAll<ListProperties>()
    ```
	
14. Re-run the tests through Resharper Runner and read the output
    
	```
        --- Checking ListProperties ---
		0:
		[-2]
		1:
		[-2; -2]
		2:
		[]
		3:
		[1; 1]
		4:
		[-2]
		5:
		[-3; 1; 5; -3; 6; 2; 6; -2]
		shrink:
		[1; 5; -3; 6; 2; 6; -2]
		shrink:
		[5; -3; 6; 2; 6; -2]
		shrink:
		[-3; 6; 2; 6; -2]
		shrink:
		[6; 2; 6; -2]
		shrink:
		[2; 6; -2]
		shrink:
		[6; -2]
		shrink:
		[6; 2]
		shrink:
		[6; 0]
		shrink:
		[3; 0]
		shrink:
		[2; 0]
		shrink:
		[1; 0]
		System.Reflection.TargetInvocationException : Exception has been thrown by the target of an invocation.
		  ----> System.Exception : ListProperties.ReverseOfReverseIsAsTheOriginal-Falsifiable, after 6 tests (11 shrinks) (StdGen (1681135586,296086423)):
		Original:
		[-3; 1; 5; -3; 6; 2; 6; -2]
		Shrunk:
		[1; 0]
    ```
	
15. The output shows the "shrinking process" from the sixth input (identified by 5:) original value ```[-3; 1; 5; -3; 6; 2; 6; -2]``` to the  "shrunk" (reduced) input ```[1; 0]``` that still falsifies (makes it fail) the property 
16. Let's correct the property as **the reverse of the reverse of a list is equal to the original**
    
	``` fs
            type ListProperties =
				static member ReverseOfReverseIsAsTheOriginal (xs:int list) = 
					List.rev (List.rev xs) = xs
    ```
	
17. Re-run the tests that should be all green by now and read the output. You'll notice it's very verbose as expected and shows all the inputs used to verify the property.

### Conclusion
You are now ready to experiment with [FsCheck]!
[Let me know] what is your experience with property based testing in F#.

### Resources:

- [FsCheck]
- [NCrunch]
- [QuickCheck]
- [Testing FSharp] Chapter 11

[FSCheck]: http://fscheck.github.io/FsCheck/index.html
[NCrunch]: http://www.ncrunch.net/
[John Huges]: http://vimeo.com/68383317
[QuickCheck]: http://www.eecs.northwestern.edu/~robby/courses/395-495-2009-fall/quick.pdf
[Testing FSharp]: http://www.packtpub.com/application-development/testing-f
[Let me know]: https://twitter.com/Parajao
[Outside-in]: https://www.youtube.com/watch?v=XHnuMjah6ps
