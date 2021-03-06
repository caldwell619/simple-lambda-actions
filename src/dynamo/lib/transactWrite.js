const util = require('util')
const DocumentClient = require('../helpers/initializeDynamo')
const { determineNameOfActionItem } = require('../helpers')
const { capitalizeWord } = require('../../util/formatter')
const CustomError = require('../../util/ErrorHandler')

const generateTransactionalOperations = operations => {
  const constructedOperations = operations.map(operation => {
    const operationType = capitalizeWord(operation.operationType)
    const TableName = operation.TableName
    const keyOfItemAction = determineNameOfActionItem(operationType)
    const valueOfItemAction = operation.itemSpecificInfo
    const otherParams = operation.otherParams || {}
    return {
      [operationType]: {
        [keyOfItemAction]: valueOfItemAction,
        TableName,
        ...otherParams
      }
    }
  })
  return {
    TransactItems: constructedOperations
  }
}


module.exports = (operations, shouldLogParams) => {
  const params = generateTransactionalOperations(operations)
  if(shouldLogParams){
    const deepLoggedObject = util.inspect(params, { showHidden: true, depth: null })
    console.log('params before beginning transactional operation --> ', deepLoggedObject)
  }
  try {
    return DocumentClient.transactWrite(params).promise()
  } catch(error){
    console.error('caught error in transact write try/catch --> ', error)
    throw new CustomError({
      message: error.message,
      statusCode: error.statusCode
    })
  }
}
