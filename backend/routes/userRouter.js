const express = require("express");

const authController = require("../controllers/authController")
const userController = require("../controllers/userController")

const router = express.Router();

router.use(authController.requireSignin,authController.authMiddleware)

router.get("/profile",userController.read)

module.exports = router;