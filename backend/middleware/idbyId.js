const mongoose = require('mongoose');
const Id = require('../models/ajoutId');


module.exports = async function (req, res, next) {
    const {
        newId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(newId)) {
        return res.status(403).json({
            error: 'slider not found'
        })
    }

    try {
        let id = await Id.findById(newId)

        if (!id) {
            return res.status(403).json({
                error: 'slider not found'
            })
        }

        req.id = id
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
} 