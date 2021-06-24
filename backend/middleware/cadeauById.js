const mongoose = require('mongoose');
const Cadeau = require('../models/cadeau')

module.exports = async function (req, res, next) {
    const {
        cadeauId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(cadeauId)) {
        return res.status(403).json({
            error: 'Product not found'
        })
    }

    try {
        let cadeau = await Cadeau.findById(cadeauId)

        if (!cadeau) {
            return res.status(403).json({
                error: 'Product not found'
            })
        }

        req.cadeau = cadeau
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
} 