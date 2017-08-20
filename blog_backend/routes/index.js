var express = require('express');
var router = express.Router();

var auth = require('./auth');
var post = require('./post');

router.use('/auth',auth);
router.use('/api/post',post);

module.exports = router;