# Common Lambda Actions

A collection of common operations done with [AWS Lambda](https://aws.amazon.com/lambda/?nc2=h_ql_prod_cp_lbd)

## Table of Contents

### Intro
- [Intro](#intro)
- [Responses](#intro-responses)
- [Errors](#intro)

### DynamoDB

- [Get Item](#get-item)
- [Put Item](#put-item)
- [Update Item](#update-item)
- [Query Items](#query-item)
- [Transact Write](#transact-write)

### Secrets Manager

- [Get Secret Value](#get-secret-value)

### Auth With Secrets Manager

- [Validate Token](#secret-validate-token)
- [Generate Token](#secret-generate-token)

### Auth Without Secrets Manager

- [Validate Token](#non-secret-validate-token)

### Responder

- [Respond](#respond)

### Schemas

- [Update Item Config](#update-config-schema)

### Examples

- [Dynamo](#dynamo-examples)

## Intro

This library aims to centralize your commonly performed actions. They are designed to reduce the amount of times you have to write the same get, put, functions for projects utilizing the [AWS-SDK](https://www.npmjs.com/package/aws-sdk).

### Responses {#intro-responses}

Almost of these helpers utilize promises. You must await the return of the promise to get the proper response

### Errors {#intro-errors}

Returned errors will contain a `standard` and a `custom` property. 

The `standard` is what is sounds like. The general description for the status code.

The `custom` will have any available message thrown by the error it originated from.

Example:

```json
// code 400
{
  "standard": "Bad request",
  "custom": "One of the required keys was not given a value"
}
```

## DynamoDB

These are mainly wrappers around DynamoDB actions, abstracting as much as possible.

### Get Item

1. [Arguments](#get-item-args)
2. [Import Path](#get-item-import-path)
3. [Response](#get-item-response)
4. [Errors](#get-item-errors)
4. [Example](#get-item-example)


<a name="get-item-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `key` | `Object` | The [key schema](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-dynamodb-keyschema.html) for the searched for item  |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |


<a name="get-item-import-path"></a>

#### Import Path 

```js
const { getItem } = require('simple-lambda-actions/dist/dynamo')
```
<a name="get-item-response"></a>



<a name="get-item-response"></a>

#### Response

Returns a promise, which will resolve to:

```js
{
  // your item
  superImportantAttribute: 'YAAAAAASSSS'
}
```

<a name="get-item-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found |
| `404` | `Not Found` | Thrown when the key schema provided did not match any records |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="get-item-example"></a>

#### Example 

```js
const getItem = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  const item = await getItem(tableName, keySchema)
  // finish and return response
}
```

### Put Item

1. [Arguments](#put-item-args)
2. [Import Path](#put-item-import-path)
3. [Response](#put-item-response)
4. [Errors](#put-item-errors)
4. [Example](#put-item-example)

<a name="put-item-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `item` | `Object` | The item you wish to write, **must contain partition key**  |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

<a name="put-item-import-path"></a>

#### Import Path

```js
const { putItem } = require('simple-lambda-actions/dist/dynamo')
```

<a name="put-item-response"></a>

#### Response

Returns a promise, which will resolve to an empty object. This comes directly from DynamoDB.

<a name="put-item-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="put-item-example"></a>

#### Example

```js
const putItem = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  await putItem(tableName, parsedBody, true)
  // parsedBody is what was written
}
```

### Update Item 

1. [Arguments](#update-item-args)
2. [Import Path](#update-item-import-path)
3. [Response](#update-item-response)
4. [Errors](#update-item-errors)
4. [Example](#update-item-example)

<a name="update-item-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `tableName` | `String` | Name of the table you're searching |
| `config` | `Object` | The configuration for updating the record. Schema can be found [here](#update-config-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

<a name="update-item-import-path"></a>

#### Import Path

```js
const { updateItem } = require('simple-lambda-actions/dist/dynamo')
```

<a name="update-item-response"></a>

#### Response

Returns a promise, which will resolve to an empty object. This comes directly from DynamoDB.

<a name="update-item-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="update-item-example"></a>

#### Example

```js
const updateItem = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  await updateItem(tableName, parsedBody, true)
  // parsedBody is what was written
}
```

### Query Item 

1. [Arguments](#query-item-args)
2. [Import Path](#query-item-import-path)
3. [Response](#query-item-response)
4. [Errors](#query-item-errors)
4. [Example](#query-item-example)

<a name="query-item-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `params` | `Object` | The params configuration for querying the records. Schema can be found [here](#query-config-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

<a name="query-item-import-path"></a>

#### Import Path

```js
const { queryItem } = require('simple-lambda-actions/dist/dynamo')
```

<a name="query-item-response"></a>

#### Response

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

<a name="query-item-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `404` | `Not Found` | When no records match your provided query |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="query-item-example"></a>

#### Example

```js
const queryItem = require('simple-lambda-actions/dist/dynamo')

exports.handler = async event => {
  const items = await queryItem(params)
  // parsedBody is what was written
}
```

### Transact Write

This library supports the following actions:

- `ConditionCheck`
- `Delete`
- `Put`
- `Update`

1. [Arguments](#transact-write-args)
2. [Import Path](#transact-write-import-path)
3. [Response](#transact-write-response)
4. [Errors](#transact-write-errors)
4. [Example](#transact-write-example)

<a name="transact-write-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `operations` | `Array` | Array of [transactional operations](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#transactWrite-property). The expected schema can be found [here](#transact-write-schema) |
| `shouldLogParams` | `Boolean` | Optional flag for logging the params before the operation |

<a name="transact-write-import-path"></a>

#### Import Path

```js
const { transactWrite } = require('simple-lambda-actions/dist/dynamo')
```

<a name="transact-write-response"></a>

#### Response

Returns a promise, which will resolve to an empty object.

<a name="transact-write-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `400` | `Bad Request` | Usually thrown when you pass a `tableName` that cannot be found, or if you omit a required key |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="transact-write-example"></a>

#### Example

```js
const transactWrite = require('simple-lambda-actions/dist/dynamo')

const operationsConfig = [
  {
    operationType: 'update',
    TableName: 'TEST_TABLE',
    itemSpecificInfo: {
      partitionKey: '...',
      sortKey: '121212'
    },
    // otherParams will be spread on the operation
    otherParams: {
      UpdateExpression: 'set #a = :x + :y',
      ConditionExpression: '#a < :MAX',
      ExpressionAttributeNames: {'#a' : 'Sum'},
      ExpressionAttributeValues: {
        ':x' : 20,
        ':y' : 45,
        ':MAX' : 100,
      }
    }
  }
]

exports.handler = async event => {
  try {
    await transactWrite(operationsConfig) // will return a promise with an empty object
  } catch (error){
    const { message, statusCode } = error
    // bubble gum in a dish, do what you wish
  }
}
```


<a name="#authentication-with-secrets-manager"></a>

## Authentication With Secrets Manager

These functions are integrated with Secrets Manager, and will fetch the signing key, then perform the auth action in one function call

<a name="#secrets-validate-token"></a>

### Secret Validate Token

1. [Arguments](#secrets-validate-token-args)
2. [Import Path](#secrets-validate-token-import-path)
3. [Response](#secrets-validate-token-response)
4. [Errors](#secrets-validate-token-errors)
4. [Example](#secrets-validate-token-example)

<a name="secrets-validate-token-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `secretId` | `String` | The name of your secret key |
| `givenToken` | `String` | The token you wish to validate |


<a name="secrets-validate-token-import-path"></a>

#### Import Path

```js
const { validateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
```

<a name="secrets-validate-token-response"></a>

#### Response

Returns a promise, which will resolve to:

```js
{
  // your decoded token
}
```

<a name="secrets-validate-token-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `403` | `Unauthorized` | When the token is invalid, or not provided |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="secrets-validate-token-example"></a>

#### Example

```js
const { validateToken } = require('simple-lambda-actions/dist/auth')
const secretId = '...'

exports.handler = async event => {
  const givenToken = event.headers.Authorization
  const decodedPayload = await validateToken(secretId, givenToken)
  // finish and return response
}
```

<a name="#authentication-without-secrets-manager"></a>

### Secret Generate Token

1. [Arguments](#secrets-generate-token-args)
2. [Import Path](#secrets-generate-token-import-path)
3. [Response](#secrets-generate-token-response)
4. [Errors](#secrets-generate-token-errors)
4. [Example](#secrets-generate-token-example)

<a name="secrets-generate-token-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `secretId` | `String` | ID of the secret key you will use to sign the token |
| `payloadToEncode` | `Object` | What you wish to include inside of the token |
| `expiresIn` | `String` | Duration of token validity. A more comprehensive solution can be found [here](https://www.npmjs.com/package/jsonwebtoken) and [here](https://github.com/zeit/ms) |


<a name="secrets-generate-token-import-path"></a>

#### Import Path

```js
const { generateTokenWithSecretsManager } = require('simple-lambda-actions/dist/auth')
```

<a name="secrets-generate-token-response"></a>

#### Response

Returns the token in the form of a string.

```js
{
  token: 'eyasbdjbqjbh12312i7uebkjb' // your token
}
```

<a name="secrets-generate-token-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="secrets-generate-token-example"></a>

#### Example

```js
const { generateToken } = require('simple-lambda-actions/dist/auth')
const secretId = '...'

exports.handler = async event => {
  const parsedBody = JSON.parse(event.body)
  const expiresIn = '24h'
  const decodedPayload = await generateToken(secretId, parsedBody, expiresIn )
  // finish and return response
}
```

<a name="#authentication-without-secrets-manager"></a>

## Authentication Without Secrets Manager

These functions are standalone operations. They are the underlying blocks for the integration with Secrets Manager

<a name="#non-secret-validate-token"></a>

### Non Secret Validate Token

1. [Arguments](#non-secret-validate-token-args)
2. [Import Path](#non-secret-validate-token-import-path)
3. [Response](#non-secret-validate-token-response)
4. [Errors](#non-secret-validate-token-errors)
4. [Example](#non-secret-validate-token-example)

<a name="non-secret-validate-token-args"></a>

#### Arguments

| Name | Type | Description |
| --- | --- | --- |
| `token` | `String` | The token you want to validate |
| `signingKey` | `String` | The secret key you want to use to validate tokens |


<a name="non-secret-validate-token-import-path"></a>

#### Import Path

```js
const { validateToken } = require('simple-lambda-actions/dist/auth/lib')
```

<a name="non-secret-validate-token-response"></a>

#### Response

Returns a promise, which will resolve to:

```js
{
  // your decoded token
}
```

<a name="non-secret-validate-token-errors"></a>

#### Errors

| Error Code | Text | Description |
| :---: | --- | --- |
| `403` | `Unauthorized` | When the token is invalid, or not provided |
| `500` | `Internal Error` | Generic internal server error given when error does not provide code |

<a name="non-secret-validate-token-example"></a>

#### Example

```js
const { validateToken } = require('simple-lambda-actions/dist/auth')
const signingKey = '...'

exports.handler = async event => {
  const givenToken = event.headers.Authorization
  const decodedPayload = await validateToken(givenToken, signingKey)
  // finish and return response
}
```


## Schemas

<a name="update-config-schema"></a>

### Update Item Config

The following must be provided to the `updateItem` function as the `config`

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `Key` | `Object` | The key schema of the item being updated | [Key](#dynamo-key-example) | Yes |
| `ExpressionAttributeNames` | `Object` | How DynamoDB will reference the attribute name of the item being changed | [Expression Name](#dynamo-expression-name) | Yes |
| `ExpressionAttributeValues` | `Object` | How DynamoDB will reference the attribute value being changed | [Expression Values](#dynamo-expression-values) | Yes |
| `UpdateExpression` | `String` | This comma delimited list determines which operations are performed | [Update Expression](#dynamo-update-expression) | Yes |
| `ReturnValues` | `String` |  | [Update Expression](#dynamo-update-expression) | Yes |

<a name="transact-write-schema"></a>

### Transact Write Operation

The following is the schema of a single operation inside of an array which will be executed sequentially in the [transactWrite](#transact-write) helper

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `operationType` | `String` | Enum mapping for the type of operation the operation will be performing. **Not case sensitive** | `delete` | Yes |
| `TableName` | `String` | Name of the table that this operation will be performed on | `development-userTable` | Yes |
| `itemSpecificInfo` | `Object` | The data specific to this operation, such as primary key, or the item being written | [Key or Item](#dynamo-key-example) | Yes |
| `otherParams` | `Object` | Other parameters specific to your operation that may be needed for the specific use case. | [Update Expression](#dynamo-update-expression), [Expression Values](#dynamo-expression-values), etc  | No |

<a name="query-config-schema"></a>

### Query Items

The following is the schema for the params of querying items. If using a range ( sort ) key, all of the range parameters are required. You can however omit them, and just query based on the partition.

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `partitionKeyName` | `String` | Name of the partition key on the table you're querying | `emailAddress` | Yes |
| `partitionKeySearchTerm` | `String` | Value of partition key you are querying. **MUST match exactly** | `yo.mama@lit.live` | Yes |
| `rangeKeyName` | `String` | Name of the range key on the table you're querying | `role` | No |
| `rangeKeySearchTerm` | `String` | Value of range key you are querying | `admin` | No |
| `rangeKeyComparisonOperator` | `String` | Enum of available comparison operators. List of supported options [here](#supported-comparison-operators) | `begins_with` | No |


## Examples

Various examples where space might have been limited

<a name="dynamo-examples"></a>

### DynamoDB 

<a name="dynamo-key-example"></a>

#### Key Schema

```json
{
  "partitionKey": "yo ho, yo ho",
  "rangeKey": "a pirates life for me"
}
```
<a name="dynamo-expression-name"></a>

#### Expression Attribute Name

In this example, `#key_to_update` represents the attribute you are targeting for change, where `keyToUpdate` is the actual attribute name.

Dynamo creates a reference to this key through the first value, and will use it to reference your item attribute.

```json
{ 
  "#key_to_update": "keyToUpdate",
  // more
}
```
<a name="dynamo-expression-values"></a>

#### Expression Attribute Values

In this example, `:nv` represents the new value in the same way [Expression Name's](#dynamo-expression-name) work. `:nv` is mapped to `newValue` and will represent it in further operations


```json
{
  ":nv": "newValue",
  // more
}
```

<a name="dynamo-update-expression"></a>

#### Update Expression

Here we are performing the `set` operation, on the key previously determined, setting the new value to the mapped result of `:nv`

```js
const UpdateExpression = 'set #new_key = :nv,more...'
```
<a name="supported-comparison-operators"></a>

#### Supported Comparison Operators

More information can be found [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property)

Currently the following operators are supported, anything else will throw an error.

The limiting factor is due to uniformity on how the condition expression is formulated.

- `=`
- `<`
- `>`
- `<=`
- `>=`
- `attribute_exists`
- `attribute_not_exists`
- `begins_with`
- `contains`

Various examples where space might have been limited

<a name="dynamo-examples"></a>

### DynamoDB 

<a name="dynamo-key-example"></a>

#### Key Schema

```json
{
  "partitionKey": "yo ho, yo ho",
  "rangeKey": "a pirates life for me"
}
```
<a name="dynamo-expression-name"></a>

#### Expression Attribute Name

In this example, `#key_to_update` represents the attribute you are targeting for change, where `keyToUpdate` is the actual attribute name.

Dynamo creates a reference to this key through the first value, and will use it to reference your item attribute.

```json
{ 
  "#key_to_update": "keyToUpdate",
  // more
}
```
<a name="dynamo-expression-values"></a>

#### Expression Attribute Values

In this example, `:nv` represents the new value in the same way [Expression Name's](#dynamo-expression-name) work. `:nv` is mapped to `newValue` and will represent it in further operations


```json
{
  ":nv": "newValue",
  // more
}
```

<a name="dynamo-update-expression"></a>

#### Update Expression

Here we are performing the `set` operation, on the key previously determined, setting the new value to the mapped result of `:nv`

```js
const UpdateExpression = 'set #new_key = :nv,more...'
```
<a name="supported-comparison-operators"></a>

#### Supported Comparison Operators

More information can be found [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property)

Currently the following operators are supported, anything else will throw an error.

The limiting factor is due to uniformity on how the condition expression is formulated.

- `=`
- `<`
- `>`
- `<=`
- `>=`
- `attribute_exists`
- `attribute_not_exists`
- `begins_with`
- `contains`