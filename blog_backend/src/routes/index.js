import express from 'express';
import vidStreamer from 'vid-streamer';
import config from '../../config/config.json';
let router = express.Router();

let auth = require('./auth');
let post = require('./post');
let images = require('./images');

router.use('/auth',auth);
router.use('/api/post',post);
router.use('/api/images',images);
router.use('/api/videos', vidStreamer.settings(config.videos));
module.exports = router;