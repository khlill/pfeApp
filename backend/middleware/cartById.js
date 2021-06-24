const mongoose = require('mongoose');
const Product = require('../models/cart')

module.exports = async function (req, res, next) {
    const {
        cartId
    } = req.params

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(403).json({
            error: 'Product not found'
        })
    }

    try {
        let cart = await Product.findById(productId)

        if (!cart) {
            return res.status(403).json({
                error: 'Product not found'
            })
        }

        req.cart = cart
    } catch (error) {
        console.log(error)
        res.send('Server error');
    }

    next()
} 