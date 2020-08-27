require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT;

app.use("/uploads", express.static("./uploads"));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./app/routers/v1/index.js");

app.use("/api", router);

app.listen(port, () => {
  console.log(`\n App Listen port ${port}`);
});
