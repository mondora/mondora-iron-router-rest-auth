[![Build Status](https://travis-ci.org/mondora/mondora-iron-router-rest-auth.svg?branch=master)](https://travis-ci.org/mondora/mondora-iron-router-rest-auth)
#mondora:iron-router-rest-auth

IronRouter plugin to (optionally) authenticate server routes.

## Install

```sh
meteor add mondora:iron-router-rest-auth
```

## How to


First, in your app somewhere you tell Iron Router to use the plugin:

```js
Router.plugin("restAuth");
```

Then you set up an HTTP route with Iron Router:

```js
Router.route("/my-route", {where: "server"})
    .get(function () {
	// this.user is either null or a user object
	// this.userId is either null or the user's _id
    });
```

