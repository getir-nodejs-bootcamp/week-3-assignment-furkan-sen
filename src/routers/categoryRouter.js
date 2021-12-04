const router = require('express').Router()
const controller = require('../controllers/categoryController')
const { categoryValidator } = require('../middlewares/validations')

router.get('/', controller.get)

router.post('/insert', categoryValidator(), controller.insert)

router.post('/update', categoryValidator(), controller.update)

router.get('/delete/:id', controller.remove)

module.exports = router