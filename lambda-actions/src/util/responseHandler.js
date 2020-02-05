// custom allows the consumer of the response to use the non standard version
const defineResponseMap = body => ({
  '200': JSON.stringify({ ...body }),
  '400': JSON.stringify({ standard: 'Bad request', custom: body }),
  '403': JSON.stringify({ standard: 'Unauthorized', custom: body }),
  '404': JSON.stringify({ standard: 'Item not found', custom: body }),
  '500': JSON.stringify({standard: 'Internal error', custom: body})
})

const createHeaders = (corsUrl = '*', httpMethod = 'GET,POST,PUT,DELETE') => ({
  'Access-Control-Allow-Origin': corsUrl,
  'Access-Control-Allow-Methods': `${httpMethod},OPTIONS`,
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
  'Cache-Control': 'no-store, no-cache',
  'Pragma': 'no-cache',
  'Strict-Transport-Security': 'max-age=31536000',
  'Content-Type': 'application/json'
})

const responseHandler = (headers, body, statusCode) => {
  const responseMap = defineResponseMap(body)
  const responseObject = { 
    headers, 
    statusCode,
    body: responseMap[statusCode] || JSON.stringify(body)
   }
  return responseObject
}

const extractResponseParams = (httpMethod, config) => {
  let corsUrl 
  if(config && config.aws && config.aws.domains){
    corsUrl = `https://${config.aws.domains.client}.${config.aws.domains.root}`
  } else {
    corsUrl = '*'
  }
  return { corsUrl, httpMethod }
}

class Responder {
  constructor(config){
    this.headers = createHeaders(config.corsUrl, config.httpMethod)
  }

  respond(body, statusCode){
    return responseHandler(this.headers, body, statusCode)
  }
}

module.exports = {
  Responder,
  extractResponseParams
}