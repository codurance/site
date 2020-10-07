---
layout: post
asset-type: post
name: becoming-pci-compliant
title: Becoming PCI Compliant  
title-es: Cumplir la normativa PCI 
date: 2020-10-05 09:00:00 +00:00
author: Sylvester Abreu Loreto
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

pinned_locations:
    - specialist-expertise

in_page_banner: none

hubspot-cta-id: 80421005-a775-4791-aca5-0f1caa5eb2d2
hubspot-cta-id-es: 2d7571d7-6197-4f75-a66f-114997eabe39

--- 

### What is PCI DSS?

PCI-DSS stands for Payment Card Industry Data Security Standards. This is the result of a collaboration which started in 2004 between the major debit and credit cards companies. American Express, Discover, JCB, MasterCard and Visa.
A set of security standards were designed to ensure a secure environment is maintained by all companies who accept, process, store or transmit any cardholder data. This covers operational and technical practices for system components included in or connected to environments with cardholders data.
On 7 September 2006, the [Payment Card Industry Security Standards Council](https://www.pcisecuritystandards.org/) (PCI SSC) was created to manage the ongoing evolution of the Payment Card Industry (PCI) security standards. The focus is on improving payment account data security throughout the transaction process. This is achieved by [developing standards](https://www.pcisecuritystandards.org/about_us/) and supporting services that drives education, awareness and effective implementation by stakeholders.
There are four strategic pillars in this mission. These are:
 - Increase industry participation and knowledge
 - Evolve security standards and validation
 - Secure emerging payment channels
 - Increase standards alignment and consistency

Also, the founders recognised the importance of [Qualified Security Assessors](https://www.pcisecuritystandards.org/assessors_and_solutions/qualified_security_assessors) (QSAs) and [Approved Scanning Vendors](https://www.pcisecuritystandards.org/assessors_and_solutions/approved_scanning_vendors) (ASVs) must be qualified by PCI SSC.
The PCI DSS is administered and managed by the Payment Card Industry Security Standards Council - PCI SSC, an independent body that was also created by the major payment card brands. It is important to note that the payment companies and acquirers are responsible for enforcing compliance, not the PCI SSC.


### Why would a business need it?

If your business accepts, processes, stores or transmits payment card data, PCI DSS applies to your business therefore your business needs to [comply with the standard](https://stripe.com/gb/guides/pci-compliance).
Merchants and service providers compliance requirements differ depending on a number of factors such as the size of the organisation and the volume of transactions it undertakes throughout the year. The criteria that a merchant or service provider has to meet are set by the individual payment card providers, each of which has its own compliance programme.
PCI DSS [compliance requirements](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2_1-ROC-Reporting-Template.pdf) vary depending on the number of transactions a business accepts. The following merchant levels apply (criteria is from Stripe).

![PCI Compliant Table]({{site.baseurl}}/assets/custom/img/blog/2020-10-05-becoming-pci-compliant/pci_compliant_table.png)


### What does it mean?

The PCI DSS is a standard and not a law. It is enforced through contracts between merchants, acquiring banks and payment brands. Each payment brand can fine acquiring banks for PCI DSS compliance violations and, acquiring banks can withdraw the ability to accept card payments from non-compliant merchants.
It’s also important to remember that a PCI DSS breach is always a GDPR breach as cardholder data is classified as personal data under regulation. Enforcement action from your acquiring bank, your organisation could face fines of up to £18 million or 4% of annual global turnover under the GDPR whichever is greater.

### Does my whole system need to be PCI compliant?

Not necessarily. Only the system components which store, process, or transmit cardholder data and/or sensitive authentication data. The PCI DSS specifies 12 requirements that are organised into 6 control objectives.

## Build and maintain a secure network and systems

- Install and maintain a firewall configuration to protect cardholder data
- Do not use vendor-supplied defaults for system passwords and other [security](https://codurance.com/2020/09/07/why-is-owasp-important-for-business-leaders/) parameters

## Protect cardholder data

- Protect stored cardholder data
- Encrypt transmission of cardholder data across open or public networks

## Maintain a vulnerability management program

- Protect all systems against malware and regularly update anti-virus software
- Develop and maintain secure systems and applications

## Implement strong access control measures

- Restrict access to cardholder data by business need to know
- Identify and authenticate access to system components
- Restrict physical access to cardholder data

## Regularly monitor and test networks

- Track and monitor all access to network resources and cardholder data
- Regularly test security systems and processes

## Maintain an information security policy

- Maintain a policy that addresses information security for all personnel


### How do I know where to start?

To ensure personal data is protected, you need to have visibility to where it lives and how it gets there. A comprehensive map of the systems handling such sensitive data is a good starting point. This will very likely require collaboration with security, IT, payments, finance and legal teams. Some organisations may choose to create a dedicated PCI DSS team with a representative of each required team.

In a lot of cases using a service provider like Stripe to handle payments is worthwhile because it eliminates much of the security complexity.

There are multiple ways in which payments are made.

- Identify every consumer-facing area of the business that involves payment transactions such as online shopping carts, in-store payment terminals and orders placed over the phone.
- Understand how cardholders data is being handled across the business.
- Which internal systems and respective technologies handle cardholders data such as software applications, network systems, data centers and [cloud](https://codurance.com/2020/09/21/when-lift-and-shift-is-the-answer/) environments.
- IT teams need to ensure that the right configurations and protocols such as Transport Layer Security (TLS) are in place.
- Some of the 12 security requirements for PCI DSS mentioned above, may overlap with a few privacy mandates such as GDPR which are already in place by your organisation.

PCI compliance is an ongoing process to ensure your business remains PCI compliant. Having said this, an ongoing collaboration will be required between different departments such as security, IT, payments, finance and legal.

{% include pci_compliant_glossary_banner.liquid %}