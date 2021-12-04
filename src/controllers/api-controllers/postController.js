const postModel = require('../../models/post')
const { validationResult } = require('express-validator')
const { ResultDataModel, ResultModel} = require('../../models/result-model')

const get = async (req, resp) => {
    const posts = await postModel.find()
    result = new ResultDataModel(true, 'found', posts, null)
    resp.status(200).json(result)
}

const read = async (req, resp) => {
    const post = await postModel.findById(req.params.id)
    result = new ResultDataModel(true, 'found', post, null)
    resp.status(200).json(result)
}

const insert = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const inserted = await postModel.create(req.body)
            if (inserted) {
                result = new ResultDataModel(true, 'inserted', inserted, null)
                resp.status(201).json(result) 
            } else {
                req.flash('crudErrors', [{param:'error', msg:'unexpected error'}])
            }
        } catch (error) {
            result = new ResultModel(false, 'not inserted', ['unexpected error'])
            resp.status(400).json(result) 
        }
    } else {
        result = new ResultModel(false, 'not inserted', errors.array().map(x => x.msg))
        resp.status(400).json(result) 
    }
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
            if (updated) {
                result = new ResultDataModel(true, 'updated', updated, null)
                resp.status(200).json(result)  
            } else {
                result = new ResultModel(false, 'not updated', ['unexpected error'])
                resp.status(400).json(result) 
            }
        } catch (error) {
            result = new ResultModel(false, 'not updated', ['unexpected error'])
            resp.status(400).json(result) 
        }
    } else {
        result = new ResultModel(false, 'not updated', ['unexpected error'])
        resp.status(400).json(result) 
    }
}

const remove = async (req, resp) => {
    await postModel.findByIdAndDelete(req.params.id)
    result = new ResultModel(true, 'deleted', null)
    resp.status(200).json(result)  
}

module.exports = {
    get,
    insert,
    update,
    remove,
    read
}