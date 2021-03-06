const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const productById = require('../middleware/productById');
const _ = require('lodash');
const {send} = require('process');

// @route   Get api/product/:productId
// @desc    Get a list of products  with filter 
//  options(order = asc or desc, sortBy any product propert like name, limit, number of returned product)
// @access  Public

router.get('/list', async (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    try {
        let products = await Product.find({})
            .select('-photo')
            .populate('category')
            .sort([
                [sortBy, order]
            ])
            .limit(limit).exec();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid querys');
    }
});

// @route   Get api/product/categories
// @desc    Get a list categories of products
// @access  Public

router.get('/categories', async (req, res) => {
    try {
        let categories = await Product.distinct('category')
        if (!categories) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

// @route   Post api/product/filter
// @desc    Create a Product
// @access  Private Admin
// @desc    filter a Product by price and category
// @access  Public

router.post('/filter', async (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    try {
        let products = await Product.find(findArgs)
            .select('-photo')
            .populate('category')
            .sort([
                [sortBy, order]
            ])
            .skip(skip)
            .limit(limit);
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Products not found');
    }

})

// @route   Get api/product/search
// @desc    Get a list products by search quey 
// @access  Public

router.get("/search", async (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.nameProd = {
            $regex: req.query.search,
            $options: 'i'
        };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
    }
    try {
        let products = await Product.find(query).select('-photo');
        res.json(products);

    } catch (error) {
        console.log(error)
        res.status(500).send('Error to get products')
    }

})

// @route   Get api/product/:productId
// @desc    Get a list related to  product 
// @access  Public

router.get('/related/:productId', productById, async (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    let order = req.query.order ? req.query.order : 'desc';
    try {
        let products = await Product.find({
                _id: {
                    $ne: req.product
                },
                category: req.product.category
            }).select('-photo')
            .limit(limit)
            .sort([
                [sortBy, order]
            ])
            .populate('category', '_id nameProd')
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid querys');
    }
})

// @route   Post api/product/
// @desc    Create a Product
// @access  Private Admin

router.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        if (!files.photo) {
            return res.status(400).json({
                error: 'Image is required',
            });
        }
        if (
            files.photo.type !== 'image/jpeg' &&
            files.photo.type !== 'image/jpg' &&
            files.photo.type !== 'image/png'
        ) {
            return res.status(400).json({
                error: 'Image type not allowed',
            });
        }
        // Check for all fields
        const {
            nameProd,
            description,
            price,
            category,
            quantity
        } = fields;
        if (
            !nameProd ||
            !description ||
            !price ||
            !category ||
            !quantity
        ) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }
        let product = new Product(fields);
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size',
            });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
        try {
            await product.save();
            res.json(fields);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

// @route   Get api/product/productId
// @desc    Get a Product information
// @access  Public

router.get('/:productId', productById, (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
});

// @route   Get api/product/photo/productId
// @desc    Get a Product Image
// @access  Public

router.get('/photo/:productId', productById, (req, res) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    res.status(400).json({
        error: 'failed to load image',
    });
});

// @route   Delete api/product/productId
// @desc    Delete a Product
// @access  Private Admin

router.delete('/:productId', productById, async (req, res) => {
    let product = req.product;
    try {
        let deletedProduct = await product.remove();
        res.json({
            message: `${deletedProduct.nameProd} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route   Put api/product/:productId
// @desc    Update Single product
// @access  Private Admin

router.put('/:productId', productById, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        let product = req.product;
        product = _.extend(product, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        try {
            let productDetails = await product.save();
            productDetails.photo = undefined;
            res.json(productDetails);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

router.get('/all', async (req, res) => {
    try {
        let data = await Product.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

router.param("productId", productById);
module.exports = router;