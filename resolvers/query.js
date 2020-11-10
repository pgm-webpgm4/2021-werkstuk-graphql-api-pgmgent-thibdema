/**
 * The Query Resolvers
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');

const { User, Product } = require('../mongo/models.js');

module.exports = {
  Query: {
    // e.g. dummies: () => dummies
    login: async (parent, { user }, context) => {
      // destructure the user
      const { email, password } = user;

      // validate if the user exists
      const userExists = await User.exists({ email });
      if(!userExists) throw new Error('User does not exist.');

      // get the user
      const foundUser = await User.findOne({ email: email });

      // check if incoming password is equal
      const isEqual = bcrypt.compareSync(password, foundUser.password);
      if(!isEqual) throw new Error('Password is incorrect.');

      // create the webtoken
      const token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      // return the auth data
      return {
        userId: foundUser.id,
        token,
        admin: !!foundUser.admin
      };
    },

    renewToken: async (parent, {token, id}, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');

      const foundUser = await User.findOne({ userId: id });

      // create the webtoken
      const newtoken = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SALT,
        { expiresIn: '1h' }
      );

      return {
        token: newtoken,
        id: foundUser._id
      };
    },

    getCategoryProducts: (parent, {category}, context) => {
      return Product.find({ type: category}).exec();
    },

    getAudienceProducts: (parent, {audience}, context) => {
      return Product.find({ audience: audience}).exec();
    },

    getProduct: (parent, {id}, context) => {
      return Product.findById(id).exec();
    },

    search: (parent, {search}, context) => {
      if(!!search) {
        const searchQuery = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ]
        };
        return Product.find(searchQuery);
      } else return [];
    },

    getAllProducts: (parent, {filters}) => {
      if(filters.audience == 'All' && filters.category == 'All') return Product.find();
      if(filters.audience == 'All') return Product.find({type: filters.category});
      if(filters.category == 'All') return Product.find({audience: filters.audience});
      return Product.find({type: filters.category, audience: filters.audience});
    },

    users: (parent, params, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.find();
    },

    user: (parent, { id }, context) => {
      if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      else return User.findOne({ _id: id });
    },

    checkAdmin: (parent, { id }, context) => {
      // if(context.userId === '') throw new AuthenticationError('Must authenticate!');
      if(context.userId === '') {
        return {admin: false}
      }
      const userData = User.findOne({ _id: id });
      return userData;
    },
  },
}