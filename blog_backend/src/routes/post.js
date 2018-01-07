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
// GET ALL posts -v admin
router.get('/admin/:pageId', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    Post.paginate({}, {limit: 10, page:req.params.pageId,sort: { "_id": -1 }}, function(err, result) {
        res.json({
            docs:result.docs,
            total:result.total,
            pages:result.pages,
            page:result.page
        });
    });
});
// SEARCH POSTS -v admin
router.get('/search/:title/:pageId', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    let searchValue=req.params.title;
    Post.paginate({$text: {$search: searchValue}
    },{limit: 10, page:req.params.pageId,sort: { "_id": -1 }}, function(err, result) {
        res.json({
            docs:result.docs,
            total:result.total,
            pages:result.pages,
            page:result.page
        });
    });
});

// DELETE POST -v admin
router.delete('/admin/:id', (req, res) => {  
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 400
        });
    }

    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 404
            });
        }    
        // REMOVE THE post
        Post.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ del: true });
        });
    });
});
// UPDATE THE POST -v admin
router.put('/:id', function (req, res) {
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
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
//--------------------------admin end

//get single post
router.get('/single/:category/:id',(req,res)=>{
    let category=req.params.category;
    let id = req.params.id;
    Post.find({_id:req.params.id},function (err, posts) {
        if (err) return res.status(500).json({
            error: 'Internal Server Error',
            code:500
        });
        if (!posts) return res.status(404).json({
            error: "NO RESOURCE",
            code: 404
        });
        res.json(posts);
    })

})
//get category post
router.get('/list/:category',(req,res)=>{
    let category=req.params.category;
    if(category==='home'){
        Post.find({},{"body":false})
            .sort({"_id": -1})
            .limit(6)
            .exec((err, posts) => {
                if (err) return res.status(500).json({
                    error: 'Internal Server Error',
                    code:500
                });
                if (!posts) return res.status(404).json({
                    error: "NO RESOURCE",
                    code: 404
                });
                Post.count({}, function(err, c) {
                    res.json({
                        posts,
                        count:c
                    });
                });
                
            });
    }else if(category==='motionlab' || category==='projects' || category==='review'){
        Post.find({category:category},{"body":false}) 
        .sort({"_id": -1})
        .limit(6)
        .exec((err, posts) => {
            if (err) return res.status(500).json({
                error: 'Internal Server Error',
                code:500
            });
            Post.count({category:category}, function(err, c) {
                res.json({
                    posts,
                    count:c
                });
            });
        });
        
    }else{
        return res.status(404).json({
            error: "NO RESOURCE",
            code: 404
        })
    }
})
//load old posts
router.get('/category/:category/:listType/:id', (req, res) => {
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
    if(category === 'home') {
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
// CREATE POST
router.post('/', function (req, res) {
    var post = new Post();
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined'
    || req.session.passport.user.email!=="joomation@gmail.com"
    ) {
        return res.status(403).json({
            error: "NOT ADMIN LOGGED IN",
            code: 403
        });
    }
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
// WRITE COMMENTS
router.post('/comments/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 400
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 403
        });
    }
     Post.findById(req.params.id, function (err, post) {
        if (err) return res.status(500).json({
            error: 'database fail'
        });
        if (!post) return res.status(404).json({
            error: 'post not found'
        });
        post.comments.unshift(req.body.comments);
        post.save(function (err) {
            if (err) {
                console.error(err);
                res.json({
                    code: 0
                });
                return;
            }

            res.json(post);
        });
    });
    
});
// DELETE COMMENTS
router.delete('/comments/:id/:index', (req, res) => {  
    //CHECK LOGIN STATUS
    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 403
        });
    }
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 400
        });
    }
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 404
            });
        }    
        post.comments.splice(req.params.index, 1);
        // SAVE THE POST
        post.save((err, post) => {
            if(err) throw err;
            res.json(post);
        });
    });
});
// GIVE STAR
router.post('/star/:id', (req, res) => {
    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 400
        });
    }

    // CHECK LOGIN STATUS

    if(typeof req.session.passport=== 'undefined'||typeof req.session.passport.user=== 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 403
        });
    }

    // POST POST
    Post.findById(req.params.id, (err, post) => {
        if(err) throw err;

        // POST DOES NOT EXIST
        if(!post) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 404
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

        // SAVE THE POST
        post.save((err, post) => {
            if(err) throw err;
            res.json({
                'has_starred': !hasStarred,
                post,
            });
        });
    });
});
// SEARCH POSTS
router.get('/main/search/posts/:searchKeyword', function (req, res) {
    let searchValue=req.params.searchKeyword;
    Post.find({$text:{$search: searchValue}})
        .sort({_id: -1})
        .exec((err, posts) => {
            if(err) throw err;
            return res.json({posts});
        });
});
// SEARCH POSTS tags
router.get('/main/search/tags/:tagsname', function (req, res) {
    let searchValue=req.params.tagsname;
    var re = '^'+searchValue;
    Post.find({tags:{$regex: re, $options: 'i' }})
    .sort({_id: -1})
    .exec((err, posts) => {
        if(err) throw err;
        return res.json({posts});
    });
});
router.get('/main/search/tags',(req, res)=> {
    res.json({
        posts:[]
    });
});

module.exports = router;