# Assignment 

## Prerequisite
The following environment setting has been tested.
* OS: Ubuntu 20.04 LTS Server Edition
* node: 16.15.1 LTS
* npm
* docker-compose
* docker

## Setup 
### Run Database using docker
1. install node dependency: `npm install --production`
2. start DB container: `npm run pgdb`
3. init DB table `npm run init-table`
4. start server `npm run`

### Run Database using docker-compse
1. install node dependency: `npm install --production`
2. start DB container: `sudo docker-compose up -d`
3. init DB table `npm run init-table`
4. start server `npm run`

## RESTful API doc
Please run api-server and check Swagger API URL.

http://localhost:3000/api-docs

## Websocket
### URL:
- URL
  - ws://localhost:3000/ws?token={jwttoken}
- Query parameter:
  - jwttoken: token retrieved from login
### Command line for Websocket
- Run command:
    - `node ./ws-client.js {jwttoken}`
- Command parameter:
  - jwttoken: token retrieved from login 
