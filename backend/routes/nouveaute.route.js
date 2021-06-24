const express = require('express');
const router = express.Router();
const Nouveaute = require('../models/nouveaute');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const nouveauteById = require('../middleware/nouveauteById');
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
        if (
            !nameProd ||
            !price || !url
        ){
            return res.status(400).json({
                error: 'All fields are required',
            });
        }
        let nouveaute = new Nouveaute(fields);
        // 1MB = 1000000
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1MB in size',
            });
        }
        nouveaute.photo.data = fs.readFileSync(files.photo.path);
        nouveaute.photo.contentType = files.photo.type;
        try {
            await nouveaute.save();
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

router.get('/photo/:nouveauteId', nouveauteById, (req, res) => {
    if (req.nouveaute.photo.data) {
        res.set('Content-Type', req.nouveaute.photo.contentType);
        return res.send(req.nouveaute.photo.data);
    }
    res.status(400).json({
        error: 'failed to load image',
    });
});

// @route   Put api/nouveaute/:productId
// @desc    Update Single product
// @access  Private Admin

router.put('/:nouveauteId', nouveauteById, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        let nouveaute = req.nouveaute;
        nouveaute = _.extend(nouveaute, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            nouveaute.photo.data = fs.readFileSync(files.photo.path);
            nouveaute.photo.contentType = files.photo.type;
        }
        try {
            let nouveauteDetails = await nouveaute.save();
            nouveauteDetails.photo = undefined;
            res.json(nouveauteDetails);
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
        let data = await Nouveaute.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

router.param("nouveauteId", nouveauteById);
module.exports = router;