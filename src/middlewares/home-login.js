const { tokenVerify } = require('../helper/jwt-helper')

module.exports = (req,resp,next) => {
    if (req.url == '/') {
        if (req.headers.cookie) {
            const authToken = req.headers.cookie.split(';').find(x => x.split('=')[0].trim() == 'authToken')
            if (authToken) {
                const token = authToken.split('=')[1]
                if(token) {
                    const verified = tokenVerify(token)
                    if(verified) {
                        req.flash('auth', [{
                            fullname: verified.fullname,
                            email: verified.email
                        }])
                    }
                }
            }
        }
    }
    next()
}