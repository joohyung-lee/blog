var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var accountSchema = new Schema({
    oauthID:Number,
    userName:String,
    email:String,
    profileImg:{
        url:String,
        isDefault:false
    },
    type:String,
   
});
accountSchema.plugin(findOrCreate);
module.exports = mongoose.model('account',accountSchema);

