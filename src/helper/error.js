const { StatusCodes } = require('http-status-codes');

const apiErrorCodes = {
  USER_EXIST: 'USER_EXIST',
};
const apiErrorCodesDetails = {
  [apiErrorCodes.USER_EXIST]: {
    message: 'The user exists',
    httpCode: StatusCodes.BAD_REQUEST,
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
