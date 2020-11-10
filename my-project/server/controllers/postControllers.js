const Post = require('../database/models/Post');

module.exports = {
    async createPost(req, res) {
        try {
            const post = new Post(req.body);
            await post.save();
            console.log('ok')
            res.status(201).send();
        } catch (err) {
            res.status(400).send({
                error: 'This email is already use'
            })
            console.log('err')
        }
    },
    getAllPost(req, res, next) {
        Post.find({})
            .then(posts => {
                res.json(posts)
            })
            .catch(error => next(error))
    },
    deletePost(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).redirect('/post'));
    }
}