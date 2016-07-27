---
layout: post
asset-type: post
name: mutual-problems
title: Mutual Problems
date: 2016-03-28 00:00:00 +00:00
author: Robert Firek
image:
    src: /assets/img/custom/blog/2016-03-28-https.jpg
    attribution:
        text: Image by Sean MacEntee (CC BY 2.0)
        href: https://www.flickr.com/photos/smemon/15944989872/in/photostream/
tags:
- Java
- HTTPS
- Security
- Mutual Authentication
--- 

The HTTPS protocol is the well-established standard for securing our connections. Understanding how this protocol works is not a problem and the corresponding [RFC document](https://tools.ietf.org/html/rfc2818) is available since 2000.

Despite HTTPS is used so widely, you can still find a software which doesn't handle this protocol without unnecessary complexity. Unfortunately I'v experienced  problems during the implementation of [mutual authentication](https://en.wikipedia.org/wiki/Mutual_authentication) in the language which should not surprise me at all. It is **Java**.

## How does HTTPS work?

Before I describe what kind of problems I've got with my implementation, I will describe how mutual authentication works. The HTTPS protocol uses the TLS/SSL protocol to secure the connection. The TLS/SSL protocol defines the authentication handshake which allows to connect any client with the server in a secure way. 
During [The handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) the following steps are performed:

- A client sends the message which initiates the connection.
- The server sends its certificate to the client.
- The client verifies the certificate using the certificate issued by the trusted authority.
- The server sends the request for the client's certificate.
- The client sends its certificate to the server.  
- The server verifies the client's certificate.
- The server and the client exchange the master secret which is used during the encryption of data.
- The connection is established.  

Together with my teammate we tried to implemented the HTTPS client in **Java**. Combining our knowledge about the TLS/SSL handshake and the experience from the manual test with `curl` we assumed that only three files were required to implement the client side: **a client's certificate**, **a client's private key** and **a trusted certificate to verify the server's certificate**.

Oh, how wrong we were to think so.

## Java - the problem, the solution and why is it so hard

Because it is quite unusual to use mutual authentication every day, we asked the best source in the world for a small assistance. A first look at the results served by *uncle Google* didn't revealed the complexity behind the implementation, but each click on the results led us to more and more confusing solutions (some of them where from 90's). To make matters worse we had to use [Apache HttpComponents](https://hc.apache.org/) to implement our connection, but most of the proposed solutions were based on the pure **Java** libraries.  

The knowledge from the internet allows us to establish that:

- **Java** cannot use directly any certificates or private keys (like e.g. `curl`)
- **Java** requires separate files (**Java Keystores**) which can contain original certificates and keys. 
- We needed a trusted keystore with the certificate required for the server's certificate verification for each HTTPS connection.
- We needed a keys keystore with the client's certificate and the client's private key for mutual authentication.

First we had to create the trusted keystore. We created the keystore with the certificate using the `keytool` command:
 
    $ keytool -import -alias trusted_certificate -keystore trusted.jks -file trusted.crt

We stored in the keystore file `trusted.jks` the certificate `trusted.crt` under the alias `trusted_certificate`. During the execution of this command we were asked to input a password for this keystore. We used this password later to get access to the keystore file.

To create a keystore a few additional steps were required. In most cases you will probably receive two files from the company which issues the client's certificate. The first file will be the client's certificate in the `pem` format. This certificate will be sent to the server. The second file is the client's private key (also in the `pem` format) which is used during the handshake to confirm that you are the owner of the client's certificate.
 
Unfortunately **Java** only supports the `PKCS12` format. So we had to translate our certificate and private key to `PKCS12` format. We can do that using OpenSSL.

    $ openssl pkcs12 -export \
        -in client.crt \
        -inkey client.key \
        -out key.p12 \
        -name client

We generated the file `key.p12` from the files `client.crt` and `client.key`. Once again a password input was required. This password is used to protect the private key.

From the file in the `PKCS12` format we can generate another keystore by importing our `PKCS12` into the new keystore:

    $ keytool -importkeystore \
        -destkeystore key.jks \
        -deststorepass <<keystore_password>> \
        -destkeypass <<key_password_in_keystore>> \
        -alias client \
        -srckeystore key.p12 \
        -srcstoretype PKCS12 \
        -srcstorepass <<original_password_of_PKCS12_file>>

This command looks a little bit more complex, but it is fairly easy to decrypt. At the beginning of the command we declare the parameters of the new keystore named `key.jks`. We define the password for the keystore and the password for the private key which will be used by this keystore. We also assign the private key to some alias in the keystore (in this case it is `client`).
Next we specify the source file (`key.p12`), the format of this file and the original password.

With `trusted.jks` and `key.jks` we were ready to code. In the first step we had to describe how we wanted to use our keystores. 

```java
File trustedKeystoreFile = new File("trusted.jks");
File keystoreFile = new File("key.jks");

SSLContext sslcontext = SSLContexts.custom()
    .loadTrustMaterial(trustedKeystoreFile, 
                    "<<trusted_keystore_password>>".toCharArray())
    .loadKeyMaterial(keystoreFile, 
                    "<<keystore_password>>".toCharArray(), 
                    "<<original_password_of_PKCS12_file>>".toCharArray())
    .build();

SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(
                sslcontext,
                new String[]{"TLSv1.2"},
                null,
                SSLConnectionSocketFactory.getDefaultHostnameVerifier());
```

We took our keystore files and we built an SSL context. Next we created the socket factory which provides proper HTTPS connection for our requests.

And finally we where able to call our endpoint from **Java**:

```java
try (CloseableHttpClient httpclient = HttpClients.custom()
        .setSSLSocketFactory(sslsf)
        .build()) {

    HttpGet httpGet = new HttpGet("https://ourserver.com/our/endpoint");

    try (CloseableHttpResponse response = httpclient.execute(httGet)) {
        HttpEntity entity = response.getEntity();
        System.out.println(response.getStatusLine());
        EntityUtils.consume(entity);
    }
}
```

Done. After creating two additional files (keystores) which were the equivalent of our original certificate and the private key we implemented **mutual authentication** with **Java**. Maybe the implementation of HTTPS connections in **Java** has some justification, but now it is just a headache. 

_____

I want to thank Marco Vermeulen ([twitter: marc0der](https://twitter.com/marc0der)) for the inspiration and the pairing session. 
