const slugify = require('slugify');

const Category = require('../models/categoryModel');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name } = req.body;

  const slug = slugify(name).toLowerCase();

  const category = new Category({ name, slug });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json(data);
  });
};

exports.getAllCategories = (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json(data);
  });
};

exports.getCategory = (req, res) => {
  const { slug } = req.params;

  Category.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.status(200).json(data);
  });
};

exports.deleteCategory = (req, res) => {
  const { slug } = req.params;

  Category.findOneAndRemove({ slug }).exec((err) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.status(200).json({
      message: 'category deleted successfully',
    });
  });
};
