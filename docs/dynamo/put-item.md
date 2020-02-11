# Put Item

Saving or overwriting an item on a single table

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `item` | `Object` | The item you wish to write, **must contain partition key**  |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path

```js
const { putItem } = require('simple-lambda-actions/dist/dynamo')
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
const { putItem } = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  await putItem(tableName, itemToWrite)
}
```
