const { StatusCodes } = require('http-status-codes');

const sendErr = (res, errMsg = '', errorCode = StatusCodes.INTERNAL_SERVER_ERROR) => {
  res.status(errorCode).json({ errMsg });
};

const sendByApiError = (res, apiError) => {
  sendErr(res, apiError.message, apiError.httpCode);
};

const send = (res, data) => {
  res.status(StatusCodes.OK).json({ data });
};
module.exports = {
  sendErr,
  sendByApiError,
  send,
};
