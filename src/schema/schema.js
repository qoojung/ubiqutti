const key = {
  modifyUser: 'modifyUser',
  modifyUserFullname: 'modifyUserFullname',
  addUser: 'addUser',
  login: 'login',
};
const schema = {
  [key.modifyUser]: {
    type: 'object',
    properties: {
      fullname: {
        type: 'string',
      },
    },
    required: [
      'fullname',
    ],
  },
  [key.modifyUserFullname]: {
    type: 'object',
    properties: {
      fullname: {
        type: 'string',
      },
    },
    required: [
      'fullname',
    ],
  },
  [key.login]: {
    type: 'object',
    properties: {
      acct: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    required: [
      'acct',
      'password',
    ],
  },
  [key.addUser]: {
    type: 'object',
    properties: {
      acct: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      fullname: {
        type: 'string',
      },
    },
    required: [
      'acct',
      'password',
    ],
  },
};
module.exports = {
  key,
  schema,
};
