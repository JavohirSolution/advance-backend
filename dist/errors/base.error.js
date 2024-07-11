"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError(message, errors) {
        return new BaseError(401, message, errors ? [errors] : []);
    }
    static BadrequestError(message, errors) {
        return new BaseError(400, message, errors ? [errors] : []);
    }
}
exports.default = BaseError;
