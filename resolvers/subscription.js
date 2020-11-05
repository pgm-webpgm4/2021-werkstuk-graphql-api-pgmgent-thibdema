/**
 * The Subscription Resolvers
 */

module.exports = {
  Subscription: {
    // e.g. dummyAdded: { subscribe: () => pubsub.asyncIterator("DUMMY_ADDED") }
    productAdded: { subscribe: () => pubsub.asyncIterator("PRODUCT_ADDED") }

  }
}