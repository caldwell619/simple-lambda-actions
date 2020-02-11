# Query Item 

Search a single table for items that match your provided params

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `params` | `Object` | The params configuration for querying the records. Schema can be found [here](../extras/dynamo/schemas#query-config-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

## Import Path

```js
const { queryItem } = require('simple-lambda-actions/dist/dynamo')
```

## Response

Returns a promise, which will resolve to the object containing the array of items meeting your criteria, as well as the counts.

```js
{
    "Items": [
        {
           // your item
        }
    ],
    "Count": 1,
    "ScannedCount": 1
}
```

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the table |
| `404` | `Not Found` | When no records match your provided query |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { queryItem } = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  const items = await queryItem(params)
}
```
