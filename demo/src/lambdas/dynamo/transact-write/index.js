const { transactWrite } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const corsUrl = process.env.CORS_URL
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
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