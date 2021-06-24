const mongoose = require('mongoose');
const Nouveaute = require('../models/nouveaute')

module.exports = async function (req, res, next) {
    const {
        nouveauteId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(nouveauteId)) {
        return res.status(403).json({
            error: 'Product not found'
        })
    }

    try {
        let nouveaute = await Nouveaute.findById(nouveauteId)

        if (!nouveaute) {
            return res.status(403).json({
                error: 'Product not found'
            })
        }

        req.nouveaute = nouveaute
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
} 