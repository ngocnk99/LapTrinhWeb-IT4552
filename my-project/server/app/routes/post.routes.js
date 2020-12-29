const postController = require('../controllers/postControllers')

module.exports = function(app) {
    //Get All Posts
    app.get('/post', postController.getAllPost);
    //Get Post by Employer
    app.post('/post/employer', postController.getPostByEmployer);
    //Get one Posts
    app.get('/post/:postId', postController.getOnePost);
    //Edit Posts
    app.post('/post/:postId/edit', postController.editPost);
    //Add Post
    app.post('/post/creat', postController.createPost);
    //Delete Post
    app.get('/post/:id/delete', postController.deletePost)
};