const request = require(`request`);
const correlator = require(`./correlation_id`);

module.exports = request.defaults({
    headers: {
        get 'xoxo-correlation-id'() {
            return correlator.getId();
        },
    },
});