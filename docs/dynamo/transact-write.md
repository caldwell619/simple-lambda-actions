# Transact Write

All or nothing. Either every operation you provide passes, or it all fails

This library supports the following actions:

- `ConditionCheck`
- `Delete`
- `Put`
- `Update`

## Permissions

You need to have the permissions to match your operations. For example, if you are deleting, and putting an item, you need:

1. `dynamodb:DeleteItem`
2. `dynamodb:PutItem`


## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `operations` | `Array` | Array of [transactional operations](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#transactWrite-property). The expected schema can be found [here](../extras/dynamo/schemas#transact-write-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path

```js
const { transactWrite } = require('simple-lambda-actions/dist/dynamo')
```

## Response

Returns a promise, which will resolve to an empty object.

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the table |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { transactWrite } = require('simple-lambda-actions/dist/dynamo')

const operationsConfig = [
  {
    operationType: 'update',
    TableName: 'TEST_TABLE',
    itemSpecificInfo: {
      partitionKey: '...',
      sortKey: '121212'
    },
    // otherParams will be spread on the operation
    otherParams: {
      UpdateExpression: 'set #a = :x + :y',
      ConditionExpression: '#a < :MAX',
      ExpressionAttributeNames: {'#a' : 'Sum'},
      ExpressionAttributeValues: {
        ':x' : 20,
        ':y' : 45,
        ':MAX' : 100,
      }
    }
  }
]

exports.handler = async event => {
  try {
    await transactWrite(operationsConfig) // will return a promise with an empty object
  } catch (error){
    const { message, statusCode } = error
    // bubble gum in a dish, do what you wish
  }
}
```
