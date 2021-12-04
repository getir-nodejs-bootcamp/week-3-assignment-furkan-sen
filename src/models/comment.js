const { Schema } = require('mongoose')

const schema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    }
}, {
    timestamps: true,
    collection: 'comments',
    minimize: false
})

module.exports = schema