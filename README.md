# Common Lambda Actions

A collection of common operations done with [AWS Lambda](https://aws.amazon.com/lambda/?nc2=h_ql_prod_cp_lbd)

## What Purpose Does this Serve?

It got tiring writing the same lines of code, over and over to do common actions. The SDK is great, but sometimes requires a bit of setup. This library aims to manage the setup a bit, and let's you just call the operation.

## Intro

- [Intro](./docs/extras/intro.md)
- [Responses](./docs/extras/intro.md#responses)
- [Errors](./docs/extras/intro.md#errors)

## DynamoDB

- [Get Item](./docs/dynamo/get-item.md)
- [Put Item](./docs/dynamo/put-item.md)
- [Update Item](./docs/dynamo/update-item.md)
- [Query Items](./docs/dynamo/query-item.md)
- [Transact Write](./docs/dynamo/transact-write.md)

## Secrets Manager

- [Get Secret Value](./docs/secrets-manager/get-secret.md)

## Auth With Secrets Manager

A full service approach, fetching the secret you were likely to be using anyway.

- [Validate Token](./docs/auth/secrets-manager/validate-token.md)
- [Generate Token](./docs/auth/secrets-manager/generate-token.md)

_*More opinionated territory_
- [Full Service](./docs/auth/secrets-manager/full-service.md)

## Auth Without Secrets Manager

The building blocks of the secrets manager version. Bare bones implementation. Good for building blocks, rather than a one stop shop.

- [Validate Token](./docs/auth/validate-token.md)
- [Generate Token](./docs/auth/generate-token.md)

## Responder

- [Respond](#respond)

## Schemas

- [Update Item Config](#update-config-schema)

## Examples

- [Dynamo](#dynamo-examples)



