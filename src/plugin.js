var cookieParser = Npm.require("cookie-parser");

Iron.Router.plugins.restAuth = function (router) {
    router.onBeforeAction(cookieParser(), {where: "server"});
    router.onBeforeAction(authMiddleware, {where: "server"});
};
