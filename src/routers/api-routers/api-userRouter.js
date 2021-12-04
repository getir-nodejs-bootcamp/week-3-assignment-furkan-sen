const router = require('express').Router()
const controller = require('../../controllers/api-controllers/userController')
const { registerValidator, loginValidator } = require('../../middlewares/validations')

router.post('/register', registerValidator(), controller.register)

router.post('/login', loginValidator(), controller.login)

module.exports = router