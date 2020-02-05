const { queryItem } = require('simple-lambda-actions/dist/dynamo')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const { identifier, resourceType } = event.queryStringParameters
  const params = {
    TableName,
    partitionKeyName, 
    rangeKeyName, 
    partitionKeySearchTerm: identifier, 
    rangeKeySearchTerm: resourceType, 
    rangeKeyComparisonOperator: 'begins_with'
  }
  try {
    const { Items } = await queryItem(params, true)
    return ResponseHandler.respond({ Items }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}