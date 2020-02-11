# Validate Token

Validate a JWT token, get the contents of the token returned

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `token` | `String` | The token you want to validate |
| `signingKey` | `String` | The secret key you want to use to validate tokens |

## Import Path

```js
const { validateToken } = require('simple-lambda-actions/dist/auth/lib')
```

## Response

Returns a promise, which will resolve to:

```js
{
  // your decoded token
}
```

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `403` | `Unauthorized` | When the token is invalid, or not provided |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { validateToken } = require('simple-lambda-actions/dist/auth/lib')
const signingKey = '...'

exports.handler = async event => {
  const givenToken = event.headers.Authorization
  const decodedPayload = await validateToken(givenToken, signingKey)
  // finish and return response
}
```

