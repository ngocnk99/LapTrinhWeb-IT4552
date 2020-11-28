const Post = require('../database/models/Post');
const { ObjectId } = require('mongodb');

module.exports = {
    async createPost(req, res) {
        try {
            const post = new Post(req.body.song);
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
        const search = req.query.search
        console.log(search)
        if (search) {
            Post.find({
                    text: { $regex: search, $options: "i" },
                    // title: { $regex: "", $options: "i" }
                })
                .limit(10)
                .then(posts => {
                    res.json(posts)
                })
                .catch(error => next(error))
        } else {
            Post.find({})
                .limit(10)
                .then(posts => {
                    res.json(posts)
                })
                .catch(error => next(error))
        }
    },
    getOnePost(req, res, next) {
        Post.findById(ObjectId(req.params.songId))
            .then(post => {
                return res.json(post);
            })
            .catch(error => next(error))
    },
    editPost(req, res, next) {
        console.log(req.body)
        Post.updateOne({ _id: req.params.songId }, req.body)
            .then(() => res.send(this.body))
            .catch(error => console.log(error))
    },
    deletePost(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).redirect('/post'));
    }
}