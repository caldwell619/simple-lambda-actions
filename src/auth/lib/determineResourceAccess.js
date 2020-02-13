const CustomError = require('../../util/ErrorHandler')
const testTokenPermissions = require('./helpers/testTokenPermissions')
const getItem = require('../../dynamo/lib/getItem').default

const testAttemptedResourceAccess = async (decodedPayload, event, dynamoParams) =>  {
  const { path } = event
  const { TableName, partitionKeyName, rangeKeyName } = dynamoParams
  const role = decodedPayload.role
  const dynamoGetParams = {
    [partitionKeyName]: path,
    [rangeKeyName]: role
  }
  try {
    const attemptedResource = await getItem(TableName, dynamoGetParams)
    testTokenPermissions(event, decodedPayload, attemptedResource)
  } catch(error){
    // if the record can't be found, it's equivalent of them not having permissions
    const statusCode = error.statusCode === 404
      ? 403
      : error.statusCode
    throw new CustomError({
      message: error.message,
      statusCode
    })
  }
}

module.exports = testAttemptedResourceAccess
