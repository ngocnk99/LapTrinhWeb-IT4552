const postController = require('../controllers/postControllers')

module.exports = function(app) {
    //Get All Posts
    app.get('/post', postController.getAllPost);
    //Get Post by Employer
    app.post('/post/employer', postController.getPostByEmployer);
    //Get Post by User
    app.post('/post/user', postController.getPostByUser);
    //Get one Posts
    app.get('/post/:postId', postController.getOnePost);
    //Edit Posts
    app.post('/post/:postId/edit', postController.editPost);
    //Add Post
    app.post('/post/creat', postController.createPost);
    //Delete Post
    app.get('/post/:id/delete', postController.deletePost);
    //Acees Post
    app.get('/post/:id/access', postController.accessPost);
    //Restore Post
    app.get('/post/:id/restore', postController.restorePost);
    //watched Notify
    app.post('/post/:id/watched', postController.watchedNotify);
    app.post('/post/:id/apply', postController.apply);
    app.post('/post/:id/accesApply', postController.accesApply);
    app.post('/post/:id/refuseApply', postController.refuseApply);
    app.post('/post/:id/watchNotifyApply', postController.watchNotifyApply);
};