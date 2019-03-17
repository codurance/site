---
layout: post
asset-type: post
name: just-enough-technical-documentation
title: Just Enough Technical Documentation
date: 2019-03-17 08:00:00 +01:00
author: John Hearn
image:
    src: /assets/custom/img/blog/2019-03-17-just-enough-technical-documentation/fcc-valles-schematic.jpg
abstract: Looking again at high-level design documentation for software projects in the context of the team and its needs.
alias: [/2019/03/17/just-enough-technical-documentation]

---

Early in my career I had the dubious pleasure of using such tools as Rational Rose and ArgoUML to produce detailed technical diagrams using UML and I've seen first hand the advantages they bring. In any properly designed, non-trivial project there is structure that may not be immediately evident at code level. In these cases technical documentation, including diagrams, **facilitates a common technical understanding which in turn leads to better technical discussions and consequently better decisions overall**. This is a flavour of the case in favour.

In many situations, however, technical documentation can be **costly to maintain and is often forgotten when the system changes becoming out of date and worse than useless**. Diagrams of real systems, in particular, can very easily become unworkable or difficult to understand. People will not want to read such documentation, again making it valueless. Many say that for these reasons technical documentation is not worth the effort, and my feeling is that this view has gained traction in recent years.

In my opinion, when it comes to technical documentation there is a balance to be found but finding that sweet spot can be challenging. The rest of this post is a case study attempting to do just that.

### Case Study

In one recent project very little technical documentation was being written, for which the initial positive effect was to enable the project to advance very quickly. As the system became more complex, however, it led to misunderstandings within the team and difficulty for new team members to pick up the system easily. I also felt that it led to a communication gap with no shared vision to guide decisions. It seemed to me that some level of documentation would be of value. Step up the C4 Model.

Simon Brown's [C4 Model](https://c4model.com/) tries to address some of the genuine concerns about unmanageable documentation by providing guidelines for visualising systems with information which is useful at different levels of detail. It also provides some templates for useful diagramming styles. 

I thought there was an opportunity to apply some of those ideas in this project but first, before dedicating too much time to the idea, we discussed it with the various stakeholders and initial worries about maintenance were waylaid in several ways.

Firstly we decided to schedule a regular review in an existing fortnightly technical update. Some discipline is required in the process to ensure this actually happens.

Secondly, following the [Law of Diminishing Returns](https://en.wikipedia.org/wiki/Diminishing_returns), we aimed for maximising the ROI by only using the first two levels of detail in the documentation. Compare this with Alistair Cockburn’s concept of *sufficiency* and Scott Ambler's [JBGE](http://agilemodeling.com/essays/barelyGoodEnough.html).

Finally, we used standard HTML and a text-based diagramming tool: [PlantUML](http://plantuml.com/) in conjunction with Ricardo Niepel's [C4 macros](https://github.com/RicardoNiepel/C4-PlantUML). This allowed us to automate the generation of the diagrams and the publication of the documentation with a continuous integration pipeline. In this way we could apply our normal incremental, trunk-based coding practices to the documentation too.

We could then work on the documentation itself and the result is shown below (blurred to maintain confidentiality). 

<img src="{{site.baseurl}}/assets/custom/img/blog/2019-03-17-just-enough-technical-documentation/tech-doc-blurred-resized.png" style="float:left; padding-left: 30px; padding-right: 50px"/>
The document consists of a standard HTML page and several PlantUML generated diagrams with a **narrative** running through it, including a short description of the content of the document, the format and its purpose.

The top level includes a **context diagram** showing the system in the context of the main actors and the principal external dependencies.

It then goes on to include **container diagrams** which zoom into the system and show more of its internal structure.

Further levels of detail from **component** and **class diagrams** were omitted, not because they are not valuable but rather because they typically take longer to produce and have the highest maintenance costs, and those costs were considered to outweigh the potential returns at the time (something which may be revisited).

I won't go into too much detail about the diagrams, a lot of great information is available on the [C4 Model](https://c4model.com/) website. 

To facilitate easy maintenance we tried not to repeat information contained in the diagrams in the text and vice-versa. The narrative is an important part of the document but one of the strengths of the C4 model over UML is the extra information within the diagram itself and that information does not need to be duplicated.

It is very important to think very carefully about the detail shown at each level. For this reason it may be necessary to split sub-systems into separate diagrams at the same level. Without care the diagrams can become very complex very fast. This exercise makes patently clear the dependencies between the different containers and any associated problems. 

<p style="clear:left"/>
<br>
The initial feedback from the team was very positive with the strongest approval from new team members. Having **a single, easily digestible resource which summarised the system context and cryptic naming of external dependencies** turned out to he highly valuable. I noticed that a couple of  new colleagues had it open in a tab all day and continually referred back to it. Several people also helpfully corrected errors. 

Another fallout from the documentation was that it immediately (maybe too immediately!) provided a focal point for design discussion. This is a key point about this kind of documentation, rather than just being a system blueprint it actually **fosters a common understanding**. That common understanding and shared experience are vital to sustain a global technical vision for the whole team and facilitate effective communication.

The overall outcome of this exercise was clearly positive but some things remain open-ended. 

As mentioned above, getting the right level of detail is difficult. Is there enough value in each level of documentation and how can we measure it? What happens when the diagram becomes too unwieldy? 

Also there are inherent trade-offs using auto-generated diagrams. On the positive side they are much easier to edit and maintain. On the downside we tend to lose fine-grained control over placement of elements and adding a single element can even change the layout completely.

## Conclusions

Technical documentation for software projects must be considered in the context of the team and its needs. **Who is the audience for the documentation and what is the value it provides them?** Some projects will need to create it as part of the deliverables of the project, others will use it only internally. Operational needs may require a different focus to that required by development teams.

**Don't add detail that's not necessary**. That effort may be wasted or, worse, justify not using it. Remember the Law of Diminishing Returns.

Consider how to **ensure the documentation remains up to date**, either by including it in the workflow or reviewing it regularly. Making it a focal point in technical discussions will keep it relevant. It can be thought of as another artefact of the project, continually improved and refactored to provide maximum value. 

Think about the trade-offs of different diagramming methods and tools. We chose PlantUML for its simplicity and text-based interface but also consider more powerful modelling tools.

I believe that these kinds of considerations are part of any team's technical responsibilities. Tools like PlantUML and the C4 model can help us but, in the end, it's a skill that must be practised like any other.