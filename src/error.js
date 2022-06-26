const { StatusCodes } = require('http-status-codes');

const apiErrorCodes = {
  USER_NOT_EXIST: 'USER_NOT_EXIST',
};
const apiErrorCodesDetails = {
  [apiErrorCodes.USER_NOT_EXIST]: {
    message: 'User not exist',
    httpCodes: StatusCodes.BAD_REQUEST,
  },
};
class ApiError extends Error {
  constructor(errorCodes) {
    super(apiErrorCodesDetails[errorCodes]);
    this.name = errorCodes;
    this.code = this.name;
  }
}

module.exports = {
  apiErrorCodes,
  apiErrorCodesDetails,
  ApiError,
};
