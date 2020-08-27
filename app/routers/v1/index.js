const express = require("express");

const smartKost = require("./smartKost");

const Router = express.Router();
Router.use("/smartKost", smartKost);

module.exports = Router;
