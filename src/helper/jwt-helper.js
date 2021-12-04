const { verify, sign } = require('jsonwebtoken')

const tokenVerify = (token) => {
  return verify(token, process.env.JWT_KEY, {
    ignoreExpiration: false,
  })
}

const tokenSign = (payload) => {
    return sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    })
} 

module.exports = {
  tokenVerify,
  tokenSign
}
