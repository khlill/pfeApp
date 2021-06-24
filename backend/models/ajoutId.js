const mongoose = require('mongoose');

const idSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    nameProd: {
        type: String,
        required: true,
    },  
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Id = mongoose.model('Id', idSchema) 
module.exports = Id