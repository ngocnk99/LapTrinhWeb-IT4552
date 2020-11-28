    const mongoose = require('mongoose')

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const Post = new Schema({
        author: ObjectId,
        text: String,
        title: String,
        yearOfBirth: Number,
    }, {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    });
    module.exports = mongoose.model('Post', Post);