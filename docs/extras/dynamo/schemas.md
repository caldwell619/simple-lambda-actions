# Schemas

## Update Item Config

The following must be provided to the `updateItem` function as the `config`

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `Key` | `Object` | The key schema of the item being updated | [Key](#dynamo-key-example) | Yes |
| `ExpressionAttributeNames` | `Object` | How DynamoDB will reference the attribute name of the item being changed | [Expression Name](#dynamo-expression-name) | Yes |
| `ExpressionAttributeValues` | `Object` | How DynamoDB will reference the attribute value being changed | [Expression Values](#dynamo-expression-values) | Yes |
| `UpdateExpression` | `String` | This comma delimited list determines which operations are performed | [Update Expression](#dynamo-update-expression) | Yes |
| `ReturnValues` | `String` |  | [Update Expression](#dynamo-update-expression) | Yes |

## Transact Write Operation

The following is the schema of a single operation inside of an array which will be executed sequentially in the [transactWrite](#transact-write) helper

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `operationType` | `String` | Enum mapping for the type of operation the operation will be performing. **Not case sensitive** | `delete` | Yes |
| `TableName` | `String` | Name of the table that this operation will be performed on | `development-userTable` | Yes |
| `itemSpecificInfo` | `Object` | The data specific to this operation, such as primary key, or the item being written | [Key or Item](#dynamo-key-example) | Yes |
| `otherParams` | `Object` | Other parameters specific to your operation that may be needed for the specific use case. | [Update Expression](#dynamo-update-expression), [Expression Values](#dynamo-expression-values), etc  | No |

## Query Items

The following is the schema for the params of querying items. If using a range ( sort ) key, all of the range parameters are required. You can however omit them, and just query based on the partition.

| Name | Type | Description | Example | Required |
| --- | --- | --- | --- | :---: |
| `partitionKeyName` | `String` | Name of the partition key on the table you're querying | `emailAddress` | Yes |
| `partitionKeySearchTerm` | `String` | Value of partition key you are querying. **MUST match exactly** | `yo.mama@lit.live` | Yes |
| `rangeKeyName` | `String` | Name of the range key on the table you're querying | `role` | No |
| `rangeKeySearchTerm` | `String` | Value of range key you are querying | `admin` | No |
| `rangeKeyComparisonOperator` | `String` | Enum of available comparison operators. List of supported options [here](#supported-comparison-operators) | `begins_with` | No |

