const { User } = require('../model/db');

const getAllUserList = async () => {
  const users = await User.findAll(
    { attributes: ['acct'] },
  );
  return users;
};

const getUserListByFullname = async (fullname) => {
  const users = await User.findAll(
    {
      attributes: ['acct'],
      where: { fullname },
    },
  );
  return users;
};

module.exports = {
  getAllUserList,
  getUserListByFullname,
};
