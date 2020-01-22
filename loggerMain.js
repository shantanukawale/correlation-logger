
const appRoot = require('app-root-path');
const winston = require(`winston`);

require('dotenv').config();

function createLogger(opts = {}) {
    const {
        level = "info",
        getCorrelationId,
        noCorrelationIdValue = "nocorrelation",
        appName = process.env.STORE_APP_NAME,
        environment = process.env.ENV
    } = opts;

    return winston.createLogger({
        format: winston.format.combine(
            winston.format((info) => {
                info.correlationId = getCorrelationId() || noCorrelationIdValue;
                return info;
            })(),
            winston.format.timestamp(),
            winston.format.errors({stack: true}),
            winston.format.printf(({timestamp, correlationId, level, message}) => {
                if((typeof message) == "object"){
                    try{ 
                        message = JSON.stringify(message);
                    } catch(e){
                        
                    }
                } 
                return `${appName} ${environment} ${timestamp} ${correlationId} ${level}: ${message}`;
            })
        ),
        level: level,
        transports: [
            new winston.transports.File({ filename: appRoot+'/logs/combined.log' })
        ],
        exitOnError: false,
    })
}

module.exports = { createLogger };