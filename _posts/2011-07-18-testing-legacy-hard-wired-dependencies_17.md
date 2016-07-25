---
author: Sandro Mancuso
layout: post
asset-type: post
name: testing-legacy-hard-wired-dependencies
title: "Testing legacy: Hard-wired dependencies (part 2)"
date: 2011-07-18 02:12:00 +01:00
---

In [part one](/2011/07/16/testing-legacy-hard-wired-dependencies/),
I showed how to unit test a method that uses a Singleton and makes
static calls. So now, let's have a look at common code problems we find
in legacy code, using the same example:

```
public class TripService {

	public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
		List<Trip> tripList = new ArrayList<Trip>();
		User loggedUser = loggedUser();
		boolean isFriend = false;
		if (loggedUser != null) {
			for (User friend : user.getFriends()) {
				if (friend.equals(loggedUser)) {
					isFriend = true;
					break;
				}
			}
			if (isFriend) {
				tripList = findTripsByUser(user);
			}
			return tripList;
		} else {
			throw new UserNotLoggedInException();
		}
	}

	protected List<Trip> findTripsByUser(User user) {
	    return TripDAO.findTripsByUser(user);
	}

	protected User loggedUser() {
	    return UserSession.getInstance().getLoggedUser();
	}

}
```

How many problems can you see? Take your time before reading the ones I
found.. :-)

###Refactoring

*NOTE*:*When I've done it, I've done it step by step running the tests
after every step. Here I'll just summarise my decisions*.

The first thing I noticed is that the tripList variable does not need to
be created when the logged user is null, since an exception is thrown
and nothing else happens. I've decided to invert the outer if and
extract the [guard clause](http://c2.com/cgi/wiki?GuardClause). 

```
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
	User loggedUser = loggedUser();
	validate(loggedUser);
	List<Trip> tripList = new ArrayList<Trip>();
	boolean isFriend = false;
	for (User friend : user.getFriends()) {
		if (friend.equals(loggedUser)) {
			isFriend = true;
			break;
		}
	}
	if (isFriend) {
		tripList = findTripsByUser(user);
	}
	return tripList;
}

private void validate(User loggedUser) throws UserNotLoggedInException {
	if (loggedUser == null) throw new UserNotLoggedInException();
}
```

###Feature Envy

When a class gets data from another class in order to do some
calculation or comparison on that data, quite often it means that the
client class *envies* the other class. This is called [Feature Envy (code smell)](http://c2.com/cgi/wiki?FeatureEnvySmell) and it is a very common
occurrence in long methods and is everywhere in legacy code. In OO, data
and the operations on that data should be on the same object.

So, looking at the code above, clearly the whole thing about determining
if an user is friends with another doesn't belong to the TripService
class. Let's move it to the User class. First the unit test:

```
@Test public void
shouldReturnTrueWhenUsersAreFriends() throws Exception {
	User John = new User();
	User Bob = new User();

	John.addFriend(Bob);

	assertTrue(John.isFriendsWith(Bob));
}
```

Now, let's move the code to the User class. Here we can use the Java
collections API a bit better and remove the whole for loop and the
isFriend flag all together.

After a few refactoring steps, here is the new code in the TripService

```
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
	User loggedUser = loggedUser();
	validate(loggedUser);
	return (user.isFriendsWith(loggedUser))
				? findTripsByUser(user)
				: new ArrayList<Trip>();
}
```

Right. This is already much better but it is still not good enough.

###Layers and dependencies

Some of you may still be annoyed by the protected methods we created in
[part one](/2011/07/17/testing-legacy-hard-wired-dependencies/)
in order to isolate dependencies and test the class. Changes like that
are meant to be temporary, that means, they are done so we can unit test
the whole method. Once we have tests covering the method, we can start
doing our refactoring and thinking about the dependencies we could
inject.

Many times we would think that we should just inject the dependency into
the class. That sounds obvious. TripService should receive an instance
of UserSession. Really?

TripService is a service. That means, it dwells in the service layer.
UserSession knows about logged users and sessions. It probably talks to
the MVC framework and/or HttpSession, etc. Should the TripService be
dependant on this class (even if it was an interface instead of being a
Singleton)? Probably the whole check if the user is logged in should be
done by the controller or whatever the client class may be. In order NOT
to change that much (for now) I'll make the TripService receive the
logged user as a parameter and remove the dependency on the UserSession
completely. I'll need to do some minor changes and clean up in the tests
as well.

###Naming

No, unfortunately we are not done yet. What does this code do anyway?
Return trips from a friend. Looking at the name of the method and
parameters, or even the class name, there is no way to know that. The
word "friend" is no where to be seen in the TripService's public
interface. We need to change that as well.

So here is the final code:

```
public class TripService {

	public List<Trip> getFriendTrips(User loggedUser, User friend) throws UserNotLoggedInException {
		validate(loggedUser);
		return (friend.isFriendsWith(loggedUser))
					? findTripsForFriend(friend)
					: new ArrayList<Trip>();
	}

	private void validate(User loggedUser) throws UserNotLoggedInException {
		if (loggedUser == null) throw new UserNotLoggedInException();
	}

	protected List<Trip> findTripsForFriend(User friend) {
		return TripDAO.findTripsByUser(friend);
	}
}
```

Better, isn't it? We still have the issue with the other protected
method, with the TripDAO static call, etc. But I'll leave this last bit
for another post on how to remove dependencies on static methods. I'll
park my refactoring for now. We can't refactoring the entire system in
one day, right? We still need to deliver some features. :-)

###Conclusion

This was just a toy example and may not even make sense. However, it
represents many of the problems we find when working with legacy
(existing) code. It's amazing how many problems we can find in such a
tiny piece of code. Now imagine all those classes and methods with
hundreds, if not thousands of lines.

We need to keep refactoring our code mercilessly so we never get to a
position where we don't understand it any more and the whole [business starts slowing down](http://craftedsw.blogspot.com/2010/09/bad-code-invisible-threat.html)
because we cannot adjust the software quick enough.

Refactoring is not just about extracting methods or making a few tweaks
in the logic. We need to think about the dependencies, the
responsibilities that each class and method should have, the
architectural layers, the design of our application and also the names
we give to every class, method, parameter and variable. We should try to
have the business domain expressed in the code.

We should treat our code base as if it was a [big garden](http://craftedsw.blogspot.com/2010/09/bad-code-invisible-threat.html).
If we want it to be pleasant and maintainable, we need to be constantly
looking after it.

If you haven't read it yet, check the [part one](/2011/07/16/testing-legacy-hard-wired-dependencies/)
of this post. If you want to give this code a go or find more details
about the implementation, check:
[https://github.com/sandromancuso/testing\_legacy\_code](https://github.com/sandromancuso/testing_legacy_code)
