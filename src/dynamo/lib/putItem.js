const DocumentClient = require('../helpers/initializeDynamo')

const putItem = (TableName, Item, shouldLogParams) => {
  const params = {
    TableName,
    Item
  }
  if(shouldLogParams) {
    console.log('params', params)
  }
  return DocumentClient.put(params).promise()
}

module.exports = putItem
