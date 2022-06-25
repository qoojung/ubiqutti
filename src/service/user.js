const { User } = require('../model/db');

const getAllUserList = async () => {
  const users = await User.findAll(
    { attributes: ['acct'] }
  );
  return users;
};

module.exports = {
  getAllUserList,
};
