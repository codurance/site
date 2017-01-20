---
layout: post
name: Language feature envy
title: Language feature envy
date: 2016-05-06 00:20:00 +00:00
author: Pedro Santos
image:
   src: /assets/img/custom/blog/envy.jpg
   attribution:
     text: Envy by John Goode.
     href: https://www.flickr.com/photos/johnnieb/167721436
tags:
- CSharp
- OOP

---


In my day job I mainly write C# code. On my own I like to try other languages like Swift, F#, Clojure, Objective C or Java. I learn a lot from writing code in different languages. When I go back to C# I often miss some of the features C# does not have. By far what I miss the most is Java/Swift enums. It happens quite frequently that I need to express a few finite number of instances of a type. The [Java planets](http://snipplr.com/view/42422/the-planet-enum-example/) example illustrates this quite effectively.

Recently I was porting a music library I wrote in Swift [Ellis](https://github.com/pedromsantos/Ellis) to C#. In music there are only 12 notes so using a class to express a musical note feels wrong. Using a enum in C# would be the correct choice... If I could only add behaviour to enums in C#. Here is an excerpt of the Note enum in Swift:

```swift
public enum Note: Int
{
    case C = 0
    case CSharp
    case DFlat
    case D
    case DSharp
    case EFlat
    ...

    public func sharp() -> Note
    {
        ...
    }

    public func flat() -> Note
    {
        ...
    }

    public func intervalWithNote(other: Note) -> Interval
    {
        ...
    }

    public func measureAbsoluteSemitones(other: Note) -> Int
    {
        ...
    }

    public func transpose(transposingInterval: Interval) -> Note
    {
      ...
    }
```

Note that besides being able to define a finite number of instances I'm also able to add behaviour to my enum.

In C# we are stuck with using something like:

```csharp
public class Note
{
    public static readonly Note C = new Note(Pitch.C, "C", Accident.None, MinNoteIndex);
    public static readonly Note CSharp = new Note(Pitch.CSharp, "C#", Accident.Sharp, 1);
    public static readonly Note DFlat = new Note(Pitch.DFlat, "Db", Accident.Flat, 2);
    public static readonly Note D = new Note(Pitch.D, "D", Accident.None, 3);
    public static readonly Note DSharp = new Note(Pitch.DSharp, "D#", Accident.Sharp, 4);
    public static readonly Note EFlat = new Note(Pitch.EFlat, "Eb", Accident.Flat, 5);
    public static readonly Note E = Note(Pitch.E, "E", Accident.None, 6);
    public static readonly Note F = new Note(Pitch.F, "F", Accident.None, 7);
    public static readonly Note FSharp = new Note(Pitch.FSharp, "F#", Accident.Sharp, 8);
    ...

    private Note(Pitch pitch, string name, Accident accident, int index)
    {
        ...
    }
}
```

It's not too bad, but not exactly the same as in Java or Swift.

There is a feature in Java enums that I still miss for my note implementation in C#, the ordinal method:

```java
public final int ordinal()
```

This according to the Java documentation "Returns the ordinal of this enumeration constant (its position in its enum declaration, where the initial constant is assigned an ordinal of zero)".

If I want to emulate this behaviour in C# I can do something like:

```csharp
public static IEnumerable<Note> Notes
{
    get
    {
        yield return C;
        yield return CSharp;
        yield return DFlat;
        yield return D;
        yield return DSharp;
        yield return EFlat;
        yield return E;
        yield return F;
        yield return FSharp;
        ...
    }
}
```

Now I can access Note instances using an indexer with code like this:

```csharp
Note.Notes.ElementAt(indexForNote);
```

Again not ideal but not terrible either. But notice that we are adding up workarounds, all small but it adds up. If you want to look at the complete implementation it’s on my GitHub [Jaco.Notes.Note](https://github.com/pedromsantos/Jaco/blob/master/Jaco/Notes/Note.cs)

### FAQ:
Why don't you create a proposal to have this implemented in C#?

Nothing is ever original, others have explored that route already.

Jon Skeet blogged about this in 2006:
https://codeblog.jonskeet.uk/2006/01/05/classenum/#comments

There are a couple of discussions on Roslyn GitHub:
https://github.com/dotnet/roslyn/issues/6739
https://github.com/dotnet/roslyn/issues/3704

The only problem is this patent may prevent other languages from having the same behaviour Java has on enums:
https://www.google.com/patents/US7263687
