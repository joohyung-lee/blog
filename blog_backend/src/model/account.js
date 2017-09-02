var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    oauthID: Number,
    userName:String,
    email:String,
   
   
});

module.exports = mongoose.model('account',accountSchema);

