const mongoose = require("mongoose");

const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        jobs: Array,
        cv: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = Admin;