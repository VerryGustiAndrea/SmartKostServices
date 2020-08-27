const express = require("express");
const Router = express.Router();

const iotController = require("../../controllers/iot/smartKost");

Router
  // .post('/login', ProductController.loginUser)

  .post("/insert", iotController.Insert);

module.exports = Router;
