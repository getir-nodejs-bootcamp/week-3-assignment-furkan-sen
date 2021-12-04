const router = require('express').Router()
const controller = require('../controllers/userController')
const { registerValidator, loginValidator } = require('../middlewares/validations')

router.post('/register', registerValidator(), controller.register)

router.post('/login', loginValidator(), controller.login)

router.get('/logout', controller.logout)

module.exports = router