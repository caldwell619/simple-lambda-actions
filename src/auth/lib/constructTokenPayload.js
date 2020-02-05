const constructTokenPayload = (categoryOfTokenRequester, tokenRequesterInformation, allowedStatements) => {
  // user can be an admin, or a normal user
  const userType = categoryOfTokenRequester.toLowerCase()
  const requesterInstitutionId = tokenRequesterInformation.institutionId || null
  const keyForId = [`${userType}Id`]
  const idOfRequestor = tokenRequesterInformation[`${userType}Id`]
  const tokenPayload = {
    // options are admin, user, etc
    [userType]: {
      // defining the user / admin ID
      [keyForId]: idOfRequestor,
      emailAddress: tokenRequesterInformation.emailAddress,
      // This is intentional to tell something about bearer's actual role
      role: tokenRequesterInformation.role
    },
    statements: allowedStatements
  }
  if (requesterInstitutionId) {
    tokenPayload[userType].institutionId = requesterInstitutionId
  }
  return tokenPayload
}

module.exports = constructTokenPayload