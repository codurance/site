---
layout: post
name: shape-your-infrastructure-with-terraform
title: Shape your infrastructure with Terraform
date: 2015-06-21 12:00:00 +00:00
author: Robert Firek
image:
    src: /assets/img/custom/blog/terraform/TerraformedMoonFromEarth.jpg
    attribution:
        text: Terraformed Moon
        href: https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/TerraformedMoonFromEarth.jpg/240px-TerraformedMoonFromEarth.jpg
tags:
- Terraform
- AWS
- Amazon Web Services
- Cloud
---

The popularity of cloud infrastructure services has hugely increased over the last few years. Companies value flexibility and reliability
levels of such services. The simplicity of the solutions delivered by cloud providers should remove the burden from the shoulders of busy
Dev and Ops people and give possibility to focus on real customer's needs.

Unfortunately the truth is not so simple. When you start your journey in the cloud you will discover new challenges. Probably one of these
discoveries will be connected with the creation of your infrastructure. Simple structures can be created with in minutes using web pages or
a CLI, but it is not the best way to create a cloud with 100 machines.

AWS provides many different interfaces which allow automation of an infrastructure process. You can use a REST API or CLI
to create your own script. Probably this is the most flexible solution, but at the same time it can be time consuming.

Terraform from HashiCorp can give you similar flexibility and at the same time you don't have to spend weeks to write
your bash or python scripts to provision your cloud.

## Terraform for the rescue - plan, apply, update, destroy.


### Plan

#### Infrastructure diagram
<img class="img-responsive blog-post-image" src="/assets/img/custom/blog/terraform/ShapeYourInfrastructure_VPC.png" />To show you how we can
use Terraform we need to introduce some example infrastructure: let's provision a structure which will support a simple
web service in AWS. This web service will expose an API through a web proxy server. The service also requires some database and this database should have a separate
EC2 instance to ease database maintenance. Instances responsible for business logic will be hidden in a private subnet and only the web proxy
server will be available to the wider internet. At the same time our service needs to connect to external resources - therefore a NAT instance will take the responsibility
of managing network connections from within the private subnet. All of these resources constitute a single Virtual Private Cloud.


#### Provider

Now we are ready to introduce Terraform. We need to create configuration files which will describe components required to build
our infrastructure. Configuration files can be written in Terraform format (similar to YAML) or JSON. All configuration files should
have extension ***.tf*** and be stored in the same directory. Terraform automatically combines all resources defined in ***.tf*** files.

Before we add any resource we have know where our resources are going to exist. To do that we have to create a *provider* definition.
Terraform's provider is the mechanism used for managing resources, in our case we'll use the AWS provider. Our first configuration file
can look like this:

***config-provider.tf***
{% highlight javascript %}
provider "aws" {
    access_key = "ACCESS_KEY_HERE"
    secret_key = "SECRET_KEY_HERE"
    region     = "eu-west-1"
}
{% endhighlight %}

Obviously we don't want to keep our secrets in a file which will potentially be stored in version control.
We also want to have flexibility when we define a region in which we want to provision our environment. Terraform gives us the possibility
to introduce variables.

First we have to declare the variables we want to use (see ***variables-provider.tf***). The variables declaration introduces names,
structure and default values for all variables used in the configuration file. We will override these default values later.

***variables-provider.tf***
{% highlight javascript %}
variable "provider" {
    default = {
        access_key = "not undefined yet"
        secret_key = "not undefined yet"
        region     = "not undefined yet"
    }
}
{% endhighlight %}

Now we can change ***config-provider.tf***.

***config-provider.tf***
***provider-config.tf?***
{% highlight javascript %}
provider "aws" {
    access_key = "${var.provider.access_key}"
    secret_key = "${var.provider.secret_key}"
    region     = "${var.provider.region}"
}
{% endhighlight %}

#### VPC

When we know how to connect to our provider we can introduce resources. A resources definition in Terraform contains information about type of a
a resource and a name. Types of resources are predefined by Terraform and represents building elements which we can instantiate in
the cloud. Each resource have also predefined set of config keys which describe a resource in detail.

***Resource Syntax***
{% highlight javascript %}
resource <TYPE> <NAME> {
    <config_key> = <config_value>
}
{% endhighlight %}

In our case we have to define VPC for all other resources. We need to assign VPC to specific range of addresses by defining CIDR block.
Each VPC also needs an internet gateway.

