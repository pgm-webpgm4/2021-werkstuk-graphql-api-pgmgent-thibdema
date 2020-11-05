/**
 * Modelling a product
 */

const mongoose = require('mongoose');
const ImageSchema = require('./image');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [ImageSchema],
  created_At: Date,
  color: [String],
  sizes: [String],
  audience: String,
  type: String,
});

module.exports = ProductSchema;