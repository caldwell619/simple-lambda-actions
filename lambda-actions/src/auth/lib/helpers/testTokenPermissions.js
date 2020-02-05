const { bodyParser } = require('../../../util/formatter')
const CustomError = require('../../../util/ErrorHandler')

const combineParamsFromEvent = event => {
  return {
    ...bodyParser(event.body) || {},
    ...event.queryStringParameters,
    ...event.pathParameters
  }
}

const compareActionsAgainstRestrictions = (testSet, combinedParams) => {
  let doesPass = true
  Object.entries(testSet).forEach(param => {
    const key = param[0]
    const value = param[1]
    if(value !== combinedParams[key]){
      console.error(`Given payload does not match key: ${key}. Policy statement value: ${combinedParams[key]} testing against token value: ${value}`)
      doesPass = false
    }
  })
  return doesPass
}

const lookThroughParamsForRequiredValues = (combinedParams, attemptedResource) => {
  const testSet = attemptedResource.restriction.equals

  // go through the test set comparing each value to the combined params
  const doActionsPass = compareActionsAgainstRestrictions(testSet, combinedParams)
  return doActionsPass
}

// statement contains array of allowable methods - look through them and compare with current
const compareAllowableMethodsAgainstCurrent = (allowedMethods, currentMethod) => {
  const targetMethod = allowedMethods.find(method => method === currentMethod)
  return !!targetMethod
}

const validatePolicyPermissionsWithToken = (combinedParams, attemptedResource, currentMethod) => {
  const allowedMethods = attemptedResource.action
  const doParamsPass = lookThroughParamsForRequiredValues(combinedParams, attemptedResource)
  const doesMethodPass = compareAllowableMethodsAgainstCurrent(allowedMethods, currentMethod)
  return doParamsPass && doesMethodPass
}

const testTokenAgainstPolicyPermissions = (event, attemptedResource) => {
  const combinedParams = combineParamsFromEvent(event)
  const currentMethod = event.httpMethod
  const doesPass = validatePolicyPermissionsWithToken(combinedParams, attemptedResource, currentMethod)
  if(!doesPass){
    throw new CustomError({
      message: 'Given payload does not match requirements',
      statusCode: 403
    })
  }
}

module.exports = testTokenAgainstPolicyPermissions