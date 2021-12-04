const categoryModel = require('../models/category')
const postModel = require('../models/post')
const { validationResult } = require('express-validator')

const get = async (req, resp) => {
    const categories = await categoryModel.find()
    const posts = await postModel.find()
    resp.render('./post/index.ejs', {
        layout: '../layouts/_layout.ejs',
        categories,
        posts
    })
}

const read = async (req, resp) => {
    const post = await postModel.findById(req.params.id)
    resp.render('./post/read.ejs', {
        layout: '../layouts/_layout.ejs',
        post
    })
}

const insert = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const inserted = await postModel.create(req.body)
            if (!inserted) {
                req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
            }  
        } catch (error) {
            req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
        }
    } else {
        req.flash('crudErrors', errors.array())
    }
    resp.redirect('/posts')
}

const update = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const updated = await postModel.findByIdAndUpdate(req.body._id,  {
                title: req.body.title,
                caption: req.body.caption,
                content: req.body.content,
                categories: req.body.categories,
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
    resp.redirect('/posts')
}

const remove = async (req, resp) => {
    await postModel.findByIdAndDelete(req.params.id)
    resp.redirect('/posts')
}

module.exports = {
    get,
    insert,
    update,
    remove,
    read
}