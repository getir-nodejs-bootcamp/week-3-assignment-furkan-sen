const router = require('express').Router()
const controller = require('../controllers/commentController')

router.get('/', controller.get)

router.post('/insert', controller.insert)

router.patch('/patch', controller.update)

router.delete('/delete/:id', controller.remove)

module.exports = router