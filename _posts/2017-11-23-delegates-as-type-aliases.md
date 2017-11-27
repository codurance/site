---
author: Matthew Butt
date: 2017-11-23 09:00:00 +00:00
layout: post
asset-type: post
slug: delegates-as-type-aliases
title: Delegates as Type Aliases
canonical:
    name: my personal blog
    href: https://blog.matthewbutt.com/2017/10/09/delegates-as-type-aliases/
image:
    src: /assets/img/custom/blog/2017-11-23-delegates-as-type-aliases.jpg
abstract: C# delegates can simplify your code by acting as type aliases for methods. Here I refactor a Factory class to use pattern.
tags:
- C#
- refactoring
---
In this post I will walk through how to refactor a Factory, moving from a sequence of `if`s to a dictionary implementation, and using delegates as a type alias for my object creation methods.

Here is a naive implementation of the Factory. You can see the series of `if` statements, and the direct construction and returning of the created object from the body of each:

	public class MessageFactory : IMessageFactory
	{
	    private readonly IArtifactApi _artifactApi;
	    private readonly ITarballReader _tarballReader;
	
	    public MessageFactory(IArtifactApi artifactApi, ITarballReader tarballReader)
	    {
	        _artifactApi = artifactApi;
	        _tarballReader = tarballReader;
	    }
	
	    public IMessage Create(string id, DateTime timestamp, string fileType, Payload payload)
	    {
	        if (fileType == FileTypes.AnalyticInstrumentsXml)
	        {
	            return new XmlMessage(_artifactApi, id, timestamp, payload);
	        }
	        if (fileType == FileTypes.BrokersXml)
	        {
	            return new XmlMessage(_artifactApi, id, timestamp, payload);
	        }
	        if (fileType == FileTypes.EconomyXml)
	        {
	            return new XmlMessage(_artifactApi, id, timestamp, payload);
	        }
	        if (fileType == FileTypes.OrdersXml)
	        {
	            return new XmlMessage(_artifactApi, id, timestamp, payload);
	        }
	        if (fileType == FileTypes.UsersXml)
	        {
	            return new XmlMessage(_artifactApi, id, timestamp, payload);
	        }
	        if (fileType == FileTypes.TradeTarball)
	        {
	            return new TarballMessage(_artifactApi, _tarballReader, id, timestamp, payload);
	        }
	        throw new NotImplementedException();
	    }
	}

I want to separate my conditional logic from my object construction, so I Extract Method for each of the constructor invocations:

	public class MessageFactory : IMessageFactory
	{
		private readonly IArtifactApi _artifactApi;
		private readonly ITarballReader _tarballReader;
	
		public MessageFactory(IArtifactApi artifactApi, ITarballReader tarballReader)
		{
			_artifactApi = artifactApi;
			_tarballReader = tarballReader;
		}
	
		public IMessage Create(string id, DateTime timestamp, string fileType, Payload payload)
		{
			if (fileType == FileTypes.AnalyticInstrumentsXml)
			{
				return CreateXmlMessage(_artifactApi, id, timestamp, payload);
			}
			if (fileType == FileTypes.BrokersXml)
			{
				return CreateXmlMessage(_artifactApi, id, timestamp, payload);
			}
			if (fileType == FileTypes.EconomyXml)
			{
				return CreateXmlMessage(_artifactApi, id, timestamp, payload);
			}
			if (fileType == FileTypes.OrdersXml)
			{
				return CreateXmlMessage(_artifactApi, id, timestamp, payload);
			}
			if (fileType == FileTypes.UsersXml)
			{
				return CreateXmlMessage(_artifactApi, id, timestamp, payload);
			}
			if (fileType == FileTypes.TradeTarball)
			{
				return CreateTarballMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			throw new NotImplementedException();
		}
	
		private static IMessage CreateXmlMessage(IArtifactApi artifactApi, string id, DateTime timestamp, Payload payload)
		{
			return new XmlMessage(artifactApi, id, timestamp, payload);
		}
	
		private static IMessage CreateTarballMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new TarballMessage(artifactApi, tarballReader, id, timestamp, payload);
		}
	}

