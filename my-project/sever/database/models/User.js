const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const SALT_WORK_FACTOR = 10;

const User = new Schema({
    author: ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
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

User.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', User);