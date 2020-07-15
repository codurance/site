---
layout: post
asset-type: post
title: Packaging with Packer
date: 2020-07-18 00:00:00 +00:00
author: André Guelfi Torres
description: What is Packer? How it can help us and how to use it.
image:
    src: 
    attribution: 
        text: 
        href: 
tags:
    - packer
    - devops
    - infrastructure as code
    - automation
---

# AMIs and the Old Way

We all know how important is Infrastructure as Code(IaC) in a DevOps environment, the main reasons are that code is:

- Reproducible: We can run how many times we want and we are going to get the expected result, unlike manual changes automation won't commit silly mistakes of forgetting to run a command.
- Versionable: We can version using git, track the changes and be able to use the same collaboration tools and techniques like Merge Requests and Review.
- Automated: Besides triggering you don't have to do anything to get the infrastructure up and running.

In case your project isn't following the latest trend and using something like serverless or Kubernetes there's a big chance that you are using Virtual Machines, even if you are in the cloud. In this case, there are two kinds of tools for IaC in VM environments. 

- Provisioning Tools: Those are the ones to create the infrastructure, like Terraform or CloudFormation.
- Configuration Management Tools: Which are the ones used to setup machines, deploy applications and configure them. We have many tools for that like Ansible, Chef, Puppet.

One of the issues that we have is time, after provisioning everything we have to install everything to the box, usually, it's going to be multiple applications and runtimes to install beofre having anything running. During this process of installation something might fail due a dependency that isn't available anymore, like a repository for apt that is missing or even a third party that is having connectivity issues. 

Those applications/runtimes are less prone to change than your configurations or your applications. We can use pre-baked images but there's a problem with that, the creation of pre-baked images is very manual, the process goes by:

- Instantiate new machine
- Install everything you need manually
- Create an image from it

You can have a configuration management tool to setup the box but the process still has a lot of space for manual error when picking the machine or doing anything else that you are not supposed to when installing the applications. Also, it's hard to control when someone connects to the box and make a change without telling anyone. Those images also will get out-of-date quicky and the number of packages and that you will have to install and update during the deploy time will increase with time. That's when Packer joins the game. 

## Packer

Packer comes to solve this kind of problem. It can build images for multiple cloud providers using Infrastructure as Code, by starting a new machine in your cloud provider and installing all the dependencies using your desired Configuration Manangent tool, and finally creating an image from the result, Packer can automate this process, leaving litter behind. 

## Anatomy of a Packer script

A packer script is composed by three main parts:

- Builders
- Provisioners
- Post-Processors

### Builders

In the Builders, the part has declared the kind of machine that we want to create and the base image that you are going to use. In our case we are going to create an AMI for an instance in AWS, so we picked the `amazon-ebs` type which is the most common one.

`amazon-ebs` means that we are going to have a virtual machine backed by Elastic Block Storage, That's Amazon's hard drive service. Then some basic information so we can connect to aws and the base image that we are going to use.

In this case, we are using the `source_ami_filter` which searches all the public images in AWS. Filtering by the name, which accepts wildcards, the virtualisation type is set to `hvm` that is full hardware virtualisation, and an image that will use `EBS` as the main partition. To avoid bringing images from people we don't know, the `owners` filter is set to a specific owner. Then `most_recent` so we can get an image with the latest patches. If you ever worked with Terraform you will notice that is the same idea in filtering with a slighting differ syntax from `HCL`.

In case you have a specific AMI you can use the `source_ami` option.

