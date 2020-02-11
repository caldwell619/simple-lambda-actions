# Get Secret

Fetch a key value pair from Secrets Manager

## Permissions

The following permissions are required to accomplish this:

1. `secretsmanager:GetSecretValue`

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `secretsManagerParams` | `Object` | [Params](https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html) of your stored secret. Must include `SecretId` and `nameOfSecret` |

## Import Path 

```js
const getSigningKey = require('simple-lambda-actions/dist/secrets-manager/getSecretValue')
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
const getSigningKey = require('simple-lambda-actions/dist/secrets-manager/getSecretValue')
const secretId = '...'
const secretsManagerParams = {
  SecretId: secretId,
  nameOfSecret: 'secret'
}

exports.handler = async event => {
  const item = await (secretsManagerParams)
  // finish and return response
}
```
