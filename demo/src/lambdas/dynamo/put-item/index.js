const { putItem } = require('simple-lambda-actions/dist/dynamo')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const tableName = process.env.TABLE_NAME
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const parsedBody = JSON.parse(event.body)
  try {
    await putItem(tableName, parsedBody, true)
    return ResponseHandler.respond(parsedBody, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}