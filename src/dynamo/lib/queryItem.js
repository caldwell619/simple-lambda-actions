const DocumentClient = require('../helpers/initializeDynamo')
const buildQueryParams = require('../helpers/buildQueryParams')
const CustomError = require('../../util/ErrorHandler')

const noRecordFoundResponse = 'Query returned no results'

const queryItem = async (config, shouldLogParams) => {
  const params = buildQueryParams(config)
  if(shouldLogParams) {
    console.log('params', params)
  }
  try {
    const dynamoResponse = await DocumentClient.query(params).promise()
    if (dynamoResponse.Count === 0) {
      throw new CustomError({ message: noRecordFoundResponse, statusCode: 404 })
    }
    return dynamoResponse
  } catch(error) {
    console.error('error querying --> ', error)
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 500
    })
  }
}

module.exports = queryItem
