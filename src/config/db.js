const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CSTR, () => console.log('db connected'))