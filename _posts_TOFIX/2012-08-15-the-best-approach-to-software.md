--- layout: post name: the-best-approach-to-software title: The best
approach to software development time: 2012-08-15 04:08:00.000000000
+01:00 ---
\
\
Today, talking about doing a big design up-front (BDUF) sounds a bit
ridiculous, right? Who would do that? That's not craftsmanship, is it? \
\
However, in the past, that would be considered the norm. Writing
requirement documents, drawing architectural and very low level detail
diagrams was the right thing to do. Well, that’s what very smart guys
proposed on the [1968 NATO Software Engineering
Conference](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF)
and it worked for NASA and the US Department of Defense. I’m sure they
know what they are doing and if it works for them, it will definitely
work for our small CRUD application or one page website. And then it
happened. It became a religion and the majority of projects in the
following decades were developed like that.\
\
No, but not nowadays. We've learned the lesson, right? We wouldn't make
this mistake again.  
\
After watching a few talks in conferences and
[InfoQ](http://www.infoq.com/), we understood that this is not a good
thing. We’ve also read in some books that we should do
[TDD](http://en.wikipedia.org/wiki/Test-driven_development). The design
should emerge from tests.
\
And of course, we should adopt an Agile methodology as well. Let’s adopt
[Scrum](http://en.wikipedia.org/wiki/Scrum_%28development%29) to start
with. There are many books about it, certifications and even entire
conferences dedicated to it. Of course we should adopt TDD an Scrum
because that’s the best approach to manage and develop and software.
\
Oh, but what about all this
[lean](http://en.wikipedia.org/wiki/Lean_software_development) stuff?
Eliminate waste, limit work in progress, [system
thinking](http://en.wikipedia.org/wiki/System_thinking), [theory of
constrains](http://en.wikipedia.org/wiki/Theory_of_constraints),
[Kanban](http://en.wikipedia.org/wiki/Kanban). I heard it worked really
well for Toyota so we should definitely do that as well. Why? Jesus, you
just don’t get it. Of course that’s best approach to manage and develop
software.
\
God, how could I forget? I was also told that I really should speak to
my customer. We should really discuss the requirements so we can have a
better understanding of what we should build. Are you using
[BDD](http://en.wikipedia.org/wiki/Behavior_Driven_Development)? No!!!
Wow! How can you develop software without that? Why should you use it?
The answer is simple. That’s the best approach to manage and develop
software. Don’t tell me that you thought that BDD was a testing tool.
You are so yesterday. That was version one. [BDD version
three](http://dannorth.net/2012/05/31/bdd-is-like-tdd-if/) is all about
communication. It's about software development done right. Yes, I know
it sounds alien but apparently we are supposed to speak to people. God,
how on Earth we haven’t thought about that before? How did we develop
software all these years? If you don’t use BDD, you are just doing it
wrong. Why? Because that’s the best approach to manage and develop
software. Duh!
\
Outside-In TDD, Inside-Out TDD, ATDD, Classic TDD, [London School
TDD](http://codemanship.co.uk/parlezuml/blog/?postid=987)? Really? Are
you still discussing that? Don’t tell me that we you are still writing
tests. What? Why are you wasting time writing unit tests? It doesn’t
make sense any more. You should [spike and
stabilize](http://lizkeogh.com/category/spike-and-stabilize/). What if
you don’t know what you are doing or where you are going? What if you
just want to explore your options? Why are you writing tests? Oh, I get
it. You were told that this was the best approach to manage and develop
software. Nah, forget that. Unit tests are for losers. We write small
services and just monitor them. If they are wrong, we just throw them
away and re-write. And THAT is the best way to manage and develop
software.
\
Architecture and design patterns? What??? Who are you? My grandfather?
Scrap that. That’s for programmers from the 80ies and 90ies. In the real
world we have our design emerging from tests. No, stupid. Not using
normal TDD. God, which planet do you live? We use [TDD As If You Meant
It](http://cumulative-hypotheses.org/2011/08/30/tdd-as-if-you-meant-it/).
We use this technique and PRESTO, the design emerges and evolves nicely
throughout the life span of the project regardless of how many
developers, teams and design skills. Every one can see code smells,
right?
\
And what about [DDD](http://en.wikipedia.org/wiki/Domain-driven_design)?
Domain Driven what? Nah, never heard about it. Hmm.. hold on. I think I
heard something about it many years ago, but probably it was not
important enough otherwise we would have more people today saying that
DDD is the best approach to manage and develop software.
\
Noooo. No no no no. No, I didn't hear that. Get out of here. Did you
just say that you are still using an Object-Oriented language?
[STATICALLY-TYPED](http://en.wikipedia.org/wiki/Statically_typed#Static_typing)????
No, sorry. This conversation is a waste of my time. It's because of
people like you that our industry is shit. The only way for this
conversation to get even worse is if you tell me that you still use a
relational database. Haven't you heard that functional programming is a
MUST DO and just retards and programmers from the 80ies and 90ies use
relational databases. [Functional
languages](http://en.wikipedia.org/wiki/Functional_programming), [NoSQL
databases](http://en.wikipedia.org/wiki/NoSQL)... Repeat with me.
Functional languages, NoSQL databases. What a douche bag.
\
Ah, trying to be a smart ass? Yeah, functional programming appeared long
ago in the 50ies and developers in the 60ies and 70ies preferred to use
OO instead. But you don't know why, do you? DO YOU? They did use OO
because they were a bunch of hippies that didn't take anything
seriously. They were that sort of people that went to
[Woodstock](http://en.wikipedia.org/wiki/Woodstock), got high on LSD and
had brain damage after that. No, don't take this whole OO stuff
seriously. We are finally getting back to reality now. Functional
programming and NoSQL databases are definitely the best approach for
software development.
\
**Dogmatism, religion, context, curiosity, inquiring mind and
pragmatism**
\
Before I conclude, I just want to clarify that by no means I'm
criticizing any person or group of people behind some of the
methodologies, technologies or techniques mentioned above. These people
have done an amazing job thinking, practicing and sharing their own
ideas of how software development could be done in a better way and for
that we should all be grateful. Our industry if definitely better with
their contribution.
\
My main criticism here is about how the vast majority of developers
react to all these things. It is not just because someone, somewhere
wrote a book, recorded a video or gave a talk in a conference about
something that it will make that thing right, in all contexts. Quite
often, we fail to question things just because the people promoting it
are relatively well known. We fail to understand the context where a
methodology, technology or technique should be best suitable for. We
fail, quite often, to use our own judgement because of the fear to be
ridiculed by our colleagues. We should stop being dogmatic and religious
about things. This just leads to stupid decisions. Doing things for the
sake of doing or because someone else said so is just plain wrong and
stupid. 
\
Being a good developer means to be inquisitive, curious and pragmatic.
Never religious. Never dogmatic. Curious means that we should be eager
to learn about all the things mentioned above and many many more.
Inquisitive means that we should investigate and question all the things
we learn. Pragmatic means that we should choose the right tools, being
technologies, methodologies or techniques, for the job.
\
Context matters. 
\
Whenever you see people saying that we should or shouldn't do something,
ask them why. Ask them about the context where they tried to do (or not
to do) what they are saying. 
\
Software development is not the same thing of producing cars. Once the
car is ready, you don't go back to the manufacturer and ask them to add
another wheel or put the engine somewhere else. Developing software for
expensive hardware is not the same thing as developing a simple web
application with two pages. Hardware has an specification that you need
to code against. Quite often, you don't even have access to the hardware
because it is just not built yet. The cost of a bug in production is not
the same for all applications. The cost of a few bugs in a social
networking or cooking website can be very different from the cost of a
few bugs in a trading or financial system processing millions of
transactions per day. Working with a small team, every one co-located
and with easy access to customers is very different from working on a
project with 10+ teams spread in 5 countries and different timezones. 
\
Read and learn as much as you can. However, don't assume that everything
you read or watch applies in every context. Make informed decisions and
trust your instincts.\
\
The bad news is that there is no best approach to software development.
Maximum we could say is that there are certain technologies,
methodologies and techniques that are more suitable to a specific
context.\
\
In case you are really trying to find the best approach to software
development in general, I hope you don't get too frustrated and good
luck with that. If you ever find it, please let us know. It's always
interesting to know about different approaches. Maybe unicorns really
exist. Who knows?\
\
\
\
*This post was inspired by conversations during many [London Software
Craftsmanship Community
(LSCC)](http://www.meetup.com/london-software-craftsmanship) Round-table
meetings, conversations during [SoCraTes
2012](http://www.socrates-conference.de/) and also conversations with
colleagues at work. Thanks everyone for that.*
