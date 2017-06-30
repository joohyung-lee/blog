var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
   // _id:String,
    title:String,
    author:String,
    post_date: { type: Date, default: Date.now  }
   
});

module.exports = mongoose.model('post',postSchema);