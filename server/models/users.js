var mongoose = require("mongoose");

var clientSchema = mongoose.Schema({
  email : {type: String, required: true},
  name : {type: String, required: true},
  password : {type: String, required: true},
  role : String
});

module.exports = mongoose.model("users", clientSchema);
