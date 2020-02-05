const DocumentClient = require('../helpers/initializeDynamo')
const buildQueryParams = require('../helpers/buildQueryParams')

const noRecordFoundResponse = 'Query returned no results'

const queryItem = async (config, shouldLogParams) => {
  const params = buildQueryParams(config)
  if(shouldLogParams) {
    console.log('params', params)
  }
  return new Promise(async(resolve, reject) => {
    try {
      const dynamoResponse = await DocumentClient.query(params).promise()
      if (dynamoResponse.Count === 0) {
        return reject({ message: noRecordFoundResponse, statusCode: 404 })
      }
      return resolve(dynamoResponse)
    } catch(error) {
      console.error('error querying --> ', error)
      reject(error)
    }
  })
}

module.exports = queryItem
