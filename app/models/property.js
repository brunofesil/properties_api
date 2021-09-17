const mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
  type: String,
  district: String,
  city: String,
  value: Number,
  transection: String,
  bedroom: Number,
  area: Number,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Property', propertySchema);