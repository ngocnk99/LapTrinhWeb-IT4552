const express = require('express')
const User = require('../database/models/User');
const userController = require('../controllers/userController')
const userControllerPolicy = require('../policies/userControllerPolicy')

const router = express.Router();


router.get('/', userController.getAllUser)


//Singup
router.post('/register', userControllerPolicy.register, userController.register)

//signin
router.post('/login', userController.login)


module.exports = router;