---
layout: post
asset-type: post
name: The 4 key elements of a conversation
title: 'The 4 key elements of a conversation'
date: 2017-02-08 09:00:00 +00:00
author: Giulia Mantuano
image:
  src: /assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals.jpg
tags:
- UX
- Chatbot
- Conversation Design
- Conversational Interfaces

---
Conversational Interfaces is a term often used to define systems that hold "human-like" conversations, examples include; Chatbots, Voice User Interfaces, Embodied Conversational Agents. The user interacts with these using text input, voice recognition, and gestures. These types of interfaces are often unable to provide a good conversational experience. In order to create a better experience we need to be aware of the following 4 key elements of human-to-human conversations.

## 1. Turn-taking
> A turn is one interaction between the user and the system, and a conversation is made of at least two-turns.

<div class="image-side-by-side-text">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/poncho-chatbot.jpg" alt="Hi Poncho on Facebook Messenger" width="250" height="300" />
</div>

<p class="text-side-by-side-image" >
<a href="http://poncho.is/">Poncho</a> is a chatbot that provides weather forecasts. Despite having a conversational interface that is better than most, Poncho lets the users down by not providing good turn-taking. As you can see in screenshot, in the second turn the Poncho has to interrupt the conversation because it is not able to understand the user’s prompt. That is not a good conversation. In this example, the conversation only has one turn. In a real human-to-human conversation that’s similar to meeting a friend and having the following dialog:</p>

<pre>
Me: “Hi Jane, How are you?”
Jane: “Hi, I’m good thank you!”
<emp>Jane walks away...</emp>
</pre>

<p>
Now that's an awkward conversation –people rarely have conversations that last a single turn.
</p>
<br class="clear-both" />

## 2. Context
> If the system can handle more than one turn, it should remember what occurred in previous conversational turns (context).

<a href="https://www.google.co.uk/search/about/">Google Voice Search</a> does a good job.
Asking Google Voice “Who was Oscar Wilde?” gives the user the following result:

<p>

<div class="images-side-by-side-left">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/google-voice-search-1.png" alt="Hi Poncho on Facebook Messenger" width="250" height="300" />
</div>

<div class="images-side-by-side-right">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/google-voice-search-2.png" alt="Hi Poncho on Facebook Messenger" width="250" height="300" />
</div>

</p>

In the second turn the user responds with, “Can you tell me more?”, a human-like conversation where the name of the author has been omitted, the system understands that they are referring to Oscar Wilde and it will show relevant results.


## 3. Reference
> The system should understand follow up questions that include pronouns, in order to feel more conversational.

<div class="image-side-by-side-text">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/mitzuku-chatbot.jpg" alt="Mitzuku on Facebook Messenger" width="250" height="300" />
</div>

<p class="text-side-by-side-image">
<a href="http://www.mitsuku.com/">Mitzuku</a> is a chatbot that won the Loebner Prize in 2013 and 2016. Users can have very long conversations with her, and its site also provides examples of users’ most recent <a href="http://www.square-bear.co.uk/mitsuku/chatlogs.htm">chatlogs</a>. In the screenshot you can see that the system understands pronouns, so that it can refer back to something that was previously mentioned.
</p>

<br class="clear-both" />

## 4. Variety
> The system should ask open questions, only if it is able to handle different ways of saying the same thing.

<a href="https://www.hipmunk.com/">Hipmunk</a> is a chatbot that promises to help you plan travel in the easiest and fastest way. The two screenshots below show that the system doesn’t support the 4th key element of a conversation. The system misinterprets my answer the first time that I enter the airport, because it accepts city names and airport codes only.

There are number of ways that the user could reply to open questions, and spending time on researching them will have a positive impact on the user experience.

<div class="images-side-by-side-left">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/hipmunk-chatbot-1.jpg" alt="Hipmunk on Facebook Messenger" width="250" height="300" />
</div>

<div class="images-side-by-side-right">
  <img src="/assets/img/custom/blog/2017-02-06-conversational-interface-design-fundamentals/hipmunk-chatbot-2.jpg" alt="Hipmunk on Facebook Messenger" width="250" height="300" />
</div>


## Conclusion
Researchers have proven that humans tend to anthropomorphise machines in a natural way. That’s why investigating the structure and process of social interaction between humans can enable better conversational interfaces. We need to include the 4 key elements of human-to-human conversation in our Conversational Design process in order to naturally engage users in interacting with systems.
