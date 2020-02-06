const jwt = require('jsonwebtoken')
const CustomError = require('../../util/ErrorHandler')

const generateToken = (payload, expiresIn, signingKey) => {
  try {
    const token = jwt.sign(payload, signingKey, { expiresIn })
    return token
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode || 400
    })
  }
}

module.exports = generateToken