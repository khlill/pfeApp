const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   
    title: {
        type: String,
 
        maxlength: 2000
    },
    description: {
        type: String,
    
        maxlength: 2000
    },
    url: {
        type: String,
        maxlength: 2000
    },
    photo: {
        data: Buffer,
        contentType: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Slider", productSchema)