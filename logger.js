const correlationId = require(`./correlation_id`);
const {createLogger} = require(`./loggerMain`);

const logger = createLogger({
    getCorrelationId: correlationId.getId,
});

module.exports = { logger };