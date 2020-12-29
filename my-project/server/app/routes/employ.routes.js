const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/employ.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/employer/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.get("/api/employer", controller.getAll);
    app.post("/api/employer/signin", controller.signin);
    app.get("/api/employer/search", controller.search);
    app.get("/api/employer/:employerName", controller.getInfo);
    app.post("/api/employer/:employerName/edit", controller.editInfo);

};