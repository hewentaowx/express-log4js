const express = require('express');
const router = express.Router();
const logger = require('../config/logConfig').info();

/* GET home page. */
router.get('/', function(req, res, next) {
	logger.info('hello');
	res.render('index', { title: 'Express' });
});

module.exports = router;