Once again instead of hardcoded values we will declare variables specific for VPC definition.

We can also introduce variable which defines name of our environment. This name will allow us to tag resources and recognise to which
environment belongs given resource.

***variables-environment.tf***
{% highlight javascript %}
variable "environment_name" {
    default = "unknown-environment"
}
{% endhighlight %}

***config-vpc.tf***
{% highlight javascript %}
resource "aws_vpc" "environment" {
    cidr_block = "${var.vpc.cidr_block}"

    tags {
        Name        = "${var.environment_name}-vpc"
        Environment = "${var.environment_name}"
    }
}

resource "aws_internet_gateway" "environment" {
    vpc_id = "${aws_vpc.environment.id}"

    tags {
        Name        = "${var.environment_name}-internet-gateway"
        Environment = "${var.environment_name}"
    }
}
{% endhighlight %}

***variables-vpc.tf***
{% highlight javascript %}
variable "vpc" {
    default = {
        owner_id = "unknown"
        cidr_block = "10.changeit.0.0/16"
    }
}
{% endhighlight %}

We also used build-in variable to refer to our VPC resource. We can use type of a resource type and a name as a reference variable to
get access to properties defined by this resource. Some properties of the resource can be defined during creation of the resource
like internal ids or names and some are already defined in our scripts.

In above example we assign a internet gateway to our VPC by referencing to the property ***id** of ***aws_vpc*** resource with name ***environment***.
A VPC resource property will be defined during creation of resource.


#### Subnets

Our example VPC should contain two subnets. For each subnet we have to define range of addresses available in the subnet (CIDR block),
availability zone and of course we have to assign this subnet to the VPC. Again, we declare variables instead defining values directly
in the configuration script.

**config-subnets.tf**
{% highlight javascript %}
resource "aws_subnet" "public-subnet" {
    vpc_id            = "${aws_vpc.environment.id}"
    cidr_block        = "${var.vpc_public_subnet.cidr_block}"
    availability_zone = "${var.vpc_public_subnet.availability_zone}"

    tags {
        Name        = "${var.environment_name}-public-subnet"
        Environment = "${var.environment_name}"
    }
}

resource "aws_subnet" "private-subnet" {
    vpc_id            = "${aws_vpc.environment.id}"
    cidr_block        = "${var.vpc_private_subnet.cidr_block}"
    availability_zone = "${var.vpc_private_subnet.availability_zone}"

    tags {
        Name        = "${var.environment_name}-private-subnet"
        Environment = "${var.environment_name}"
    }
}
{% endhighlight %}

**variables-vpc.tf**
{% highlight javascript %}
variable "vpc" {
    default = {
        owner_id = "unknown"
        cidr_block = "10.changeit.0.0/16"
    }
}

variable "vpc_public_subnet" {
    default = {
        cidr_block = "10.changeit.0.0/24"
        availability_zone = "changeit"
    }
}

variable "vpc_private_subnet" {
    default = {
        cidr_block = "10.changeit.1.0/24"
        availability_zone = "changeit"
    }
}
{% endhighlight %}


#### Route tables

Each subnet in a VPC must be associated with route table. This time we have an unusual situation. We have the reference to
a resource which was not defined yet (***${aws_instance.nat.id}***). The order of files is not important for Terraform.
It combines all files and based on that knowledge prepares a plan of execution. For that reason we can refer to resources
which are defined in different files. Terraform will also produce error during creation if the resource is not
available.

***configure-route_tables.tf**
{% highlight javascript %}
resource "aws_route_table" "public-subnet" {
    vpc_id = "${aws_vpc.environment.id}"

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.environment.id}"
    }

    tags {
        Name        = "${var.environment_name}-public-subnet-route-table"
        Environment = "${var.environment_name}"
    }
}

resource "aws_route_table_association" "public-subnet" {
    subnet_id      = "${aws_subnet.public-subnet.id}"
    route_table_id = "${aws_route_table.public-subnet.id}"
}

resource "aws_route_table" "private-subnet" {
    vpc_id = "${aws_vpc.environment.id}"

    route {
        cidr_block  = "0.0.0.0/0"
        instance_id = "${aws_instance.nat.id}"
    }

    tags {
        Name        = "${var.environment_name}-private-subnet-route-table"
        Environment = "${var.environment_name}"
    }
}

