---
layout: post
asset-type: post
name: types-and-accepting-the-facts
title: Types and accepting the fact that I might not be that smart.
date: 2020-02-05 00:00:00 +00:00
author: André Guelfi Torres
image:
    src: /assets/custom/img/blog/my-first-month-at-codurance.png
tags:
    - types
---

# Types and accepting the fact that I might not be that smart.

I've said quite a few times that I like static typing, but to be honest I'm probably not the most knowledgeable person around using typing and I wanted to change that. What's going to be the deal of this post? 

I will try to present the different type systems that are around, then I will build some examples of how we can use types to solve some code smells and give more safety to our codebase. 

## Why do I like types?

Usually I'm not the smartest person in the room, most part of the time I'm at the bottom of the list. A short summary of things I can't do are:

- Remember the return type for that method that I just created.
- Remember all the places that I have to change something because some refactoring, like adding a new field to a constructor.
- Keep juggling multiple variables in my head and trying to memorize their types, e.g: Multiple fields that you have to pass for a method.

Just like the monkeys from 2001: A Space Odyssey, I know how to use tools and to write better code I try to rely in every tool, automation and check that is provided, and we have many things in that area, like compilers, unit tests and static code analysis. 

Now I'm going to focus on types, but before that let's go through the basics of type systems, so we have context and I can make this post longer to give the false impression that I'm smart and I really understand type systems. 

## The different flavours of Type Systems

Type systems can go from very relaxed and they will try to make things work with everything you give to them to very strict and rigid not allowing your type shenanigans. 

### Dynamic Typing

In dynamic typed languages you don't have much enforcement on the types that you pass around, you don't have to say which type you want to return or to pass in the parameters, doesn't mean that you should pass anything, if you try to call a method or field that doesn't exists your code will break, but besides that it doesn't mater much. 

```javascript
function printText(text) {
    console.log(text);
}
```

See the method above, it has zero enforcement of that will receive or return, it will just print to the console, and that's how dynamic typed languages work, variables have their types assigned at runtime in the moment you pass them a value, you don't have to worry with that beforehand. 

When talking about Dynamic Typed languages  we have to understand that dynamic typed languages might have different ways of dealing with typecasting, the more permissive ones are called Weak typed, an example of the is JavaScript (No, hate please. Just dropping facts). 

### Weak Typing

Is the more relaxed version of typing that you can find, usually the interpreter will try to make some  conversions in the types so the operations can be done, let's try to do some calculations with JavaScript:

```javascript
    1 + 1   // 2
    "1" + 1 // "11"
    1 + "1" // "11"
    1 - "1" // 0
    "1" - 1 // 0
```

Let's try to understand what's going on there. The first result is obviously right, but why do we get `"11"` when we try to sum a string with an integer? Under the hood the JavaScript engine is casting the other value to make the operation successful, instead throwing an error the integer is transformed into a string and concatenated to the other string, the same thing for the third operation. 

So why does the last two ones are done over the integer value? In JavaScript strings has the `+`

operator but not the `-`, so to not throw an error the interpreter cast the string value to an integer that has the minus operation. 

The main thing with Weak Typed systems is that they give preference to casting values and trying to make the operation to happen instead throwing an error, doesn't mean that they will do the operation 100% of the time, but at least they will try. 

### Strong Typing

Let's try to do that in another dynamic language like Ruby and see what's going to happen:

```javascript
1 + 1   // 2
"1" + 1 // TypeError (no implicit conversion of Integer into String)
1 + "1" // TypeError (String can't be coerced into Integer)
1 - "1" // TypeError (String can't be coerced into Integer)
"1" - 1 // NoMethodError (undefined method `-' for "1":String)
```

Now we only have one operation working and two different errors for the rest. From the second to the fourth operation we got `TypeError`, which is Ruby's way to say that the types are different and that operation is wrong. The last error is saying that `-` isn't a valid method for a String. 

Throwing all those errors make Ruby less of a dynamic typed language? Of course not, we can see that the function that we wrote in JavaScript will be the same thing in Ruby:

```ruby
def print_text(text)
    puts text
