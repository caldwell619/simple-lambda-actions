const policies = require('./partial-user')

const aggregatePoliciesIntoBatchWriteParams = ({ allowedStatements }) => {
  return allowedStatements.map(policy => {
    return {
      operationType: 'put',
      recordInformation: {
        ...policy
      }
    }
  })
}

const formattedPolicies = aggregatePoliciesIntoBatchWriteParams(policies)

module.exports = formattedPolicies