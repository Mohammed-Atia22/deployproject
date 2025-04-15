const express = require('express');
const router = express.Router();

const {
    createjob,
    getalljobs,
    getjob,
    updatejob,
    deletejob
} = require('../controllers/job')


router.route('/')
    .post(createjob)
    .get(getalljobs)
    

router.route('/:id')
    .get(getjob)
    .patch(updatejob)
    .delete(deletejob)


module.exports = router;

