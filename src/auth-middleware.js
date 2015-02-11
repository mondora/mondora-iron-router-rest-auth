authMiddleware = function (req, res, next) {
    // Get and hash the loginToken, which can be passed in two different ways
    var hashedLoginToken = Accounts._hashLoginToken(
        // - using a url parameter
        this.params.loginToken ||
        // - using a cookie
        this.request.cookies.loginToken ||
        ""
    );
    // Get the user
    var user = Meteor.users.findOne({
        "services.resume.loginTokens.hashedToken": hashedLoginToken
    });
    // Save the user to the request context
    this.user = user || null;
    this.userId = (user && user._id) || null;
    // Go on
    this.next();
};
