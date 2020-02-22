const { batchWrite } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const aggregatedPolicies = require('./lib/index')
const TableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  try {
    await batchWrite(TableName, aggregatedPolicies)
    return ResponseHandler.respond({message: 'done'}, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}