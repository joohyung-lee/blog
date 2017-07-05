var express = require('express');
var router = express.Router();
//DATA MODEL
var Post = require('../model/post');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
// GET ALL posts
router.get('/', function (req, res) {
    Post.find(function (err, posts) {
        if (err) return res.status(500).send({
            error: 'database fail'
        });
        res.json(posts);
    })
});

// GET SINGLE POST
router.get('/:post_id', function (req, res) {
    Post.findOne({
        _id: req.params.post_id
    }, function (err, post) {
        if (err) return res.status(500).json({
            error: err
        });
        if (!post) return res.status(404).json({
            error: 'post not found'
        });
        res.json(post);
    })
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
    req.body.name = 'firstproject';
    req.body.author = 'joomation';
    post.title = req.body.name;
    post.author = req.body.author;
    //post.post_date = new Date(req.body.post_date);
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
router.put('/:post_id', function (req, res) {
    Post.findById(req.params.post_id, function (err, post) {
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
router.delete('/:book_id', function (req, res) {
    Post.remove({
        _id: req.params.post_id
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