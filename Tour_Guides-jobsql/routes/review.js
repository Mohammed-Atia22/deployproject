const express = require('express');
const router = express.Router();

const {
    createreview,
    getallreviews,
    getreview,
    updatereview,
    deletereview
} = require('../controllers/review')


router.route('/')
    .post(createreview)
    .get(getallreviews)
    

router.route('/:id')
    .get(getreview)
    .patch(updatereview)
    .delete(deletereview)


module.exports = router;

