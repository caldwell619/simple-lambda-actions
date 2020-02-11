# Validate Token with a Key Stored on Secrets Manager

Fetches a key from Secrets Manager, then validates the token with it.

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `secretsManagerParams` | `Object` | [Params](https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html) of your stored secret |
| `givenToken` | `String` | The token you wish to validate |

## Import Path

```js
const { validateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
```

## Response

Returns a promise, which will resolve to:

```js
{
  // your decoded token payload
}
```

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `403` | `Unauthorized` | When the token is invalid, or not provided |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { validateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
const secretId = '...'
const secretsManagerParams = {
  SecretId: secretId,
  nameOfSecret: 'secret'
}

exports.handler = async event => {
  const givenToken = event.headers.Authorization
  const decodedPayload = await validateToken(secretsManagerParams, givenToken)
  // finish and return response
}
```