I want to convert my chain of conditionals into a Dictionary, but to do so, I need my methods to have the same type signature. I add a dummy parameter to `CreateXmlMessage`:

	public class MessageFactory : IMessageFactory
	{
		private readonly IArtifactApi _artifactApi;
		private readonly ITarballReader _tarballReader;
	
		public MessageFactory(IArtifactApi artifactApi, ITarballReader tarballReader)
		{
			_artifactApi = artifactApi;
			_tarballReader = tarballReader;
		}
	
		public IMessage Create(string id, DateTime timestamp, string fileType, Payload payload)
		{
			if (fileType == FileTypes.AnalyticInstrumentsXml)
			{
				return CreateXmlMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			if (fileType == FileTypes.BrokersXml)
			{
				return CreateXmlMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			if (fileType == FileTypes.EconomyXml)
			{
				return CreateXmlMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			if (fileType == FileTypes.OrdersXml)
			{
				return CreateXmlMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			if (fileType == FileTypes.UsersXml)
			{
				return CreateXmlMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			if (fileType == FileTypes.TradeTarball)
			{
				return CreateTarballMessage(_artifactApi, _tarballReader, id, timestamp, payload);
			}
			throw new NotImplementedException();
		}
	
		private static IMessage CreateXmlMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new XmlMessage(artifactApi, id, timestamp, payload);
		}
	
		private static IMessage CreateTarballMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new TarballMessage(artifactApi, tarballReader, id, timestamp, payload);
		}
	}

At this point, I can create a Dictionary to map from `fileType` to my creation methods:

	public class MessageFactory : IMessageFactory
	{
		private readonly IArtifactApi _artifactApi;
		private readonly ITarballReader _tarballReader;
	
		private readonly Dictionary<string, Func<IArtifactApi, ITarballReader, string, DateTime, Payload, IMessage>> _factories =
			new Dictionary<string, Func<IArtifactApi, ITarballReader, string, DateTime, Payload, IMessage>>
			{
				{FileTypes.AnalyticInstrumentsXml, CreateXmlMessage},
				{FileTypes.BrokersXml, CreateXmlMessage},
				{FileTypes.EconomyXml, CreateXmlMessage},
				{FileTypes.OrdersXml, CreateXmlMessage},
				{FileTypes.UsersXml, CreateXmlMessage},
				{FileTypes.TradeTarball, CreateTarballMessage}
			};
	
		public MessageFactory(IArtifactApi artifactApi, ITarballReader tarballReader)
		{
			_artifactApi = artifactApi;
			_tarballReader = tarballReader;
		}
	
		public IMessage Create(string id, DateTime timestamp, string fileType, Payload payload)
		{
			return _factories[fileType](_artifactApi, _tarballReader, id, timestamp, payload);
		}
	
		private static IMessage CreateXmlMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new XmlMessage(artifactApi, id, timestamp, payload);
		}
	
		private static IMessage CreateTarballMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new TarballMessage(artifactApi, tarballReader, id, timestamp, payload);
		}
	}

This is looking nicer, except for the type signature of the Dictionary, which is fairly gruesome:

	private readonly Dictionary<string, Func<IArtifactApi, ITarballReader, string, DateTime, Payload, IMessage>> _factories =
			new Dictionary<string, Func<IArtifactApi, ITarballReader, string, DateTime, Payload, IMessage>> {/*...*/};

Now, later in my refactoring I would want to remove the primitive obsession around `fileType` by using either an enum or, preferably, a class with behaviour. But at the moment I’m focusing on internally refactoring this Factory.

I would also like to remove the data clumps passed into the creation functions. Again, I might find an appropriate type to contain the data, and this might lead me to a more polymorphous implementation.

But right now, I want to make my code a little more succinct and semantically clearer, so I use a delegate as a type alias for `Func<IArtifactApi, ITarballReader, string, DateTime, Payload, IMessage>`:

	public class MessageFactory : IMessageFactory
	{
		private readonly IArtifactApi _artifactApi;
		private readonly ITarballReader _tarballReader;
	
		private readonly Dictionary<string, CreateMessage> _factories =
			new Dictionary<string, CreateMessage>
			{
				{FileTypes.AnalyticInstrumentsXml, CreateXmlMessage},
				{FileTypes.BrokersXml, CreateXmlMessage},
				{FileTypes.EconomyXml, CreateXmlMessage},
				{FileTypes.OrdersXml, CreateXmlMessage},
				{FileTypes.UsersXml, CreateXmlMessage},
				{FileTypes.TradeTarball, CreateTarballMessage}
			};
	
		public MessageFactory(IArtifactApi artifactApi, ITarballReader tarballReader)
		{
			_artifactApi = artifactApi;
			_tarballReader = tarballReader;
		}
	
		public IMessage Create(string id, DateTime timestamp, string fileType, Payload payload)
		{
			return _factories[fileType](_artifactApi, _tarballReader, id, timestamp, payload);
		}
	
		private static IMessage CreateXmlMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new XmlMessage(artifactApi, id, timestamp, payload);
		}
	
		private static IMessage CreateTarballMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id, DateTime timestamp, Payload payload)
		{
			return new TarballMessage(artifactApi, tarballReader, id, timestamp, payload);
		}
	
		private delegate IMessage CreateMessage(IArtifactApi artifactApi, ITarballReader tarballReader, string id,DateTime timestamp, Payload payload);
	}

It is interesting that neither of the methods explicitly implements this delegate: it’s sufficient for the signatures to coincide. This is one of those areas of C# where functional programming patterns creep into an otherwise fairly object-oriented idiom (type aliases or abbreviations are commonplace in F#, for example). I would be wary of exposing this delegate outside the class in which it is declared, and would choose a more object-oriented approach if I wanted to extract different creation behaviours, but I like the succinctness and clarity that this technique gives me within a single class.

---

Image credit: [Venetian Carnival Mask](https://www.flickr.com/photos/gnuckx/4816738038) by [gnuckx](https://www.flickr.com/photos/gnuckx/) is licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) / cropped and resized from original