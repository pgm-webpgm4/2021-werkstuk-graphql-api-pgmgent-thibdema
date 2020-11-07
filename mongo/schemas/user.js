/**
 * Modelling the user
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  admin: Boolean
});

module.exports = UserSchema;