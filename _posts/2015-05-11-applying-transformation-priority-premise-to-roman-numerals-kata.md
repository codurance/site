---
layout: post
name: applying-transformation-priority-premise-to-roman-numerals-kata
title: 'Applying Transformation Priority Premise to Roman Numerals Kata'
date: 2015-05-11 16:00:00 +01:00
author: Pedro Santos
image:
    src: /assets/img/custom/blog/2015-05-11-applying-transformation-priority-premise-to-roman-numerals-kata/She-wolf_suckles_Romulus_and_Remus.jpg

tags:
- TDD
- .net
---
#Applying Transformation Priority Premise to Roman Numerals Kata

> "As tests get more specific code gets more generic." - Uncle Bob

##TDD
Often one of the doubts we have when developing software driven by tests is how to evolve code in small and steady paces guided by tests (baby steps). TDD looks deceptively easy and only when we get more experience do we recognize this. The three laws of TDD state:

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

On this post I would like to concentrate on the third law.
On May 2013 Robert C. Martin AKA Uncle Bob wrote a seminal post titled ["Transformation Priority Premise"](http://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html). Go read it, I will wait here. Alternatively [watch](https://vimeo.com/97516288) him talk about it.

##What is this post about?
I had to prepare a presentation on Transformation Priority Premise. I tried to document how I could use this technique to implement an algorithm. My objective was to implement it trying not to skip any of the transformations and moving through them in the order they are defined.

##Transformation Priority Premise
The transformations list gives guidance on how to apply small transformations to the code under test in order to evolve it to a more generic implementation. We should try to avoid taking big leaps forward when a small transformation will do. Remember the third law of TDD: "You are not allowed to write any more production code than is sufficient to pass the one failing unit test." "Transformations on the top of the list should be preferred to those that are lower. It is better (or simpler) to change a constant into a variable than it is to add an if statement. So when making a test pass, you try to do so with transformations that are simpler (higher on the list) than those that are more complex."
On the table below you can find the transformations list.


1. ({} -> nil) no code at all->code that employs nil
2. (nil -> constant)
3. (constant -> constant+) a simple constant to a more complex constant
4. (constant -> scalar) replacing a constant with a variable or an argument
5. (statement -> statements) adding more unconditional statements.
6. (unconditional -> if) splitting the execution path
7. (scalar -> array)
8. (array -> container)
9. (statement -> recursion)
10. (if -> while)
11. (expression -> function) replacing an expression with a function or algorithm
12. (variable -> assignment) replacing the value of a variable.

##Roman Numbers
If you are familiar with this kata please move to the next section implementation.
###Definition
Given a positive integer number (eg. 42) determine its Roman numeral representation as a String (eg "XLII"). You cannot write numerals like IM for 999.
###Examples
|Arabic number		|Roman numeral	|Arabic number		|Roman numeral 	|
|-----------------|---------------|-----------------|---------------|
|1					      |I				      |60					      |LX			        |
|2	              |II	            |70	              |LXXX           |
|3	              |III            |80               |LXXX           |
|4	              |IV             |90	              |XC             |
|5	              |V              |100	            |C              |
|6	              |VI	            |200	            |CC             |
|7                |VII            |300              |CCC            |
|8                |VIII           |400	            |CD             |
|9                |IX	            |500	            |D              |
|10               |X	            |600	            |DC             |
|20               |XX	            |700	            |DCC            |
|30               |XXX            |800	            |DCCC           |
|40               |XL	            |900	            |CM             |
|50               |L              |1000             |M              |


|Arabic number|Roman numeral|Thousands|Cents|Tenths|Units|
|-------------|-------------|---------|-----|------|-----|
|846          |DCCCXLVI     |-        |DCC  |XL    |VI   |
|1999         |MCMXCIX      |M        |CM   |XC    |IX   |
|2008         |MMVIII       |MM       |-    |-     |VIII |

##Implementation
We start by writing the simplest unit test we can think of.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}
```
We start the implementation using the first transformation - no code to return null
```csharp
// 1 nil
public class RomanConverter
{
    public string Convert(int number)
    {
        return null;
    }
}
```
The first transformation is not enough to make the test pass so we apply the second transformation - nil to constant. This is enough to make the test pass so we stop evolving the code until we have a failing test.
```csharp
// 2 nil -> constant
public class RomanConverter
{
    public string Convert(int number)
    {
        return "I";
    }
}
```
We add a new failing test.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}
```
The next transformation - constant to variable - is not sufficient to make the test pass.
```csharp
// 4 Constant -> variable
public class RomanConverter
{
    public string Convert(int number)
    {
        var result = "I";
        return result;
    }
}
```
The next transformation - statement to statements - is also not sufficient to make the test pass.
```csharp
// 5 statement -> statements
public class RomanConverter
{
    public string Convert(int number)
    {
        var result = "I";
        result += "I";

        return result;
    }
}
```
Applying the next transformation - unconditional to conditional - is sufficient to make the test pass.
```csharp
// 6 unconditional -> conditional
public class RomanConverter
{
    public string Convert(int number)
    {
        var result = "I";

        if (number >= 1)
        {
            result += "I";
        }

        return result;
    }
}
```
We add a new failing test.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    [TestCase(3, "III")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}
```
Adding another conditional will make the test pass, but we have duplication.
```csharp
public class RomanConverter
{
    public string Convert(int number)
    {
        var result = "I";
        if (number > 1)
        {
            result += "I";
        }

        if (number > 2)
        {
            result += "I";
        }

        return result;
    }
}
```
Applying the next transformation - variable to array - removes the duplication.
```csharp
// 7 variable -> array
public class RomanConverter
{
    public static readonly string[] Results = { "I", "II", "III" };

