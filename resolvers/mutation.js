/**
 * The Mutation Resolvers
 */
const { ApolloError, AuthenticationError } = require('apollo-server');
const pubsub = require('./pubsub');
const bcrypt = require('bcrypt');

const { User, Product } = require('../mongo/models');

module.exports = {
  Mutation: {
    // e.g. addDummy: (parent, { dummy }, { userAllowed }) => {}
    register: async (parent, { user }) => {
      // destructure user
      const { email, password } = user;

      // validate if the user exists
      const userExists = await User.exists({ email });
      if(userExists) throw new Error('User already exists.')

      // create hash
      const hashedPassword = bcrypt.hashSync(password, 12);

      // create new user
      const newUser = await User.create({
        email,
        password: hashedPassword
      });

      // reset the password for security issues
      newUser.password = null;

      // return the user
      return newUser;
    },

    addProduct: async (parent, { product }, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      if(!context.admin) throw new AuthenticationError('NOT AUTHORIZED');

      // validate if the product already exists
      const productExists = await Product.exists({ product });
      if(productExists) throw new Error('Product already exists.');

      // Create new product
      const newProduct = await Product.create({
        ...product
      });

      // Added subscription
      pubsub.publish('PRODUCT_ADDED', { productAdded: newProduct });

      // Returning new product
      return newProduct;
    },

    editProduct: async (parent, { id, product }, context) => {

      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      if(!context.admin) throw new AuthenticationError('NOT AUTHORIZED');

      // validate if the product exists
      const productExists = await Product.exists({ _id: id });
      if(!productExists) throw new Error("Product doesn't exists.");

      // Create new product
      const editedProduct = await Product.update({
        ...product
      });

      // Returning new product
      return editedProduct;
    },

    deleteProduct: async (parent, { id }, context) => {

      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      if(!context.admin) throw new AuthenticationError('NOT AUTHORIZED');

      // validate if the product exists
      const productExists = await Product.exists({ _id: id });
      if(!productExists) throw new Error("Product doesn't exists.");

      // Create new product
      await Product.deleteOne({ _id: id });

      // Returning new product
      return "Deleted product succesfully.";
    },
  }
}