resource "aws_route_table_association" "private-subnet" {
    subnet_id      = "${aws_subnet.private-subnet.id}"
    route_table_id = "${aws_route_table.private-subnet.id}"
}
{% endhighlight %}

#### Security groups

A definition of any EC2 instance requires assigning it to a security group. Security groups are another type of resources.
In this case definition of a resource is also so easy as for previous resources. Depends on our needs we can define inbound (ingress)
and outbound (egress) rules for given range of ports, a protocol and addresses.

***config-security_groups.tf***
{% highlight javascript %}
resource "aws_security_group" "nat" {
    name = "${var.environment_name}-nat"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
(...)
    egress {
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
(...)
    vpc_id = "${aws_vpc.development_environment.id}"
    tags {
        Name        = "${var.environment_name}-nat-security-group"
        Environment = "${var.environment_name}"
    }
}

resource "aws_security_group" "public" {
    name = "${var.environment_name}-public"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }
(...)
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    vpc_id = "${aws_vpc.development_environment.id}"
    tags {
        Name        = "${var.environment_name}-public-security-group"
        Environment = "${var.environment_name}"
    }
}

resource "aws_security_group" "private" {
    name = "${var.environment_name}-private"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["${var.vpc_public_subnet.cidr_block}"]
    }
(...)
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    vpc_id = "${aws_vpc.development_environment.id}"
    tags {
        Name        = "${var.environment_name}-private-security-group"
        Environment = "${var.environment_name}"
    }
}
{% endhighlight %}


#### EC2 Instances

With all above resources we can finally define our EC2 instances. Our NAT instance and web proxy instance require an
Elastic IP (resource ***aws_eip***). We also choose an instance type for each EC2 instance.

***config-instances.tf***
{% highlight javascript %}
resource "aws_instance" "nat" {
    ami                         = "${var.nat.ami_image}"
    availability_zone           = "${var.nat.availability_zone}"
    instance_type               = "t2.micro"
    key_name                    = "${var.nat.key_name}"
    security_groups             = ["${aws_security_group.nat.id}"]
    subnet_id                   = "${aws_subnet.public-subnet.id}"
    associate_public_ip_address = true
    source_dest_check           = false

    tags {
        Name        = "${var.environment_name}-nat"
        Environment = "${var.environment_name}"
    }
}

resource "aws_eip" "nat" {
    instance = "${aws_instance.nat.id}"
    vpc      = true
}

resource "aws_instance" "web-proxy" {
    ami                         = "${var.web-proxy.ami_image}"
    availability_zone           = "${var.web-proxy.availability_zone}"
    instance_type               = "t2.micro"
    key_name                    = "${var.web-proxy.key_name}"
    security_groups             = ["${aws_security_group.public.id}"]
    subnet_id                   = "${aws_subnet.public-subnet.id}"
    associate_public_ip_address = true
    source_dest_check           = true

    tags {
        Name        = "${var.environment_name}-web-proxy"
        Environment = "${var.environment_name}"
    }
}

resource "aws_eip" "web-proxy" {
  instance = "${aws_instance.web-proxy.id}"
  vpc      = true
}

resource "aws_instance" "database" {
    ami                         = "${var.database.ami_image}"
    availability_zone           = "${var.database.availability_zone}"
    instance_type               = "t2.micro"
    key_name                    = "${var.database.key_name}"
    security_groups             = ["${aws_security_group.private.id}"]
    subnet_id                   = "${aws_subnet.private-subnet.id}"
    associate_public_ip_address = false
    source_dest_check           = true

    tags {
        Name        = "${var.environment_name}-database"
        Environment = "${var.environment_name}"
    }
}

resource "aws_instance" "service" {
    ami                         = "${var.services.ami_image}"
    availability_zone           = "${var.services.availability_zone}"
    instance_type               = "t2.micro"
    key_name                    = "${var.services.key_name}"
    security_groups             = ["${aws_security_group.private.id}"]
    subnet_id                   = "${aws_subnet.private-subnet.id}"
    associate_public_ip_address = false
    source_dest_check           = true
    count                       = 3

    tags {
        Name        = "${var.environment_name}-service-${count.index}"
        Environment = "${var.environment_name}"
    }
}
{% endhighlight %}

***variables-instances.tf***
{% highlight javascript %}
variable "nat" {
    default = {
        ami_image         = "ami-14913f63"
        availability_zone = "unknown"
        key_name          = "unknown"
    }
}

