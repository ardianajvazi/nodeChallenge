'use strict';

const mongoose = require('mongoose');

var offersSchema = new mongoose.Schema({
  id: String,
  name: String,
  amount: String,
  maximumRides: String
});

module.exports = exports = mongoose.model('Offers', offersSchema);
