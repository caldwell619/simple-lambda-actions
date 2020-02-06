const DocumentClient = require('../helpers/initializeDynamo')
const buildBatchParams = require('../helpers/buildBatchParams')

const batchWrite = (TableName, operations, shouldLogParams) => {
  const params = {
    RequestItems: {
      [TableName]: buildBatchParams(operations)
    }
  }
  if(shouldLogParams) {
    console.log('params', params)
  }
  return DocumentClient.batchWrite(params).promise()
}

module.exports = batchWrite
