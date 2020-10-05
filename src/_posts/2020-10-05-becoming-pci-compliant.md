---
layout: post
asset-type: post
name: becoming-pci-compliant
title: Becoming PCI Compliant  
title-es: Cumplir la normativa PCI 
date: 2020-10-05 09:00:00 +00:00
author: Sylvester Loreto
description: Merchants, acquirers, and service providers of any size accepting credit and debit cards must comply with PCI DSS - Payment Card Industry Data Security Standards, to ensure they are protected against security breaches, enhance trust and protect the integrity of the overall payment system. In this article we talk about the necessary security processes to observe in this matter.
description-es: Cualquier comercio o proveedor de servicios  que acepten tarjetas de crédito y débito deben cumplir con los Estándares de seguridad de datos PCI DSS  de la industria de tarjetas de pago, para garantizar que estén protegidos contra violaciones de seguridad, mejorar la confianza y proteger la integridad del sistema de pago en general. En este artículo hablamos de los procesos de seguridad necesarios a observar en esta materia. 

image:
    src: /assets/custom/img/blog/2020-10-05-becoming-pci-compliant/codurance-blog-hero-becoming-pci-compliant.jpg

tags:
    - pci compliance 
    - pci dss 
    - pci 
    - payment card industry 
    - data security standards

in_page_banner: none

--- 

## What is PCI DSS?

PCI-DSS stands for Payment Card Industry Data Security Standards.

This is the result of a collaboration which started in 2004 between the major debit and credit cards companies. American Express, Discover, JCB, MasterCard and Visa.

A set of security standards were designed to ensure a secure environment is maintained by all companies who accept, process, store or transmit any cardholder data. This covers operational and technical practices for system components included in or connected to environments with cardholders data.

On 7 September 2006, the Payment Card Industry Security Standards Council (PCI SSC) was created to manage the ongoing evolution of the Payment Card Industry (PCI) security standards. The focus is on improving payment account data security throughout the transaction process. This is achieved by developing standards and supporting services that drives education, awareness and effective implementation by stakeholders.

There are four strategic pillars in this mission. These are:

- Increase industry participation and knowledge
- Evolve security standards and validation
- Secure emerging payment channels
- Increase standards alignment and consistency

Also, the founders recognised the importance of Qualified Security Assessors (QSAs) and Approved Scanning Vendors (ASVs) must be qualified by PCI SSC.

The PCI DSS is administered and managed by the Payment Card Industry Security Standards Council - PCI SSC, an independent body that was also created by the major payment card brands. It is important to note that the payment companies and acquirers are responsible for enforcing compliance, not the PCI SSC.

Resources:

