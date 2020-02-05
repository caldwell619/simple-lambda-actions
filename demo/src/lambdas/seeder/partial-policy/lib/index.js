const policies = require('./partial-user.json.js')
const TableName = process.env.TABLE_NAME
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

const aggregatePoliciesIntoTransactOps = policies => {
  return Object.entries(policies).map(policy => {
    const key = policy[0]
    const value = policy[1]
    return {
      operationType: 'put',
      TableName,
      itemSpecificInfo: {
        [partitionKeyName]: 'partial-user-policy',
        [rangeKeyName]: key,
        ...value
      }
    }
  })
}

const formattedPolicies = aggregatePoliciesIntoTransactOps(policies)

module.exports = formattedPolicies