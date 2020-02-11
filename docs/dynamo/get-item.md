# Get Item

Straightforward, getting a single object from DynamoDB

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `key` | `Object` | The [key schema](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-keyschema.html) for the searched for item  |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path 

```js
const { getItem } = require('simple-lambda-actions/dist/dynamo')
```

## Response

Returns a promise, which will resolve to:

```js
{
  // your item
  superImportantAttribute: 'YAAAAAASSSS'
}
```

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the table |
| `404` | `Not Found` | Thrown when the key schema provided did not match any records |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example 

```js
const { getItem } = require('simple-lambda-actions/dist/dynamo')
const tableName = 'greatTable'
const keySchema = {
  partitionKey: '123',
  rangeKey: '1234'
}

exports.handler = async event => {
  const item = await getItem(tableName, keySchema)
  // finish and return response
}
```
