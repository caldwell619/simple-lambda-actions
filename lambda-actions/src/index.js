const getItem = require('./dynamo/getItem')
const putItem = require('./dynamo/putItem')
const queryItem = require('./dynamo/queryItem')
const updateItem = require('./dynamo/updateItem')
const getSecretValue = require('./secrets-manager/getSecretValue')

const { Responder, extractResponseParams } = require('./util/responseHandler')

module.exports = {
  getItem,
  putItem,
  queryItem,
  updateItem,
  getSecretValue,
  Responder,
  extractResponseParams
}
