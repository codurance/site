---
layout: post
asset-type: post
name: terraform-with-multiple-environments
title: Terraform With Multiple Environments
date: 2020-04-22 10:00:00 +00:00
author: Jorge Gueorguiev Garcia
description: I have used a couple of different approaches to support multiple environments for Terraform deployments. We will investigate them here, and look at a third option.

image:
    src: /assets/custom/img/blog/railway.png
    attribution:
        text: Public domain photo from Pixabay
        href: https://pixabay.com/photos/rails-soft-gleise-railway-3309912/
tags:
    - infrastructure
    - devops
    - terraform
    - practices
abstract: I have used a couple of different approaches to support multiple environments for Terraform deployments. We will investigate them here, and look at a third option.
---

# The setup

I haven't written on my company blog for quite a while (been paying attention to the podcasts and my personal one), but I thought it was time to add a blog post. Part of what I am going to say here is coloured by using [Terraform](https://www.terraform.io/) only on [AWS](https://aws.amazon.com/).

The topic I have chosen is because of this post that I discovered recently: [Recommended Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/part1.html). On it [Hashicorp](https://www.hashicorp.com/) is recommending the use of workspaces to control different environments. Which is a change of recommendation from what I remember from February/March 2019.

# The first way - Single account with workspaces

Back at the beginning of 2019 I started using Terraform for an AWS project. The basis of the infrastructure I was doing was quite similar to a previous project that I worked on (both in [Clojure](https://clojure.org/)), but that project used extensively bash scripts to deal with the creation of an ELB environment. You don't want to use bash scripts for everything, it is painful, messy ... soul crushing. So I decided to learn and use Terraform. Terraform is awesome (not perfect, small niggling issues here and there). Because on that project I had only one AWS account (I know better now), I needed to find a way to deploy multiple environments into that single account. For that I used [workspaces](https://www.terraform.io/docs/state/workspaces.html). When you are using workspaces you use a single set of files and then you have two options for the data/variables that can change, either you use different **tfvar** files, one per environment, passing it as a parameter to the terraform call (e.g., `terraform plan -var-file=env.dev.tfvars`).

As an example, `env.dev.tfvars` could include

```
retention_policy = 7
```

and `prod.env.tfvars` would include

```
retention_policy = 365
```

The other option, which is the one I used, is to create maps that have the necessary values, and then using the lookup functionality to get the information, so the code on your **tf** file could look like this:

```
variable "workspace_to_retention_policy_map" {
  description = "The retention period of cloudwatch logs"
  type = map
  default = {
    dev     = 7
    staging = 7
    prod    = 365
  }
}

locals {
  retention_policy  = lookup(var.workspace_to_retention_policy_map, terraform.workspace, 7)
  # or even better if you don't need the default
  retention_policy2 = var.workspace_to_retention_policy_map[terraform.workspace]
}
```

I actually like having together the values that change per environment, so it easy to see what changes between environment, but it does create far more noise within the file.

As I said, at that point workspaces were not recommended for multiple environments. You have to be quite aware on when to do `terraform workspace select`, or better only do it through your CI, so you don't make any mistake.

# The second way - Multiple accounts, single workspace

At my current project we are using a different approach. We have an AWS account per environment. We could have used the same workspace setup, but that is complicated by the fact that the state is stored on the AWS account using S3 (solution, next section).

So the approach was to have an `environments` folder, and inside a folder per environment (dev, test, prod or whatever you use). Each folder has the same files (your variables file, your outputs file, your main/setup files). Because you should have all environments looking the same (or pretty similar), what you can do is symlink those files, and add a **tfvars** file for the data that needs to change (not disimilar to what we saw on [The first way](#thefirstway-singleaccountwithworkspaces)). Any infrastructure that is only present on an environment could be added into an additional file(s). You will have something like this


    - environments
    |- dev
    |  |- main.tf
    |  |- variables.tf
    |  |- outputs.tf
    |  |- dev.env.tfvars
    |- test
    |  |- main.tf -> ../dev/main.tf
    |  |- variables.tf -> ../dev/variables.tf
    |  |- outputs.tf -> ../dev/outputs.tf
    |  |- test.env.tfvars
    |- prod
    |  |- main.tf -> ../dev/main.tf
    |  |- variables.tf -> ../dev/variables.tf
    |  |- outputs.tf -> ../dev/outputs.tf
    |  |- prod.env.tfvars
    |  |- prod.unique.tf
    
Unlike with workspaces, it is very difficult to make mistakes here. After all you need to navigate to the correct folder before you can execute your terraform commands. And symlinks keep in check the number of files that you need to take care off (which otherwise would be a big downside of this approach).

# The third way - Multiple accounts, multiple workspaces

But, wait - you say - does that mean I can't use workspaces with multiple accounts? Well, of course not. The above approach was based on the fact that we were keeping the terraform state of each account within each account. But if you switch to a single centralised place, then you wouldn't have the issue, and therefore you could go with using workspaces on multiple accounts. And Terraform uses a big number of backends specifically for this: [Artifactory](https://www.terraform.io/docs/backends/types/artifactory.html), [Consul](https://www.terraform.io/docs/backends/types/consul.html), [etcd v2](https://www.terraform.io/docs/backends/types/etcd.html) and [etcd v3](https://www.terraform.io/docs/backends/types/etcdv3.html), some "random" [http rest](https://www.terraform.io/docs/backends/types/http.html), [swift](https://www.terraform.io/docs/backends/types/swift.html), [Postgres](https://www.terraform.io/docs/backends/types/pg.html) and their own [Terraform Enterprise](https://www.terraform.io/docs/backends/types/terraform-enterprise.html). 

Can I use a single s3 backend with a different profile (different account) than the rest of the system?. Well, yes, the backend can use different credentials than the rest of the setup. In fact, I discovered recently that you can have multiple providers (mixing or multiple accounts of the same one), give them different aliases, and choose for each resource which provider to use.

In fact, some very quick code here on how to deal with it, using a centralized state storage such as [Azure](https://azure.microsoft.com/) Blob Storage (mostly because I did not have access to the "proper" ones, but I had access to the Codurance Azure playground account).

First the `remote.tf` file, on which we indicate where we will store the state for all workspaces

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "Jorge-Terraform-Test"
    storage_account_name = "jorgeterraformtest"
    container_name       = "terraformstate"
    key                  = "terraform.tfstate"
  }
}
```

I'm using the `az login` flow for the test. But on actual prod infra you want to use principals.

Then the `variables.tf` file with the only variable that I care about for this quick test

```hcl
variable "profile" {
  type=string
}
```

And then the main file: `resource.tf`

```
provider "aws" {
  version = "~> 2.0"
  region  = "us-east-1"
  profile = var.profile
}

# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "172.35.0.0/16"

  tags = {
    Name = "jorge's test"
  }
}
```

Finally, for this test I choose to use two separate **tfvars** files;

`dev.env.tfvars`

```
profile="codurance-playground"
```

`prod.env.tfvars`

```
profile="codurance"
```

The profile being the one used by terraform to check on my aws credentials file.


Finally, to get the ball rolling with this workspace setup, you will use the same commands that you will need on the first section. But now I can handle separate accounts because I am using the single centralized state location.

# What to choose

Ahem ... it depends. What kind of separation you want or need? Workspaces are a bit more difficult to deal with if you are using [modules](https://www.terraform.io/docs/modules/index.html), as Terraform doesn't seem to provide conditional setup of modules. But if you have exactly the same setup in all your environments, workspaces do seem slightly cleaner.
