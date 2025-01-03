import CustomError from "./customError";
class UnAuthenticatedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}
module.exports = UnAuthenticatedError;
