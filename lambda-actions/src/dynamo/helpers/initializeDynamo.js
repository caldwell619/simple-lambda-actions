const { DynamoDB } = require('aws-sdk')
let options = {}
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = 'http://host.docker.internal:8000'
}
const DocumentClient = new DynamoDB.DocumentClient(options)

module.exports = DocumentClient