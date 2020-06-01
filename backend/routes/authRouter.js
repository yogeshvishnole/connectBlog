const express = require('express');

const authController = require('../controllers/authController');
const { runValidation } = require('../validators');
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/authValidator');

const router = express.Router();

router.post(
  '/signup',
  userSignupValidator,
  runValidation,
  authController.signup
);

router.post(
  '/signin',
  userSigninValidator,
  runValidation,
  authController.signin
);

router.get('/signout', authController.signout);

module.exports = router;
