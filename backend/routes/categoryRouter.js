const express = require('express');

const { categoryCreateValidator } = require('../validators/categoryValidator');
const { runValidation } = require('../validators');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

const {
  requireSignin,
  adminMiddleware,
} = require('../controllers/authController');

router
  .route('/category')
  .post(
    categoryCreateValidator,
    runValidation,
    requireSignin,
    adminMiddleware,
    categoryController.create
  )
  .get(categoryController.getAllCategories);

router
  .route('/category/:slug')
  .get(categoryController.getCategory)
  .delete(requireSignin, adminMiddleware, categoryController.deleteCategory);

module.exports = router;
