# Orderly

#### Organization and Project management tool
- Manage Projects, Tasks, Events, Notes, Checklists, and associate work items 


# Table of Contents
1. [Overview](https://github.com/RobertJephthaHogan/orderly/blob/main/README.md#overview)
2. [Running Development Environment](https://github.com/RobertJephthaHogan/orderly/blob/main/README.md#development-environment)
3. [Running Production Environment](https://github.com/RobertJephthaHogan/orderly/blob/main/README.md#production-environment)



# Overview
Coming soon
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Development Environment
Instructions for running your development environment:

## Running the Server
navigate to the /src/server direcory of the application:
```
cd src
cd server
```
create your python environment:
```
python -m venv <environment_name>
```
activate your environment:
```
source <environment_name>/scripts/activate
```

install the requirements:
```
pip install -r requirements.txt
```

after installation is complete, run the server by running
```
python main.py
```

## Running the Client
navigate to the /src/client direcory of the application
```
cd src
cd client
```

install the required packages:
```
npm install
```

after installation is complete, run the client 
```
npm start
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# Production Environment
To run the application for prod, you will need Docker and Docker Compose installed on your machine <br/>
Once you have Docker and Docker compose installed <br/>
Navigate to the /src directory and run docker-compose up:
```
cd src
```
```
docker-compose up
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