We have the `instance_type` which defines how powerful is the hardware and the user that we are going to use for ssh into the box.  

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": ""
    },
    "builders": [
        {
            "type": "amazon-ebs",
            "access_key": "{{user `aws_access_key`}}",
            "secret_key": "{{user `aws_secret_key`}}",
            "region": "eu-west-2",
            "source_ami_filter": {
                "filters": {
                    "virtualization-type": "hvm",
                    "name": "ubuntu/images/hvm-instance/ubuntu-bionic-18.04-amd64-server--*",
                    "root-device-type": "ebs"
                },
                "owners": [
                    "099720109477"
                ],
                "most_recent": true
            },
            "instance_type": "t2.micro",
            "ssh_username": "ubuntu",
            "ami_name": "test-packer-{{timestamp}}"
        }
    ]
}
```

### Provisioners

Now that the box is set, we have to install the applications and runtimes. To automate the installation we can use one of the Configuration Management tools that I have mentioned before, you also can use shell scripts or Powershell. 

In this example, we are building a box to run Java applications. We want to have Java 11, Filebeat, Metricbeat and Chrony. To make more portable and to avoid installing anything else I'm using the shell provisioner, which is just regular shell commands. You give the type and the command to be executed. Packer will start an instance and SSH to it them execute those commands. 

```json
{
    "provisioners": [
        {
            "type": "shell",
            "inline": [
                "sleep 30"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "sudo apt update -y",
                "sudo apt install -y chrony openjdk-11-jre-headless"
            ]
        }, 
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.7.0-amd64.deb",
                "sudo dpkg -i filebeat-7.7.0-amd64.deb",
                "rm filebeat-7.7.0-amd64.deb"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.7.0-amd64.deb",
                "sudo dpkg -i metricbeat-7.7.0-amd64.deb",
                "rm metricbeat-7.7.0-amd64.deb"
            ]
        }
    ]
}
```

Now it's time to run and build the image. 

```bash
packer build image.json
```

### More complex builds and Post-Processors.

This is a very simple example, but we might be building images with complex dependencies for an application, for example at Bankable we had a box with a C++ application with quite a few dependencies to manage. 

One of the ways to increase parity between dev and prod. is to have the same environment for both. Packer allows us to do that by having multiple builders, in this case, we can use the docker builder to generate an image with the same contents that the VM. We are using docker because it's lighter and easier to handle locally, but you can pick any of the existing builders.

We add the `image`, a parameter with the base image, `commit` is set to true so we save the image, and the changes are to declare extra information that you can't have in the provisioners. Like labels, exposing ports or setting the entrypoint or command. 

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": ""
    },
    "builders": [
        {
            "type": "amazon-ebs",
            "access_key": "{{user `aws_access_key`}}",
            "secret_key": "{{user `aws_secret_key`}}",
            "region": "eu-west-2",
            "source_ami_filter": {
                "filters": {
                    "virtualization-type": "hvm",
                    "name": "ubuntu/images/hvm-instance/ubuntu-bionic-18.04-amd64-server--*",
                    "root-device-type": "ebs"
                },
                "owners": [
                    "099720109477"
                ],
                "most_recent": true
            },
            "instance_type": "t2.micro",
            "ssh_username": "ubuntu",
            "ami_name": "test-packer-{{timestamp}}"
        },
				{
            "type": "docker",
            "image": "ubuntu:18.04",
            "commit": true,
            "changes": [
                "LABEL mantainer.name='Andre Torres'",
                "EXPOSE 8080"
            ]
        }
    ]
}
```

Due ubuntu:18.04 container doesn't have sudo and curl like the VM we are making a script to fix that, in case there's no sudo installed in the box we install together with curl. 

```bash
#! /bin/bash

if hash sudo 2>/dev/null; then
    echo "SUDO already present in the machine"
else
    apt-get update -y 
    apt-get install -y sudo curl
fi
```

Then we change the `provisioners` part to add the script:

```json
{
    "provisioners": [
        {
            "type": "shell",
            "inline": [
                "sleep 30"
            ]
        },
        {
            "type": "shell",
            "script": "./fix-sudo.sh"
        },
        {
            "type": "shell",
            "inline": [
                "sudo apt-get update -y",
                "sudo apt-get install -y chrony openjdk-11-jre-headless"
            ]
        }, 
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.7.0-amd64.deb",
                "sudo dpkg -i filebeat-7.7.0-amd64.deb",
                "rm filebeat-7.7.0-amd64.deb"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.7.0-amd64.deb",
                "sudo dpkg -i metricbeat-7.7.0-amd64.deb",
                "rm metricbeat-7.7.0-amd64.deb"
            ]
        }
    ]
}
```

