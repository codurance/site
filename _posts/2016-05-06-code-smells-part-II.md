---
layout: post
name: code-smells-part-one
title: Code Smells – Part II
date: 2016-05-06 12:10:00 +00:00
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
In the last post, [Code Smells - Part I](http://www.ananogal.com/blog/code-smells-part-one),  I talked about the bloaters: they are code smells that can be identified as Long Methods, Large Classes, Primitive Obsessions, Long Parameter List and Data Clumps. In this one, I would like to dig into the **Object-Orientation Abusers** and the **Change Preventers**. 

## Object-Orientation Abusers

This type of code smell usually happens when object-oriented principles are incomplete or incorrectly applied.


#### Switch Statements

This case is simple to identify: we have a switch case. But you should consider it a smell too if you find a sequence of ifs. (that's a switch case in disguise).
Why are switch statements bad? Because when a new condition is added, you have to find every occurrence of that switch case. 
So while talking to [David](https://twitter.com/DHatanian), he asked me: and what happens if I encapsulate the switch into a method, is it acceptable then? That's really a good question... If your switch case is only used to "take care" of one behaviour and that's it, then it might be ok. Remember identifying a code smell doesn't mean that you have to get always ride of it: it's a trade off. If you find your switch statement replicated and each replication has  different behaviour, then you cannot simply isolate the switch statement in a method. You need to find a proper "home" for it to be in. As a rule of thumb, you should think of polymorphism when you find yourself in this situation. There are two refactoring techniques that we can apply here: 

 - **_Replace Type Code with Subclasses_**
   This technique consists of creating subclasses for each switch case and applying the respective behaviour to these subclasses.
 - **_Replace Type Code With Strategy_**
   Similar to the above one, in this case, you should make use of one of the patterns: [State](https://en.wikipedia.org/wiki/State_pattern) or [Strategy](https://en.wikipedia.org/wiki/Strategy_pattern).

So when to use one or the other? If the **_Type Code_** does not change the behaviour of a class you can use the **_Subclasses_** technique. Separating each behaviour into its appropriate subclass will enforce the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) and make the code more readable in general. If you need to add another case, you just add a new class to your code without having to modify any other code. So you apply the [Open/Close Principle](https://en.wikipedia.org/wiki/Open/closed_principle).
You should use the Strategy approach when the **_Type Code_** affects the behaviour of your classes. If you're changing the state of the class, fields and many other actions then you should use the [State Pattern](https://en.wikipedia.org/wiki/State_pattern). if it only affects how you select a behaviour of the class then the [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) is a better choice.

Hmm... It's a little confusing, no? So let's try with an example.

You have an enumeration EmployeeType:

```
public enum EmployeeType 
{ 		
	Worker, 		
	Supervisor, 		
	Manager 	
} 
```

And a class Employee:

```
public class Employee 
{     
	private float salary;     
	private float bonusPercentage;     
	private EmployeeType employeeType;      

	public Employee(float salary, float bonusPercentage, EmployeeType employeeType)     
	{         
		this.salary = salary;         
		this.bonusPercentage = bonusPercentage;         
		this.employeeType = employeeType;     
	}      

	public float CalculateSalary()      
	{         
		switch (employeeType)          
		{             
			case EmployeeType.Worker:                 
				return salary;              
			case EmployeeType.Supervisor:                 
				return salary + (bonusPercentage * 0.5F);             
			case EmployeeType.Manager:                 
				return salary + (bonusPercentage * 0.7F);         
		}

        return 0.0F;     
    }
}
```

It all looks ok. But what happen if you need to calculate the year bonus? You will add another method like this:

```
public float CalculateYearBonus()  
    {     
    	switch (employeeType)      
    	{         
    		case EmployeeType.Worker:             
    			return 0;          
    		case EmployeeType.Supervisor:             
    			return salary + salary * 0.7F;         
    		case EmployeeType.Manager:             
    			return salary + salary * 1.0F;	     
    	}

    	return 0.0F;
	} 
```

See the repetition of the switch? So let's try first the subclass approach: Here is the superclass:

```
abstract public class Employee  
{ 

	  protected float salary;     
	protected float bonusPercentage;      

	public EmployeeFinal(float salary, float bonusPercentage)     
	{         
		this.salary = salary;         
		this.bonusPercentage = bonusPercentage;     
	}      

	abstract public float CalculateSalary();

	  virtual public float CalculateYearBonus()      
	{ 
	    return 0.0F;     
	}
 }
```

And here we have the subclasses:

```
public class Worker: Employee  
{    two

	public Worker(float salary, float bonusPercentage)   
		: base(salary, bonusPercentage)  
	{}    

	 override public float CalculateSalary()      
	 {         
	 	return salary;      
	 }
 }

public class Supervisor : Employee 
{     

	public Supervisor(float salary, float bonusPercentage) 
	        : base(salary, bonusPercentage)     
	{}      

	override public float CalculateSalary()      
	{         
		return salary + (bonusPercentage * 0.5F);     
	}      

	public override float CalculateYearBonus()     
	{         
		return salary + salary * 0.7F;     
	}
 }
```

With the Strategy approach we would create an interface for calculating the retribution:

```
public interface IRetributionCalculator  	
{ 		
	float CalculateSalary(float salary); 		
	float CalculateYearBonus(float salary); 	
} 
```

With the interface in place, we can now pass to the employee any class that conforms to that protocol and calculate the correct salary/bonus.

```
public class Employee
{     
	private float salary;     
	private IRetributionCalculator retributionCalculator;      

	public Employee(float salary, IRetributionCalculator retributionCalculator)     
	{
        this.salary = salary;         
        this.retributionCalculator = retributionCalculator;     
    }      

    public float CalculateSalary()     
    {         
    	return retributionCalculator.CalculateSalary(salary);     
    } 			     

    public float CalculateYearBonus()      
    {         
    	return retributionCalculator.CalculateYearBonus(salary);     
    }
}
```

#### Temporary Field

This case occurs when we are calculating some big algorithm that needs several input variables. Creating these fields in the class has no value most of the times because they are just used for this specific calculation. And this can be dangerous too because you have to be sure you reinitialize them before you start the next computation. 
Here the best refactoring technique is to use **_Replace Method with Method Object_**, which will extract the method into a separate class. Then you can split the method into several methods within the same class. 


#### Refused Bequest

This code smell is a little tricky to detect because this happens when a subclass doesn't use all the behaviours of its parent class. So it's as if the subclass "refuses" some behaviours("bequest") of its parent class. 

In this case, if it makes no sense to continue to use inheritance, the best refactoring technique is to change to **_Delegation_**: we can get rid of the inheritance by creating a field of the parent's classes type in our subclass. This way every time you need the methods from the parent class you just delegate them to this new object.

When the inheritance is the correct thing to do, then move all unnecessary fields and methods from the subclass. Extract all methods and fields from the subclass and parent class and put them in a new class. Make this new class the SuperClass, from whom the subclass and parent class should inherit. This technique is called **_Extract Superclass_**.


#### Alternative Classes with Different Interfaces

Hmm, this case makes me think of "lack of communication" between members of the same team because this happens when we have two classes that do the same thing but have different names for their methods. 
Start by **_Renaming Methods_** or **_Moving Method_**, so you can have both classes implementing the same interface. In some cases, only part of the behaviour is duplicated in both classes. If so, try **_Extract Superclass_** and make the original classes the subclasses.  


## Change Preventers

Oh boy! This kind of code smells are the ones you really want to avoid. These are the ones that when you make a change in one place, you have to go basically throughout your code-base making changes in other places too. So it's a nightmare that all of us want to avoid!


#### Divergent Change

This is the case when you find yourself changing the same class for several different reasons. This means that you are violating [Single Responsibility Principle](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) (which has to do with separation of concerns).
The refactoring technique applied here is **_Extract Class_** since you want to extract the different behaviours into different classes.

#### Shotgun Surgery

This means that when you make a small change in a class, you have to go and change several classes at the same time. 
Even though it seems the same as the **_Divergent Change_** smell, in reality, they are opposite of each other: **_Divergent Change_** is when many changes are made to a single class. **_Shotgun Surgery_** refers to when a single change is made to multiple classes simultaneously.

Here the refactoring technique to apply is **_Move Method_** and/or **_Move Field_**. This will permit you to move the duplicated methods or fields to a common class. If that class doesn't exist create a new one. In the case of original class stays almost empty, maybe you should think if this class is redundant, and if so, get rid of it by using the **_Inline Class_**: move the remaining methods/fields to one of the new classes created. This all depends on if the original class doesn't have any responsibility anymore.  

#### Parallel Inheritance Hierarchies

This case is when you find yourself creating a new subclass for class B because you add a subclass to class A. 
Here you can: first, make one of the hierarchy refer to instances of another hierarchy. After this first step you can then use **_Move Method_** and **_Move Field_** to remove the hierarchy in the referred class. You can apply here the [Visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern) too.


### Conclusion

In the case of **_Object-Orientation Abusers_** and **_Change Preventers_**, I think that they are simpler to avoid if you know how to apply a good design to your code. And that comes with a lot of practice. 
Today I've talked about a few refactoring techniques, but there are a lot more. You can find a good reference to all of then in [Refactoring.com](http://refactoring.com/catalog/).
And as I said in the [first part of this series](http://www.ananogal.com/blog/code-smells-part-one), code smells can't always be removed. Study each case and decide: remember that is always a trade off.