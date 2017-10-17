import express from 'express';
import mongoose from 'mongoose';
let router = express.Router();
//DATA MODEL
import Post from '../model/post';


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// GET ALL posts
router.get('/', function (req, res) {
    Post.find({},{"body":false})
    .sort({"_id": -1})
    .limit(6)
    .exec((err, posts) => {
        if(err) throw err;
        res.json(posts);
    });
});
//get single post
router.get('/single/:category/:id',(req,res)=>{
    let category=req.params.category;
    let id = req.params.id;
    Post.find({_id:req.params.id},function (err, posts) {
        if (err) return res.status(500).json({
            error: err
        });
        if (!posts) return res.status(404).json({
            error: 'post not found'
        });
        res.json(posts);
    })

})
//get category post
router.get('/:category',(req,res)=>{
    let category=req.params.category;
    if(category==='main'){
        Post.find({},{"body":false})
        .sort({"_id": -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            res.json(posts);
        });
    }else{
    Post.find({category:req.params.category},{"body":false}) 
        .sort({"_id": -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            res.json(posts);
        });
    }
})
//load old posts
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    // check list load type
    if(listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }
    // check post id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }
    let objId = new mongoose.Types.ObjectId(req.params.id);
    if(listType === 'new') {
        // get new posts
        Post.find({ _id: { $gt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            return res.json(posts);
        });
    } else {
        // get old posts
        Post.find({ _id: { $lt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            return res.json(posts);
        });
    }    
    
    
    
    
});
// // GET POST BY AUTHOR
// Router.get('/api/books/author/:author', function (req, res) {
//     Book.find({author:req.params.author},{_id:0,title:1,post_date:1},function(err,books){
//         if(err) return res.status(500).json({error:err});
//         if(books.length===0) return res.status(404).json({error:'book not found'});
//         res.json(posts);
//     });
// });

// CREATE POST
router.post('/', function (req, res) {
    var post = new Post();
    
    post.author = req.session.passport.user.userName;
    post.title = req.body.title;
    post.summary = req.body.summary;
    post.body = req.body.body;
    post.iframeUrl = req.body.iframeUrl;
    post.category = req.body.category;
    post.tags = req.body.tags;
    post.thumbnail = req.body.thumbnail.data;
    post.files = req.body.files.data;
    post.postDate=req.body.postDate;
    post.save(function (err) {
        if (err) {
            console.error(err);
            res.json({
                result: 0
            });
            return;
        }

        res.json({
            result: post
        });

    });
});

// UPDATE THE POST
router.put('/:id', function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) return res.status(500).json({
            error: 'database fail'
        });
        if (!post) return res.status(404).json({
            error: 'post not found'
        });

        // req.body.title='change joo';
        if (req.body.title) post.title = req.body.title;
        if (req.body.author) post.author = req.body.author;
        if (req.body.post_date) post.post_date = req.body.post_date;

        post.save(function (err) {
            if (err) res.status(500).json({
                error: 'fail to update'
            });
            res.json({
                message: 'post updated'
            });
        });
    });
});

// DELETE POST
router.delete('/:id', function (req, res) {
    Post.remove({
        _id: req.params.id
    }, function (err, ouput) {
        if (err) return res.status(500).json({
            error: "database fail"
        });
        if (!output.result.n) return res.status(404).json({
            error: "post not found"
        });
        res.json({
            message: "post deleted"
        });
        res.status(404).end();
    });
});

module.exports = router;