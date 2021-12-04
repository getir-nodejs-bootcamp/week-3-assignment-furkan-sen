const categoryModel = require('../../models/category')
const { validationResult } = require('express-validator')
const { ResultDataModel, ResultModel} = require('../../models/result-model')

const get = async (req, resp) => {
    const categories = await categoryModel.find()
    result = new ResultDataModel(true, 'found', categories, null)
    resp.status(200).json(result)
}

const insert = async (req, resp) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const inserted = await categoryModel.create(req.body)
            if (inserted) {
                result = new ResultDataModel(true, 'inserted', inserted, null)
                resp.status(201).json(result)    
            } else {
                result = new ResultModel(false, 'not inserted', ['category name must be unique'])
                resp.status(400).json(result)   
            }
        } catch (error) {
            result = new ResultModel(false, 'not inserted', ['category name must be unique'])
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
            const updated = await categoryModel.findByIdAndUpdate(req.body._id,  {
                name: req.body.name,
                description: req.body.description,
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
    await categoryModel.findByIdAndDelete(req.params.id)
    result = new ResultModel(true, 'deleted', null)
    resp.status(200).json(result)    
}

module.exports = {
    get,
    insert,
    update,
    remove
}