The AMI and the container can be built now, but there's still one problem. There isn't any definition of the container repository or tag, we also have to push this container to a registry so other developers can use it. That's were the `post-processors` enter. 

We can add the `docker-import` to set the repository and the tag and  `docker-push` to send the image to docker hub. 

In both, we have the `only` tag to only run the post-processor for the docker builder.

```json
{
		"post-processors": [
        [
            {
                "type": "docker-tag",
                "repository": "andretorrescodurance/packer_test",
                "tag": [
                    "0.1"
                ],
                "only": [
                    "docker"
                ]
            },
            {
                "type": "docker-push",
                "login": "true",
                "login_username": "andretorrescodurance",
                "login_password": "{{user `docker_hub_password`}}",
                "only": [
                    "docker"
                ]
            }
        ]
    ]
}
```

## Passing variables

We need to pass the password for docker hub as a variable to packer when building the images. The variable is declared at the top of the file and we put as a `sensitive-variable` so the value isn't printed in the STDOUT. 

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": "",
        "docker_hub_password": ""
    },
    "sensitive-variables": [
        "docker_hub_password"
    ],
		...
    "post-processors": [
        [
						...
            {
                "type": "docker-push",
                "login": "true",
                "login_username": "andretorrescodurance",
                "login_password": "{{user `docker_hub_password`}}",
                "only": [
                    "docker"
                ]
            }
        ]
    ]
}
```

Packer accepts JSON files with the variables declared, so we could create a file with the `docker_hub_password`

```json
{
	"docker_hub_password": "password"
}
```

The final result is 

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": "",
        "docker_hub_password": ""
    },
    "sensitive-variables": [
        "docker_hub_password"
    ],
    "builders": [
        {
            "type": "amazon-ebs",
            "access_key": "{{user `aws_access_key`}}",
            "secret_key": "{{user `aws_secret_key`}}",
            "region": "eu-west-2",
            "source_ami_filter": {
                "filters": {
                    "virtualization-type": "hvm",
                    "name": "ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*",
                    "root-device-type": "ebs"
                },
                "owners": [
                    "099720109477"
                ],
                "most_recent": true
            },
            "instance_type": "t2.micro",
            "ssh_username": "ubuntu",
            "ami_name": "packer-example-{{timestamp}}"
        },
        {
            "type": "docker",
            "image": "ubuntu:18.04",
            "commit": true,
            "changes": [
                "LABEL mantainer.name='Andre Torres'",
                "EXPOSE 8080"
            ]
        }
    ],
    "provisioners": [
        {
            "type": "shell",
            "inline": [
                "sleep 30"
            ]
        },
        {
            "type": "shell",
            "script": "./fix-sudo.sh"
        },
        {
            "type": "shell",
            "inline": [
                "sudo apt-get update -y",
                "sudo apt-get install -y chrony openjdk-11-jre-headless"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.7.0-amd64.deb",
                "sudo dpkg -i filebeat-7.7.0-amd64.deb",
                "rm filebeat-7.7.0-amd64.deb"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.7.0-amd64.deb",
                "sudo dpkg -i metricbeat-7.7.0-amd64.deb",
                "rm metricbeat-7.7.0-amd64.deb"
            ]
        }
    ],
    "post-processors": [
        [
            {
                "type": "docker-tag",
                "repository": "andretorrescodurance/packer_test",
                "tag": [
                    "0.1"
                ],
                "only": [
                    "docker"
                ]
            },
            {
                "type": "docker-push",
                "login": "true",
                "login_username": "andretorrescodurance",
                "login_password": "{{user `docker_hub_password`}}",
                "only": [
                    "docker"
                ]
            }
        ]
    ]
}
```

and we can run 

```json
packer build -var-file="/Users/andre/.packer-credentials.json" java-ami.json
```

### Going further

