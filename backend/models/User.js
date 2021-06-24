const mongoose = require('mongoose');
const Product = require('./Product');

const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
        email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    cart: {
        items: [{
            productId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
            qty: {
                    type: Number,
                    required: true
                }
            }],
            totalPrice: Number
    }
});


UserSchema.methods.addToCart = async function(productId) {
    const product = await Product.findById(productId);
    if (product) {
        const cart = this.cart;
        const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
        if (isExisting >= 0) {
            cart.items[isExisting].qty += 1;
        } else {
            cart.items.push({ productId: product._id, qty: 1 });
        }
        if (!cart.totalPrice) {
            cart.totalPrice = 0;
        }
        cart.totalPrice += product.price;
        return this.save();
    }

};


UserSchema.methods.removeFromCart = function(productId) {
    const cart = this.cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
    if (isExisting >= 0) {
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}

module.exports = User = mongoose.model('User',UserSchema)