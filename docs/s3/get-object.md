# Get Object

Fetch an object from S3

## Permissions

The following permissions are required to accomplish this:

1. `s3:GetObject`

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `params` | `Object` | Params of your stored secret. Must include `Bucket` and `Key` properties. More params can be found [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property). All given params are passed to the SDK. |
| `isJson` | `Boolean` | Determines the return value. If what you're storing in the bucket is a JSON file, this argument will return a parsed object. |

## Import Path 

```js
const { getObject } = require('simple-lambda-actions/dist/s3')
```

## Response

Returns a promise, which will resolve to whatever your object is

## Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found |
| `403` | `Unauthorized` | Thrown when your acting IAM role does not have access to the bucket |
| `404` | `Not Found` | Thrown when the params do not return the object |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example 

```js
const { getObject } = require('simple-lambda-actions/dist/s3')

const Bucket = 'lambda-actions-test'
const Key = 'roles.json'
const params = { Bucket, Key }

exports.handler = async event => {
  const data = await getObject(params, true)
  // item is a parsed JSON object, ready for use ***IF*** the second argument is `true`
}
```
