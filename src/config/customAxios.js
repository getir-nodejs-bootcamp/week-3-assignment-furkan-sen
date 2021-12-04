const axios = require('axios')
module.exports = axios.create({
    timeout: 1000,
    baseURL: 'https://jsonplaceholder.typicode.com'
})