const express = require('express');
const router = express.Router();
const Cadeau = require('../models/cadeau');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const cadeauById = require('../middleware/cadeauById');
const _ = require('lodash');

// @route   Post api/nouveaute/
// @desc    Create a new Product
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
            price,url
        } = fields;
    
        let cadeau = new Cadeau(fields);
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size',
            });
        }
        cadeau.photo.data = fs.readFileSync(files.photo.path);
        cadeau.photo.contentType = files.photo.type;
        try {
            await cadeau.save();
            res.json(fields);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

// @route   Get api/nouveaute/photo/productId
// @desc    Get a Product Image
// @access  Public

router.get('/photo/:cadeauId', cadeauById, (req, res) => {
    if (req.cadeau.photo.data) {
        res.set('Content-Type', req.cadeau.photo.contentType);
        return res.send(req.cadeau.photo.data);
    }
    res.status(400).json({
        error: 'failed to load image',
    });
});

// @route   Put api/nouveaute/:productId
// @desc    Update Single product
// @access  Private Admin

router.put('/:cadeauId', cadeauById, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        let cadeau = req.cadeau;
        cadeau = _.extend(cadeau, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            cadeau.photo.data = fs.readFileSync(files.photo.path);
            cadeau.photo.contentType = files.photo.type;
        }
        try {
            let cadeauDetails = await cadeau.save();
            cadeauDetails.photo = undefined;
            res.json(cadeauDetails);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

// @route   Get api/nouveaute/all
// @desc    Get all sliders
// @access  Public

router.get('/all', async (req, res) => {
    try {
        let data = await Cadeau.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

// @route   Delete api/product/productId
// @desc    Delete a Product
// @access  Private Admin

router.delete('/:cadeauId', cadeauById, async (req, res) => {
    let cadeau = req.cadeau;
    try {
        let deletedCadeau = await cadeau.remove();
        res.json({
            message: `${deletedCadeau.nameProd} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.param("cadeauId", cadeauById);
module.exports = router;