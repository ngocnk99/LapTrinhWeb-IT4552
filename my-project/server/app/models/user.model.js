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
            default: 'https://firebasestorage.googleapis.com/v0/b/laptrinhweb-4dbf0.appspot.com/o/jobker%2Favatar%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.jfif?alt=media&token=1c6d110d-a2fe-4ed1-a4b1-6919aa4deedc'
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = User;