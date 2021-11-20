"use strict";
const ChannelsMiddleware = require("@moleculer/channels").Middleware;
const { ServiceBroker } = require("moleculer");
const faker = require("faker");

let c = 1;

// Create broker
const serviceBroker = new ServiceBroker({
	logLevel: {
		CHANNELS: "debug",
		"**": "info"
	},
    middlewares: [
		ChannelsMiddleware({
            adapter: `redis://default:sOmE_sEcUrE_pAsS@localhost:6379/0`,
			prefix: "orders", // for set prefix
		})
	]

});


serviceBroker
	.start()
	.then(async () => {
		
        console.log("Publish 'payment.processed' message...");
        
		await serviceBroker.sendToChannel("payment.processed", {
			id: faker.random.uuid(),
			name: faker.name.findName(),
			auth: faker.random.boolean(),
		})
		serviceBroker.stop();
    })
    .catch(err => {
		serviceBroker.logger.error(err);
		serviceBroker.stop();
	});