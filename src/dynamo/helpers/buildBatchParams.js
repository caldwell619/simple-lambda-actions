const { determineNameOfActionItem } = require('../helpers')
const { capitalizeWord } = require('../../util/formatter')

const buildBatchParams = operations => {
  return operations.map(operation => {
    const capitalizedOperationType = capitalizeWord(operation.operationType)
    const requestType = capitalizedOperationType + 'Request'
    const actionItemName = determineNameOfActionItem(capitalizedOperationType)
    return {
      // ex: PutRequest
      [requestType]: {
        // ex: // Item
        [actionItemName]: operation.recordInformation
      }
    }
  })
}

module.exports = buildBatchParams