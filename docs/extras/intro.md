# Intro

This library aims to centralize your commonly performed actions. They are designed to reduce the amount of times you have to write the same get, put, functions for projects utilizing the [AWS-SDK](https://www.npmjs.com/package/aws-sdk).

## Responses

Almost of these helpers utilize promises. You must await the return of the promise to get the proper response

## Errors

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