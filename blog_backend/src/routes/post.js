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
router.get('/:url/:pageId', function (req, res) {
    if(req.params.url==='admin'){
        Post.paginate({}, {limit: 10, page:req.params.pageId,sort: { "_id": -1 }}, function(err, result) {
            res.json({
                docs:result.docs,
                total:result.total,
                pages:result.pages,
                page:result.page
            });
        });
    }
});

// DELETE POST
router.delete('/:url/:id', (req, res) => {  
    if(req.params.url==='admin'){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                error: "INVALID ID",
                code: 1
            });
        }
    
        Post.findById(req.params.id, (err, post) => {
            if(err) throw err;
    
            if(!post) {
                return res.status(404).json({
                    error: "NO RESOURCE",
                    code: 3
                });
            }    
            // REMOVE THE post
            Post.remove({ _id: req.params.id }, err => {
                if(err) throw err;
                res.json({ del: true });
            });
        });
    }
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
    Post.find({category:category},{"body":false}) 
        .sort({"_id": -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            res.json(posts);
        });
    }
})
//load old posts
router.get('/:category/:listType/:id', (req, res) => {
    let category = req.params.category;
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
    if(category === 'main') {
        Post.find({ _id: { $lt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            return res.json(posts);
        });
    } else {  
        Post.find({ $and:[{_id:{ $lt: objId }},{category: category}]})
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
    post.body = req.body.body;
    post.summary = req.body.summary;
    post.bgColor = req.body.bgColor;
    post.iframeUrl = req.body.iframeUrl;
    post.category = req.body.category;
    post.tags = req.body.tags;
    post.thumbnail = req.body.thumbnail;
    post.gif = req.body.gif;
    post.files = req.body.files;
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
        post.author = req.session.passport.user.userName;
        post.title = req.body.title;
        post.body = req.body.body;
        post.summary = req.body.summary;
        post.bgColor = req.body.bgColor;
        post.iframeUrl = req.body.iframeUrl;
        post.category = req.body.category;
        post.tags = req.body.tags;
        post.thumbnail = req.body.thumbnail;
        post.gif = req.body.gif;
        post.files = req.body.files;
        post.postDate=req.body.postDate;

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
// GIVE STAR
router.post('/star/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS

    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // POST POST
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        // POST DOES NOT EXIST
        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }

        // GET INDEX OF USERNAME IN THE ARRAY
        let index = post.starred.indexOf(req.session.passport.user.userName);

        // CHECK WHETHER THE USER ALREADY HAS GIVEN A STAR
        let hasStarred = (index === -1) ? false : true;

        if(!hasStarred) {
            // IF IT DOES NOT EXIST
            post.starred.push(req.session.passport.user.userName);
        } else {
            // ALREADY starred
            post.starred.splice(index, 1);
        }

        // SAVE THE post
        post.save((err, post) => {
            if(err) throw err;
            res.json({
                'has_starred': !hasStarred,
                post,
            });
        });
    });
});
module.exports = router;