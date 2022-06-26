const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { ApiError } = require('../helper/error');
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

const addUser = async (req, res) => {
  try {
    await userService.addUser(req.body);
    return apiResp.send(res, {});
  } catch (e) {
    if (e instanceof ApiError) {
      return apiResp.sendByApiError(res, e);
    }
    throw e;
  }
};

const delUser = async (req, res) => {
  try {
    await userService.delUser(req.params.acct);
    return apiResp.send(res, {});
  } catch (e) {
    if (e instanceof ApiError) {
      return apiResp.sendByApiError(res, e);
    }
    throw e;
  }
};

module.exports = {
  getUserList: asyncController(getUserList),
  getUser: asyncController(getUser),
  addUser: asyncController(addUser),
  delUser: asyncController(delUser),
};
