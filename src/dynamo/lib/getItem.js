const DocumentClient = require('../helpers/initializeDynamo')
const CustomError = require('../../util/ErrorHandler')

const getItem = async (TableName, Key, shouldLogParams) => {
  const params = {
    TableName,
    Key
  }
  if(shouldLogParams) {
    console.log('params', params)
  }
  try {
    const foundItem = await DocumentClient.get(params).promise()
    if(foundItem.Item){
      return foundItem.Item
    } else {
      throw new CustomError({
        message: 'Item searched for was not found',
        statusCode: 404
      })
    }
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }

}

module.exports = getItem