end
```

We still don't enforce neither parameter nor return type, but what Ruby does is try to  be more conservative with castings, when an operation doesn't sound right Ruby will thrown an error instead of trying to make the operation to happen.  

### Static Typing

Leaving the land of Dynamic Typed languages and getting into the a more strict place, we have the static types. Probably everyone is familiar with at least one static language like Java, C#, C++, C, Delphi and many others. 

When dealing with Static Typing we have to be more explicit about our intentions, we need to let people know what we are expecting and what we giving them back, it's like a contract. When we reproduce the same code we did for Ruby and JavaScript in Java we get:

```java
public void printText(String text) {
    System.out.printLn(text);
}
```

We have to inform that we are going to receive a String and that we don't return anything from that method, in case we try to violate that contract the are going to have problems with the compiler. We try to compile the program calling the method with a different type and we get a compilation error. 

```java
public class Main {

    public static void printText(String text) {
        System.out.println(text);
    }

    public static void main(String[] args) {
        printText(123);
    }
}
```

```
Main.java:10: error: incompatible types: int cannot be converted to String
        printText(123);
                    ^
```

Now we moved the runtime errors that we were having in Ruby to the compilation time, the compiler is a safety net but isn't fail proof we still can get runtime errors by doing weird casting in runtime:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(1 + Integer.parseInt("WAT"));
    }
}
```

This piece of code will compile without any problem, we are satisfying all the boundaries in the type system but when we run everything breaks. 

```
Exception in thread "main" java.lang.NumberFormatException: For input string: "WAT"
    at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
    at java.base/java.lang.Integer.parseInt(Integer.java:652)
    at java.base/java.lang.Integer.parseInt(Integer.java:770)
```

So keep that in mind, even with the safety of a compiler we can't be 100% that our code is right. 

## So static types are better than dynamic ones?

Well, not exactly. Compile time check gives you a guard rail against some problems. Said that, relying on types purely to avoid problems isn't the best way to go, even with static typed languages you are bound to commit mistakes like the one showed previously. 

The Ruby and Rails community uses unit testing to solve the lack of the compile enforcement but you still need to test your code for runtime exceptions, static languages will not need all this coverage but you still need to test for edge cases in the input and nulls. 

The kind of project that you are doing is also something important when deciding between static or dynamic types. In case you are prototyping something and want to move fast a language that forces you to take care of all cases might not be the best, but it will shine in mission critical applications that shouldn't crash. 

