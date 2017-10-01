var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
   // _id:String,
    author:String,
    title:String,
    summary:String,
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
    postDate: String
   
});

module.exports = mongoose.model('post',postSchema);