# Update Item 

Updating part of an item, without overriding it with a new one.

_*Note: You **cannot** update a part of the key schema, such as partition or range_

## Permissions

The following permissions are required to accomplish this:

1. `dynamodb:UpdateItem`


## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `config` | `Object` | The configuration for updating the record. Schema can be found [here](../extras/dynamo/schemas#update-config-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path

```js
const { updateItem } = require('simple-lambda-actions/dist/dynamo')
```

## Response

Returns a promise, which will resolve to an empty object. Right now, this doesn't support return values. 

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the table |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { updateItem } = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  await updateItem(tableName, config)
}
```
