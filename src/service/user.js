const bcrypt = require('bcrypt');
const apiError = require('../helper/error');
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

const addUser = async (userInfo) => {
  const existCount = await User.count({ where: { acct: userInfo.acct } });
  if (existCount > 0) {
    throw new apiError.ApiError(apiError.apiErrorCodes.USER_EXIST);
  }
  const hashPassword = await bcrypt.hash(userInfo.password, parseInt(process.env.SALT_ROUNDS, 10));
  const dbUser = {
    acct: userInfo.acct,
    pwd: hashPassword,
    fullname: userInfo.fullname,
  };
  return User.create(dbUser);
};

module.exports = {
  getAllUserList,
  getUserListByFullname,
  getUser,
  addUser,
};
