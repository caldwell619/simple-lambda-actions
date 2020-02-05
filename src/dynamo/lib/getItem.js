const DocumentClient = require('../helpers/initializeDynamo')

const getItem = (TableName, Key, shouldLogParams) => {
  const params = {
    TableName,
    Key
  }
  if(shouldLogParams) {
    console.log('params', params)
  }
  
  return new Promise(async (resolve, reject) => {
    try {
      const foundItem = await DocumentClient.get(params).promise()
      if(foundItem.Item){
        return resolve(foundItem.Item)
      } else {
        return reject({
          message: 'Item searched for was not found',
          statusCode: 404
        })
      }
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode
      })
    }
  })
}

module.exports = getItem
