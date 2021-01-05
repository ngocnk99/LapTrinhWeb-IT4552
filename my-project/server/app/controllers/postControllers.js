const db = require("../models");
const Post = db.post;
const Employer = db.employer;
const { ObjectId } = require('mongodb');

module.exports = {
    async createPost(req, res) {
        try {
            const post = new Post(req.body.post);
            post.status = { status: 0, notify: 0 };
            await post.save(function(err, post) {
                Employer.updateOne({ _id: req.body.post.employerId }, { "$push": { "posts": post.id } },
                    function(err, raw) {
                        if (err) return handleError(err);
                        console.log('The raw response from Mongo was ', raw);
                    })
                res.status(201).send({ jobId: post.id });
            });
        } catch (err) {
            res.status(400).send({
                error: 'Can not create post'
            })
        }
    },
    getAllPost(req, res, next) {
        const search = req.query.keyword
        const address = req.query.address;
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
                                res.json([posts1, posts2])
                            })
                    })
                    .catch(error => next(error))
            }
        }
        if (!search && address) {
            Post.find({
                    'address': { $regex: address, $options: "i" }
                })
                .then(posts1 => {
                    Post.find({
                            'address': { $regex: address, $options: "i" }
                        })
                        .then(posts2 => {
                            res.json([posts1, posts2])
                        })
                })
                .catch(error => next(error))
        }
        if (!search && !address) {
            Post.find({})
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
    getPostByUser(req, res, next) {
        Post.find({ _id: req.body.id })
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
        const post = req.body
        post.status = { status: 0, notify: 0 };
        Post.updateOne({ _id: req.params.postId }, post)
            .then(() => res.send(this.body))
            .catch(error => console.log('err edit'))
    },
    deletePost(req, res, next) {
        Post.updateOne({ _id: req.params.id }, { status: { status: 2, notify: 1 } })
            .then(() => res.send(this.body))
            .catch(error => console.log('err delete'))
    },
    accessPost(req, res, next) {
        Post.updateOne({ _id: req.params.id }, { status: { status: 1, notify: 1 } })
            .then(() => res.send(this.body))
            .catch(error => console.log('err acces'))
    },
    restorePost(req, res, next) {
        Post.updateOne({ _id: req.params.id }, { status: { status: 0, notify: 1 } })
            .then(() => res.send(this.body))
            .catch(error => console.log('err restore'))
    },
    watchedNotify(req, res, next) {
        Post.updateOne({ _id: req.params.id }, { status: { status: req.body.status, notify: 0 } })
            .then(() => res.send(this.body))
            .catch(error => console.log('err restore'))
    },
    apply(req, res, next) {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                let found = post.jobkers.find((item) => item.username == req.body.username)
                if (post.jobkers.length == 0 || !found) {
                    post.jobkers.push({
                        username: req.body.username,
                        status: 0,
                        notify: 1,
                    })
                } else {
                    post.jobkers = post.jobkers.map((item) => {
                        if (item.username == req.body.username) {
                            item.status = 0;
                            item.notify = 1;
                        }
                        return item;
                    });
                }
                return post.jobkers
            }).then((jobkers) => {
                Post.updateOne({ _id: req.params.id }, { jobkers: jobkers })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if (!user) {
                            return res.status(404).send({ message: "Cannot edit info" });
                        }
                        res.status(200).send({ message: "information is successfully edited" });
                    })
            })


    },
    accesApply(req, res, next) {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                post.jobkers = post.jobkers.map((item) => {
                    if (item.username == req.body.username) {
                        item.status = 1;
                        item.notify = 0;
                    }
                    return item;
                });
                return post.jobkers
            }).then((jobkers) => {
                Post.updateOne({ _id: req.params.id }, { jobkers: jobkers })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if (!user) {
                            return res.status(404).send({ message: "Cannot edit info" });
                        }
                        res.status(200).send({ message: "information is successfully edited" });
                    })
            })


    },
    refuseApply(req, res, next) {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                post.jobkers = post.jobkers.map((item) => {
                    if (item.username == req.body.username) {
                        item.status = 2;
                        item.notify = 0;
                    }
                    return item;
                });
                return post.jobkers
            }).then((jobkers) => {
                Post.updateOne({ _id: req.params.id }, { jobkers: jobkers })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if (!user) {
                            return res.status(404).send({ message: "Cannot edit info" });
                        }
                        res.status(200).send({ message: "information is successfully edited" });
                    })
            })
    },
    watchNotifyApply(req, res, next) {
        Post.findOne({ _id: req.params.id })
            .then((post) => {
                post.jobkers = post.jobkers.map((item) => {
                    if (item.username == req.body.username) {
                        item.notify = 0;
                    }
                    return item;
                });
                return post.jobkers
            }).then((jobkers) => {
                Post.updateOne({ _id: req.params.id }, { jobkers: jobkers })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        if (!user) {
                            return res.status(404).send({ message: "Cannot edit info" });
                        }
                        res.status(200).send({ message: "information is successfully edited" });
                    })
            })
    },
}