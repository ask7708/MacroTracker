// user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var connection = mongoose.createConnection("mongodb://localhost/myDatabase");


var User = new Schema({
  
  username: {type: String, lowercase: true},
  age: Number,
  weight: Number,
  password: String,
  goalProtein: Number,
  goalFat: Number,
  goalCarb: Number,

  
  tracker : [{ type: Schema.Types.ObjectId, ref: 'MacTrac' }]
  
});




User.plugin(passportLocalMongoose);


var User = mongoose.model('users', User);
module.exports = mongoose.model('users', User);
