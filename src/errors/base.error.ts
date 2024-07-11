class BaseError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: string[]) {
        super(message)
        this.status = status
        this.errors = errors
    }

    public static UnauthorizedError(message: string, errors?: string) {
        return new BaseError(401, message, errors ? [errors] : [])
    }

    public static BadrequestError(message: string, errors?: string) {
        return new BaseError(400, message, errors ? [errors] : [])
    }
}

export default BaseError