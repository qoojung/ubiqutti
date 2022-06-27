const { StatusCodes } = require('http-status-codes');

const sendErr = (res, errMsg = '', errorCode = StatusCodes.INTERNAL_SERVER_ERROR) => {
  res.status(errorCode).json({ errMsg });
};

const sendByApiError = (res, apiError) => {
  sendErr(res, apiError.message, apiError.httpCode);
};

const send = (res, data, metadata) => {
  const resData = { data };
  if (metadata) {
    resData.metadata = metadata;
  }
  res.status(StatusCodes.OK).json(resData);
};
module.exports = {
  sendErr,
  sendByApiError,
  send,
};
