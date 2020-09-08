---
layout: post
asset-type: post
name: why-is-owasp-important-for-business-leaders
title: Why is OWASP Important for Business Leaders?
title-es: ¿Por qué OWASP es importante para el negocio?
date: 2020-09-07 09:00:00 +00:00
author: Tom Spencer
description: Security can no longer be an afterthought, developers and business leaders need to bake in security to their applications and be ready to explain to senior management how to protect the company. The OWASP Top Ten raises vital issues of software security regularly based on most recent security breaches in the industry.
description-es: La seguridad ya no puede ser un objetivo secundario. Los líderes empresariales y los desarrolladores necesitan integrar la seguridad en sus aplicaciones desde el principio. El top ten de OWASP plantea problemas vitales de seguridad del software con regularidad en función de las brechas de seguridad que se detectan.

image:
  src: /assets/custom/img/blog/2020-09-04-why-is-owasp-important-for-business-leaders/OWASP-for-business-leaders-header.jpg
tags:
  - web application security
  - quantify risk
  - web security tips
  - data exposure
  - security breaches
  - improve web security
  - cybersecurity
  - known security issues
  - SQL
  - injection tips
  - OWASP awareness
  - business leaders
pinned_locations:
  - specialist-expertise
in_page_banner: none
hubspot-cta-id: 346f1af2-8893-47c2-9f3e-f8859853d0c5
hubspot-cta-id-es: 6d6911c3-0bce-4b1e-8626-90736b184712
---

