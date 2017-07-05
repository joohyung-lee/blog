var express = require('express');
var router = express.Router();

var auth = require('./auth');
var motionlab = require('./motionlab');

router.use('/auth',auth);
router.use('/api/motionlab',motionlab);

module.exports = router;