const request = require(`request-promise-native`);
const correlator = require(`./correlation_id`);

module.exports = request.defaults({
    headers: {
        get 'x-correlation-id'() {
            return correlator.getId();
        },
    },
});