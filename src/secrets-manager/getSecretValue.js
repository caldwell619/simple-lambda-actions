const { SecretsManager } = require('aws-sdk')
const secretsManager = new SecretsManager()
const CustomError = require('../util/ErrorHandler')

const getSigningKey = async secretsParams => {
  if(process.env.AWS_SAM_LOCAL){
    return 'secret'
  }
  const { SecretId, nameOfSecret } = secretsParams
  try {
    const secretsManagerResponse = await secretsManager
      .getSecretValue({ SecretId })
      .promise()
    const secretValue = JSON.parse(secretsManagerResponse.SecretString)
    return secretValue[nameOfSecret]
  } catch(error){
    console.error('error inside of secrets manager --> ', error)
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 500
    })
  }
}

module.exports = getSigningKey