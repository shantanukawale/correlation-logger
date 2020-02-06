
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

### Auto request & response logging

Add the below lines to the microservice's server file ("app" in the code is an implied reference to an instance of Express()):  

```javascript
const requestLogger = require("correlation-logger");  

requestLogger(app);  
```

### Custom logger to logs (info, error etc)

```javascript
const { logger } = require("correlation-logger/logger");  

// To log information
logger.info("xyz");

// to log error
logger.error("some-error");
```
