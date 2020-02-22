
const { getObject } = require('simple-lambda-actions/dist/s3')
const Responder = require('simple-lambda-actions/dist/util/responseHandler')
const corsUrl = process.env.CORS_URL

const Bucket = 'lambda-actions-test'
const Key = 'partial-user.json'
const params = { Bucket, Key }

exports.handler = async event => {
  const ResponseHandler = new Responder(corsUrl, event.httpMethod)
  try {
    const data = await getObject(params)
    return ResponseHandler.respond(data, 200)
  } catch(error){
    console.error('error post item --> ', error)
    return ResponseHandler.respond(error.message, error.statusCode || 500)
  }
}