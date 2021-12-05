const router = require('express').Router()
const controller = require('../controllers/postController')
const { postValidator } = require('../middlewares/validations')
const noNewline = require('../middlewares/no-newline')

router.get('/', controller.get)

router.get('/:id/:title', controller.read)

router.post('/insert', postValidator(), noNewline, controller.insert)

router.post('/update', postValidator(), noNewline, controller.update)

router.get('/delete/r/:id', controller.remove)

module.exports = router
