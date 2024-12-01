function notFoundMiddleware(req, res) {
  res.status(404).json({ message: "Route does not exists!" });
}

module.exports = notFoundMiddleware;
