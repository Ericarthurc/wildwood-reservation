const authentication = async (req, res, next) => {
  res.status(404).json({ success: false, message: 'Requires authentication' });
  //   next();
};

module.exports = authentication;
