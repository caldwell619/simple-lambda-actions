const { getItem } = require('simple-lambda-actions/dist/dynamo')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const tableName = process.env.TABLE_NAME
const config = {}


exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  try {
    const { partitionKey, rangeKey } = event.queryStringParameters
    const keySchema = { 
      identifier: partitionKey,
      resourceType: rangeKey
    }
    const item = await getItem(tableName, keySchema)
    return ResponseHandler.respond(item, 200)
  } catch(error){
    console.error('error getting item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}