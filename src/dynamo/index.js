const getItem = require('./lib/getItem')
const putItem = require('./lib/putItem')
const queryItem = require('./lib/queryItem')
const updateItem = require('./lib/updateItem')
const transactWrite = require('./lib/transactWrite')
const batchWrite = require('./lib/batchWrite')

module.exports = {
  getItem,
  putItem,
  queryItem,
  updateItem,
  transactWrite,
  batchWrite
}