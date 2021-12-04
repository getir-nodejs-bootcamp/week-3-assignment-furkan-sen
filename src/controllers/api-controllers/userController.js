const userModel = require('../../models/user')
const { validationResult } = require('express-validator')
const { implementHash, verifyHash } = require('../../helper/crypt-helper')
const { tokenSign } = require('../../helper/jwt-helper')
const { ResultDataModel, ResultModel} = require('../../models/result-model')

const register = async (req, resp) => {
    let result = null
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            req.body.password = await implementHash(req.body.password)
            const inserted = await userModel.create(req.body)
            if (inserted) {
                delete inserted.password
                result = new ResultDataModel(true, 'registered', inserted, null)
                resp.status(201).json(result)
            } else {
                result = new ResultModel(false, 'not registered', ['email must be unique'])
                resp.status(400).json(result)
            }  
        } catch (error) {
            result = new ResultModel(false, 'not registered', ['email must be unique'])
            resp.status(400).json(result)
        }
    } else {
        result = new ResultModel(false, 'not registered', errors.array().map(x => x.msg))
        resp.status(400).json(result)
    }
}

const login = async (req, resp) => {
    let result = null
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const users = await userModel.find({email: req.body.email.toLowerCase()})
            if (users.length>0) {
                const passwordCheck = await verifyHash(req.body.password, users[0].password)
                if(passwordCheck) {
                    const token = tokenSign({
                        fullname: users[0].fullname,
                        email: users[0].email
                    });      
                    let user = {
                        fullname: users[0].fullname,
                        email: users[0].email,
                        token
                    }
                    result = new ResultDataModel(true, 'login success', user, null)
                    resp.status(200).json(result)
                } else {
                    result = new ResultModel(false, 'login failed', ['wrong email or password'])
                    resp.status(400).json(result)
                }
            } else {
                result = new ResultModel(false, 'login failed', ['unregistered user'])
                resp.status(400).json(result)
            }
        } catch (error) {
            result = new ResultModel(false, 'login failed', ['unexpected error'])
            resp.status(400).json(result)
        }
    } else {
        result = new ResultModel(false, 'login failed', errors.array().map(x => x.msg))
        resp.status(400).json(result)
    }
}

module.exports = {
    register,
    login
}