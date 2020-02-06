
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

    const winstonLogger = winston.createLogger({
        format: winston.format.combine(
            winston.format((info) => {
                info.correlationId = getCorrelationId() || noCorrelationIdValue;
                return info;
            })(),
            winston.format.timestamp(),
            winston.format.errors({stack: true}),
            winston.format.printf(({timestamp, correlationId, level, message}) => {
                return `${appName} ${environment} ${timestamp} ${correlationId} ${level}: ${message}`;
            })
        ),
        level: level,
        transports: [
            new winston.transports.File({ filename: appRoot+'/logs/combined.log' })
        ],
        exitOnError: false,
    })

    const wrapper = ( original ) => {
        return (...args) => original(JSON.stringify(args));
    };
    
    winstonLogger.error = wrapper(winstonLogger.error);
    winstonLogger.warn = wrapper(winstonLogger.warn);
    winstonLogger.info = wrapper(winstonLogger.info);
    winstonLogger.verbose = wrapper(winstonLogger.verbose);
    winstonLogger.debug = wrapper(winstonLogger.debug);
    winstonLogger.silly = wrapper(winstonLogger.silly);

    return winstonLogger;
}

module.exports = { createLogger };