const postController = require('../controllers/postControllers')

module.exports = function(app) {
    //Get All Posts
    app.get('/post', postController.getAllPost);
    //Get one Posts
    app.get('/post/:postId', postController.getOnePost);
    //Edit Posts
    app.put('/post/:postId', postController.editPost);
    //Add Post
    app.post('/post', postController.createPost);
    //Delete Post
    app.get('/post/:id/delete', postController.deletePost)
};