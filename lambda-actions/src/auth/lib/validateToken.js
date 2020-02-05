const jwt = require('jsonwebtoken')
const CustomError = require('../../util/ErrorHandler')

const validateToken = (givenToken, signingKey) => {  
  if(!givenToken){
    throw new CustomError({
      message: 'No valid token provided',
      statusCode: 403
    })
  }
  try {
    const tokenData = jwt.verify(givenToken, signingKey)
    return tokenData
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }
}

module.exports = validateToken