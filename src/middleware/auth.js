const authService = require('../service/auth');
const asyncController = require('../helper/async-controller');
const apiResp = require('../helper/api-response');
const { apiErrorCodes, apiErrorCodesDetails } = require('../helper/error');

module.exports = asyncController(
  async (req, res, next) => {
    const authorizeError = apiErrorCodesDetails[apiErrorCodes.AUTHORIZE_ERROR];
    const authHeader = req.get('Authorization') || '';
    const splittokens = authHeader.split(' ');
    if (splittokens.length < 2 || splittokens[0] !== 'Bearer') {
      return apiResp.sendErr(res, authorizeError.message, authorizeError.httpCode);
    }
    const token = splittokens[1];
    if (!token) {
      return apiResp.sendErr(res, authorizeError.message, authorizeError.httpCode);
    }
    try {
      await authService.checkPriviledges(token);
      return next();
    } catch (e) {
      return apiResp.sendErr(res, authorizeError.message, authorizeError.httpCode);
    }
  },
);
