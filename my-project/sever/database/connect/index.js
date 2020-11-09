const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Ngoc', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect succesfully!!!')
    } catch (error) {
        console.log('Connect Failure!!!');
    }
}

module.exports = { connect };