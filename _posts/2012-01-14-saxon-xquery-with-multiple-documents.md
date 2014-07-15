---
author: Mashooq Badar
comments: true
date: 2012-01-14 20:53:44+00:00
layout: post
slug: saxon-xquery-with-multiple-documents
title: Saxon XQuery With Multiple Documents
wordpress_id: 168
categories:
- Development
tags:
- Xquery
- Java
- Saxon
image:
    src: http://mashb.files.wordpress.com/2012/01/xquery.jpg
---

Saxon is a wonderful API for XML processing. It provides complete support for XPath, XQuery and XSLT. Although I'm always baffled with it's lack of adoption compared to Xalan and Xerces. Having said that the online documentation can definitely do with some improvement.  The following is a quick example of of how you may execute an XQuery that takes multiple XML documents as input.
[sourcecode language="java"]
@Test
public void runXQueryWithMultipleInputDocuments() throws SaxonApiException {
    Processor processor = new Processor(false);

    DocumentBuilder documentBuilder = processor.newDocumentBuilder();
    XdmNode document = documentBuilder.build(
            new StreamSource(new StringReader("<my><document>content</document></my>")));
    XdmNode document2 = documentBuilder.build(
            new StreamSource(new StringReader("<my><document>content2</document></my>")));

    XQueryCompiler xQueryCompiler = processor.newXQueryCompiler();
    XQueryExecutable xQueryExecutable = xQueryCompiler.compile(
            "declare variable $mydoc external; " +
            "declare variable $mydoc2 external; " +
            "<newdoc><doc1>{$mydoc/my/document/text()}</doc1>" +
            "<doc2>{$mydoc2/my/document/text()}</doc2></newdoc>");

    XQueryEvaluator xQueryEvaluator = xQueryExecutable.load();

    QName name = new QName("mydoc");
    xQueryEvaluator.setExternalVariable(name, document);
    QName name2 = new QName("mydoc2");
    xQueryEvaluator.setExternalVariable(name2, document2);

    System.out.println(xQueryEvaluator.evaluate());
}
[/sourcecode]
This result is an output of:
[sourcecode language="xml"]
  <newdoc>
   <doc1>content</doc1>
   <doc2>content2</doc2>
</newdoc>
[/sourcecode]
