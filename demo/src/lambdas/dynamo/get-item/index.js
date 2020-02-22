const { getItem } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const corsUrl = process.env.CORS_URL
const tableName = process.env.TABLE_NAME

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
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