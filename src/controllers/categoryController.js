const categoryModel = require('../models/category')
const { validationResult } = require('express-validator')

const get = async (req, resp) => {
    const categories = await categoryModel.find()
    resp.render('./category/index.ejs', {
        layout: '../layouts/_layout.ejs',
        categories
    })
}

const insert = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const inserted = await categoryModel.create(req.body)
            if (!inserted) {
                req.flash('crudErrors', [{param:'error', msg:'category name must be unique'}])
            }  
        } catch (error) {
            req.flash('crudErrors', [{param:'error', msg:'category name must be unique'}])
        }
    } else {
        req.flash('crudErrors', errors.array())
    }
    resp.redirect('/categories')
}

const update = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const updated = await categoryModel.findByIdAndUpdate(req.body._id,  {
                name: req.body.name,
                description: req.body.description,
            }, {
                new: true
            })
            if (!updated) {
                req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
            }
        } catch (error) {
            req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
        }
    } else {
        req.flash('crudErrors', errors.array())
    }
    resp.redirect('/categories')
}

const remove = async (req, resp) => {
    await categoryModel.findByIdAndDelete(req.params.id)
    resp.redirect('/categories')
}

module.exports = {
    get,
    insert,
    update,
    remove
}