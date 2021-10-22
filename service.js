"use strict";

const { ServiceBroker } = require("moleculer");
const ChannelsMiddleware = require("@moleculer/channels").Middleware;


const serviceBroker = new ServiceBroker({
	logLevel: {
		CHANNELS: "debug",
		"**": "info"
	},
    
    middlewares: [
		ChannelsMiddleware({
            adapter: `redis://default:sOmE_sEcUrE_pAsS@localhost:6379/0`,
		})
	]
    
});

serviceBroker.createService({
    name: "payments",

    channels: {
        "payment.processed": {
            async handler(payload) {
                console.log(`Paylod is ${JSON.stringify(payload)}`);

            }
        }
    },

});


serviceBroker
	.start()
	.then(async () => serviceBroker.repl())
    .catch(err => {
		serviceBroker.logger.error(err);
		serviceBroker.stop();
	});