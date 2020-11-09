const express = require('express')
const User = require('../database/models/User');
const userController = require('../controllers/userController')
const userControllerPolicy = require('../policies/userControllerPolicy')

const router = express.Router();


router.get('/', userController.getAllUser)

//Get profile
router.get('/:id/profile', (req, res, next) => {
    console.log(req.params.id)
    User.findOne({ _id: req.params.id })
        .then(User => {
            res.json(User)
        })
        .catch(error => next(error))

})

//Singup
router.post('/register', userControllerPolicy.register, userController.register)

//signin
router.get('/signin', (req, res) => {
    console.log(req.params.id)
    Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).redirect('/post'));
})


module.exports = router;