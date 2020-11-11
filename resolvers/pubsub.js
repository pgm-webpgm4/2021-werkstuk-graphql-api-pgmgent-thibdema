/**
 * This is the pubsub singleton needed for subscriptions and publishing
 */

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(1000); // raise max listeners in event emitter

module.exports = pubsub;