One of the main reasons to use a static typed language is to try to catch bugs earlier. Is quite well known that the earlies we catch bugs/problems the cheaper is to fix them, if you never heard about that you can read more about that [here](https://www.researchgate.net/publication/255965523_Integrating_Software_Assurance_into_the_Software_Development_Life_Cycle_SDLC). 

## Types and abstractions

Remember the reasons that I mentioned earlier? One way to avoid those problems is to abstract those problems in a way that we can reason with more simple terms and that the they they are presented , force them to tell us what do they mean. 

There are many ways to create the same abstraction, we can use different types and end up having the same result. 

For example in Ruby we can create a struct to store values for us:

```ruby
Customer = Struct.new(:name, :address, :age)
john = Customer.new("John Doe", "123 Street, SE10JA", 20)
puts john.name # "John Doe"
puts john.age # 20
```

and we can make the same thing in Kotlin: 

```kotlin
data class Customer(val name: String, val address: String, val age: Int)
val john = Customer("John Doe", "123 Street, SE10JA", 20)
println(john.name) // "John Doe"
println(john.age)  // 20
```

Those two are different constructs in the languages but they are the same abstraction, we wrapped multiple values inside one type, we can compare both types by value and access the values using dot notation. When we start to work and use those abstraction around we will starting thinking about a Customer doesn't matter what a customer is composed of,  we can defer that to the moment that we really need some specific information. The example also shows that we can have the abstractions in both kind of languages. 

### The Flight Search Example

Imagine that we are building a company that searches for flights in multiple websites, we are exposing an endpoint that accepts JSON. Right now we are only dealing with simple searches where all flights will have a return and the accepted JSON is:

```json
{
    "startDate": "10/11/2019",
    "endDate": "15/11/2019",
    "origin": "LHR",
    "dest": "DUB"
}
```

Now that we receive that request, we have to understand what composes a search:

- Start and End dates
- The Start date has to be earlier than the End date.
- A Origin and Destination
- The Origin and the destination must be different.
- The Origin and Destination must be valid IATAs

We can have all those validations without creating a class, imagine that we have a controller that will receive that, parse the JSON and send to a service.

```java
    public class FlightSearchController {
    
    	private SearchService searchService;
    
    	public FlightSearchController(SearchService searchService) {
    		this.searchService = searchService;
    	}
    
    	public List<Flight> searchFlights(String searchRequest) {
    		JsonObject searchObject = parseJson(searchRequest);
    		return searchService.findFlights(
    			searchObject.get("startDate").asText(),
    			searchObject.get("endDate").asText(),
    			searchObject.get("origin").asText(),
    			searchObject.get("dest").asText());
    	}
    } 
```    

Now all the validations that we have to do must live inside the `SearchSevice`, not only the business validations, we must do validations that are related to application code like date formatting, but not only that, in this way inside our class we will have to deal with multiple parameters that we will have to pass them together every time we need a `SearchRequest`.

When we take a look inside the `SearchService` class we can see the how all those fields are being handled. 

```java
class SearchService {

    public List<Flight> findFlights(String startDate, String endDate, String origin, String dest) {
        return searchRepository.findFlights(startDate, endDate, origin, dest);
    }    
}
```

```java 
class SearchRepository {

    public List<Flight> findFlights(String startDate, String endDate, String origin, String dest) {
        // implementation
    }    
}
```

There are so many smells in that snippet that made me sick, jokes aside we have to see that we are moving all the validations to the edge of the application, this will only blow up when we make a database call. This might be a problem for error handling, because we want to tell the person that called the API which kind of error is, a database problem would usually be a `5XX`, but in reality could be a `4XX` since the problem is in the format in the database. 

### Fastening the type seatbelt

Let's start with the dates, those are the most obvious thing that we are dealing with, there are two dates that will only fail when we execute the query, but we don't want to reach the database if we don't have valid parameters. 

```java
class SearchService {

    public List<Flight> findFlights(String startDate, String endDate, String origin, String dest) {
        LocalDate flightStartDate = parseDate(startDate);
        LocalDate flightEndDate = parseDate(endDate);
        return searchRepository.findFlights(flightStartDate, flightEndDate, origin, dest);
    }    
}
```

```java    
    class SearchRepository {
    
    		public List<Flight> findFlights(LocalDate startDate, LocalDate endDate, String origin, String dest) {
    			// implementation
    		}    
    }
```

```java    
class DateTimeFormatter {
 
    private static LocalDate parseDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return LocalDate.parse(date, formatter);
    }

}
```

Now with the parser being done in the service we replace exceptions related to our database for `DateTimeParseException`, this makes way easier to capture the right exception instead of trying to figure it out what was happening. What we have now is better than the previous code using strings all around but we can and must do better. The `SearchService` is throwing `DateTimeParseException` and we can handle that case in the controller and return something like `400 - Bad Request`.

Now let's take care of the IATA, the IATA specification (source: Wikipedia, I didn't read the specification) says that's a code compose by three letters. In this case we can create a class for it and add the validation. 

```java
class InvalidIATAException extends InvalidArgumentException {}
```

```java
class IATA {
        
    public final String iata;

    public IATA(String iata) {
        if (iata.length() != 3) {
            throw new InvalidIATAException();
        }
        this.iata = iata;
    }
}
```

Then we change the service and the repository to start using types:

```java
class SearchService {

    public List<Flight> findFlights(String startDate, String endDate, String origin, String dest) {
        LocalDate flightStartDate = parseDate(startDate);
        LocalDate flightEndDate = parseDate(endDate);
        IATA originAirport = new IATA(origin);
        IATA destAirport = new IATA(dest);
        return searchRepository.findFlights(flightStartDate, flightEndDate, origin, dest);
    }
}
```

```java
class SearchRepository {

    public List<Flight> findFlights(LocalDate startDate, LocalDate endDate, IATA origin, IATA dest) {
        // implementation
    }
}
```    

With those changes we can at least guarantee that the information that we are using to call the database is valid, we can't confirm that exists in the database but we will not get any parameter error during the time. 

We are in a better situation right now but we could and should do better. We are doing all the validations inside the SearchService. The problem with that is that the service is part of our business domain and we are filling with application code that has nothing to do with it. So we should move that from the service to the controller.

```java
class SearchService {

    public List<Flight> findFlights(LocalDate startDate, LocalDate endDate, IATA origin, IATA dest) {
        return searchRepository.findFlights(flightStartDate, flightEndDate, origin, dest);
    }
}
```