- [https://www.pcisecuritystandards.org/](https://www.pcisecuritystandards.org/)
- [https://www.pcisecuritystandards.org/about\_us/](https://www.pcisecuritystandards.org/about_us/)
- [https://www.pcisecuritystandards.org/assessors\_and\_solutions/qualified\_security\_assessors](https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors)
- [https://www.pcisecuritystandards.org/assessors\_and\_solutions/approved\_scanning\_vendors](https://www.pcisecuritystandards.org/assessors_and_solutions/approved_scanning_vendors)

## Why would a business need it?

If your business accepts, processes, stores or transmits payment card data, PCI DSS applies to your business therefore your business needs to comply with the standard.

Merchants and service providers compliance requirements differ depending on a number of factors such as the size of the organisation and the volume of transactions it undertakes throughout the year. The criteria that a merchant or service provider have to meet are set by the individual payment card providers, each of which has its own compliance programme.

PCI DSS compliance requirements vary depending on the number of transactions a business accepts. The following merchant levels apply (criteria is from Stripe).

| Level | Applies to | Requirements |
| --- | --- | --- |
| Level 1 | - Organisations that annually process more than 6 million transactions of Visa or MasterCard, or more than 2.5 million for American Express; or - Have experienced a data breach; or - Are deemed "Level 1" by any card association (Visa, Mastercard, etc) | - Annual Report on Compliance (ROC) by a Qualified Security Assessor (QSA) - also commonly known as a Level 1 onsite assessment - or internal auditor if signed by an officer of the company - Quarterly network scan by Approved Scan Vendor (ASV) - Attestation of Compliance (AOC) for Onsite Assessments–there are specific forms for merchants and service providers|
| Level 2 | - Organisations that process between 1-6 million transactions annually|- Annual PCI DSS Self-Assessment Questionnaire (SAQ)- Quarterly network scan by Approved Scan Vendor (ASV)- Attestation of Compliance (AOC)|
| Level 3 | - Organisations that process between 20,000-1 million online transactions annually - Organizations that process less than 1 million total transactions annually|
| Level 4 | - Organisations that process fewer than 20,000 online transactions annually; or - Organizations that process up to 1 million total transactions annually|

Resources:

- [https://stripe.com/gb/guides/pci-compliance](https://stripe.com/gb/guides/pci-compliance)
- [https://www.pcisecuritystandards.org/documents/PCI-DSS-v3\_2\_1-ROC-Reporting-Template.pdf](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2_1-ROC-Reporting-Template.pdf)

## What does it mean?

The PCI DSS is a standard and not a law. It is enforced through contracts between merchants, acquiring banks and payment brands. Each payment brand can fine acquiring banks for PCI DSS compliance violations and, acquiring banks can withdraw the ability to accept card payments from non-compliant merchants.

It&#39;s also important to remember that a PCI DSS breach is always a GDPR breach as cardholder data is classified as personal data under regulation. Enforcement action from your acquiring bank, your organisation could face fines of up to £18 million or 4% of annual global turnover under the GDPR whichever is greater.

## Does my whole system need to be PCI compliant?

Not necessarily. Only the system components which store, process, or transmit cardholder data and/or sensitive authentication data.

The PCI DSS specifies 12 requirements that are organised into 6 control objectives.

BUILD AND MAINTAIN A SECURE NETWORK AND SYSTEMS

- Install and maintain a firewall configuration to protect cardholder data
- Do not use vendor-supplied defaults for system passwords and other security parameters

PROTECT CARDHOLDER DATA

- Protect stored cardholder data
- Encrypt transmission of cardholder data across open or public networks

MAINTAIN A VULNERABILITY MANAGEMENT PROGRAM

- Protect all systems against malware and regularly update anti-virus software
- Develop and maintain secure systems and applications

IMPLEMENT STRONG ACCESS CONTROL MEASURES

- Restrict access to cardholder data by business need to know
- Identify and authenticate access to system components
- Restrict physical access to cardholder data

REGULARLY MONITOR AND TEST NETWORKS

- Track and monitor all access to network resources and cardholder data
- Regularly test security systems and processes

MAINTAIN AN INFORMATION SECURITY POLICY

- Maintain a policy that addresses information security for all personnel

Resource:

- [https://stripe.com/gb/guides/pci-compliance](https://stripe.com/gb/guides/pci-compliance)

## How do I know where to start?

To ensure personal data is protected, you need to have visibility to where it lives and how it gets there. A comprehensive map of the systems handling such sensitive data is a good starting point. This will very likely require collaboration with security, IT, payments, finance and legal teams. Some organisations may choose to create a dedicated PCI DSS team with a representative of each required team.

In a lot of cases using a service provider like Stripe to handle payments is worthwhile because it eliminates much of the security complexity.

There are multiple ways in which payments are made.

- Identify every consumer-facing area of the business that involves payment transactions such as online shopping carts, in-store payment terminals and orders placed over the phone.
- Understand how cardholders data is being handled across the business.
- Which internal systems and respective technologies handle cardholders data such as software applications, network systems, data centers and cloud environments.
- IT teams need to ensure that the right configurations and protocols such as Transport Layer Security (TLS) are in place.
- Some of the 12 security requirements for PCI DSS mentioned above, may overlap with a few privacy mandates such as GDPR which are already in place by your organisation.

PCI compliance is an ongoing process to ensure your business remains PCI compliant. Having said this, an ongoing collaboration will be required between different departments such as security, IT, payments, finance and legal.

[https://stripe.com/gb/guides/pci-compliance](https://stripe.com/gb/guides/pci-compliance)

Glossary of Compliant terms and meanings:

- **Qualified Security Assessors (QSAs)** companies are independent security organizations that have been qualified by the PCI Security Standards Council to validate an entity&#39;s adherence to PCI DSS. QSA Employees are individuals who are employed by a QSA Company and have satisfied and continue to satisfy all QSA Requirements.
- **Approved Scanning Vendors (ASVs)** is an organization with a set of security services and tools (&quot;ASV scan solution&quot;) to conduct external vulnerability scanning services to validate adherence with the external scanning requirements of PCI DSS Requirements. The scanning vendor&#39;s ASV scan solution is tested and approved by PCI SSC before an ASV is added to PCI SSC&#39;s List of Approved Scanning Vendors.
- **Attestation of Compliance (AOC)** or certification that you are eligible to perform and have performed the appropriate Self-Assessment. An appropriate Attestation will be packaged with the Questionnaire that you select.
- **Cardholder** non-consumer or consumer customer to whom a payment card is issued to or any individual authorized to use the payment card.
- **Merchants** are any entity that accepts payment cards bearing the logos of any of the five members of PCI SSC (American Express, Discover, JCB, MasterCard or Visa) as payment for goods and/or services.
- **Service providers** are businesses entities that are not a payment brand, directly involved in the processing, storage, or transmission of cardholder data on behalf of another entity. This also includes companies that provide services that control or could impact the security of cardholder data.
- **Payment card provider** any payment card/device that bears the logo of the founding members of PCI SSC, which are American Express, Discover Financial Services, JCB International, MasterCard, or Visa, Inc.
- **Organisations** are the businesses providing goods and services.
- **General Data Protection Regulation (GDPR)** is a regulation in EU law on data protection and privacy in the European Union (EU) and the European Economic Area (EEA). It also addresses the transfer of personal data outside the EU and EEA areas. The GDPR&#39;s primary aim is to give control to individuals over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU.
- **Stripe** is an American financial services and software as a service (SaaS) company headquartered in San Francisco, California, United States. The company primarily offers payment processing software and application programming interfaces (APIs) for e-commerce websites and mobile applications.