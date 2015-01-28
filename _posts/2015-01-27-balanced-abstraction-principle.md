---
layout: post
name: balanced-abstraction-principle
title: Balanced Abstraction Principle
date: 2015-01-27 10:30:00 +00:00
author: Sandro Mancuso
image:
    src: /assets/img/custom/blog/balanced-abstraction-principle.jpeg
tags:
- craftsmanship
- quality
- design
---

One of the things that make code complicated to read and understand is when the instructions inside a method are at different levels of abstraction. 

Let's assume that our application only allows the logged-in user to see trips from her friends. If users are not friends, no trips should be displayed. 

An example:

	public List<Trip> tripsByFriend(User user, User loggedInUser) {
    	return (user.friends().contains(loggedInUser))    
    					? userRepository.findTripsBy(user.id())
						: Collections.emptyList();
	}

In the code above, all the instructions in the body of the method are in different levels of abstraction. We have instructions validating friendship, instructions that fetch the list of trips of a friend via a collaborator, and a low level Java API that return an empty and immutable list. On top of that, we have the business behaviour itself. 

Now let's look at a refactored version of the same method:

	public List<Trip> tripsByFriend(User user, User loggedInUser) {
		return (user.isFriendsWith(loggedInUser)) 
						? tripsBy(user)
						: noTrips();
	}

	private List<Trip> tripsBy(User user) {
		userRepository.findTripsBy(friend.id());
	}

	private List<Trip> noTrips() {
		return Collections.emptyList();
	}	

In this new version, we extracted the low-level abstractions to private methods and also moved some behaviour to the User class. With this change, all the instructions are on the same level of abstraction, making it clear what the business rule is. The public method is now telling us a story, without worrying about technical implementation details. The code now reads without any bumps: "If user is friends with the logged-in user, return trips by user, otherwise return no trips."

### Balanced Abstraction Principle (BAP)

The Balanced Abstraction Principle defines that all code constructs grouped by a higher-level construct should be on the same level of abstraction. That means:

* All instructions inside a method should be at the same level of abstraction 
* All public methods inside a class should be at the same level of abstraction
* All classes inside a package/namespace
* All sibling packages/namespace inside a parent package/namespace
* All modules, sub-systems, etc.

The principle also applies to tests—all tests for a single unit (method, class, module, system) should be at the same level of abstraction. 

### BAP and SRP

Code that complies with the Single Responsibility Principle has a higher chance to also be compliant to the Balanced Abstraction Principle. However, this is not always the case and the opposite is not always true. 

### Conclusion

In order to achieve well-crafted code, we need to take many design principles into consideration and I believe that the Balanced Abstraction Principle (BAP) is a missing piece in the SOLID principles and overall software design. 
