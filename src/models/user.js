const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const schema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: 'users',
    minimize: false
})

const model = mongoose.model('user', schema)

module.exports = model