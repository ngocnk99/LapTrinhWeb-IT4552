const User = require('../database/models/User');

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
            console.log('This email is already use')
            res.status(400).send({
                error: 'This email is already use'
            })
        }
    },
}