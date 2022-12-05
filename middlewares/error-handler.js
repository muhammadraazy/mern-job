import { StatusCodes } from "http-status-codes"

export const errorHandler = (err, req, res, next) => {

    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'something went wrong, try again later'
    }

    if(err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // defaultError.message = err.message
        defaultError.message = Object.values(err.errors).map(item => item.message).join(",")
    }

    if(err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = `${Object.keys(err.keyValue)} has to be unique`
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.message })
}