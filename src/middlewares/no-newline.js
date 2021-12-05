// req.body parametleri iceriginde "/r" "/n" var ise "<br/>" ile replace

module.exports = (req,resp,next) => {
    if (req.body) {
        for (let key in req.body) {
            if (typeof(req.body[key]) == 'string') {
                req.body[key] = req.body[key].replace(/(?:\r\n|\r|\n)/g, '<br />')
            }
        }
    }
    next()
}