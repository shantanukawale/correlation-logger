
# Stores Logger

Stores logger is custom logger written to manage all types of logs in store microservices.

## Setup

### Insatll dependency

```bash
npm install --save git+https://github.com/shantanukawale/stores-logger.git
```

### Add  variable in '.env' file in root of your service

```
STORE_APP_NAME=your-app-name
ENV=production
```

Other supported `ENV`s are test, staging, development.

### Auto request & response logging

Add the below lines to the microservice's server file ("app" in the code is an implied reference to an instance of Express()):  

```javascript
const storesLogger = require("stores-logger");  

storesLogger(app);  
```

### Custom logger to logs (info, error etc)

```javascript
const { logger } = require("stores-logger/logger");  

// To log information
logger.info("xyz");

// to log error
logger.error("some-error");
```
