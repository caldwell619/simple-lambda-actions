const sign = require('jsonwebtoken/sign')
const CustomError = require('../../util/ErrorHandler')

const generateToken = (payload, expiresIn, signingKey) => {
  try {
    const token = sign(payload, signingKey, { expiresIn })
    return token
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 400
    })
  }
}

module.exports = generateToken