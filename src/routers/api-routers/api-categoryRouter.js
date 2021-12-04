const router = require('express').Router()
const controller = require('../../controllers/api-controllers/categoryController')
const { categoryValidator } = require('../../middlewares/validations')

router.get('/', controller.get)

router.post('/insert', categoryValidator(), controller.insert)

router.patch('/update', categoryValidator(), controller.update)

router.delete('/delete/:id', controller.remove)

module.exports = router