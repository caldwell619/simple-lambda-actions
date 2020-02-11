# Full Service Auth

This solution is very opinionated, and you obviously don't have to use it. The basic flow is as follows:

1. Fetch secret key
2. Validate token
3. Check if requestor has access to the resource they are attempting to access
4. Determine if any additional checks are necessary such as the email of the signed token needs to match the email in the request body.
5. Return the decoded payload if all of the above checks out.

## Permissions

The following permissions are required to accomplish this:

1. `secretsmanager:GetSecretValue`
2. `dynamodb:GetItem`

## Arguments

| Name | Type | Description |
| --- | --- | --- |
| `secretsManagerParams` | `Object` | [Params](https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html) of your stored secret. Must include `SecretId` and `nameOfSecret` |
| `event` | `Object` | The event object that comes from AWS |
| `dynamoParams` | `Object` | The values needed to find the permission on DynamoDB. The schema of which can be found [here](../../extras/auth/schemas.md) |


## Import Path

```js
const { fullServiceAuth } = require('simple-lambda-actions/dist/auth')
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
| `403` | `Unauthorized` | If one of the checks done does not succeed |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

## Example

```js
const { fullServiceAuth } = require('simple-lambda-actions/dist/auth')
const secretId = '...'
const secretsManagerParams = {
  SecretId: secretId,
  nameOfSecret: 'secret'
}
const dynamoParams = {
  TableName: 'super-duper-table',
  partitionKeyName: 'name_of_tables_partition_key',
  rangeKeyName: 'name_of_tables_range_key',
}

exports.handler = async event => {
  await fullServiceAuth(secretsManagerParams, event, dynamoParams)
  // request is now validated
}
```

## Opinionated

It was previously mentioned that this is opinionated. It's true. To quote the sagely words of Salt N Peppa:

> Opinions are like ___holes and everybody's got one.

So here's what this function expects. Feel free to **not use it.** I wrote this for a specific use case, so if you can benefit, great.

### Setup

This requires a bit of setup prior to using this function.

### Auth Token Location

The expectation is that there will be a token in the headers name `Authorization`. It will reject the request unless that token is present.

### Permissions Stored on DynamoDB

It's also expected that you are using DynamoDB, and that you have your resource permissions on a table with the following schema:

```json
{
  "partitionKey": "/the/path/that/the/requester/is/requesting",
  "rangeKey": "role-of-user-allowed-access", // allows multiple roles to have access to the same path
  "methodsAllowed": {
    "get": true
  },
  "restrictions": {
    // this is where your specific restrictions on the route will go. 
    // e.g. `emailAddress` in req body must match token's signed `emailAddress`
    "emailAddress": true
  }
}
```

Upon validating the token, the payload will be compared against the above.

First, the path of the `event` will be used as the partition key value.
The `role` of the decoded token will be used as the range key value.

This means your token payload must include a `role`
If the item cannot be found, it will reject the auth request.

After the item is found, it can be implied that the role of the token, matches the path, meaning they can access this particular resource. 

### Restrictions

You have the option to further restrict access to a given resource by defining the HTTP methods allowed, as well as other restrictions that must be met.

**If** you included restrictions on your DynamoDB permission, they will be evaluated against the token's payload.

### User Story

> I have a path, `/bananas`, that only verified users can access. If they are accessing this, their `emailAddress` must match the token's email, so they cannot access some other user's bananas.

#### Permissions Schema

```json
// on whatever table you specify
{
  // path you're applying permissions to
  "partitionKey": "/bananas",
  // role of user authorized to reach out to this path
  "rangeKey": "verified-user", 
  // only allow verified user to make a get request to /bananas
  "methodsAllowed": {
    "get": true
  },
  "restrictions": {
    // email from token must match one in the request body, or query string
    "emailAddress": true
  }
}
```

#### Token Payload

```json
{
  "role": "verified-user",
  "emailAddress": "banana_hammock@fruit.com"
}
```

#### Query String Params of Request

_This could also be in the request body if it was a post request_

```js
// path
/bananas?emailAddress=banana_hammock@fruit.com
```

#### Flow

1. A get request is made to `/bananas`
2. A token is attached as a header named `Authorization`
3. The token is verified with a key stored in Secrets Manager
4. The permissions are found DynamoDB
5. The HTTP method is evaluated against the allowed methods stored in the record.
6. The restrictions are evaluated by taking the token payload, and comparing against the request params
7. The auth is successful, and the decoded token is returned from the `fullServiceAuth` function.
