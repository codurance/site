---
layout: post
asset-type: post
name: why-is-owasp-important-for-developers
title: Why is OWASP Important for Developers?
title-es: ¿Por qué es importante OWASP para los desarrolladores?
date: 2020-09-07 08:00:00 +00:00
author: Tom Spencer
description: Developers need to bake in security to their applications and be ready to explain to senior management how to protect the company. In this article we discuss why the Open Web Application Security Project Top Ten is important in a developer context.
description-es: Los desarrolladores deben incorporar la seguridad a sus aplicaciones y estar preparados para explicar a los managers cómo proteger a la empresa. En este artículo, analizamos por qué el Open Web Application Security Project Top Ten es importante en el contexto de un desarrollador.


image:
  src: /assets/custom/img/blog/2020-09-04-why-is-owasp-important-for-developers/OWASP-for-developers-header.jpg
tags:
  - specialist expertise
  - software craftsmanship
  - security
  - developers
  - OWASP
pinned_locations:
  - specialist-expertise
in_page_banner: none
hubspot-cta-id: dcdb2f7b-8b1f-4508-89b1-5eb1c2cb2aff
hubspot-cta-id-es: 9f4d2ca9-01bc-4ed8-a929-6663155e6841
---

In this article, we discuss why the Open Web Application Security Project Top Ten is important in a developer context. The Open Web Application Security Project is a non-profit foundation that works to improve the security of software. The OWASP Top Ten raises vital issues of software security regularly based on most recent security breaches in the industry. Security can no longer be an afterthought, developers and [business leaders](https://codurance.com/2020/09/07/why-is-owasp-important-for-business-leaders/) need to bake in security  to their applications and be ready to explain to senior management how to protect the company.

Application security is of paramount importance for companies. Breaches of application security can lead to regulatory fines, identity theft and fraud. Poor security can damage an organisation, its finances and personnel. In 2017 the Wannacry virus hit a perhaps overly complacent Talk Talk and reportedly cost the NHS £92 million, impacting the provision of care to [patients](https://eandt.theiet.org/content/articles/2017/05/wannacry-and-ransomware-impact-on-patient-care-could-cause-fatalities/). The [CEO of Target resigned](https://www.theguardian.com/business/2014/may/05/target-chief-executive-steps-down-data-breach) after a serious data breach. Other data breaches include [Capital One](https://www.bbc.co.uk/news/world-us-canada-49159859) which was fined $80 million for a data breach affecting up to 100 million users. 

In this article, we will consider the Top Ten application vulnerabilities as laid out by the [Open Web Application Security Project](https://owasp.org/www-project-top-ten/) (OWASP).
{% include owasp-top-ten-cheat-sheet-banner.html %}

## OWASP

The Open Web Application Security Project is an online community that produces freely available articles on cyber security. The OWASP foundation also releases a regular update on the top ten security threats. The OWASP Top Ten is a regularly updated catalogue of app security incidents and vulnerabilities, first published in 2003. The mission of the OWASP foundation is to raise awareness about application security by identifying the current most critical risks companies are facing. This article reviews these vulnerabilities and also explores possible solutions for each of them.

## 1. Injection

## SQL Injection

SQL injection involves the contamination of ordinary user input in order to turn one SQL statement into more than one. The archetypal example is the [Bobby Tables attack](https://xkcd.com/327/).
In this amusing tale, the boy’s first name is “Robert’);” and his last name is “DROP TABLE Students;-- ”. The records application at Bobby’s school has concatenated strings in order to make queries to the database. The bracket in Bobby’s first name prematurely terminates the original query. Then his last name does its damage. The double hyphen at the end of Bobby’s surname acts as a comment so that the database will ignore the remainder of the input and the originally intended query.

In order to avoid SQL injection developers should avoid using a plain SQL statement in Java:

```
            String query = "SELECT * FROM STUDENT WHERE NAME = '" + name + "‘;"
```

Instead, developers should rather use a prepared statement:

```
            String query = “SELECT * FROM STUDENT WHERE NAME = ?;”;
            PreparedStatement stmt = connection.prepareStatement(query);
            stmt.setString(1, name);
            ResultSet results = stmt.executeQuery();

```

Here we prepare the SQL statement and turn the SQL into parameterized code without danger of injecting arbitrary SQL into the program.

## Tips:
- Use positive or “whitelist” server-side input validation
- Escape special characters for inputs

## 2. Broken Authentication and Session Management

Authentication is the process of verifying that a user, or application, is who or what they claim to be. Authentication is usually carried out through the user inputting private information.

Session management is the process whereby the server maintains the state of the entity it is interacting with. This is necessary because HTTP is a stateless protocol meaning that it does not keep context information from earlier sent packets of information. Each transmission via HTTP can be understood in isolation without reference to other sent packets. Websites requiring sign-in use sessions in order to persist the user’s interaction with the site.

Sessions are maintained on the server through a session identifier which is passed back and forth with the client when transmitting and receiving requests. As a first precaution application should not include session IDs in their URLs.

“Session hijacking” is a major vulnerability for applications. In this form of attack, a session ID in plain text might be duplicated by the attacker. An attacker might have found a session identifier in the front end in order to carry out this attack, so ensuring that session identifiers are hidden is a good best practice. 

There are many areas to consider when preparing a business case for a modernisation project. Still, most of the time, you can be quite safe if you focus on these three factors: the audience, what they need to know, and what they pay off is.

## Tips:
- Session IDs should be randomly generated and regenerated each time the user authenticates.
- Avoid allowing unlimited authentication attempts as this can be an invitation for hackers.

## 3. Sensitive Data Exposure

Sensitive data can be loosely defined as valuable information that can be stolen or used against the victim. Sensitive data includes credit card details, medical records, email and even purchasing records.

Sensitive data exposure is often headline-worthy and can be incredibly damaging for companies. Here, it is useful to differentiate between data at rest and data in transit. Data in transit is data actively moving from one location to another. Data at rest is data stored on any device or network. Attackers are more likely to raid data in transit than attempt to break cryptographic protections. An attack might take place at points in the network where there is no TLS and information is passed through REST or HTTP (perhaps internally). An attacker could also target a stolen laptop with unencrypted information.

Teams should apply mutual authentication between microservices using TLS. This has the added advantage of encrypting data transmission between microservices.
It is also important to ensure sensitive data is encrypted in the database and to decrypt data based on the user’s authorization as opposed to that of the server. Avoid [stroring passwords](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) in plain text.

## Tips:
- Classify and identify sensitive data in applications according to privacy laws or business needs
- Don’t store sensitive data unnecessarily
- Encrypt all sensitive data at rest
- Encrypt all data in transit with secure protocols such as TLS

## 4. XML External Entities (XXE)

XML or External Entity Injection is a web vulnerability which allows the attacker to interfere with the processing of XML data. Here is an example of Java code that is open to an XML injection attack:

```
            File xmlFile = new File(“c://input.xml”);
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(xmlFile);
```

The referenced XML file contains a further reference to a potentially malicious external (secret.txt):

```
            <?xml version=”1.0”?>
            <DOCTYPE test [
                <!ENTITY xxe SYSTEM “c://secret.txt” >
                ]>
            <test>&xxe;</test>
```

The insertion of the secret.txt file could allow the attacker to embed malicious code within the XML parser code. In order to protect against this form of attack we should add the following to our Java code:

```
            DocumentBuilderFactor dbFactory = DocumentBuilderFactory.newInstance();
            dbFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
```

Here the secure processing feature is set to true in order to ensure that our XML is safe from [injection attacks](https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html).

## Tips:
- Wherever possible use less complex data formats such as JSON and avoid serialization of sensitive data
- Upgrade all XML processors and libraries in use. Use SOAP 1.2 or higher
- Disable XML external entity in all XML parsers

## 5. Broken Access Control

Broken access control is when a user can access a resource or perform an action that they are not authorized to access. Broken access control can occur when attackers are able to directly access objects on the server. The following code uses unverified data from a request in an SQL query that is accessing information from the database:

```
            stmt.setString(1, request.getParameter(“#123”);
            ResultSet results = stmt.executeQuery();
```

The attacker is, therefore, able to modify the URL in the browser to query any account they want:

> http://mybank.com/app/accountInfo?acct=#456

There are two possible means by which this form of attack might be mitigated.

The first, and perhaps more obvious protection against broken access control, would be to avoid including sensitive information in URLs. A further extension of this approach would be to use session specific mapping from random IDs to real IDs or use generic URLs that are session sensitive. 

The second, more general, rule to follow would be that if a caller is not authorized to see the contents of a resource it should be as if the resource does not exist. In Java this is relatively easy to implement with @Preauthorize:

```
            	@PreAuthorize(“hasAuthority(‘Admin’)”)
            	@RequestMapping(“/restricted”)
            	@ResponseBody
            	public String restricted() {
            		return “restricted”;
            	}
```

The @Preauthorize annotation ensures that an attacker would get a 403 response if they tried to access the resource.

## Tips:
- JWT tokens should be invalidated on the server after logout
- Log access control failures and alert admins for repeated failures
- With the exception of public resources, deny by default


## 6. Security Misconfiguration

Security misconfiguration occurs when developers fail to implement all the security controls for a server or web application, or worse, implement security controls with errors. In 2017 an unknown group of hackers were able to gain access to thousands of MongoDB databases by using the default passwords. The lesson is clear, forbid default passwords. Default passwords are a serious hazard.

Another metric for security configuration is an overexposed "attack surface", meaning the sum of IP addresses ports and protocols open to attackers. This vulnerability can be easily reduced by splitting internal traffic into its own interface separate from public facing traffic. It is also important to have a clear inventory of applications that are exposed on production. A sample server application released inadvertently to production can be an attractive target for attackers particularly since some of them are well known and are never updated. Reducing the “attack surface” is also a responsibility of the wider team in ensuring that release processes are robust in order to monitor and test non-production hardened applications.

## Tips:
- Automate processes to verify effectiveness of configurations in all environments
- Keep platforms minimal without unnecessary features, components, documentation and samples
- Remove or do not install unused features and frameworks

## 7. Cross Site Scripting (XSS)

Cross site Scripting, or XSS, is when an attacker deceives the client into running JavaScript in the victim’s browser. Reflected XXS occurs when attackers manipulate the DOM in order to add their own data. Vulnerability to this kind of attack is even possible in [modern JS applications](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0). Vulnerable code would look like this:

```
                <script>window.__STATE__ = $(JSON.stringify({data})</script>
```

Here, JSON.stringify() will turn data into a string as long as it is valid JSON for rendering on the page. Accordingly, attackers might add scripts to usernames or bios:

```
                {
                    username: “LOL”,
                    bio: “</script><script>alert(“XSS attack!”)</script>
                }
```

One solution to this vulnerability is to use the serialize-javascript npm module to escape the rendered JSON:

```
                > npm install --save serialize-javascript
```

The window variable can then be wrapped in the method serialise():

```
                <script>window.__STATE__ = ${ serialize( data, { isJSON: true } ) }</script>
```

Serializing and deserializing data is a common source of vulnerability and we will revisit this issue later in the article.

## Tips:
- Use frameworks that automatically escape XSS by design
- Escape untrusted HTTP request data
- Apply context sensitive encoding to protect against DOM XSS

## 8. Insecure deserialization

Serialization, aka marshalling in some languages, involves the conversion of objects to byte streams for transmission so that the object can then be reverted to a copy of the object. In this process, objects are converted into a format that can be saved to the database or transferred over a network. The reverse, deserialization, is when a serialized object is read from a file or network and converted back into an object.

Insecure deserialization can result in arbitrary code execution, granting attackers a wide range of capabilities. It occurs when attackers are able to manipulate serialized objects and authenticate as someone they are not. If an application uses insecure deserialization malicious users might even be able to embed code snippets in the object for execution during deserialization. Generally, deserialization of user input should be avoided unless absolutely necessary. Attacks involving insecure deserialization can also be used to inflict a DoS attack, execute code, whether through SQL injection, XSS.

## Tips:
- Enforce strict type constraints during deserialization before object creation
- Log deserialization exceptions and failures
- Monitor deserialization and alert if a user deserializes constantly

## 9. Using components with Known vulnerabilities

Known vulnerabilities are publicly disclosed security bugs. Attackers use these public vulnerabilities to target applications so it is important to ensure that security is up to date. Snyk is a good resource for checking vulnerabilities. For node applications Snyk can be installed via npm and authenticated on the command line. We can then use the command ‘snyk test’ to check the project for known vulnerabilities. Snyk is available in many other languages including Java.

It is extremely important for teams to stay ahead of potential vulnerabilities.  Apache Struts 2 was a particularly notorious example of a third party vulnerability that was exploited by attackers. Apache Struts 2 is an open-source Java web application [framework](https://www.youtube.com/watch?v=Ks46P0Wsi-U).

## Tips:
- Remove unused dependencies, unnecessary features, components, files and documentation
- Continuously inventory versions of client side and server side components
- Monitor for unmaintained libraries and components without security patches for older versions

## 10. Insufficient logging and monitoring

A good definition of monitoring was laid out by Greg Poirier put it at the Monitorama 2016 [conference](https://vimeo.com/173610062):

>Monitoring is the action of observing and checking the behavior and outputs of a system and its components over time.

Exploiting insufficient logging and monitoring is the bedrock of nearly every major data breach or security incident. Attackers rely on the lack of monitoring and timely response to avoid detection. Unfortunately, there is no magic silver bullet to resolve lack of monitoring in your [organisation](https://www.goodreads.com/book/show/17346927-the-practice-of-network-security-monitoring).
For organisations running large infrastructure paying monitoring servers is not sufficient but needs to be combined with monitoring network infrastructure and applications.

Many software attacks use rootkits in order to gain access level to a computer or network. Rootkits are programs that apply concealment techniques to malicious code and activities in order to avoid detection. Rootkits can be difficult to detect. Rkhunter is one example of a security monitoring tool which scans for rootkits and other vulnerabilities. This can be a useful addition to your monitoring toolkit.

## Tips:
- Establish effective monitoring and alerting to detect and respond to suspicious activities quickly and efficiently
- Ensure logs are generated in a format that is easily consumed by centralized log management solutions
- Ensure an audit trail for high value transactions

## Conclusion

The wide range of companies that have fallen victim to malicious breaches and the widely publicised mega breaches of recent years shows the importance of making security assessment part of the everyday work of developers, architects and business leaders. Possible team wide initiatives to improve security awareness could include a bug bounty, gamifying clearer developer understanding through regular email challenges or even a monthly cybersecurity quiz night. The most important point is to build a learners’ mindset amongst teams regarding cybersecurity and the OWASP Top Ten is a first port of call for better understanding in order to plan and defend against possible threats. The findings regularly remind us of the importance of baking security into the development process in order to manage security risks [effectively](https://www.goodreads.com/en/book/show/34695178-securing-devops).

For developers interested in developing awareness of the OWASP top ten amongst business leaders we have another article directed at [business leaders](https://codurance.com/2020/09/07/why-is-owasp-important-for-business-leaders/).

If you wish to learn more about refactoring and improving security for your business please fill out the form below to access the handout.
{% include owasp-top-ten-cheat-sheet-banner.html %}


