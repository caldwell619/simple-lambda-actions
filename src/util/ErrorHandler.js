class CustomError extends Error {
  constructor(payload) {
    super(payload.message)
    this.name = 'CustomError'
    this.statusCode = payload.statusCode
  }
}

module.exports = CustomError