const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find({
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
            username: req.body.username
        })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};

exports.getInfo = (req, res) => {
    let userName = req.params.userName
    if (userName) {
        User.findOne({ username: userName })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "Employer Not found." });
                }

                res.status(200).send({
                    name: user.name,
                    id: user._id,
                    cv: user.cv,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar,
                    jobs: user.jobs,
                    academic: user.academic,
                    jobPosition: user.jobPosition
                });
            })
    }
};

exports.editInfo = (req, res) => {
    console.log(req.body)
    User.updateOne({ username: req.params.userName }, {
            name: req.body.name,
            avatar: req.body.avatar,
            jobPosition: req.body.jobPosition,
            cv: req.body.cv,
            academic: req.body.academic,
        })
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
};

exports.apply = (req, res) => {
    console.log('authcontroler')
    console.log(req.body)
    User.findOne({ username: req.params.userName })
        .then((user) => {
            let found = user.jobs.find((item) => item.id == req.body.postId)
            if (user.jobs.length == 0 || !found) {
                user.jobs.push({
                    id: req.body.postId,
                    status: 0,
                    notify: 0,
                })
            } else {
                user.jobs = user.jobs.map((item) => {
                    if (item.id == req.body.postId) {
                        item.status = 0;
                        item.notify = 0;
                    }
                    return item;
                });
            }
            return user.jobs
        }).then((jobs) => {
            User.updateOne({ username: req.params.userName }, { jobs: jobs })
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
};

exports.accesApply = (req, res) => {
    User.findOne({ username: req.params.userName })
        .then((user) => {
            user.jobs = user.jobs.map((item) => {
                if (item.id == req.body.postId) {
                    item.status = 1;
                    item.notify = 1
                }
                return item;
            });
            return user.jobs
        }).then((jobs) => {
            User.updateOne({ username: req.params.userName }, { jobs: jobs })
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
};

exports.refuseApply = (req, res) => {
    User.findOne({ username: req.params.userName })
        .then((user) => {
            user.jobs = user.jobs.map((item) => {
                if (item.id == req.body.postId) {
                    item.status = 2;
                    item.notify = 1
                }
                return item;
            });
            return user.jobs
        }).then((jobs) => {
            User.updateOne({ username: req.params.userName }, { jobs: jobs })
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
};

exports.watchNotifyApply = (req, res) => {
    console.log(req.body)
    User.findOne({ username: req.params.userName })
        .then((user) => {
            user.jobs = user.jobs.map((item) => {
                if (item.id == req.body.postId) {
                    item.notify = 0
                }
                return item;
            });
            return user.jobs
        }).then((jobs) => {
            User.updateOne({ username: req.params.userName }, { jobs: jobs })
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
};