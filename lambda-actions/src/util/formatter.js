exports.capitalizeWord = wordToCapitalize => {
  const firstLetterCapitalized = wordToCapitalize[0].toUpperCase()
  const restOfWordLowerCased = wordToCapitalize.substr(1).toLowerCase()
  return firstLetterCapitalized + restOfWordLowerCased
}

exports.bodyParser = body => {
  if(typeof body === 'string'){
    return JSON.parse(body)
  } else {
    return body
  }
}