    public string Convert(int number)
    {
        return Results[number - 1];
    }
}
```
We add a new failing test.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    [TestCase(3, "III")]
    [TestCase(4, "IV")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}
```
To make the test pass we don't need to apply the next transformation, we can make the test pass by adding a new element to the array.
```csharp
// no transformation
public class RomanConverter
{
    public static readonly string[] Results = { "I", "II", "III", "IV" };

    public string Convert(int number)
    {
        return Results[number - 1];
    }
}
```
While adding a new element to the array was enough to make the test pass, we now spot some duplication on character "I". By applying the next transformation statement to tail recursion we can get rid of this duplication. Since we are trying to follow the transformation table we applied the array to collection transformation before the tail recursion.
```csharp
// 8 array -> collection
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results =
        new Dictionary<int, string>
        {
            {1, "I"},
            {2, "II"},
            {3, "III"},
            {4, "IV"},
        };

    public string Convert(int number)
    {
        return Results[number];
    }
}

// 9 statement -> tail recursion
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results = new Dictionary<int, string>
    {
        {1, "I"},
        {4, "IV"},
    };

    public string Convert(int number)
    {
        if (Results.ContainsKey(number))
        {
            return Results[number];
        }

        return Results[1] + Convert(number - 1);
    }
}
```
We add a few more failing tests but since the last transformation was still allowing us to make tests pass we waited until we had duplication to refactor.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    [TestCase(3, "III")]
    [TestCase(4, "IV")]
    [TestCase(5, "V")]
    [TestCase(6, "VI")]
    [TestCase(7, "VII")]
    [TestCase(8, "VIII")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}
```
No other transformations required, simply adding new values to the dictionary allowed us to make the tests pass but we can now spot duplication, again around character "I".
```csharp
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results =
    new Dictionary<int, string>
    {
        {1, "I"},
        {4, "IV"},
        {5, "V"},
        {6, "VI"},
        {7, "VII"},
        {8, "VIII"},
    };

    public string Convert(int number)
    {
        if (Results.ContainsKey(number))
        {
            return Results[number];
        }

        return Results[1] + Convert(number - 1);
    }
}
```
To fix the duplication we apply again the transformation, statement to tail recursion, to fix this. We don't yet need to move to the next transformation.
```csharp
// 9 statement -> tail recursion
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results =
    new Dictionary<int, string>
    {
        {1, "I"},
        {4, "IV"},
        {5, "V"},
    };

    public string Convert(int number)
    {
        if (Results.ContainsKey(number))
        {
            return Results[number];
        }

        if (number > 5)
        {
            const string result = "V";
            return result + Convert(number - 5);
        }

        return Results[1] + Convert(number - 1);
    }
}â€ƒ
```
Again we add more failing tests, and again, the last transformation is still making tests pass.
```csharp
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    [TestCase(3, "III")]
    [TestCase(4, "IV")]
    [TestCase(5, "V")]
    [TestCase(6, "VI")]
    [TestCase(7, "VII")]
    [TestCase(8, "VIII")]
    [TestCase(9, "IX")]
    [TestCase(10, "X")]
    [TestCase(40, "XL")]
    [TestCase(44, "XLIV")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}

// Wait for patterns to emerge
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results =
        new Dictionary<int, string>
        {
            {1, "I"},
            {4, "IV"},
            {5, "V"},
            {9, "IX"},
            {10, "X"},
            {40, "XL"},
        };

    public string Convert(int number)
    {
        if (Results.ContainsKey(number))
        {
            return Results[number];
        }

        if (number > 40)
        {
            const string result = "XL";
            return result + Convert(number - 40);
        }

        if (number > 10)
        {
            const string result = "X";
            return result + Convert(number - 10);
        }

        if (number > 5)
        {
            const string result = "V";
            return result + Convert(number - 5);
        }

        return Results[1] + Convert(number - 1);
    }
}
```
We spot duplication around if statements, so we refactor the code to the next transformation - if to while. This gets rid of if statement duplication, but we now have while statement duplication.
```csharp
// 10 if -> while
public class RomanConverter
{
    public static readonly IDictionary<int, string> Results =
        new Dictionary<int, string>
        {
            {1, "I"},
            {4, "IV"},
            {5, "V"},
            {9, "IX"},
            {10, "X"},
            {40, "XL"},
        };

