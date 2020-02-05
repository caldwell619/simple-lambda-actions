
const { getObject } = require('simple-lambda-actions/dist/s3')
const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const config = {}

const Bucket = 'lambda-actions-test'
const Key = 'partial-user.json'


exports.handler = async event => {
  const responseConfig = extractResponseParams(event.httpMethod, config)
  const ResponseHandler = new Responder(responseConfig)
  const params = { Bucket, Key }
  try {
    const data = await getObject(params)
    return ResponseHandler.respond(data, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}