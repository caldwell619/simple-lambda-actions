const { batchWrite } = require('simple-lambda-actions/dist/dynamo')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const aggregatedPolicies = require('./lib/index')
const TableName = process.env.TABLE_NAME
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  try {
    await batchWrite(TableName, aggregatedPolicies)
    return ResponseHandler.respond({message: 'done'}, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}