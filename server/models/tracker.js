var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var macroTracker = new Schema({
  
      _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      title: String ,
      protein: Number, 
      fat: Number, 
      carb: Number,
      total: Number,
      dateMade: Date
  
});


var macroTracker = mongoose.model('MacTrac', macroTracker)
module.exports = mongoose.model('MacTrac', macroTracker);