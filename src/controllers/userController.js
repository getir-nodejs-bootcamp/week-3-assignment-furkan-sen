const userModel = require('../models/user')
const { validationResult } = require('express-validator')
const { implementHash, verifyHash } = require('../helper/crypt-helper')
const { tokenSign } = require('../helper/jwt-helper')

const register = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            req.body.password = await implementHash(req.body.password)
            const inserted = await userModel.create(req.body)
            if (inserted) {
                req.flash('successes', [{param:'success', msg:'you have been registered :)'}])
            } else {
                req.flash('crudErrors', [{param:'error', msg:'email must be unique'}])
            }  
        } catch (error) {
            req.flash('crudErrors', [{param:'error', msg:'email must be unique'}])
        }
    } else {
        req.flash('crudErrors', errors.array())
    }
    resp.redirect('/')
}

const login = async (req, resp) => {
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
                    resp.cookie('authToken', token, {
                        maxAge: 1000 * 60 * 60 * 24
                    })
                    req.flash('auth', [{
                        fullname: users[0].fullname,
                        email: users[0].email
                    }])
                    req.flash('successes', [{param:'success', msg:'login success :)'}])
                } else {
                    req.flash('crudErrors', [{param:'error', msg:'wrong email or password'}])
                }
            } else {
                req.flash('crudErrors', [{param:'error', msg:'unregistered user'}])
            }
        } catch (error) {
            console.log(error)
            req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
        }
    } else {
        req.flash('crudErrors', errors.array())
    }
    resp.redirect('/')
}

const logout = (req, resp) => {
    resp.cookie('authToken', null, {
        maxAge: -1000
    })
    resp.redirect('/')
}


module.exports = {
    register,
    login,
    logout
}