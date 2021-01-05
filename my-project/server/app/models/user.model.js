const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        jobs: Array,
        cv: String,
        name: String,
        academic: String,
        jobPosition: String,
        avatar: {
            type: String,
            default: 'https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/jobker%2Favatar%2Fava.jfif?alt=media&token=9490e0bb-fcce-422a-a7c1-59f4e6c9b613'
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = User;