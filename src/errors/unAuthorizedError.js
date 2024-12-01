const CustomError = require("./customError");

class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = UnAuthorizedError;
