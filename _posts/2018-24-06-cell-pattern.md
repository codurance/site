---
author: Dan Cohen
layout: post
asset-type: post
title: "Cell Design Pattern"
date: 2018-07-31 09:25:06
description: A design pattern reminiscent of the command pattern mixed with an event bus
slug: cell-pattern
canonical:
    name: hacking dan
    href: https://blog.hackingdan.com/2018/06/cell-pattern
image: 
    src: /assets/custom/img/blog/2018-07-31-cell-pattern/cell.jpg
tags: 
- Design Patterns
---
# Inspiration
In an animal body, signals are sent from one area of the body to another through the endocrine system (and other systems). The hormonal transport system. What happens is that a cell will do some processing (often based on some form of input or trigger) and after the processing, it is able to emit a hormone. That hormone is transported in the endocrine system until it reaches a cell with a matching receptor. The cell with the matching receptor will recieve the hormone and begin doing some processing of its own.

For me, the big difference in the computational ability of a biological system and an digital system is that a biological system is massively parallelisable. Each cell works completely independently of each other and all processing is fire and forget.

# What do I expect this to be useful for?
This is a good question. This is definitely an exploratory project and I don't have the answers yet. It seems however that it would be very good for any system that eventually would be split apart, because it very strictly enforces decoupling. In the future, this design could be expanded to include clusters of cells comprising an organ which could be held in entirely different locations and the ability to parallelise would be built into the framework.

# What will this look like?
I have a working proof of concept here: [https://github.com/cohen990/cell](https://github.com/cohen990/cell)

The example is converting from ASCII to base 64 and there are a few key concepts.
Each cell is responsible for it's own processing. It is triggered by a hormone and after it has completed its work, it will emit another hormone which will propagate through the system.

```csharp
    public class Base64EncodingCell : Cell<InputHormone>
    {
        public override Action<InputHormone> GetHormonalResponse()
        {
            return hormone => ProcessInput(hormone);
        }

        public void ProcessInput(InputHormone hormone)
        {
            String base64 = ConvertToBase64(hormone.Data);
            Emit(new ProcessingComplete(base64));
        }

        String ConvertToBase64(String data){
            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(data);
            return Convert.ToBase64String(bytes);
        }
    }
```

This is a full cell. The `GetHormonalResponse` method is on the base class and is used to register the cell with the Endocrine System.

The behaviour is maintained within each cell because each cell can act independently on the hormones that are dispersed through the system. For example, you may wish to log the hormones that are being activated.

```csharp
    public class HormoneLoggingCell : Cell<Hormone>
    {
        public override Action<Hormone> GetHormonalResponse()
        {
            return hormone => LogHormone(hormone);
        }

        public void LogHormone(Hormone hormone)
        {
            Console.WriteLine("Hormone Emitted: " + hormone.GetType());
        }
    }
```

Registration can take place dynamically or all at initialization time, but there is no way to de-register a cell.


```csharp
    class Program
    {
        static void Main()
        {
            RegisterCells();
            Console.Write("Input: ");
            var input = Console.ReadLine();

            var inputReceived = new InputReceived(input);

            EndocrineSystem.Inject(inputReceived);
        }

        static void RegisterCells()
        {
            EndocrineSystem.RegisterBinding(new Base64EncodingCell());
            EndocrineSystem.RegisterBinding(new InputValidationCell());
            EndocrineSystem.RegisterBinding(new WriteOutputCell());
            EndocrineSystem.RegisterBinding(new HormoneLoggingCell());
        }
    }
```

The individual hormones are very aneamic classes and are just used for data transfer and behaviour triggering.

```csharp
    public class InputHormone : Hormone
    {
        public string Data { get; }

        public InputHormone(string data)
        {
            Data = data;
        }
    }
```

This currently looks a lot like an event bus. Because it's very similar. But in the future I believe this pattern could differentiate itself by taking influence from more concepts used in bodily computation.

That's it! That's the concept. Let me know if you think it's interesting or if you have any ideas or suggestions!
