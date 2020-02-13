const { S3 } = require('aws-sdk')
const CustomError = require('../../util/ErrorHandler')
const S3client = new S3()

const getObject = async (params, isJson) => {
  if(!params.Key || !params.Bucket){
    throw new CustomError({
      message: 'Params malformed. Missing either Key or Bucket',
      statusCode: 400
    })
  }
  try {
    const data = await S3client.getObject(params).promise()
    if (isJson){
      const object = JSON.parse(data.Body.toString())
      return object
    } else {
      return data
    }
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 500
    })
  }
}

module.exports = getObject