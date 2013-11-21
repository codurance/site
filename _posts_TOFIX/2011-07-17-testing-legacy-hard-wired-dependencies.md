--- layout: post name: testing-legacy-hard-wired-dependencies title: !
'Testing legacy: Hard-wired dependencies (part 1)' time: 2011-07-17
00:42:00.000000000 +01:00 --- When pairing with some developers, I've
noticed that one of the reasons they are not unit testing existing code
is because, quite often, they don't know how to overcome certain
problems. The most common one is related to hard-wired dependencies -
**Singletons** and **static calls**. \
\
Let's look at this piece of code:\
\

~~~~ {.brush: .java}
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {    List<Trip> tripList = new ArrayList<Trip>();    User loggedUser = UserSession.getInstance().getLoggedUser();    boolean isFriend = false;    if (loggedUser != null) {        for (User friend : user.getFriends()) {            if (friend.equals(loggedUser)) {                isFriend = true;                break;            }        }        if (isFriend) {            tripList = TripDAO.findTripsByUser(user);        }        return tripList;    } else {        throw new UserNotLoggedInException();    }}
~~~~

\
Horrendous, isn't it? The code above has loads of problems, but before
we change it, we need to have it covered by tests.\
\
There are two challenges when unit testing the method above. They are:\
\

~~~~ {.brush: .java}
User loggedUser = UserSession.getInstance().getLoggedUser(); // Line 3     tripList = TripDAO.findTripsByUser(user);                    // Line 13
~~~~

\
As we know, unit tests should test just one class and not its
dependencies. That means that we need to find a way to mock the
Singleton and the static call. In general we do that injecting the
dependencies, but we have a
[rule](http://craftedsw.blogspot.com/2011/07/working-with-legacy-code.html),
remember? \
\
We can't change any existing code if not covered by tests. The only
exception is if we need to change the code to add unit tests, but in
this case, just automated refactorings (via IDE) are allowed. \
\
Besides that, many of the mocking frameworks are not be able to mock
static methods anyway, so injecting the TripDAO would not solve the
problem. \
\
**Overcoming the hard-dependencies problem**\
\
*NOTE: In real life I would be writing tests first and making the change
just when I needed but**in order to keep the post short and focused**I
will not go step by step here .*\
\
First of all, let's isolate the Singleton dependency on it's own method.
Let's make it protected as well. But wait, this need to be done via
automated "extract method" refactoring. Select just the following piece
of code on TripService.java:\
\

~~~~ {.brush: .java}
UserSession.getInstance().getLoggedUser()
~~~~

\
Go to your IDE's refactoring menu, choose extract method and give it a
name. After this step, the code will look like that:\
\

~~~~ {.brush: .java}
public class TripService {    public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {        ...        User loggedUser = loggedUser();        ...    }    protected User loggedUser() {        return UserSession.getInstance().getLoggedUser();    }}
~~~~

\
Doing the same thing for TripDAO.findTripsByUser(user), we will have: \
\

~~~~ {.brush: .java}
public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {    ...    User loggedUser = loggedUser();    ...        if (isFriend) {            tripList = findTripsByUser(user);        }    ...}   protected List<Trip> findTripsByUser(User user) {    return TripDAO.findTripsByUser(user);}  protected User loggedUser() {    return UserSession.getInstance().getLoggedUser();}
~~~~

\
In our test class, we can now extend the TripService class and override
the protected methods we created, making them return whatever we need
for our unit tests:\
\

~~~~ {.brush: .java}
private TripService createTripService() {    return new TripService() {        @Override protected User loggedUser() {            return loggedUser;        }        @Override protected List<Trip> findTripsByUser(User user) {            return user.trips();        }    };}
~~~~

\
And this is it. Our TripService is now testable. \
\
First we write all the tests we need to make sure the class/method is
fully tested and all code branches are exercised. I use Eclipse's
[eclEmma plugin](http://www.eclemma.org/) for that and I strongly
recommend it. If you are not using Java and/or Eclipse, try to use a
code coverage tool specific to your language/IDE while writing tests for
existing code. It helps a lot.\
\
So here is the my final test class:\
\

~~~~ {.brush: .java}
public class TripServiceTest {            private static final User UNUSED_USER = null;    private static final User NON_LOGGED_USER = null;    private User loggedUser = new User();    private User targetUser = new User();    private TripService tripService;    @Before    public void initialise() {        tripService  = createTripService();    }             @Test(expected=UserNotLoggedInException.class) public void     shouldThrowExceptionWhenUserIsNotLoggedIn() throws Exception {        loggedUser = NON_LOGGED_USER;                         tripService.getTripsByUser(UNUSED_USER);    }            @Test public void     shouldNotReturnTripsWhenLoggedUserIsNotAFriend() throws Exception {                     List<Trip> trips = tripService.getTripsByUser(targetUser);                         assertThat(trips.size(), is(equalTo(0)));    }            @Test public void     shouldReturnTripsWhenLoggedUserIsAFriend() throws Exception {        User john = anUser().friendsWith(loggedUser)                            .withTrips(new Trip(), new Trip())                            .build();                         List<Trip> trips = tripService.getTripsByUser(john);                         assertThat(trips, is(equalTo(john.trips())));    }    private TripService createTripService() {        return new TripService() {            @Override protected User loggedUser() {                return loggedUser;            }            @Override protected List<Trip> findTripsByUser(User user) {                return user.trips();            }        };    }        }
~~~~

\
**Are we done?**\
\
Of course not. We still need to refactor the TripService class. Check
the [part
two](http://craftedsw.blogspot.com/2011/07/testing-legacy-hard-wired-dependencies_17.html)
of this post.\
\
If you want to give it a go, here is the full code:
[https://github.com/sandromancuso/testing\_legacy\_code](https://github.com/sandromancuso/testing_legacy_code)