    public string Convert(int number)
    {
        if (Results.ContainsKey(number))
        {
            return Results[number];
        }

        string result = string.Empty;

        while (number >= 40)
        {
            result += "XL";
            number -= 40;
        }

        while (number >= 10)
        {
            result += "X";
            number -= 10;
        }

        while (number >= 5)
        {
            result += "V";
            number -= 5;
        }

        while (number >= 4)
        {
            result += "IV";
            number -= 4;
        }

        while (number >= 1)
        {
            result += "I";
            number -= 1;
        }

        return result;
    }
}
```
We apply the same if to while transformation to the remaining if statement and this allows us to get rid of the duplicated while statements. In order for this to work it's more convenient to have the dictionary reversed so we also do this.
```csharp
// 10 if -> while
public class RomanConverter
{
    public static readonly IDictionary<int, string> mappings =
        new Dictionary<int, string>
        {
            {40, "XL"},
            {10, "X"},
            {9, "IX"},
            {5, "V"},
            {4, "IV"},
            {1, "I"},
        };

    public string Convert(int number)
    {
        string result = string.Empty;
        var mappingsEnumerator = mappings.GetEnumerator();

        while (mappingsEnumerator.MoveNext())
        {
            var mapping = mappingsEnumerator.Current;

            while (number >= mapping.Key)
            {
                result += mapping.Value;
                number -= mapping.Key;
            }
        }

        return result;
    }
}â€ƒ
```
We add more failing tests but the last transformation is sufficient to make all new tests pass and we cannot think of anymore failing tests, this implies we are done. We refactor the code to make it more readable and we are done.
```csharp
// final solution
[TestFixture]
public class RomanConverterShould
{
    [TestCase(1, "I")]
    [TestCase(2, "II")]
    [TestCase(3, "III")]
    [TestCase(4, "IV")]
    [TestCase(5, "V")]
    [TestCase(6, "VI")]
    [TestCase(7, "VII")]
    [TestCase(8, "VIII")]
    [TestCase(9, "IX")]
    [TestCase(10, "X")]
    [TestCase(40, "XL")]
    [TestCase(50, "L")]
    [TestCase(90, "XC")]
    [TestCase(100, "C")]
    [TestCase(400, "CD")]
    [TestCase(500, "D")]
    [TestCase(900, "CM")]
    [TestCase(1000, "M")]
    [TestCase(846, "DCCCXLVI")]
    [TestCase(1999, "MCMXCIX")]
    [TestCase(2008, "MMVIII")]
    public void ConvertNumberToRoman(int number, string expected)
    {
        var romanNumeral = new RomanConverter().Convert(number);
        Assert.That(romanNumeral, Is.EqualTo(expected));
    }
}

public class RomanConverter
{
    public static readonly IDictionary<int, string> arabicsToRomans =
            new Dictionary<int, string>
            {
                {1000, "M"},
                {900, "CM"},
                {500, "D"},
                {400, "CD"},
                {100, "C"},
                {90, "XC"},
                {50, "L"},
                {40, "XL"},
                {10, "X"},
                {9, "IX"},
                {5, "V"},
                {4, "IV"},
                {1, "I"},
            };

        public string Convert(int number)
        {
            var romanNumeral = string.Empty;
            var arabicsToRomansEnumerator = arabicsToRomans.GetEnumerator();

            while (arabicsToRomansEnumerator.MoveNext())
            {
                var arabicToRoman = arabicsToRomansEnumerator.Current;
                var arabicNumeral = arabicToRoman.Key;
                var romanNumeral = arabicToRoman.Value;

                while (number >= arabicNumeral)
                {
                    result += romanNumeral;
                    number -= arabicNumeral;
                }
            }

            return romanNumeral;
        }
    }
}
```

##Conclusions
For the purpose of this post I think the code as is, illustrates the process described by Robert Martin, AKA Uncle Bob, to refactor code from specific to generic guided by tests. Deliberately following the Transformation Priority Premise while coding was a very interesting exercise, it provided guidance while avoiding big leap refactors. I found out that when I was stuck, most of the time, the solution was just applying the next transformation on the table.

##Links

[http://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html](http://blog.8thlight.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html)

[https://vimeo.com/97516288](https://vimeo.com/97516288)

[http://en.wikipedia.org/wiki/Transformation_Priority_Premise](http://en.wikipedia.org/wiki/Transformation_Priority_Premise)
