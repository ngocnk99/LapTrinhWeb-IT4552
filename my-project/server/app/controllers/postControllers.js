const db = require("../models");
const Post = db.post;
const Employer = db.employer;
const { ObjectId } = require('mongodb');

module.exports = {
    async createPost(req, res) {
        try {
            const post = new Post(req.body.post);
            await post.save(function(err, post) {
                Employer.updateOne({ _id: req.body.post.employerId }, { "$push": { "posts": post.id } },
                    function(err, raw) {
                        if (err) return handleError(err);
                        console.log('The raw response from Mongo was ', raw);
                    })
            });
            res.status(201).send();
        } catch (err) {
            res.status(400).send({
                error: 'Can not create post'
            })
        }
    },
    getAllPost(req, res, next) {
        const search = req.query.keyword
        const address = req.query.address;
        console.log(req.query)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (search) {
            if (!address) {
                Post.find({
                        'title': { $regex: search, $options: "i" }
                    })
                    .then(posts1 => {
                        Post.find({
                                'career': { $regex: search, $options: "i" }

                            })
                            .then(posts2 => {
                                console.log([posts1, posts2])
                                res.json([posts1, posts2])
                            })
                    })
                    .catch(error => next(error))
            } else {
                Post.find({
                        'title': { $regex: search, $options: "i" },
                        'address': { $regex: address, $options: "i" }
                    })
                    .then(posts1 => {
                        Post.find({
                                'career': { $regex: search, $options: "i" },
                                'address': { $regex: address, $options: "i" }

                            })
                            .then(posts2 => {
                                console.log([posts1, posts2])
                                res.json([posts1, posts2])
                            })
                    })
                    .catch(error => next(error))
            }
        } else {
            Post.find({})
                .limit(20)
                .then(posts => {
                    res.json(posts)
                })
                .catch(error => next(error))
        }
    },
    getPostByEmployer(req, res, next) {
        Post.find({ employerId: req.body.employerId })
            .then(posts => {
                return res.json(posts);
            })
            .catch(error => next(error))
    },
    getOnePost(req, res, next) {
        Post.find(ObjectId(req.params.postId))
            .then(post => {
                return res.json(post);
            })
            .catch(error => next(error))
    },
    editPost(req, res, next) {
        Post.updateOne({ _id: req.params.postId }, req.body)
            .then(() => res.send(this.body))
            .catch(error => console.log('err edit'))
    },
    deletePost(req, res, next) {
        Post.f
        console.log("delete");
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).redirect('/post'));
    }
}