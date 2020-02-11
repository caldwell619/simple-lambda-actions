# Batch Write

Writing a great many things to various tables. The difference between this, and Transactional Write, is that if your 5th operation fails, you will still have written 4 items.

## Permissions

The following permissions are required to accomplish this:

1. `dynamodb:BatchWriteItem`

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `operations` | `Object` | An array of [operations]() that will result in individual write statements  |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path 

```js
const { batchWrite } = require('simple-lambda-actions/dist/dynamo')
```

## Response

Returns a promise, which will resolve to an empty object. This comes directly from DynamoDB.

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the table |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example 

```js
const { batchWrite } = require('simple-lambda-actions/dist/dynamo')
const tableName = '...'
const operations = [...]

exports.handler = async event => {
  await batchWrite(tableName, operations)
}
```
