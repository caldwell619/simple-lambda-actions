const { transactWrite } = require('simple-lambda-actions/dist/dynamo')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY
const config = {}

exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  // const parsedBody = JSON.parse(event.body)
  const params = [
    {
      operationType: 'delete',
      TableName,
      itemSpecificInfo: {
        [partitionKeyName]: 'test@test.com',
        [rangeKeyName]: 'user'
      }
    },
    {
      operationType: 'put',
      TableName,
      itemSpecificInfo: {
        [partitionKeyName]: 'test@test.com',
        [rangeKeyName]: 'user_admin'
      }
    }
  ]
  try {
    await transactWrite(params, true)
    return ResponseHandler.respond({}, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}