```java
public class FlightSearchController {

    private SearchService searchService;

    public FlightSearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    public ResponseEntity<List<Flight>> searchFlights(String searchRequest) {
        JsonObject searchObject = parseJson(searchRequest);

        try {
            LocalDate flightStartDate = parseDate(searchObject.get("startDate").asText());
            LocalDate flightEndDate = parseDate(searchObject.get("endDate").asText());
            IATA originAirport = new IATA(searchObject.get("origin").asText());
            IATA destAirport = new IATA(searchObject.get("dest").asText());
        } catch (DateTimeParseException | InvalidIATAException e) {
            return ResponseEntity.status(400).build();
        }
        
        var flights = searchService.findFlights(flightStartDate, flightEndDate, originAirport, destAirport);
        return ResponseEntity.body(flights).build();
    }
}
```

Now the SearchService is free from any code that isn't related to our business domain, if you want to test you will not have to worry about passing  things that will be parsed to the proper classes and testing if the parsing is working, if you create an invalid `LocalDate` the compiler will tell you. 

All those things that I've said here isn't made up shit that I'm coming to try to look smart, they are code smells that many other people have written about before. The name of the code smell that we just changed is Primitive Obsession, it's a code smell were you use primitive types to deal with things that should be abstracted as an object. 

### Throwing Exception where, when, how? (Come back here later)

We already mentioned about the Domain and the Application layer, where should we be adding the  validation for the values that we have. For things like parsing dates or a JSON which is explicit out of the business domain it's better to make them live inside the Application Layer so we can test the Business Layer without having to worry about that, also the way we drive the application might be different depending of what you want. 

that isn't something that our Business should be worried about but what about the 

## Abstracting your way out of problems

Let's start work on that to add some more types and safety to our search. Remember what I said at the beginning about not being able to hold to many things in my memory? We have this problem here, we have the business concept of search parameters but in the code this isn't mentioned at all. When you talk to someone that isn't a developer they will say about the search parameter and you have to associate that to a specific group of fields and rules that are distributed around the codebase. 

What happens if we add another field? You have to memorize that but what if you were on holidays when they did that change, you probably are going to have conversations were your knowledge is out of date. It's possible to fix that using types to abstract the complexity and defer the need to know certain information to the last second.

Let's start refactoring our code, the first thing we can change are the dates, we always need a start date and a end date. Passing them around would be easier if they were always together wouldn't? 

```java
public class DateRange {

    final LocalDate start;
        final LocalDate end; 

        public DateRange(LocalDate start, LocalDate end) {
        this.start = start;
        this.end = end;
    }
}
```

```java
public class FlightSearchController {
    //...	
    public ResponseEntity<List<Flight>> searchFlights(String searchRequest) {
        JsonObject searchObject = parseJson(searchRequest);

        try {
            LocalDate flightStartDate = parseDate(searchObject.get("startDate").asText());
            LocalDate flightEndDate = parseDate(searchObject.get("endDate").asText());

            DateRange dateRange = new DateRange(flightStartDate, flightEndDate);

            IATA originAirport = new IATA(searchObject.get("origin").asText());
            IATA destAirport = new IATA(searchObject.get("dest").asText());
        } catch (DateTimeParseException | InvalidIATAException e) {
            return ResponseEntity.status(400).build();
        }
        //...
    }
}
```

```java
public class SearchService {

    public List<Flight> findFlights(DateRange dateRange, IATA origin, IATA dest) {
        return searchRepository.findFlights(dateRange.start, dateRange.end, origin, dest);
    }
}
```

We can go even further and add some kind of validation in the date range, because we don't want the start date to be after the end date, this could cause all sorts of problems. 

```java
public class IllegalDateRange extends InvalidArgumentException {}
``` 

```java
public class DateRange {

    final LocalDate start;
    final LocalDate end; 

    public DateRange(LocalDate start, LocalDate end) {
        
        if (start.isAfter(end)) {
            throw new IllegalDateRange();        
        }

        this.start = start;
        this.end = end;
    }
}
```

Now it's way harder to represent an invalid date range in the system (not impossible tho). 

Now we just need a final type for our search with all those fields that we are passing arround. 

