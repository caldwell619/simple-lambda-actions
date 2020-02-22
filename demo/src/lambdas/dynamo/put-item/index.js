const { putItem } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const tableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  const parsedBody = JSON.parse(event.body)
  try {
    await putItem(tableName, parsedBody, true)
    return ResponseHandler.respond(parsedBody, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}