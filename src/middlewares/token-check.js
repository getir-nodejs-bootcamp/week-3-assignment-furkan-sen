const { tokenVerify } = require('../helper/jwt-helper')

module.exports = (req,resp,next) => {
    let unauthorized = true;
    if (req.headers.authorization) {
        const token = req.headers.authorization
        const verified = tokenVerify(token)
        if(verified) {
            req.flash('auth', [{
                fullname: verified.fullname,
                email: verified.email
            }])
            unauthorized = false
            next()
        }         
    }
    if(unauthorized) {
        resp.status(401).write('unauthorized')
        resp.end()
    }
}