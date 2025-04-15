const express = require('express');
const router = express.Router();

const {
    createrating,
    getallratings,
    getrating,
    updaterating,
    deleterating
} = require('../controllers/rating')


router.route('/')
    .post(createrating)
    .get(getallratings)
    

router.route('/:id')
    .get(getrating)
    .patch(updaterating)
    .delete(deleterating)


module.exports = router;

