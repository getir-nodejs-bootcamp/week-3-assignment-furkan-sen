const router = require('express').Router()
const controller = require('../../controllers/api-controllers/postController')
const { postValidator } = require('../../middlewares/validations')

router.get('/', controller.get)

router.get('/:id', controller.read)

router.post('/insert', postValidator(), controller.insert)

router.patch('/update', postValidator(), controller.update)

router.delete('/delete/:id', controller.remove)

module.exports = router