const express = require('express');

const tagController = require('../controllers/tagController');
const { createTagValidator } = require('../validators/tagValidator');
const { runValidation } = require('../validators');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/tag')
  .post(
    createTagValidator,
    runValidation,
    authController.requireSignin,
    authController.adminMiddleware,
    tagController.create
  )
  .get(tagController.getTags);

router
  .route('/tag/:slug')
  .get(tagController.getTag)
  .delete(tagController.deleteTag);

module.exports = router;
