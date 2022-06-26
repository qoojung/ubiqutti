const { ApiError } = require('../helper/error');
const asyncController = require('../helper/async-controller');
const apiResp = require('../helper/api-response');

const authService = require('../service/auth');

const login = async (req, res) => {
  try {
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
