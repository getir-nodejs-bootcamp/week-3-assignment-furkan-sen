// mvc routes yapilari icin session cookie bakılarak toke uzerinden yetki kontrolu

const { tokenVerify } = require('../helper/jwt-helper')

module.exports = (req,resp,next) => {
    let goHome = true;
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
                    goHome = false
                    next()
                }
            }
        }
    }
    if(goHome) {
        resp.redirect('/')
    }
}