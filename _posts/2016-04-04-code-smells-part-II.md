---
layout: post
name: code-smells-part-one
title: Code Smells – Part II
date: 2016-04-04 12:10:00 +00:00
author: Ana Nogal
canonical:
    name: my personal blog
    href: http://www.ananogal.com/blog/code-smells-part-two/
image:
    src: /assets/img/custom/blog/code-smells_II.jpg
    attribution:
        text: Via Flickr/Creative Commons/Brian Fitzgerald (Creative Commons - Attribution-ShareAlike 2.0 Generic license)
        href: https://www.flickr.com/photos/brian-fitzgerald/3334353375
tags:
- object-orientation abusers
- change preventers
- code smells
- refactoring

---
In the last post, [Code Smells - Part I](http://codurance.com/2016/03/17/code-smells-part-I),  I talked about the bloaters: they are code smells that can be identified as Long Methods, Large Classes, Primitive Obsessions, Long Parameter List and Data Clumps. In this one, I would like to dig into the **Object-Orientation Abusers** and the **Change Preventers**. 
In today's post, I'll talk about a few refactoring techniques, but there are a lot more. You can find a good reference to all of then in [Refactoring.com](http://refactoring.com/catalog/) by Martin Fowler.

## Object-Orientation Abusers

This type of code smell usually happens when the object-oriented principles are incomplete or incorrectly applied.


#### Switch Statements

This case is simple to identify: we have a switch case. But you should consider a smell too if you find a sequence of ifs. (that's a switch case in disguise).
Why switch statements are bad? Because when a new condition is added, you have to find all the switch code and modify it. 
As a rule of thumb, when you see a switch statement you should think of polymorphism. There are two refactoring techniques that we can apply here: 

 - **_Replace Type Code with Subclasses_**
   This technique consists of creating subclasses for each type of your switch, putting the behaviour in this classes. 
 - **_Replace Type Code With Strategy_**
   Similar to the above one, in this case, you should make use of one of the patterns: [State](https://en.wikipedia.org/wiki/State_pattern) or [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern).


#### Temporary Field

This case occurs when we are calculating some big algorithm that needs several amount of inputs. Creating this fields in the class makes then have no value most of the times because they are just used for this specific calculation. Here the best refactoring technique is to use **_Replace Method with Method Object_**, wich will extract the method into a separate class. Then you can split the method into several methods within the same class. 


#### Refused Bequest

This code smell is a little tricky to detect because this happens when a subclass doesn't use all the behaviour of its parent class. So it's as if the subclass "refuses" some behaviour("bequest") of its parent class. 

In this case, if it makes no sense to continue to have this inheritance, the best refactoring technique is to use **_Delegation_**: we can get rid of the inheritance by creating a field in our subclass and putting in there the parent class. This way every time you need the methods from the parent class just delegate then to this new object. 

When the inheritance is the correct thing to do, then move all unnecessary fields and methods from the subclass. Extract all methods and fields from the subclass and parent class and put then in a new class. Make this new class the SuperClass, from whom the subclass and parent class should inherit. This technique is called **_Extract Superclass_**.


#### Alternative Classes with Different Interfaces

Hmm, this case makes me think of "lack of communication" between members of the same team because this happens when we have two classes that make basically the same thing but have different names in their methods. 
Start by **_Renaming Methods_** or **_Moving Method_**, so you can have both classes implementing the same interface. In some cases, only part of the behaviour is duplicated in both classes. If so, try **_Extract Superclass_** and make the original classes the subclasses.  


## Change Preventers

Oh boy! This kind of code smells are the ones you want really to avoid. These are the ones that when you make a change in one place, you have to go basically throughout all your code making changes in other places too. So it's the nightmare that all of us want to avoid!


#### Divergent Change

This is the case when you find yourself changing the same class for several different reasons. This means that you are violating the separation of concerns, i.e the S on [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) - Sigle Responsibility principle.
The refactoring technique applied here is **_Extract Class_** since you want to extract the different behaviours to different classes.

#### Shotgun Surgery

This means that when you make a small change in a class, you have to go and change several classes at the same time. 
Even though it seems the same as the **_Divergent Change_** smell, in reality, they are opposite of each other: **_Divergent Change_** is when many changes are made to a single class. **_Shotgun Surgery_** refers to when a single change is made to multiple classes simultaneously.

Here the refactoring technique to apply is **_Move Method_** and/or **_Move Field_**. This will permit you to move the duplicated methods or fields to a common class. If that class doesn't exist create a new one. In the case of original class stays almost empty, maybe you should think if this class is redundant, and if so, get rid of it by using the **_Inline Class_**: move the remaining methods/fields to one of the new classes created. This all depends on if the original class doesn't have any responsibility anymore.  

#### Parallel Inheritance Hierarchies

This case is when you find yourself creating a new subclass for class B because you add a subclass to class A. 
Here you can: first, make one of the hierarchy refer to instances of another hierarchy. After this first step you can then use **_Move Method_** and **_Move Field_** to remove the hierarchy in the referred class. You can apply here the [Visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern) too.


### Conclusion

In the case of **_Object-Orientation Abusers_** and **_Change Preventers_**, I think that they are simpler to avoid if you know how to apply a good design to your code. And that comes with a lot of practice.
As I said in the [first part of this series](http://codurance.com/2016/03/17/code-smells-part-I), code smells can't always be removed. Study each case and decide: remember that is always a trade off. 