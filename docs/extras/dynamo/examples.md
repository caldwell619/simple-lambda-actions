# Examples

Various examples where space might have been limited


## Key Schema

```json
{
  "partitionKey": "yo ho, yo ho",
  "rangeKey": "a pirates life for me"
}
```

## Expression Attribute Name

In this example, `#key_to_update` represents the attribute you are targeting for change, where `keyToUpdate` is the actual attribute name.

Dynamo creates a reference to this key through the first value, and will use it to reference your item attribute.

```json
{ 
  "#key_to_update": "keyToUpdate",
  // more
}
```

## Expression Attribute Values

In this example, `:nv` represents the new value in the same way [Expression Name's](#dynamo-expression-name) work. `:nv` is mapped to `newValue` and will represent it in further operations


```json
{
  ":nv": "newValue",
  // more
}
```

## Update Expression

Here we are performing the `set` operation, on the key previously determined, setting the new value to the mapped result of `:nv`

```js
const UpdateExpression = 'set #new_key = :nv,more...'
```

## Supported Comparison Operators

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


