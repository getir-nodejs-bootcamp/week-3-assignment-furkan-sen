const { body } = require('express-validator')

const categoryValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('name required')
            .isLength({max:200}).withMessage('name max length 200'),
        body('description')
            .trim()
            .notEmpty().withMessage('description required')     
            .isLength({max:500}).withMessage('description max length 500'),
    ]
}

const registerValidator = () => {
    return [
        body('fullname')
            .trim()
            .notEmpty().withMessage('fullname required')
            .isLength({max:100}).withMessage('fullname max length 100'),
        body('email')
            .trim()
            .notEmpty().withMessage('email required')
            .isEmail().withMessage('invalid e-mail')
            .isLength({max:100}).withMessage('description max length 100'),
        body('password')
            .trim()
            .notEmpty().withMessage('password required')
            .isLength({max:16}).withMessage('password max length 16'),
    ]
}

const loginValidator = () => {
    return [
        body('email')
            .trim()
            .notEmpty().withMessage('email required')
            .isEmail().withMessage('invalid e-mail')
            .isLength({max:100}).withMessage('description max length 100'),
        body('password')
            .trim()
            .notEmpty().withMessage('password required')
            .isLength({max:16}).withMessage('password max length 16'),
    ]
}

const postValidator = () => {
    return [
        body('title')
            .trim()
            .notEmpty().withMessage('title required')
            .isLength({max:250}).withMessage('title max length 100'),
        body('caption')
            .trim()
            .notEmpty().withMessage('caption required')
            .isLength({max:1000}).withMessage('caption max length 1000'),
        body('content')
            .trim()
            .notEmpty().withMessage('content required')
            .isLength({max:5000}).withMessage('content max length 5000'),
        body('categories')
            .trim()
            .notEmpty().withMessage('category required')
    ]
}

module.exports = {
    categoryValidator,
    registerValidator,
    loginValidator,
    postValidator
}