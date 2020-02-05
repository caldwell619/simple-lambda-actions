const policies = require('./partial-user')
const partitionKeyName = process.env.TABLE_PARTITION_KEY
const rangeKeyName = process.env.TABLE_RANGE_KEY

const aggregatePoliciesIntoBatchWriteParams = policies => {
  return Object.entries(policies).map(policy => {
    const key = policy[0]
    const value = policy[1]
    return {
      operationType: 'put',
      recordInformation: {
        [partitionKeyName]: 'partial-user-policy',
        [rangeKeyName]: key,
        ...value
      }
    }
  })
}

const formattedPolicies = aggregatePoliciesIntoBatchWriteParams(policies)

module.exports = formattedPolicies