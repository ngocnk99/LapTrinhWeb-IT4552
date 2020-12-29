const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.employer = require("./employer.model");
db.admin = require("./admin.model")
db.role = require("./role.model");
db.post = require("./post.model")

db.ROLES = ["user", "admin", "employer"];

module.exports = db;