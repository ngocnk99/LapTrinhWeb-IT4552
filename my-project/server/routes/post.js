const express = require('express')
const Post = require('../database/models/Post');
const postController = require('../controllers/postControllers')

const router = express.Router();



//Get Posts
router.get('/', postController.getAllPost)

//Add Post
router.post('/', postController.createPost)


//Delete Post
router.get('/:id/delete', postController.deletePost)

module.exports = router;