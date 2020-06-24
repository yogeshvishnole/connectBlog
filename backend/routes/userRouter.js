const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get(
  '/profile',
  authController.requireSignin,
  authController.authMiddleware,
  userController.read
);

module.exports = router;
