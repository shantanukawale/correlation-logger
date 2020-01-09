const correlator = require(`./correlation_id`);

function correlationIdMiddleware(req, res, next) {
    correlator.bindEmitter(req);
    correlator.bindEmitter(res);
    correlator.bindEmitter(req.socket);
    
    correlator.withId(() => {
        const currentCorrelationId = correlator.getId();
        res.set(`xoxo-correlation-id`, currentCorrelationId);
        next();
    }, req.get(`xoxo-correlation-id`));
}

module.exports = {correlationIdMiddleware};