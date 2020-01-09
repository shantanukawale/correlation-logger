
#  Stores Logger

  

Add the below lines to the microservice's server file ("app" in the code is an implied reference of an instance of Express()):  
>const {correlationIdMiddleware} = require("./stores-logger/correlation_id_middleware");  
const {requestLoggingMiddleware} = require("./stores-logger/request_logging_middleware");  
const {logger} = require("./stores-logger/logger");  
const storesLogger = require("./stores-logger");  
//logger code to log request and response body.  
app.use(correlationIdMiddleware);  
app.use(requestLoggingMiddleware);  
storesLogger(app);  
//logger.info("xyz") logs text with correlation id.

Install the following node modules:  
>npm install uuid cls-hooked winston morgan --save
