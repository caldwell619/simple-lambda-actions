const jwt = require('jsonwebtoken')

const generateToken = (payload, expiresIn, signingKey) => {
  try {
    const token = jwt.sign(payload, signingKey, { expiresIn })
    return token
  } catch(error){
    return {
      message: error.message,
      statusCode: error.statusCode
    }
  }
}

module.exports = generateToken