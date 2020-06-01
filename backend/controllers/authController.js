const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/userModel');

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        status: 'error',
        error: 'Email is taken',
      });
    }
    const { name, email, password } = req.body;
    const username = shortId.generate();
    const profile = `${process.env.CLIENT_URL}/profile/${username}`;

    const newUser = new User({ name, email, password, profile, username });
    newUser.save((error) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          error: error,
        });
      }
      res.status(201).json({
        status: 'success',
        message: 'Sign up succes ! Please sign in',
      });
    });
  });
};

exports.signin = (req, res) => {
  const { password } = req.body;

  // if user exists

  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        status: 'error',
        error: 'Incorrect email or password',
      });
    }

    // authenticate user

    if (!user.authenticate(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Incorrect email or password',
      });
    }

    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, { expiresIn: '1d' });

    const { _id, username, email, name, role } = user;

    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user: { _id, username, email, name, role },
      },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('token');
  res.json({
    status: 'success',
    message: 'Signout successful',
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});