variable "web-proxy" {
    default = {
        ami_image         = "ami-2c90315b"
        availability_zone = "unknown"
        key_name          = "unknown"
    }
}

variable "database" {
    default = {
        ami_image         = "ami-2c90315b"
        availability_zone = "unknown"
        key_name          = "unknown"
    }
}

variable "services" {
    default = {
        ami_image         = "ami-2c90315b"
        availability_zone = "unknown"
        key_name          = "unknown"
    }
}
{% endhighlight %}


#### Verify

Our VPC definition is ready. But how do we know that everything is ready for creation? We can verify our all hard work. All we have
to do we have to ask Terraform to prepare a plan by executing the following command:

{% highlight bash %}
$ terraform plan
{% endhighlight %}

Terraform will combine all available files and will prepare an execution plan. This means that all definitions will be verified before
you start creating real resources. The output from this command give us also overview what kind of operations will be performed
during a real execution.

We have to remember that is only a dry run. We don't connect to AWS and we will not find any errors which can occur during
regular execution. For example a plan will not show any errors event if you already exceeded a limit of available EIP.


### Apply

So far we used only default values to run our plan. It is not particularly useful when you want to create real environment.
To apply our execution plan we have to prepare a file which will contain definition of our variables. We can override default
definitions by creating file with extension ***.tfvariables***. This file has format of regular Java property file where each
key is the path of a variable and value is a value assigned to a variable. Example variable file for our first environment
can look like this:

***my_first_vpc_environment.tfvariables***
{% highlight bash %}
environment_name = "my_first_vpc_environment"

provider.access_key = "[MY_REAL_SECRET]"
provider.secret_key = "[MY_REAL_SECRET]"
provider.region = "eu-west-1"

vpc.owner_id   = "[MY_OWNER_ID]"
vpc.cidr_block = "10.0.0.0/16"

vpc_public_subnet.cidr_block         = "10.0.0.0/24"
vpc_public_subnet.availability_zone  = "eu-west-1a"

vpc_private_subnet.cidr_block        = "10.0.1.0/24"
vpc_private_subnet.availability_zone = "eu-west-1a"

nat.key_name                = "my_first_vpc_environment"
nat.availability_zone       = "eu-west-1a"

web-proxy.key_name          = "my_first_vpc_environment"
web-proxy.availability_zone = "eu-west-1a"

database.key_name           = "my_first_vpc_environment"
database.availability_zone  = "eu-west-1a"

services.key_name           = "my_first_vpc_environment"
services.availability_zone  = "eu-west-1a"
{% endhighlight %}

We can verify the plan again and if we decide that we are ready we can apply it be executing the following command:
{% highlight bash %}
$ terraform apply
{% endhighlight %}

Terraform will connect to AWS and will try to create all resource defined in Terraform scripts. The output of this command is
state file ***terraform.tfstate*** which contains all information about just created environment. The state file must be kept
for the future execution (e.g. version control system), because Terraform use it to determine differences between the cloud
state and current definition stored in your scripts.


### Change

Sometimes we have to change our environment. It requires just a change in your definition scripts. Terraform based on
the state of your environment and your new definition is able to prepare new plan and form a new version of your infrastructure.

You can use the ***plan*** and ***apply*** commands in the same way as for a new environment. The outputs for these commands
will be different. This time Terraform compares the state stored in the state file and plans/applies only changes introduced to the
definition.

### Destroy

Everything has to come to an end, sometime. When this time will come we can execute this command:

{% highlight bash %}
$ terraform destroy
{% endhighlight %}

Terraform reuse once again our state file and will remove all resources.

## What's next?

In this post we only scratch the surface of Terraform. AWS provider is only one of the providers available. Terraform allows
to combine different providers which give us possibility to provision environments across different cloud providers. It also
have another basic features. For example outputs give you possibility to generate any files based on any available variables.
You can use it to generate documentation, config files or just human readable text files.

Now shaping our infrastructure is understandable by both Dev and Ops folks. We can lay foundation
for our deployments and tools like Puppet, Chef and Docker.


### Sources

- [Example VPC definition](https://github.com/robertfirek/ShapeYourInfrastructure)
- [Terraform page](https://terraform.io/)
- [Terraform Configuration file format](https://terraform.io/docs/configuration/)
- [Terraform AWS Provider](https://terraform.io/docs/providers/aws/index.html)
