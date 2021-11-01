const express = require("express");
const productController = require("./controller.js");

const router = express.Router();

router.get("/", productController.greeting);

module.exports = router;
