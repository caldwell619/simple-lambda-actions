const CustomError = require('../../../util/ErrorHandler')

const plugValuesIntoString = (stringifiedStatements, dataToPlugIntoTemplate) => {
  const template = stringifiedStatements.replace(/(\$\{)/gm, '$1dataToPlugIntoTemplate.')
  const evaluatedTemplate = eval('`' + template + '`')  
  return evaluatedTemplate
}

const createCompleteStatements = (statements, data) => {
  const output = plugValuesIntoString(JSON.stringify(statements), data)
  return JSON.parse(output)
}

const findAttemptedResource = (contextResource, completedStatements) => {
  let targetedResource = null
  // look through parsed statements
  const targetStatement = completedStatements.find(statement => {
    // resources is an array of allowed urls to hit
    statement.resource.forEach(resource => {
      if(resource === contextResource.Resource){
        targetedResource = resource
      }
    })
    return targetedResource
  })
  return targetStatement
}

module.exports = (statementsArray, constructedContext) => {
  const completeStatements = createCompleteStatements(statementsArray, constructedContext)
  const attemptedResource = findAttemptedResource(constructedContext, completeStatements)
  if(attemptedResource){
    return attemptedResource
  } else {
    throw new CustomError({
      message: 'Resource not found',
      statusCode: 404
    })
  }
}