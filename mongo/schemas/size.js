/**
 * Modelling a size
 */

const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
  size: String,
  quantity: Number
});

module.exports = SizeSchema;