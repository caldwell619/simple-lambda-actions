const { updateItem } = require('simple-lambda-actions/dist/dynamo')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')

const tableName = process.env.TABLE_NAME
const corsUrl = process.env.CORS_URL

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  const { identifier, resourceType, updateConfig } = JSON.parse(event.body)

  const { keyToUpdate, newValue } = updateConfig

  const Key = { identifier, resourceType }
  const ExpressionAttributeNames = { '#new_key': keyToUpdate }
  const ExpressionAttributeValues = { ':nv': newValue }
  const UpdateExpression = 'set #new_key = :nv'
  const ReturnValues = 'UPDATED_NEW'
  const params = { Key, ExpressionAttributeValues, ExpressionAttributeNames, UpdateExpression, ReturnValues }

  try {
    await updateItem(tableName, params, true)
    return ResponseHandler.respond({ message: 'Done' }, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}

/*
{
    Key,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    UpdateExpression,
    ReturnValues
}
*/