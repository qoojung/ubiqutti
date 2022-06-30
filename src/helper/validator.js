const Ajv = require('ajv');
const { schema, key } = require('../schema/schema');

const ajv = new Ajv();
Object.values(key).forEach((schemaKey) => {
  ajv.addSchema(schema[schemaKey], schemaKey);
});
module.exports = ajv;
