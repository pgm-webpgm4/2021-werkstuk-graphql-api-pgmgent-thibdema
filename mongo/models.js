/**
 * Importing mongoose
 */

const mongoose = require('mongoose');

/**
 * Importing schemas
 */

const UserSchema = require('./schemas/user');
const ProductSchema = require('./schemas/product');

/**
 * Creating mongoose models
 */

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

/**
 * Exporting the models
 */

module.exports = {
  User,
  Product
}