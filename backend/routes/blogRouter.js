const express = require('express');

const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/blog',
  authController.requireSignin,
  authController.adminMiddleware,
  blogController.create
);

module.exports = router;
