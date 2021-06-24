const express = require('express');
const router = express.Router();
const Slider = require('../models/slider');
const auth = require('../middleware/auth');
const formidable = require('formidable');
const fs = require('fs');
const sliderById = require('../middleware/sliderById');
const _ = require('lodash');


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
            description,
            title,
            url
        } = fields;
     
        let slider = new Slider(fields);
        // 1MB = 1000000
        if (files.photo.size > 2000000) {
            return res.status(400).json({
                error: 'Image should be less than 2MB in size',
            });
        }
        slider.photo.data = fs.readFileSync(files.photo.path);
        slider.photo.contentType = files.photo.type;
        try {
            await slider.save();
            res.json('Slider saved Successfully');
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

// @route   delete api/slider/id
// @desc    Get all sliders
// @access  Public

router.delete('/:sliderId', sliderById, async (req, res) => {
    let slider = req.slider;
    try {
        let deletedSlider = await slider.remove();
        res.json({
            message: `${deletedSlider.title} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route   Get api/slider/all
// @desc    Get all sliders
// @access  Public

router.get('/all', async (req, res) => {
    try {
        let data = await Slider.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

// @route   Get api/slider/photo/id
// @desc    Get slider photo by id
// @access  Public

router.get('/photo/:sliderId', sliderById, (req, res) => {
    if (req.slider.photo.data) {
        res.set('Content-Type', req.slider.photo.contentType);
        return res.send(req.slider.photo.data);
    }
    res.status(400).json({
        error: 'failed to load image',
    });
});

// @route   Put api/product/:productId
// @desc    Update Single product
// @access  Private Admin

router.put('/:sliderId', sliderById, (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded',
            });
        }
        let slider = req.slider;
        slider = _.extend(slider, fields);
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size',
                });
            }
            slider.photo.data = fs.readFileSync(files.photo.path);
            slider.photo.contentType = files.photo.type;
        }
        try {
            let sliderDetails = await slider.save();
            sliderDetails.photo = undefined;
            res.json(sliderDetails);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    });
});

router.param("sliderId", sliderById);
module.exports = router;