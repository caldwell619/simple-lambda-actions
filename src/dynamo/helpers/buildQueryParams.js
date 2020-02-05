const allowableComparisonOperators = {
  '=': true,
  '<': true,
  '>': true,
  '<=': true,
  '>=': true,
  'attribute_exists': true,
  'attribute_not_exists': true,
  'begins_with': true,
  'contains': true,
}

const determineIfRangeKeyIsUsed = (searchConfig) => {
  const {
    partitionKeyName, 
    rangeKeyName, 
    partitionKeySearchTerm, 
    rangeKeySearchTerm, 
    rangeKeyComparisonOperator
  } = searchConfig

  // if a key was provided, but does not match
  if(rangeKeyComparisonOperator && !allowableComparisonOperators[rangeKeyComparisonOperator]) {
    throw new Error('Comparison operator not in supported list')
  }
  // only query based on the partition, not using the range key
  let KeyConditionExpression = `${partitionKeyName} = :par`
  let ExpressionAttributeValues = { ':par': partitionKeySearchTerm }
  
  // if a range key was be provided, use it
  if(rangeKeyName) {
    KeyConditionExpression = `${partitionKeyName} = :par and ${rangeKeyComparisonOperator} (${rangeKeyName} , :ran )`
    ExpressionAttributeValues = {
      ':par': partitionKeySearchTerm,
      ':ran': rangeKeySearchTerm
    }  
  }
  return { KeyConditionExpression, ExpressionAttributeValues}
}

const buildQueryParams = (config) => {
  // setting the values to a default to null if not provided
  const { filterExpression, projectionExpression, TableName } = config
  const { KeyConditionExpression, ExpressionAttributeValues } = determineIfRangeKeyIsUsed(config)
  return {
    TableName,
    FilterExpression: filterExpression,
    ProjectionExpression: projectionExpression,
    KeyConditionExpression,
    ExpressionAttributeValues
  }
}

module.exports = buildQueryParams