const express = require("express");

const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogController.time);

module.exports = router;
