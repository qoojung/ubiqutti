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

const getUser = async (acct) => {
  const user = await User.findByPk(acct, {
    attributes: ['acct', 'fullname', 'created_at', 'updated_at'],
  });
  return user;
};

module.exports = {
  getAllUserList,
  getUserListByFullname,
  getUser,
};
