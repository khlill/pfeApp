const mongoose = require('mongoose');
const Slider = require('../models/slider');


module.exports = async function (req, res, next) {
    const {
        sliderId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(sliderId)) {
        return res.status(403).json({
            error: 'slider not found'
        })
    }

    try {
        let slider = await Slider.findById(sliderId)

        if (!slider) {
            return res.status(403).json({
                error: 'slider not found'
            })
        }

        req.slider = slider
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
} 