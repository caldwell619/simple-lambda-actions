# Simple Lambda Actions

A collection of common operations done with [AWS Lambda](https://aws.amazon.com/lambda/?nc2=h_ql_prod_cp_lbd)

<p align="center">
<!-- version of package -->
<a href="https://www.npmjs.com/package/@simple-lambda-actions/core" target="__blank">
<img src="https://img.shields.io/npm/v/simple-lambda-actions" alt="NPM version" /></a>
<!-- Downloads -->
<a href="https://www.npmjs.com/package/@vueuse/core" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/simple-lambda-actions"/></a>
<!-- Last commit -->
<a href="https://github.com/caldwell619/simple-lambda-actions" target="__blank"><img src="https://img.shields.io/github/last-commit/caldwell619/simple-lambda-actions.svg?color=a38eed" alt="GitHub last commit" /></a>
<!-- Issues -->
<a href="https://github.com/caldwell619/simple-lambda-actions/issues" target="__blank"><img src="https://img.shields.io/github/issues/caldwell619/simple-lambda-actions.svg?color=c977be" alt="GitHub issues" /></a>
<!-- Stars -->
<a href="https://github.com/caldwell619/simple-lambda-actions" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/caldwell619/simple-lambda-actions?style=social"></a>
</p>


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
- [Batch Write](./docs/dynamo/batch-write.md)

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



