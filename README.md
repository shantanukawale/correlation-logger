
# Correlation Logger

Correlation logger is custom logger written to manage all types of logs in your microservices.
It can log each request and reponse of the microservice. 
Additionally it can also be used to log error and info with correlationId.

## Setup

### Install

```bash
npm install --save correlation-logger
```

### Add variable in '.env' file in root of your service

```
STORE_APP_NAME=your-app-name
ENV=production
```

value STORE_APP_NAME should not contain spaces.
Other supported `ENV`s are test, staging, development.

### Create logs folder and put it in .gitignore

```bash
mkdir logs
echo logs/ >> .gitignore
```

It writes logs in `logs/combined.log`.

### How to use

#### To log Request and Response

Add the below lines to the microservice's server file ("app" in the code is an implied reference to an instance of Express()):  

```javascript
const requestLogger = require("correlation-logger");  

requestLogger(app);  
```

#### To add custom logging

```javascript
const { logger } = require("correlation-logger/logger");  

// To log information
logger.info("some useful", "information");

// to log error
logger.error("some-error", "more info");
```

Other supported methods are -

- warn
- verbose
- debug
- silly

#### To forward correlation-id in `request` and `request-promise`

This is needed if you wanna track a request flowing through several microservices.

```javascript
// It returns a wrapper around `request` package with added default `correlation-id` header
const request = require("correlation-logger/request")
```

If you are using `request-promise-native` package. Use below wrapper for default `correlation-id` header

```javascript
// It returns a wrapper around `request-promise-native` package with added default correlation-id header
const request = require("correlation-logger/request-promise-native")
```

Likewise to use wrapper of `request-promise` package. Use below wrapper

```javascript
// It returns a wrapper around `request-promise` package with added default correlation-id header
const request = require("correlation-logger/request-promise")
```
