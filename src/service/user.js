const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const apiError = require('../helper/error');
const { User } = require('../model/db');

const getAllUserList = async (sortDirection = null, limit = null, after = null) => {
  const query = { attributes: ['acct'] };
  if (sortDirection) {
    query.order = [['acct', sortDirection]];
  }
  if (limit) {
    query.limit = limit;
  }
  if (after) {
    const op = sortDirection === 'asc' ? Op.gt : Op.lt;
    query.where = {
      acct: {
        [op]: after,
      },
    };
  }
  const users = await User.findAll(
    query,
  );
  return users;
};

const getUserListByFullname = async (
  fullname,
  sortDirection = null,
  limit = null,
  after = null,
) => {
  const query = {
    attributes: ['acct'],
    where: { fullname },
  };
  if (sortDirection) {
    query.order = [['acct', sortDirection]];
  }
  if (limit) {
    query.limit = limit;
  }
  if (after) {
    const op = sortDirection === 'asc' ? Op.gt : Op.lt;
    query.where = {
      acct: {
        [op]: after,
      },
    };
  }
  const users = await User.findAll(
    query,
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

const delUser = async (acct) => {
  const existCount = await User.count({ where: { acct } });
  if (existCount === 0) {
    throw new apiError.ApiError(apiError.apiErrorCodes.USER_NOT_EXIST);
  }
  return User.destroy({
    where: {
      acct,
    },
  });
};

const modifyUser = async (acct, updateInfo) => {
  const existCount = await User.count({ where: { acct } });
  if (existCount === 0) {
    throw new apiError.ApiError(apiError.apiErrorCodes.USER_NOT_EXIST);
  }
  const updateQuery = {};
  if (updateInfo.fullname) {
    updateQuery.fullname = updateInfo.fullname;
  }
  return User.update(
    updateQuery,
    {
      where: { acct },
    },
  );
};

module.exports = {
  getAllUserList,
  getUserListByFullname,
  getUser,
  addUser,
  delUser,
  modifyUser,
};
