const mongoose = require('mongoose')

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        text: String,
        title: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    }, {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    })
);
module.exports = Post;