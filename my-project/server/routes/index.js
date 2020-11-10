const userRouter = require('./user')
const postRouter = require('./post')

function routes(app) {
    app.use('/user', userRouter);
    app.use('/post', postRouter);

}

module.exports = routes;