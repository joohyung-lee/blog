var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
   // _id:String,
    author:String,
    title:String,
    body:String,
    iframeUrl:String,
    category:String,
    tags:[],
    thumbnail:{},
    files:[],
    comments:[
        {
            postId:String,
            name:String,
            body:String,
        }
    ],
    post_date: { type: Date, default: Date.now  }
   
});

module.exports = mongoose.model('post',postSchema);