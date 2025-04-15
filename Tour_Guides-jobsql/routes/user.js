const express = require('express');
const router = express.Router();
const {register,login,updateuser,deleteuser} = require('../controllers/user')

router.post('/login',login)
router.post('/register',register)
router.patch('/:id',updateuser)
router.delete('/:id',deleteuser)

module.exports = router;