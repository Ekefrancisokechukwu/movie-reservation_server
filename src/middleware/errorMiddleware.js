const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);

  const customError = {
    message: err.message || "Something went wrong",
    statusCode: err.statusCode || 500,
  };

  res.status(customError.statusCode).json({ messsage: customError.message });
};

module.exports = errorHandlerMiddleware;
