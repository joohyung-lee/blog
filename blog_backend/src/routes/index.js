import express from 'express';
let router = express.Router();

let auth = require('./auth');
let post = require('./post');
let images = require('./images');

router.use('/auth',auth);
router.use('/api/post',post);
router.use('/api/images',images);
module.exports = router;