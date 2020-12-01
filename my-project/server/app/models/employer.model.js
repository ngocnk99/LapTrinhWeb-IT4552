const mongoose = require("mongoose");

const Employer = mongoose.model(
    "Employer",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
);

module.exports = Employer;