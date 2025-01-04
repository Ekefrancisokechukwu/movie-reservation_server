"use strict";
const CustomError = require("./customError");
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}
module.exports = NotFoundError;