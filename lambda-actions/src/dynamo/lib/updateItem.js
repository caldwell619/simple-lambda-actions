const DocumentClient = require('../helpers/initializeDynamo')

const putItem = (TableName, config, shouldLogParams) => {
  const { Key, ExpressionAttributeNames, ExpressionAttributeValues, UpdateExpression, ReturnValues  } = config
  const params = {
    TableName,
    Key,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression,
    ReturnValues,
  }
  if(shouldLogParams) {
    console.log('params', params)
  }
  return DocumentClient.update(params).promise()
}

module.exports = putItem


