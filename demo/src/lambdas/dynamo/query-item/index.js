const { queryItem } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  const { identifier, resourceType } = event.queryStringParameters
  // setting default operator to begins_with if none provided
  const rangeKeyComparisonOperator = event.queryStringParameters.rangeKeyComparisonOperator || 'begins_with'
  const params = {
    TableName,
    partitionKeyName, 
    rangeKeyName, 
    partitionKeySearchTerm: identifier, 
    rangeKeySearchTerm: resourceType, 
    rangeKeyComparisonOperator
  }
  try {
    const { Items } = await queryItem(params, true)
    return ResponseHandler.respond({ Items }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}