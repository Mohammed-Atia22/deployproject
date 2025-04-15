const express = require('express');
const router = express.Router();
const {
    searchcountry,
    searchcity
} = require('../controllers/search')



router.route('/')
    .get(searchcountry)

router.route('/city')
    .get(searchcity)


module.exports = router;