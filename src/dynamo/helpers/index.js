const actionTypeItemMap = {
  'Delete': 'Key',
  'Put': 'Item',
  'Update': 'Key',
  'ConditionCheck': 'Key'
}

const determineNameOfActionItem = actionType => {
  return actionTypeItemMap[actionType]
}

module.exports = {
  determineNameOfActionItem
}