In this article we discuss why the Open Web Application Security Project top ten is important in a business context. The Open Web Application Security Project is a non-profit foundation that works to improve the security of software. The OWASP top ten raises vital issues of software security regularly based on most recent security breaches in the industry. Security can no longer be an afterthought, business leaders and [developers](https://codurance.com/2020/09/04/why-is-owasp-important-for-developers/) need to bake security into their applications from the outset.

The Open Web Application Security Project is an online community that produces freely available articles in the field of web application security. The OWASP foundation also releases a regular update on the top ten security threats.

Application security is of paramount importance for companies. Breaches of application security can lead to regulatory fines, identity theft and fraud. Poor security can damage an organisation and even lose senior managers their jobs. There are many recent examples. In 2017 the Wannacry virus hit a perhaps overly complacent Talk Talk. The same virus reportedly cost the NHS £92 million, impacting the provision of care to patients.

The sheer scale of security breaches is astounding. In 2008 Albert Gonzalez was arrested following the theft and circulation of upwards of 170 million card and ATM numbers from 2005 to 2007. It is estimated that the fallout from related credit card attacks has so far cost upwards of $4 billion. One of the companies targeted for credit card theft was Epsilon, a company responsible for servicing billions of emails for up to 75 clients including JPMorgan Chase and Target. In 2014, the CEO of Target resigned after a separate cyber attack affecting more than 41 million customer payment card accounts. In 2019 Capital One was fined $80 million for a data breach affecting up to 100 million users. In 2017 Equifax revealed that 145.5 million US customers’ identities had been stolen. In the same year Yahoo! revealed that 3 billion Yahoo! accounts were stolen.

## Quantifying risk

It is helpful to place the importance of the OWASP Top Ten in the context of risk management for quantifying company cybersecurity more generally. Risk quantification can be summarized as the product of threat times vulnerability times impact:

                                        R = T × V × I

Here R stands for Risk or the level of risk exposure for the company. T stands for threat, V for vulnerability and I for impact. In this section we will use a series of acronyms to help businesses understand risk. These risk measurements will be useful to ensure the relevance of each of OWASP’s top ten security threats in the context of your organization.

Companies can use the CIA acronym to grade the importance of the information that they hold. This helps measure the impact of a possible data breach. In the CIA acronym, confidentiality stands for the level of secrecy of the information. Here the main question is whether the data held is already public or is it highly sensitive. Integrity concerns how important it is that the context of the data not be tampered with. For instance, a list of sales may have low integrity whereas code for financial trading would have high integrity because modification could cost millions. Availability regards how important it is that the information be easily accessed. Here it can help to capture the high-level business risks in order to build context for data [security decisions](http://mng.bz/3B12).
The CIA acronym helps companies to quantify the impact but not the threats and vulnerability to data breach.

Threat modeling requires assessing the entire scope of threats to which a system can be exposed. Here the acronym STRIDE (spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege) serves as a useful taxonomy used by Microsoft to guide [risk assessment]( http://mng.bz/1X51).
For better context, we can consider each of the STRIDE threats in relation to a hypothetical invoice service used on web browsers and hosted on AWS. Here, spoofing would involve stealing the identity of a legitimate user and uploading fraudulent invoices on their behalf. Tampering would involve compromising the database via SQL injection to remove or modify stored invoices. For repudiation, a malicious user might delete the customer’s paid invoice data and deny that payment had been completed. Information disclosure might involve leaking invoices from the database. Denial of service might involve uploading large volumes of invoices, crashing the system and preventing access. Finally, elevation of privilege would involve breaching application servers and gaining access to other critical services in the infrastructure.

We have now considered threat and impact. The next challenge for a company is to assess the likelihood of the threat, i.e. the company’s vulnerability to a data breach. Here, it is useful to refer to [Microsoft’s DREAD acronym](http://mng.bz/3h37) to rank each area of your business on a scale from 1 - 10. Using the above outlined invoicing service, we can consider each item in the DREAD acronym. The damage potential would be high since an attack could modify all unpaid invoices in a database and impair the organization’s cash flow. Reproducibility would be low since an attack has not yet been successfully mounted against the application. Exploitability would be high because the invoicer service is hosted on the public internet and is publicly accessible. Affected users could include all users with unpaid invoices. Discoverability depends on the monitoring of the application and how quickly threats can be highlighted.

## Latest trends

OWASP is a summary of the top ten threats and is collated from real data. The technical nature of the list can hide the real stories behind the data. It is important to emphasize that data breaches continue to be an important vector of risk for companies. In March 2020 Marriott revealed the exposure of the data of 5.2 million guests. In April 2020 Nintendo announced 160,000 accounts had been breached. Some of the compromised accounts had been used by attackers in order to buy items. For these companies, broken authentication (number 2 on the OWASP top ten) could have been mitigated through multi-factor authentication. In May 2020, EasyJet revealed that 9 million customers’ personal data was stolen by an attacker leading to an £18 billion class action lawsuit for GDPR although the final fine may be considerably lighter partly due to business issues relating to the Coronavirus pandemic.

{% include owasp-top-ten-cheat-sheet-banner-business.html %}



## OWASP top ten

The Open Web Application’s Security Project top ten is, therefore, extremely important because it gives organizations a priority over which risks to focus on. Business leaders should use this list in order to help teams understand, identify, mitigate and fix vulnerabilities in their business applications. Each identified risk is prioritized according to prevalence, detectability, impact and exploitability.

## 1. Injection

Injection attacks occur when untrusted data is sent to an application through a form of input. For example, an attacker could input SQL database code into a form that is designed to send usernames. If the form input is not properly secured this could lead to SQL code being executed. This is also known as an SQL injection attack.

The best way to protect against injection attacks is by validating and sanitizing user submitted data. Validation means rejecting suspicious data and sanitization means cleaning suspicious looking parts of the data. Database administrators should minimize the amount of information vulnerable to injection attacks.

## 2. Broken authentication

Vulnerabilities in login systems can give attackers access to user accounts and the ability to compromise applications more widely through those accounts with higher privileges. Attackers can use scripts in order to attempt multiple usernames and password variations in order to gain access to applications. Strategies to reduce the likelihood of broken authentication could include multi-factor authentication and limiting repeated login attempts.

## 3. Sensitive data exposure
   
Sensitive data can be loosely defined as valuable information that can be stolen or used against the victim. Sensitive data includes credit card details, medical records, email and even purchasing records.

Sensitive data exposure is often headline-worthy and can be very damaging for companies. Here, it is useful to differentiate between data at rest and data in transit. Data in transit is data actively moving from one location to another. Data at rest is data stored on any device or network. Attackers are more likely to raid data in transit on the web than attempt to break the cryptographic protection of data at rest. An attacker could also target a stolen laptop with unencrypted information.

To mitigate this vulnerability use strict data transport security, make sure sensitive data is encrypted in the database and decrypt data based on the user’s authorization as opposed to that of the server. It is also important to avoid [storing passwords](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) in plain text.

## 4. XML External Entities (XXE)

XML is a software and hardware independent tool for storing and transporting data. It stands for eXtensible Markup Language. An XML External Entity Injection is a web vulnerability that abuses a widely available but rarely used feature of XML parsers, allowing for adding custom entities within the data. This functionality has the unfortunate side effect of allowing the attacker to interfere with the processing of XML data. The best way to avoid XXE vulnerabilities is to disable document type definitions in XML parsers. Most frameworks support disabling external entities and document type declarations for parsers.

## 5. Broken access control

Broken access control happens when users can access a resource or perform an action that they are not authorized to access. It can occur when attackers are able to directly access objects on the server. For example, applications that allow users to change their account session through the URL without any other verification can be vulnerable to broken access control.  

Logging users in with a personalised token for use while navigating the application can be an efficient way of verifying identity. With these personalised authorization tokens, users are able to confirm they are who they claim to be without having to constantly enter login credentials.

## 6. Security Misconfiguration
   
Security misconfiguration occurs when developers fail to implement all the security controls for a server or web application, or worse, implement security controls with errors.  In 2017 an unknown group of hackers were able to gain access to thousands of MongoDB databases by using the default passwords. The lesson is clear, forbid default passwords. Default passwords are a serious hazard.

Another metric for security configuration is an overexposed "attack surface", meaning the sum of IP addresses ports and protocols open to attackers. This vulnerability can be easily reduced by splitting internal traffic into its own interface separate from public facing traffic. It is also important to have a clear inventory of applications that are exposed to production. A sample server application released inadvertently to production can be an attractive target for attackers particularly since some of them are well known and are never updated.

## 7. Cross-site scripting (XSS)

Cross-site scripting vulnerabilities occur when web applications allow users to add custom code into a URL path or onto a website seen by other users. Attackers can use this vulnerability to run Javascript in the victim’s browser. An attacker might send an email to a victim purporting to be from a bank with a link to the bank’s website. The link might have malicious code tagged on the end of the URL. If the bank’s website is not properly protected against cross-site scripting then the malicious code will be run in the victim’s browser when they click on the link.

Strategies to protect against cross-site scripting could include escaping untrusted URL addresses and validating and sanitizing user generated content. Many modern frameworks include cross-site scripting protection.

## 8. Insecure deserialization

Serialization involves the conversion of collected data into 1s and 0s for onward transmission so that the object can then be recreated by the receiver. In this process, data objects are converted into a format that can be saved to the database or transferred over a network. The reverse, deserialization, is when a serialized collection of data is read from a file or network and converted back into a data object.

Insecure deserialization can result in arbitrary code execution, granting attackers a wide range of capabilities. It occurs when attackers are able to manipulate serialized objects and authenticate as someone they are not. If an application uses insecure deserialization malicious users might even be able to embed code snippets within the data for execution during deserialization. Generally, deserialization of user input should be avoided unless absolutely necessary. Attacks involving insecure deserialization can also be used to inflict a Denial of Service attack, execute code, whether through SQL injection and cross-site scripting.

## 9. Using components with known vulnerabilities

Developers commonly use components such as libraries and frameworks in business applications. These components are pieces of software that developers use to avoid redundant work and quickly bootstrap necessary functionality. The security issues occur when developers don’t update the libraries they are using as these libraries then become known vulnerabilities for potential hackers.

Known vulnerabilities are publicly disclosed security bugs. Attackers use these public vulnerabilities to target applications so it is important to ensure security is up to date. The most famous example of a third party vulnerability was caused by Apache Struts 2 which allowed remote code execution and was the primary cause of the Equifax data breach. This 2017 breach exposed the personal information of more than 100 million users.

Component developers often offer security patches and updates to correct known vulnerabilities but developers don’t always have the patched or most recent versions of components running on the business applications. Time should be allocated to allow developers to report on and remove unused components from projects and also to ensure that they are using components from a trusted source and are up to date.

## 10. Insufficient logging and monitoring

A good definition of monitoring was laid out by Greg Poirier put it at the [Monitorama 2016 conference](https://vimeo.com/173610062):

> Monitoring is the action of observing and checking the behaviour and outputs of a system and its components over time.

Exploiting insufficient logging and monitoring is the bedrock of nearly every major data breach or security incident. Attackers rely on the lack of monitoring and timely response to avoid detection. Unfortunately, there is no magic silver bullet to resolve the [lack of monitoring in your organisation](https://www.goodreads.com/book/show/17346927-the-practice-of-network-security-monitoring).

## Conclusion

The wide range of companies that have fallen victim to malicious breaches and the widely publicised mega breaches of recent years shows the importance of making security assessment part of the everyday work of business leaders, developers and architects. Possible team wide initiatives to improve security awareness could include a bug bounty, gamifying clearer developer understanding through regular email challenges or even a monthly cybersecurity quiz night. The most important point is to build a learners’ mindset amongst teams regarding cybersecurity and the OWASP Top Ten is the first port of call for better understanding in order to plan and defend against possible threats. The findings are a reminder of the importance of baking in security into the development process in order to [manage risks effectively](https://www.goodreads.com/book/show/34695178-securing-devops?ac=1&from_search=true&qid=YkcNliTAS8&rank=1).
Developers should be expected to explain the security precautions and challenges of business applications to business leaders so that businesses are more adequately prepared for attacks and can analyse threats and vulnerabilities.

For business leaders interested in developing awareness of the OWASP top ten amongst development teams we have another article directed at [developers](https://codurance.com/2020/09/04/why-is-owasp-important-for-developers/).
If you wish to learn more about refactoring and improving security for your business please fill out the form below to access the handout.

{% include owasp-top-ten-cheat-sheet-banner-business.html %}