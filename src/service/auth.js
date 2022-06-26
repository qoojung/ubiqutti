const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

const apiError = require('../helper/error');
const { User } = require('../model/db');

class JwtVerify {
  constructor(privatekeyPath, publicKeyPath) {
    this.private = null;
    this.public = null;
    this.privatePath = privatekeyPath;
    this.publicPath = publicKeyPath;
  }

  async loadKey() {
    if (!this.private) {
      this.private = await fs.readFile(this.privatePath);
    }
    if (!this.public) {
      this.public = await fs.readFile(this.publicPath);
    }
  }

  async sign(payload, expiresIn = 3600) {
    await this.loadKey();
    return jwt.sign(payload, this.private, {
      algorithm: 'RS256',
      expiresIn,
    });
  }

  async verify(token) {
    await this.loadKey();
    const verifyPromise = promisify(jwt.verify);
    return verifyPromise(token, this.public);
  }
}

const jwtverifier = new JwtVerify(
  path.join(__dirname, '../../config/', 'private.pem'),
  path.join(__dirname, '../../config/', 'public.pem'),
);

const login = async (userinfo) => {
  const dbUser = await User.findByPk(userinfo.acct);
  if (!dbUser) {
    throw new apiError.ApiError(apiError.apiErrorCodes.AUTHENTICATE_ERROR);
  }

  const isMatch = await bcrypt.compare(userinfo.password, dbUser.pwd);
  if (!isMatch) {
    throw new apiError.ApiError(apiError.apiErrorCodes.AUTHENTICATE_ERROR);
  }
  return jwtverifier.sign({ acct: dbUser.user });
};

const checkPriviledges = async (token) => {
  try {
    await jwtverifier.verify(token);
  } catch (error) {
    console.log(error);
    throw new apiError.ApiError(apiError.apiErrorCodes.AUTHORIZE_ERROR);
  }
};

module.exports = {
  login,
  checkPriviledges,
};
