Package.describe({
    name: "mondora:iron-router-rest-auth",
    summary: "IronRouter plugin to (optionally) authenticate server routes",
    version: "0.1.1",
    git: "https://github.com/mondora/mondora-iron-router-rest-auth.git"
});

Package.onUse(function (api) {
    // Supported Meteor versions
    api.versionsFrom("METEOR@0.9.0");
    // Dependencies
    api.use("iron:router@1.0.5");
    // Package files
    api.addFiles([
        "src/auth-middleware.js",
        "src/plugin.js"
    ], "server");
});

Package.onTest(function (api) {
    // Test dependencies
    api.use("tinytest");
    // Package files
    api.addFiles([
        "src/auth-middleware.js"
    ], "server");
    // Test files
    api.addFiles([
        "test/auth-middleware.unit.js"
    ], "server");
});

Npm.depends({
    "cookie-parser": "1.3.3",
    "sinon": "1.12.2"
});
