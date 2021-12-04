const { hash, compare } = require('bcrypt')

const implementHash = (payload) => {
  return hash(payload, 10)
} 

const verifyHash = (payload, hashed) => {
  return compare(payload, hashed)
} 

module.exports = {
  implementHash,
  verifyHash
}