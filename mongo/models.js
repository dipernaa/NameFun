const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
  amount: Number,
  name: String,
  sex: String,
  year: String
});

const Name = mongoose.model('Name', nameSchema);

module.exports = {
  Name
};
