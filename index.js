/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer } = require('apollo-server');
const dotenv = (require('dotenv')).config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');


/**
 * Mongoose Database
 */

const openMongoDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGODB_CONNECTIONSTRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      }
    );
    mongoose.connection.on('error', (e) => reject(e.message));
    mongoose.connection.once('open', () => resolve());
  });
};


/**
 * Apollo Server
 */

const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
      playground: true,
      context: (({ req }) => {
        try {
          const authHeader = req.headers['authorization'];
          const token = authHeader && authHeader.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
          return decodedToken && decodedToken.userId ? { userId: decodedToken.userId, ...decodedToken } : { userId: '' }
        } catch {
          return { userId: '' }
        }
      })
    });

    server
      .listen({ port: process.env.PORT || 4000 })
      .then(({ url }) => { resolve(url); });
  });
}

/**
 * Start the server
 */

openMongoDB()
  .then(startServer)
  .then((url) => console.log(`Server Started on ${url}`))
  .catch(e => console.error(e));
