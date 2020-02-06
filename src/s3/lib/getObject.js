const { S3 } = require('aws-sdk')
const S3client = new S3()

const getObject = params => {
  return new Promise(async (resolve, reject) => {
    if(!params.Key || !params.Bucket){
      return reject({
        message: 'Params malformed. Missing either Key or Bucket',
        statusCode: 400
      })
    }
    try {
      const data = await S3client.getObject(params).promise()
      const object = JSON.parse(data.Body.toString())
      return resolve(object)
    } catch(error){
      return reject({
        message: error.message,
        statusCode: error.statusCode || 500
      })
    }
  })
}

module.exports = getObject