const getItem = require('./lib/getItem')
const putItem = require('./lib/putItem')
const queryItem = require('./lib/queryItem')
const updateItem = require('./lib/updateItem')
const transactWrite = require('./lib/transactWrite')

module.exports = {
  getItem,
  putItem,
  queryItem,
  updateItem,
  transactWrite
}