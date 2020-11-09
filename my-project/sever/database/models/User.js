const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    author: ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    name: String,
    cv: String,
    avatar: String,
    apply: Array,
    yearOfBirth: Number,
    birth: {
        date: {
            type: Number,
            default: 1
        },
        month: {
            type: Number,
            default: 2
        },
        year: {
            type: Boolean,
            default: this.yearOfBirth
        }
    }
}, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true
});

module.exports = mongoose.model('User', User);