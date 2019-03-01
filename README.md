<p align="center"><img width="250" src="https://github.com/rwth-acis/ARLEMPanel/raw/master/images/logo.png" alt="ARLEM Panel"></a></p>

## Introduction

To integrate user-defined activities for an AR-assisted learning system, a specification to model learning activities (also known as employee tasks and procedures) and the environment in which these activities are performed (also known as the workplace) is required. Augmented reality learning experience model (ARLEM) is a model that describes the interaction between the physical environment, the user, and the immersive environment, the context of AR-assisted learning and other parameters of the environment. Above that, this model is helping with the development of experi- ence repositories and online marketplace for AR-assisted learning content.

ARLEM Panel is an authoring tool where different users can create activity and environment models (in the context of ARLEM called workplace models) and transfer these created models in ARLEM format to the AR-assisted application. Furthermore, this thesis also proposes the design and development of a component that will use these ARLEM based models to configure the AR-assisted system.

ARLEM Panel is a single page web application based on that uses Express.js as a backend and Vue.js for the front-end with other libraries.

#### Browser Compatibility

ARLEM Panel supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).

## Installation

In order to install ARLEM Panel the user has to clone this repository and follow the given instruction.

### Package Installation

``` bash
# npm
npm install
// OR
# yarn
yarn install
```

### Setting Database Configuration

User will have to provide database configuation in the file backend/config/config.json in the following format.

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Running on Non-root URL

User can run the web application on different base url by changing ```baseUrl``` parameter inside config/default.json file.

```
{
  "baseUrl": "/mywebsite"
}
```

User can run the web app on root url by placing an empty string for ```baseUrl```.

```
{
  "baseUrl": ""
}
```


### Migration

``` bash
cd backend
```

``` bash
../node_modules/.bin/sequelize db:migrate
```

``` bash
cd ..
```
## Running

``` bash
# npm
npm run start

#yarn
yarn start
```


Copyright (c) 2017-present, ACIS RWTH Aachen.
