const CustomError = require('../../util/ErrorHandler')
const findAttemptedResource = require('./helpers/findAttemptedResource')
const testTokenPermissions = require('./helpers/testTokenPermissions')

// statements
const testAttemptedResourceAccess = (decodedPayload, event) =>  {
  const { httpMethod, path } = event
  const givenParamsFromToken = {
    admin: decodedPayload.admin,
    user: decodedPayload.user,
    Action: httpMethod,
    Resource: path
  }
  const authPermissions = decodedPayload.statements
  try {
    const attemptedResource = findAttemptedResource(authPermissions, givenParamsFromToken)
    testTokenPermissions(event, attemptedResource)
  } catch(error){
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }
}

module.exports = testAttemptedResourceAccess
