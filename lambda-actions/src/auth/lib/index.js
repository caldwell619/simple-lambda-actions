const validateToken = require('./validateToken')
const generateToken = require('./generateToken')
const determineResourceAccess = require('./determineResourceAccess')
const fullServiceAuth = require('./fullService')

exports.validateToken = validateToken
exports.generateToken = generateToken
exports.determineResourceAccess = determineResourceAccess

module.exports = fullServiceAuth