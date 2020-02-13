const { fullServiceAuth } = require('simple-lambda-actions/dist/auth')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const config = {}
// secrets
const SecretId = process.env.SECRET_NAME
const nameOfSecret = process.env.SIGNING_KEY_NAME
const secretManagerParams = { SecretId, nameOfSecret }
// dynamo
const dynamoParams = {
  TableName: process.env.TABLE_NAME,
  partitionKeyName: process.env.TABLE_PARTITION_KEY,
  rangeKeyName: process.env.TABLE_RANGE_KEY
}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  try {
    const decodedToken = await fullServiceAuth(secretManagerParams, event, dynamoParams)
    return ResponseHandler.respond({tokenPayload: decodedToken}, 200)
  } catch(error){
    console.error('error validating permission --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}