```java
public class SearchParameters {

    final DateRange dateRange;
    final IATA origin;
    final IATA destination; 

    public SearchParameters(DateRange dateRange, IATA origin, IATA destination) {
        this.dateRange = dateRange;
        this.origin = origin;
        this.destination = destination; 
    }
}
```

```java
public class FlightSearchController {
    //...	
    public ResponseEntity<List<Flight>> searchFlights(String searchRequest) {
        JsonObject searchObject = parseJson(searchRequest);

        try {
            LocalDate flightStartDate = parseDate(searchObject.get("startDate").asText());
            LocalDate flightEndDate = parseDate(searchObject.get("endDate").asText());

            DateRange dateRange = new DateRange(flightStartDate, flightEndDate);

            IATA origin = new IATA(searchObject.get("origin").asText());
            IATA destination = new IATA(searchObject.get("dest").asText());
            SearchParameters searchParameters = new SearchParameters(dateRange, origin, destination);
        } catch (DateTimeParseException | InvalidIATAException e) {
            return ResponseEntity.status(400).build();
        }
    
        var flights = searchService.findFlights(searchParameters);
        return ResponseEntity.body(flights).build();
    }
}
```

```java
public class SearchService {

    public List<Flight> findFlights(SearchParameters searchParameters) {
        return searchRepository.findFlights(searchParameters);
    }
}
```

```java
class SearchRepository {

    public List<Flight> findFlights(SearchParameters searchParameters) {
        // implementation
    }
}
```

All those changes that were made focused in removing a code smell called Data Clumps, 

## NullPointerException at com.blogpost.Chapter (chapter.java:32)

Everyone is a close friend of nulls, from bankrupting companies and making devs to drink under their desks, they are everywhere. Unevitable like making bad decisions when you are drunk, we need to deal with nulls. 

Is null a type or the lack of types? With that philosophical question that doesn't matter, sometimes we need to represent that a call don't have anything to return. When getting an environment variable for example, that variable might not be declared and we represent that as a null. 

This is not a problem, what can cause harm is the fact that the null might not be noticed or dealt before the values is used. 

For example:

```java
public class NullExample {    
    public static void main(String[] args) {
        String home = System.getenv("HOME");
        System.out.println(home.length());
    }
}
```

This snippet will throw a NullPointerException but in any moment we were warned that the method would return a null, we might know for reading the Documentation or the code. We can add a null check before calling `home.length()`, that's solve the problem of the exception that we are getting, we still have the problem that we have to do that after every call of the method, and human beings are unreliable to do repetitive tasks like that. Do you know who is good checking that kind of stuff? The compiler of course. 

