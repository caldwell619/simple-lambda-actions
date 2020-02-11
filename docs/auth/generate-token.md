# Secret Generate Token

Signs a JWT with a given key

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `payloadToEncode` | `Object` | What you wish to include inside of the token |
| `expiresIn` | `String` | Duration of token validity. A more comprehensive solution can be found [here](https://www.npmjs.com/package/jsonwebtoken) and [here](https://github.com/zeit/ms) |
| `signingKey` | `Object` | Key used to sign token  |

## Import Path

```js
const { generateToken } = require('simple-lambda-actions/dist/auth')
```

## Response

Returns the token in the form of a string.

```js
{
  token: 'eyasbdjbqjbh12312i7uebkjb' // your token
}
```

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `403` | `Unauthorized` | Thrown when your IAM role does not have access to the requested secret |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { generateToken } = require('simple-lambda-actions/dist/auth')
const signingKey = '...'
const expiresIn = '24h'
const secretsManagerParams = {
  SecretId: secretId,
  nameOfSecret: 'secret'
}

exports.handler = async event => {
  const payloadToEnclose = {...}
  const signingKey ='...'
  const decodedPayload = await generateToken(payloadToEnclose, expiresIn, signingKey)
  // finish and return response
}
```