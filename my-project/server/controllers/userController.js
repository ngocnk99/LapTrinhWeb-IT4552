const User = require('../database/models/User');
const jwt = require('jsonwebtoken')
const config = require('../config/config');
const { getMaxListeners } = require('../database/models/User');
const bcrypt = require('bcrypt')


function jwtSignUser(user) {
    const ONE_DAY = 60 * 60 * 24
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    })

}

module.exports = {
    getAllUser(req, res, next) {
        User.find({})
            .then(posts => {
                res.json(posts)
            })
            .catch(error => next(error))
    },

    async register(req, res) {
        try {
            const user = await new User(req.body);
            await user.save();
            res.send(user.toJSON())
            console.log(user.toJSON())
        } catch (err) {
            console.log('This email is already use ')
                // console.log(err)
            res.status(400).send({
                error: 'This email is already use'
            })
        }
    },

    async login(req, res) {
        try {
            console.log('login', req.body)
            const { email, password } = req.body;
            const user = await User.findOne({ email: email })
            if (!user) {
                console.log('khong tim thay email');
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            } else {
                user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;
                    console.log(isMatch);
                    if (!isMatch) {
                        console.log('sai mat khau');
                        return res.status(403).send({
                            error: 'Wrong password2'
                        })
                    } else {
                        const userJson = user.toJSON()
                        res.send({
                            user: userJson,
                            token: jwtSignUser(userJson)
                        })
                        console.log({
                            user: userJson,
                            token: jwtSignUser(userJson)
                        })
                    }
                });
            }


        } catch (err) {
            console.log('An error has occured trying to log in')
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    },

    async edit(req, res) {
        console.log(req.body.password)
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            req.body.password = hash
            console.log(req.body.password)
            User.updateOne({ email: 'ngocnk999@gmail.com' }, { email: 'ngocnk999@gmail.com', password: req.body.password })
                .then((user) => console.log(user));
        });

    }
}