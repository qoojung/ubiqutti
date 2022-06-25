const asyncController = require('../helper/async-controller');
const apiResp = require('../helper/api-response');

const userService = require('../service/user');

const getUserList = async (req, res) => {
  const users = await userService.getAllUserList();
  return apiResp.send(res, users);
};

module.exports = {
  getUserList: asyncController(getUserList),
};

