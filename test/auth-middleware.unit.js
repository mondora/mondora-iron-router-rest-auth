var sinon = Npm.require("sinon");

Tinytest.add("auth-middleware - loginToken - from params", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return {_id: "userId"};
        })
    };
    // TEST
    var context = {
        params: {
            loginToken: "loginTokenFromParams"
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.isTrue(Accounts._hashLoginToken.calledWith("loginTokenFromParams"));
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});

Tinytest.add("auth-middleware - loginToken - from cookies", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return {_id: "userId"};
        })
    };
    // TEST
    var context = {
        params: {},
        request: {
            cookies: {
                loginToken: "loginTokenFromCookies"
            }
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.isTrue(Accounts._hashLoginToken.calledWith("loginTokenFromCookies"));
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});

Tinytest.add("auth-middleware - loginToken - defaults to empty string", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return {_id: "userId"};
        })
    };
    // TEST
    var context = {
        params: {},
        request: {
            cookies: {}
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.isTrue(Accounts._hashLoginToken.calledWith(""));
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});

Tinytest.add("auth-middleware - auth - if auth succeeds adds user and userId to the request", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return {_id: "userId"};
        })
    };
    // TEST
    var context = {
        params: {},
        request: {
            cookies: {}
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.equal(context.user, {
        _id: "userId"
    });
    test.equal(context.userId, "userId");
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});

Tinytest.add("auth-middleware - auth - if auth fails doesn't add user and userId to the request", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return undefined;
        })
    };
    // TEST
    var context = {
        params: {},
        request: {
            cookies: {}
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.equal(context.user, null);
    test.equal(context.userId, null);
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});

Tinytest.add("auth-middleware - middleware - continues the request", function (test) {
    // BEFORE
    Accounts = {
        _hashLoginToken: sinon.spy()
    };
    Meteor.users = {
        findOne: sinon.spy(function () {
            return undefined;
        })
    };
    // TEST
    var context = {
        params: {},
        request: {
            cookies: {}
        },
        next: sinon.spy()
    };
    authMiddleware.call(context);
    test.isTrue(context.next.called);
    // AFTER
    Accounts._hashLoginToken = null;
    Meteor.users = null;
});
