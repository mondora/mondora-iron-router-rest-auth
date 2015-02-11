authMiddleware = function (req, res, next) {
    // Get the loginToken, which can be passed in two different ways
    var loginToken = (
        // - using a url parameter
        (this.params && this.params.query && this.params.query.loginToken) ||
        // - using a cookie
        (this.request && this.request.cookies && this.request.cookies.loginToken)
    );
    // If the login token is not present, go on doing nothing
    if (!Match.test(loginToken, String)) {
        this.next();
        return;
    }
    // Hash the login token, as meteor stores it hashed in the database
    var hashedLoginToken = Accounts._hashLoginToken(loginToken);
    // Possibly get the user
    var user = Meteor.users.findOne({
        "services.resume.loginTokens.hashedToken": hashedLoginToken
    });
    // Save the user to the request context
    this.user = user || null;
    this.userId = (user && user._id) || null;
    // Go on
    this.next();
};
