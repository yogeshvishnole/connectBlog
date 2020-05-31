exports.time = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      date: Date().toString(),
    },
  });
};
