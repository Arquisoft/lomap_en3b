# lomap_0

[![Actions Status](https://github.com/arquisoft/lomap_0/workflows/CI%20for%20LOMAP_0/badge.svg)](https://github.com/arquisoft/lomap_0/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_0&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_0)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_0&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_0)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>


This project is a basic example of website using **React** with **Typescript** and an endpoint using **NodeJS** with **express**.

## Quick start guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/arquisoft/lomap_0`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 - [RestApi example call - http://localhost:5000/api/users/list](http://localhost:5000/api/users/list)
 - [RestApi raw metrics - http://localhost:5000/metrics](http://localhost:5000/metrics)
 - [Prometheus server - http://localhost:9090](http://localhost:9090)
 - [Grafana server http://localhost:9091](http://localhost:9091)
 
If you want to run it without docker. Compile and run the restapi:
```shell
cd restapi
npm install
npm start
```

Now the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## More information
You can get more information about the repository in the other README files:
- Documentation: https://github.com/arquisoft/lomap_0/tree/master/docs
- Webapp: https://github.com/arquisoft/lomap_0/tree/master/webapp
- Restapi: https://github.com/arquisoft/lomap_0/tree/master/restapi


## Deployment
For the deployment, we have several options. The first and more flexible is to deploy to a virtual machine using SSH. This will work with any cloud service (or with our own server). Other options include using the container services that all the cloud services provide. This means, deploying our Docker containers directly. Here I am going to use the first approach. I am going to create a virtual machine in a cloud service and after installing docker and docker-compose, deploy our containers there using GitHub Actions and SSH.

### Create the virtual machine [Option 1 - Microsoft Azure]For this example, I am going to create a virtual machine in Azure. Other services like Amazon AWS or Google Cloud, work in the same way.
After logging in to Microsoft Azure with a student account, we can access the services provided. The first one in the creation of Virtual Machines.

<p align="center">   
   <img width="500" alt="Azure options" src="https://user-images.githubusercontent.com/10683040/155282509-411030c5-2b9b-4161-bbe8-28cd9626df1e.png">
</p>

- After clicking in Virtual Machines we will be able to create a new virtual machine. The basic machine (2Gb of RAM), would be enough for this example. Make sure that a pair of keys are generated to be able to access the machine.

<p align="center">   
   <img width="500" alt="Creating the VM" src="https://user-images.githubusercontent.com/10683040/155282817-262a58dd-f203-45bf-aa73-421725aa8b03.png">
</p>

- Download the private key. We will need it to be able to remotely deploy the application over SSH.

<p align="center">   
   <img width="200" alt="Download private key" src="https://user-images.githubusercontent.com/10683040/155282896-5069093e-fa61-4cdb-9cdf-777f9d978f40.png">
</p>

- After creating the machine, we can access its network information. Here we will have useful information as the public IP, that we will use to access the machine. Also, this is where we are going to configure the ports that will be accessible (in our case, ports 3000 and 5000).

<p align="center">   
   <img width="500" alt="Network configuration" src="https://user-images.githubusercontent.com/10683040/155283691-7d782018-f61e-43ab-83fd-f52a0cf04725.png">
</p>

- To add more open ports, press in "Add inbound security route". Then, fill in the information to open ports 3000 and 5000.

<p align="center">   
   <img width="500" alt="Download private key" src="https://user-images.githubusercontent.com/10683040/155284067-e8a85c53-3171-4e40-b773-3d33e05b1159.png">
</p>

- Now is time for accessing the machine using SSH and install docker in it. For this, use the public IP of your machine, with the user `azureuser` and the private key that you downloaded previously. If you are not sure how to connect, check the help in the connect tab in Azure. For instance, in my case I use this command for connecting:

```ssh
ssh -i ~/Descargas/DeploymentASW2223_key_0223.pem azureuser@52.147.199.48
```
### Create the virtual machine [Option 2 - Amazon AWS]

Amazon Academy is a platform created by Amazon to prepare students to work with Amazon AWS. In order to create a new virtual machine in AWS we need to access the service EC2.

- Log In at LMS AWS Academy with your student user/passwd
- At the DashBoard, click on the Lab Course AWS Academy Learner Lab - Foundation Services [15286]
- Now you are inside the AWS Course. The Module Menu Item shows you available course materials: guides, presentations...Click on Learner Lab - Foundational Services to go to your lab. Lab image:

<p align="center">   
   <img width="500" alt="Fundational services" src="https://user-images.githubusercontent.com/10683040/158764913-80d6805c-f1ef-434c-a0f8-f2d4e2c09825.png">
</p>

- Start the lab by selecting Start Lab
- When the dot next to AWS turns green, your lab environment is ready to use. Click AWS to launch the AWS Console in a new tab. A new tab will open the AWS Management Console when you click on AWS. The system logged you into a temporary AWS account and the lab session will automatically end when the session timer expires. The system will save your work when you end the session or the session timer expires.
- Go to AWS Console Tab and select services EC2

<p align="center">   
   <img width="500" alt="EC2 access" src="https://user-images.githubusercontent.com/10683040/158765167-0aa50330-8cad-4450-8060-8b972cdb46e4.png">
</p>

- In the EC2 Service, at the Instances Menu option, we can monitor our created instances. Click the **Launch Instance** button to create a new instance 

<p align="center">   
   <img width="500" alt="Launch instance" src="https://user-images.githubusercontent.com/10683040/158769122-3b082ea9-d796-41ad-a8cb-1c46e309f4af.png">
</p>

- Follow the wizard steps: - Step 1: Choose an Ubuntu 20.04 LTS image. 

<p align="center">   
   <img width="500" alt="Launch instance" src="https://user-images.githubusercontent.com/10683040/158769294-092c02e3-6a24-449d-8697-affd287a28ea.png">
</p>

- Step 2:Choose Instance Type. We choose the medium option. 

<p align="center">   
   <img width="500" alt="Launch instance" src="https://user-images.githubusercontent.com/10683040/158769556-bfaa7733-04d4-45dc-8bfe-ddaf13154958.png">
</p>

- Step 3:Configure Instance Details- We don't change default values. 

<p align="center">   
   <img width="500" alt="Default options" src="https://user-images.githubusercontent.com/10683040/158769782-41e43d9b-c8d9-456a-b345-e753ac832abb.png">
</p>

- Step 4: Storage Capacity. We increase storage capacity to 64 Gb 

<p align="center">   
   <img width="500" alt="Default options" src="https://user-images.githubusercontent.com/10683040/158769977-6ef85390-6fe5-48ab-aa31-d9a653916741.png">
</p>

- Step 5: We dont add any tag. - Step 6: Configure Security Group. We open ssh , 3000 and 5000 ports for all inbound traffic and every IP. 

<p align="center">   
   <img width="500" alt="Default options" src="https://user-images.githubusercontent.com/10683040/158770582-2e33b804-a53b-4de8-bc60-7b8f6254abaf.png">
</p>

- Step 7: Summary. At the summary step, before launching our instance, a dialog asks us to create a new Key pair or use an existing one. We'll create a new one with the default value. That will download the **home.pem** file. We always can create new key pairs at the *AWS Console Menu - In the Security and Network - KeyPair* 

<p align="center">   
   <img width="300" alt="PEM key" src="https://user-images.githubusercontent.com/10683040/158771034-6ea46352-42d7-4506-a700-f2900d684d51.png">
</p>

- If you will use an SSH client on a macOS or Linux computer to connect to your Linux instance, use the following command to set the permissions of your private key file so that only you can read it.

```
 chmod 400 awsdeployment.pem
```
- Once the instance has been created, we need to know its public ip and/or public dns name. All this information is in the instance detail panel.

<p align="center">   
   <img width="500" alt="Detail instance" src="https://user-images.githubusercontent.com/10683040/158771619-7d893b8a-b09c-4d26-bb0e-96b3c86ede87.png">
</p>

- We'll connect at our EC2 instance with ssh using our key file: 

```bash
ssh -i awsdeployment.pem ubuntu@ec2-44-202-121-52.compute-1.amazonaws.com
```

### Installing Docker and Docker compose in the virtual machine
Now that we are in the terminal (it does not matter if using AWS or Azure or any other service), let's execute some commands to install Docker and docker-compose:

```ssh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
sudo apt update
sudo apt install docker-ce
sudo usermod -aG docker ${USER}
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
### GitHub Actions
Now we have a machine capable of executing Docker containers. Let's configure our project to be able to use it to deploy our application. The first thing will be creating some GitHub secrets to have the information we need. We are going to create three, DEPLOY_HOST, with the IP of the virtual machine; DEPLOY_USER with the user with permissions to access the machine (azureuser), and DEPLOY_KEY with the contents of the file with the private key, so we are able to log in to the machine.
As an extra, we need permission to let GitHub Actions upload the docker images to the registry. For this we need to create a new access token with write:packages permission and set it in the DOCKER_PUSH_TOKEN secret.

![image](https://user-images.githubusercontent.com/10683040/155285731-4ecd6d29-b2f6-46ee-959b-689ea9f69fc7.png)

Now we are going to create a new docker-compose file called docker-compose-deploy.yaml that will contain the specific docker-compose instructions to deploy the application:

```yaml
version: '3.5'
services:
  restapi:
    image: ghcr.io/arquisoft/lomap_0/restapi:latest
    ports:
      - "5000:5000"
  webapp:
    image: ghcr.io/arquisoft/lomap_0/webapp:latest
    ports:
      - "3000:3000"
    depends_on: 
      - restapi
```
Note that in this file we are using the images that we uploaded to the github registry instead of building them from scratch.

Now we can configure our actions file to include a new job `deploy` that will be in charge of deploying this docker-compose file to the virtual machine. It will be executed after pushing the docker images to the registry.

```yaml
deploy:
    name: Deploy over SSH
    runs-on: ubuntu-latest
    needs: [docker-push-restapi,docker-push-webapp]
    steps:
    - name: Deploy over SSH
      uses: fifsky/ssh-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        user: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        command: |
          wget https://raw.githubusercontent.com/arquisoft/lomap_0/master/docker-compose-deploy.yml -O docker-compose.yml
          docker-compose stop
          docker-compose rm -f
          docker-compose pull   
          docker-compose up -d
```

Not that this job is executed after pushing the images to the registry. We are just logging in to the machine over SSH and stoping any running containers, pulling the new images and launching everything up.

### Extra modifications needed

In order for everything to work, we need to make some extra modifications in the project. There are related with the restapi URL and how React works. In the webapp code we have in the `src/api/api.ts` file the following line:

```typescript
const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
```
This means that React will look for an environment variable and if it exists, it will take the `apiEndPoint` from there, choosing localhost in any other case. Environment variables in React are picked up in building time and not in execution time. That means we need to pass this variable when we are building the docker image before deploying. For that we need to change the Dockerfile for the webapp and add the following lines before `npm run build`:
```yaml
ARG API_URI="http://localhost:5000/api"
ENV REACT_APP_API_URI=$API_URI
```
Now this Dockerfile has an argument (with a default value) that will create the `REACT_APP_API_URI` environment variable before building the production release of the webapp. We need to pass this argument in the GitHub Actions file, when building the webapp image, which is in the job `docker-push-webapp`. Lastly, we need to configure CORS to accept petitions from all the sources in the restapi. This means changing the cors initialization in `restapi/server.ts` to:
```typescript
app.use(cors());
```
### Creating a new release

Everything is ready now to make the deploy. For that we need to create a new release. That will fire up the deployment process that we have just configured:
![image](https://user-images.githubusercontent.com/10683040/155293978-8e77e821-ed21-4f28-abd9-282ae9e5661b.png)

After the actions process is finished, we can access the application using the IP of our virtual machine in port 3000. Note that is very simple to modify the application to work in port 80 instead. We only need to open that port and configure react to use this port instead.

![image](https://user-images.githubusercontent.com/10683040/155297402-41c09d54-8160-4832-be04-21951d18bc28.png)



