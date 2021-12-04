const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 200,
        unique: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 500
    }
}, {
    timestamps: true,
    collection: 'categories',
    minimize: false
})

const model = mongoose.model('category', schema)

module.exports = model