The Amazon AMI and the Docker container have the same programs being installed right now, but do we need everything to be installed in the docker? We have `filebeat`, `metricbeat`, and `chrony` being installed in the container. We don't need that for a local development environment. How can we fix that? **Base Images.**

First let's create a base image file and add those dependencies. 

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": ""
    },
    "builders": [
        {
            "type": "amazon-ebs",
            "access_key": "{{user `aws_access_key`}}",
            "secret_key": "{{user `aws_secret_key`}}",
            "region": "eu-west-2",
            "source_ami_filter": {
                "filters": {
                    "virtualization-type": "hvm",
                    "name": "ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*",
                    "root-device-type": "ebs"
                },
                "owners": [
                    "099720109477"
                ],
                "most_recent": true
            },
            "instance_type": "t2.micro",
            "ssh_username": "ubuntu",
            "ami_name": "base-image-example-{{timestamp}}"
        }
    ],
    "provisioners": [
        {
            "type": "shell",
            "inline": [
                "sleep 30"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "sudo apt-get update -y",
                "sudo apt-get install -y chrony"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.7.0-amd64.deb",
                "sudo dpkg -i filebeat-7.7.0-amd64.deb",
                "rm filebeat-7.7.0-amd64.deb"
            ]
        },
        {
            "type": "shell",
            "inline": [
                "cd /tmp",
                "curl -L -O curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.7.0-amd64.deb",
                "sudo dpkg -i metricbeat-7.7.0-amd64.deb",
                "rm metricbeat-7.7.0-amd64.deb"
            ]
        }
    ]
}
```

With the base image ready we can change the current file to use the base image, we change the `source_ami_filter` to pick the latest `base-image-example-*` (don't forget to update the `owners` field). Then remove the programs that were previously installed.

```json
{
    "variables": {
        "aws_access_key": "",
        "aws_secret_key": "",
        "docker_hub_password": ""
    },
    "sensitive-variables": [
        "docker_hub_password"
    ],
    "builders": [
        {
            "type": "amazon-ebs",
            "access_key": "{{user `aws_access_key`}}",
            "secret_key": "{{user `aws_secret_key`}}",
            "region": "eu-west-2",
            "source_ami_filter": {
                "filters": {
                    "virtualization-type": "hvm",
                    "name": "base-image-example-*",
                    "root-device-type": "ebs"
                },
                "owners": [
                    "<owner_id>"
                ],
                "most_recent": true
            },
            "instance_type": "t2.micro",
            "ssh_username": "ubuntu",
            "ami_name": "packer-example-{{timestamp}}"
        },
        {
            "type": "docker",
            "image": "ubuntu:18.04",
            "commit": true,
            "changes": [
                "LABEL mantainer.name='Andre Torres'",
                "EXPOSE 8080"
            ]
        }
    ],
    "provisioners": [
        {
            "type": "shell",
            "inline": [
                "sleep 30"
            ]
        },
        {
            "type": "shell",
            "script": "./fix-sudo.sh"
        },
        {
            "type": "shell",
            "inline": [
                "sudo apt-get update -y",
                "sudo apt-get install -y openjdk-11-jre-headless"
            ]
        }
    ],
    "post-processors": [
        [
            {
                "type": "docker-tag",
                "repository": "andretorrescodurance/packer_test",
                "tag": [
                    "0.1"
                ],
                "only": [
                    "docker"
                ]
            },
            {
                "type": "docker-push",
                "login": "true",
                "login_username": "andretorrescodurance",
                "login_password": "{{user `docker_hub_password`}}",
                "only": [
                    "docker"
                ]
            }
        ]
    ]
}
```

## Wrapping up

We spoke about the importance of Infrastructure As Code and why pre-baked images used to be a bad idea. Packer comes to help the creation of pre-baked images for many platforms speeding up the time to setup new environments. Since Packer is a IaC tool you can add to your CI/CD pipeline and automate and integrate with many things, like adding the new AMI Id to the Auto-Scalling Group in Amazon. 

Then we went through on how to use Packer to create an image to Amazon and Docker and how to structure our files to avoid waste when build the images.
