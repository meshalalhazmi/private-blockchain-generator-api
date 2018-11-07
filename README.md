# Project Title
Simple node express web API to retrieve and create blocks within a local blockchain (based on node express framework)


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites
Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].


### Installing
- Use NPM to install project dependencies.
```
npm install
```
- run  the project with nodemon
```
npm start
```


 ### generate some blocks
   uncomment initializeMockData call in /providers/db.js constructor to generate few blocks
   ```
           // this.initializeMockData();
   ```


### dependencies
 - express-validator for input validation
 - level-db for data persistence
 - nodemon for local change detection