const express = require('express');
const router = express.Router();
const refreshtoken = require('../controllers/refreshtoken');

router.get('/',refreshtoken.handlerefreshtoken);

module.exports = router;