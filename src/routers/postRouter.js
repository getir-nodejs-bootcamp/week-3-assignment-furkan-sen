const router = require('express').Router()
const controller = require('../controllers/postController')
const { postValidator } = require('../middlewares/validations')

router.get('/', controller.get)

router.get('/:id/:title', controller.read)

router.post('/insert', postValidator(), controller.insert)

router.post('/update', postValidator(), controller.update)

router.get('/delete/:id', controller.remove)

module.exports = router