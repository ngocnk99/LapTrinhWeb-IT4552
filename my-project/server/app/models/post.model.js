const mongoose = require('mongoose')

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title: String,
        companyName: String,
        employerId: mongoose.Schema.Types.ObjectId,
        employerName: String,
        avatar: String,
        address: String,
        career: String,
        dateline: String,
        numberOfPeople: String,
        formOfWork: String,
        experience: String,
        salary: String,
        sex: String,
        introduce: Array,
        request: Array,
        benefitsEnjoyed: Array,
        status: {
            type: Number,
            default: 0,
        },
        notiStatus: {
            type: Number,
            default: 0,
        }
    }, {
        // Make Mongoose use Unix time (seconds since Jan 1, 1970)
        timestamps: true
    })
);
module.exports = Post;