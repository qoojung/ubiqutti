const { StatusCodes } = require('http-status-codes');
const { ApiError } = require('../helper/error');
const asyncController = require('../helper/async-controller');
const apiResp = require('../helper/api-response');
const { key } = require('../schema/schema');
const validator = require('../helper/validator');
const authService = require('../service/auth');

const login = async (req, res) => {
  try {
    const validate = validator.getSchema(key.login);
    if (!validate(req.body)) {
      return apiResp.sendErr(res, validator.errorsText(validate.errors), StatusCodes.BAD_REQUEST);
    }
    const token = await authService.login(req.body);
    return apiResp.send(res, { token });
  } catch (e) {
    if (e instanceof ApiError) {
      return apiResp.sendByApiError(res, e);
    }
    throw e;
  }
};

module.exports = {
  login: asyncController(login),
};
