var mongoose = require("mongoose");

var pollSchema = mongoose.Schema({
  question: String,
  options: [
    {
      number: Number,
      option: String,
      poll: Number
    }
  ],
  user: String,
  voters: [String]
});

module.exports = mongoose.model("polls", pollSchema);
