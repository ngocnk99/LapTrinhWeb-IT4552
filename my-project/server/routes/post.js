const express = require('express')
const Post = require('../database/models/Post');
const postController = require('../controllers/postControllers')

const router = express.Router();



//Get All Posts
router.get('/', postController.getAllPost)

//Get one Posts
router.get('/:songId', postController.getOnePost)
    //Edit Posts
router.put('/:songId', postController.editPost)
    //Add Post
router.post('/', postController.createPost)


//Delete Post
router.get('/:id/delete', postController.deletePost)

module.exports = router;