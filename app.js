const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
var passport = require("passport");
var crypto = require("crypto");
var routes = require("./routes");
const MongoStore = require("connect-mongo");
const connection = require("./config/database");
const mongoose = require("mongoose");
require("dotenv").config();

const url = "mongodb://localhost:27017/Auth";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session-id",
    store: MongoStore.create({
      mongoUrl: url,
      dbName: "Auth",
      collectionName: "sessions",
      crypto: {
        secret: "some secret",
      },
    }),
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,

      httpOnly: true,
    },
    secret: "some secret",
  })
);

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000);