With all the advance of the modern society and Java there's a quite decent way of dealing with this problem. Java provides us with the `Optional<>` that can wrap null values for us. The main advantage of using an Optional is that we can't use the value straight away (please, don't call `.get()` straight away), we explicitly have to deal with the possiblity of a null value. This is way better than returning null or just throwing an exception. The final result would be: 

```java
public class OptionalExample {    
    public static void main(String[] args) {
        Optional<String> home = Optional.ofNullable(getenv("HOME"));
        home.ifPresent(System.out::println);
    }
}
```

You can use Optional to represent when a query don't have any result like in our flight search system. The optional is used to represent the fact that a flight number does not exist. 

```java
class SearchRepository {
    public Optional<Flight> flightById(FlightId id) {
        // implementation
    }
}
```

### Incoming paramters

Optionals does the work when we have to represent that a function might return a null value. What if we need to ensure that all parameters are valid, how do we do that? 

Sometimes we are limited by what our tools can do, when this happens means that we have to do the extra work to compensate that or to get better tools, in this case we have Kotlin, which comes with Non-Nullable types and some other nice tricks. 

Before starting talking about Kotlin, I want to make clear that if you are using Java properly and taking care with what you call you are not going to have too many NullPointerException problems, the best way is to know the language api and the libraries you work with. 

## More powerful tools

### Non-Nullable Types

One of the main features of Kotlin is the fact that regular types can't be null. You can't assing null to a value, neither return null from a function UNLESS you use a Nullable type, which is different. 

Back to our search application, imagine that we were using Kotlin since the beginning, the `DateRange` class would be something like this:

```kotlin
data class DateRange(val start: LocalDate, val end: LocalDate)
```

Now we have new requirements, we need to start to sell a one round trip, this means that we will only have the start for the date range. In Kotlin this would translate to: 

```kotlin
data class DateRange(val start: LocalDate, val end: LocalDate?)
```

The difference seems minimal but the `?` in the `end` field change how we use the field. A Nullable Type in Kotlin would the equivalent of an Optional in Java with the difference that in the `start` the compiler will not allow null values. 

```kotlin
data class DateRange(val start: LocalDate, val end: LocalDate?)

fun main() {
    println(DateRange(LocalDate.now(), LocalDate.now())) // DateRange(start=2020-01-26, end=2020-01-26)
    println(DateRange(LocalDate.now(), null)) // DateRange(start=2020-01-26, end=null)
    println(DateRange(null, LocalDate.now())) // Does not compile 
}
```

With that we can truly enforce that we are not passing null values as parameters for our functions. 

### Sealed Classes and the `when` keyword

We already spoke about exceptions and where to put them. The things is: Exceptions are quite abruptly and *violent.* You don't return exceptions, you throw them at the face of the method that called you, and to add insult to the injury you print a really long stack trace to be sure that the person see what you just did. 

Drama and pettiness aside exceptions are not explicit and in the case of unchecked exceptions it's really hard to keep track of them all.  They are used as a way to express when something goes wrong with your system and that's why they look different from the regular flow validations and returning certain invalid states are in many cases represented as exceptions. In a language like Java that's the convention and there are not many tools that help to overcome that. 

Going back to our company, we have to add a business validation now. The origin can't be the same one as the destination, if this happens we have to return the status code 412. 

```kotlin    
public class OriginAndSourceEqualsException extends Exception {}

public class FlightSearchController {
    //...	
    public ResponseEntity<List<Flight>> searchFlights(String searchRequest) {
        //...

        try {	
            var flights = searchService.findFlights(searchParameters);
        } catch (OriginAndSourceEqualsException e) {
            return ResponseEntity.status(412).build();
        }

        return ResponseEntity.body(flights).build();
    }
}
```

This code doesn't look too bad, but what if we start do add more validations with different status code? we are going to have to add more and more catch clauses, if we have to implement the catch in multiple places, how can we be sure that we are not forgetting anything? In Java the compiler don't do exhaustive checks. This is when we use Sealed Classes and the when clause. 

Sealed Classes is a construct that allows you to create restricted hierarchies, other people will not be able to extend from the outside of sealed classes. They are like a powerful version of an Enum, we can use a sealed class to represent the result of our search.  

```kotlin
class SearchResult {
    class Success(val flights: List<Flight>)
    class Invalid(val message: String) 
}
    
class FlightSearchController {
    //...	
    ResponseEntity<List<Flight>> searchFlights(String searchRequest) {
        //...

        val result = searchService.findFlights(searchParameters);
        return when(result) {
            is SearchResult.Success -> ResponseEntity.body(result.flights).build()
            is SearchResult.Invalid -> ResponseEntity.status(412).build()
        }
    }
}
```

Combined with the keyword `when` the Kotlin compiler forces you to check all the possibilities for the sealed class or to be a generic else that take cares of the parent sealed class.

## Immutable Types. Tell Don't Ask, and things that don't have a section for itself.

Something that all the code snippets above has is that they all use `final` or `val`, that's because we want to make the fields immutable and avoid the mutation of the internal state in an object, exposing setters and allowing people to change the value of the fields can cause our objects to break, instead of that if we are using Immutable Types you have to instantiate a new class going through the validations again. Search about Value Objects if you want to know more about that. 

In case you need to mutate the state of the object you have to follow some principles like Tell Don't Ask and good principles of OO, the main thing is to avoid exposing the internal of a class, a good example is adding to a list, never expose the list so people can add items to it, instead provide a method to add to the list. 

```kotlin
// Bad
items.getList().add(item)

// Good
items.add(item)
```

You should also search for the methods of your language that are immutable, like in Java the Instant method is immutable but LocalDate doesn't. 

During the examples there was also many constructors with validations and more code than the usual, if you are doing that a lot you should totally learn about Static Factories that's mentioned in Effective Java, it will teach you how to write more idiomatic constructors for your classes. 

## Wrapping up and References

Everything that I wrote in this post is more an exercise than a rule set to stone, specially because I'm not in a position to define what people should do, I wish this post can be a starting point to know more about types.