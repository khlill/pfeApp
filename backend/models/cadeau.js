const mongoose = require('mongoose')


const cadeauSchema = new mongoose.Schema({
    nameProd: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    url:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

const Cadeau = mongoose.model('Cadeau', cadeauSchema) 
module.exports = Cadeau