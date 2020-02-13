const { bodyParser } = require('../../../util/formatter')
const CustomError = require('../../../util/ErrorHandler')

const combineParamsFromEvent = event => {
  return {
    ...bodyParser(event.body) || {},
    ...event.queryStringParameters,
  }
}

const compareActionsAgainstRestrictions = (requiredChecks, combinedParams, decodedPayload) => {
  let doesPass = true
  Object.keys(requiredChecks).forEach(requiredCheck => {
    if(decodedPayload[requiredCheck] !== combinedParams[requiredCheck]){
      console.error(`Given payload does not match key: ${requiredCheck}. Policy statement value: ${combinedParams[requiredCheck]} testing against token value: ${decodedPayload[requiredCheck]}`)
      doesPass = false
    }
  })
  return doesPass
}

const lookThroughParamsForRequiredValues = (combinedParams, attemptedResource, decodedPayload) => {
  const requiredChecks = attemptedResource.restrictions

  // go through the test set comparing each value to the combined params
  const doActionsPass = compareActionsAgainstRestrictions(requiredChecks, combinedParams, decodedPayload)
  return doActionsPass
}

const compareAllowableMethodsAgainstCurrent = (allowedMethods, currentMethod) => {
  return allowedMethods[currentMethod]
}

const validatePolicyPermissionsWithToken = (decodedPayload, combinedParams, attemptedResource, currentMethod) => {
  const allowedMethods = attemptedResource.methodsAllowed
  const doParamsPass = lookThroughParamsForRequiredValues(combinedParams, attemptedResource, decodedPayload)
  const doesMethodPass = compareAllowableMethodsAgainstCurrent(allowedMethods, currentMethod)
  return doParamsPass && doesMethodPass
}

const testTokenAgainstPolicyPermissions = (event, decodedPayload, attemptedResource) => {
  const combinedParams = combineParamsFromEvent(event)
  const currentMethod = event.httpMethod
  const doesPass = validatePolicyPermissionsWithToken(decodedPayload, combinedParams, attemptedResource, currentMethod)
  if(!doesPass){
    throw new CustomError({
      message: 'Given payload does not match requirements',
      statusCode: 403
    })
  }
}

module.exports = testTokenAgainstPolicyPermissions