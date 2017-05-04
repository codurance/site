---
layout: post
asset-type: post
name: Introduction to docker swarm part one
title: 'Introduction to docker swarm part one'
date: 2017-05-04 09:00:00 +00:00
author: Carlos Raffellini
image:
- src:
tags:
- Distributed systems
- Clustering
- Docker Swarm
- Docker
- Apprenticeship
---

## Introduction
[Docker swarm](https://docs.docker.com/engine/swarm/) is a Docker mode to run and manage a cluster of Docker Engines.

There are a few [key concepts](https://docs.docker.com/engine/swarm/key-concepts/) that we need to know before starting.

- Node: it is an instance of Docker Engine that participates in the cluster. Usually, it is an instance of docker-machine running in a virtual machine. There is two kind of roles, manager or worker. The managers dispatch unit of work to the workers and have the knowledge of the cluster composition.

- Service: it is a definition of the kind of task that is going to be run by the cluster. It is the unit of the swarm. Services can be of two types, replicated or global. The last one ensures that at least a task is going to run per node.

- Task: it is the unit which carries the container and the commands to run inside.

- Load balancing: the manager nodes use ingress load balancing to exposes the services you want to make available externally. Swarm mode has an internal DNS component that automatically assigns each service in the swarm a DNS entry.

## Services and Stack
As well as Docker engine has a run and docker-compose, Docker swarm has service and stack to represent the relations between services. Docker stack uses an extended definition of docker compose to make the definition of services explicit. In this post, I am going to use `docker stack`.

Showing docker swarm levels:
```
+---+    +---+    +---+
|   |    |   |    | C |
| S |    |   |    | O |
| E |    | T |    | N |
| R |    | A |    | T | 
| V | -*>| S | -> | A |
| I |    | K |    | I |
| C |    |   |    | N |
| E |    |   |    | E |
|   |    |   |    | R |
+---+    +---+    +---+
```

## Vagrant setup
For this examples, I am going to use Vagrant. It is not the goal of this post to teach Vagrant, however, I am going to detail how to use this script.

In the vagrant definition, we have a set of managers and worker instances. The names are going to be `m1,m2` for the managers and `w1, w2, w3` for the workers. Also, we can hit the manager IPs with `192.168.99.20#{1,2}` and the worker IPs with `192.168.99.21#{1,2,3}`, where the sequence number match with the name suffix of the corresponding name.

We are going to run `vagrant up m1 m2 w1 w2` to bring one manager and two workers live.

Create a `docker-swarm-test` directory and create a `Vagrantfile` inside.

Vagrantfile:
```ruby
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/xenial64"
    config.vm.provision "shell", path: "./node.bash", privileged: true

    (1..2).each do |sequence|
        config.vm.define "m#{sequence}" do |node|
            node.vm.network "private_network", ip: "192.168.99.20#{sequence}"
            node.vm.hostname = "m#{sequence}"
        end
    end

    (1..3).each do |sequence|
        config.vm.define "w#{sequence}" do |node|
            node.vm.network "private_network", ip: "192.168.99.21#{sequence}"
            node.vm.hostname = "w#{sequence}"
        end
    end

    config.vm.provider "virtualbox" do |v|
        v.memory = 2048
        v.cpus = 1
    end

end
```

The `Vagrantfile` we created needs a provisioning script in `./node.bash`.

node.bash
```
#!/bin/bash

# Install docker engine
curl -fsSL https://test.docker.com/ | sh
# Add the vagrant user to the docker group
usermod -aG docker vagrant

# Set both unix socket and tcp to make it easy to connect both locally and remote
cat > /etc/docker/daemon.json <<END
{
    "hosts": [
        "unix://",
        "tcp://0.0.0.0:2375"
    ],
    "experimental": true,
    "debug": true,
    "metrics-addr": "0.0.0.0:9323"
}
END

## Change deamon definition and restart docker deamon
wget -O /lib/systemd/system/docker.service https://raw.githubusercontent.com/docker/docker/v17.04.0-ce/contrib/init/systemd/docker.service.rpm
systemctl daemon-reload
systemctl restart docker

apt-get install -y -q tree
```

## Connect workers and managers
I am going to assume that you have docker installed on your machine in order to run commands in the nodes. Also, you can ssh one of the VMs and run docker client from there, however, I recommend to run from your local machine so you can have easy access to your files.

### Run commands from the manager

Export Docker host variable with manager address:
export DOCKER_HOST=192.168.99.201

Initialize the swarm manager node:
`docker swarm init --advertise-addr 192.168.99.201`

The output of this command contains the command you must run in the nodes to join them as workers:

docker swarm join \
--token SWMTKN-1-5115o3dmke8531usz4f4vqtqj9u25j7lflh659oud9kt8qboez-cdqnqq7f3mlvx67gkk2x65pwj \
192.168.99.201:2377

The **SWarM ToKeN** version **1** corresponds to the pattern `SWMTKN-1-< digest-of-root-CA-cert>-< random-secret >`. [Here](https://github.com/docker/labs/tree/master/security/swarm#step-2-add-a-new-manager) you can find detailed info.

You can get the command to join as worker or manager running `docker swarm join-token worker` or `docker swarm join-token worker` in any manager.

After joining the nodes you can see the status. To achieve that export a manager address `export DOCKER_HOST=192.168.99.201` of the cluster running `[docker node ls](https://docs.docker.com/engine/swarm/manage-nodes/#list-nodes)`.
Example:
```
$ docker node ls
ID                           HOST  NAME  STATUS  AVAILABILITY  MANAGER STATUS
67amhouicfyqunzs6k5p3g6cj *  m2        Ready   Active        Reachable
du1d5khn10hp1ut3v3134ll5m    w1        Ready   Active
lvj934al8rozerkql3mjlwink    m1        Ready   Active        Leader
ywhwdja3u2csui3ha9ghsmwqc    w2        Ready   Active
```

To see the swarm status of a specific node use `node info`
```
$ docker info | grep --after-context=4 Swarm
Swarm: active
 NodeID: 67amhouicfyqunzs6k5p3g6cj
 Is Manager: true
 ClusterID: 1mpireicaca699772x3agxyca
 Managers: 2
 Nodes: 4
```

 For any of the status commands you can always run watch in another console and see how the things change. For instance, you can run `watch -d -n 1 docker node ls` before adding new nodes and see how it changes. The command flashes the differences (-d) and runs the command each second (-n 1).

Challenge: Try to connect the m2 instance as a manager.

### Create the stack
We are going to create services using `docker stack`. This is a similar to docker-compose but for services. You can always do the same with `docker service`.

In this post, we are going to create only a service and prove that we have a load balancer behind. We need to create a file that represents the definition of the services:

swarmrt.yml
```
version: '3.1'

services:
    swarmrt:
        image: charlieraffellini/swarmrt
        ports:
            - "9080:3000"
        deploy:
            mode: global
```

The first line of the file is the docker compose format [version](https://docs.docker.com/compose/compose-file/#deploy) that we are using.
Then it continues with the definition of the services. In this case, we only have one `swarmrt`. Then we continue defining the image that we want to run in the containers, the port we want to expose (this is only necessary if the container is going to be accessed from outside). The last thing we define is the deploy mode, we talk about that in the introduction, there are two kind of deploy modes, replicated (default) and global. Global mode ensures that one task in going to run for each node. It is useful when we want to run some monitoring application.

In this case, we want to prove that we are behind a load balancer so, we are going to deploy an instance of our container in each node. Let's do it:

```
$ docker stack deploy -c services/swarmrt.yml swarmrt
Creating network swarmrt_default
Creating service swarmrt_swarmrt
```
You can see that the deploy creates a service and a network for it. In this post, we are not going to talk about the network that it creates. We are going to deal only with `ingress_network` which is the most external one.

### Ingress network

Docker swarm has an already created [network for the incoming traffic](https://docs.docker.com/engine/swarm/ingress/#publish-a-port-for-a-service). The load balancers work in this network. They are listening to the port that we specified when we published a service `<PUBLISHED-PORT>:<TARGET-PORT>`. They send the traffic to any of the nodes that they have connected and subscribed to that port.

So let's prove it. Run `watch -d -n 1 curl -s -4 http://192.168.99.201:9080/`. You will see that every second the IP of who receive the request is different. This is because each time that we send a curl the load balancer redirects to any of the nodes.
Also, you can change the docker instance you are connected and run it again. For instance `watch -d -n 1 curl -s -4 http://192.168.99.202:9080/`.

### Scale down

Before we talked about other deploy mode, replicated. It is the default mode. So now we are going to try it and also we are adding some constraints.

Docker swarm by default doesn't distribute the task among the nodes in any particular way. However, there are [constraints](https://docs.docker.com/engine/reference/commandline/service_create/#specify-service-constraints---constraint) that we can add to distribute the tasks. For instance, we can match instance name, role (worker or manager), labels, node ID. 

In order to try it, we are going to modify our `swarmrt.yml` file.

swarmrt.yml
```
version: '3.1'

services:
    swarmrt:
        image: charlieraffellini/swarmrt
        ports:
            - "9080:3000"
        deploy:
            replicas: 1
            placement:
                constraints:
                    - node.role==manager

```

We removed the global mode. The definition only runs a task for the whole service. The next part is to specify a constraint that the task only is going to run in a manager.

Usually doing `vim services/swarmrt.yml ./swarmrt.yml swarmrt` it is enough to update the services in the stack. However change the mode it is not allowed in updates. So we must remove the services and run it again:

```
$ docker stack rm swarmrt
Removing service swarmrt_swarmrt
Removing network swarmrt_default
docker stack deploy -c services/swarmrt.yml swarmrt
Creating network swarmrt_default
Creating service swarmrt_swarmrt
```

Now we can run our curl again and see that the IP of the node that receives the request doesn't change `watch -d -n 1 curl -s -4 http://192.168.99.201:9080/`.

### Conclusions
The concepts that you must learn to run docker swarm are not so differents from the once that you use for run docker instances in a node.
We proved that there is load balancer into the ingress network. Also, we saw deploy modes, global and replicated. Also, we added constraints to the service definition.
