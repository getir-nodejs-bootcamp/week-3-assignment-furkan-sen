const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const commentSchema = require('./comment')

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250
    },
    caption: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000
    },
    categories: {
        type: [String],
    },
    comments: {
        type: [commentSchema],
        required: false,
    }
}, {
    timestamps: true,
    collection: 'posts',
    minimize: false
})

const model = mongoose.model('post', schema)

module.exports = model