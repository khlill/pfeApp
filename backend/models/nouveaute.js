const mongoose = require('mongoose')


const nouveauteSchema = new mongoose.Schema({
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

const Nouveaute = mongoose.model('Nouveaute', nouveauteSchema) 
module.exports = Nouveaute