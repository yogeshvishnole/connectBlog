exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  res.status(200).json({
    status: 'success',
    user: req.profile,
  });
};
