const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const asyncController = require('../helper/async-controller');
const apiResp = require('../helper/api-response');

const userService = require('../service/user');

const getUserList = async (req, res) => {
  if (req.query.fullname) {
    const users = await userService.getUserListByFullname(req.query.fullname);
    return apiResp.send(res, users);
  }
  const users = await userService.getAllUserList();
  return apiResp.send(res, users);
};
const getUser = async (req, res) => {
  const user = await userService.getUser(req.params.acct);
  if (!user) {
    return apiResp.sendErr(res, getReasonPhrase(StatusCodes.NOT_FOUND), StatusCodes.NOT_FOUND);
  }
  return apiResp.send(res, user);
};

module.exports = {
  getUserList: asyncController(getUserList),
  getUser: asyncController(getUser),
};
