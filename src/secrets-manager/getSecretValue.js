const { SecretsManager } = require('aws-sdk')
const secretsManager = new SecretsManager()
const CustomError = require('../util/ErrorHandler')

const getSigningKey = async secretsParams => {
  try {
    const secretsManagerResponse = await secretsManager
      .getSecretValue(secretsParams)
      .promise()
    return JSON.parse(secretsManagerResponse.SecretString)
  } catch(error){
    console.error('error inside of secrets manager --> ', error)
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 500
    })
  }
}

module.exports = getSigningKey