const { StatusCodes } = require('http-status-codes');

const apiErrorCodes = {
  USER_EXIST: 'USER_EXIST',
  USER_NOT_EXIST: 'USER_NO_EXIST',
  AUTHENTICATE_ERROR: 'AUTHENTICATE_ERROR',
  AUTHORIZE_ERROR: 'AUTHORIZE_ERROR',
};
const apiErrorCodesDetails = {
  [apiErrorCodes.USER_EXIST]: {
    message: 'The user exists',
    httpCode: StatusCodes.BAD_REQUEST,
  },
  [apiErrorCodes.USER_NOT_EXIST]: {
    message: 'The user does not exists',
    httpCode: StatusCodes.NOT_FOUND,
  },
  [apiErrorCodes.AUTHENTICATE_ERROR]: {
    message: 'The credential info is not valid',
    httpCode: StatusCodes.UNAUTHORIZED,
  },
  [apiErrorCodes.AUTHORIZE_ERROR]: {
    message: 'Not authorized',
    httpCode: StatusCodes.FORBIDDEN,
  },
};

class ApiError extends Error {
  constructor(errorCodes) {
    const details = apiErrorCodesDetails[errorCodes];
    super(details.message);
    this.name = errorCodes;
    this.httpCode = details.httpCode;
  }
}

module.exports = {
  apiErrorCodes,
  apiErrorCodesDetails,
  ApiError,
};
