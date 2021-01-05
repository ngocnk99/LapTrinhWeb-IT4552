const config = require("../config/auth.config");
const db = require("../models");
const User = db.employer;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { employer } = require("../models");

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

                        res.send({ message: "Employer was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "employer" }, (err, role) => {
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

                    res.send({ message: "Employer was registered successfully!" });
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

exports.getAll = (req, res, next) => {
    User.find({})
        .limit(10)
        .then(employers => {
            res.json(employers)
        })
        .catch(error => next(error))
};


exports.getInfo = (req, res) => {
    let employerName = req.params.employerName
    if (employerName) {
        User.findOne({ username: employerName })
            .exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!user) {
                    return res.status(404).send({ message: "Employer Not found." });
                }

                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    companyName: user.companyName,
                    webLink: user.webLink,
                    address: user.address,
                    introduce: user.introduce,
                    banner: user.banner,
                    avatar: user.avatar,
                    posts: user.posts,
                    members: user.members,
                });
            })
    }
};

exports.editInfo = (req, res) => {
    User.updateOne({ username: req.params.employerName }, {
            companyName: req.body.companyName,
            webLink: req.body.webLink,
            address: req.body.address,
            introduce: req.body.introduce,
            banner: req.body.banner,
            avatar: req.body.avatar,
            posts: req.body.posts,
            members: req.body.members,
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

exports.search = (req, res, next) => {
    const keyword = req.query.keyword;
    if (keyword) {
        User.find({
                companyName: { $regex: keyword, $options: "i" },
                // title: { $regex: "", $options: "i" }
            })
            .then(employers => {
                res.json(employers)
            })
            .catch(error => next(error))
    } else {
        res.json([]);
    }
};