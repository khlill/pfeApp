express = require('express')
const router = express.Router()
const Id = require('../models/ajoutId')
const { validationResult} = require('express-validator')
const idById = require('../middleware/idbyId');
const _ = require('lodash');
const formidable = require('formidable');


// @route   POST api/category
// @desc    Create Category
// @access  Private Admin

router.post('/',
 async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const id = req.body.id
    const nameProd = req.body.nameProd
    const price = req.body.price
    const identif = new Id ({
        id,
        nameProd,
        price
    })
    identif.save()
    try {
        let identif = await Id.findOne({
            nameProd:req.body.nameProd,
            id:req.body.id,
            price:req.body.price
        })
        if (identif) {
            return res.status(403).json({
                error: 'identifiant existe deja'
            })
        }
        if (!identif) {
            return res.status(200).json({
                success: 'identifiant créée avec succés'
            })
        }
        res.json(identif)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
    })

// @route   Get api/category/all
// @desc    Get all categories
// @access  Public

router.get('/all', async (req, res) => {
    try {
        let data = await Id.find({})
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
})

router.delete('/:newId', idById, async (req, res) => {
    let id = req.id;
    try {
        let deletedId = await id.remove();
        res.json({
            message: `${deletedId.nameProd} deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});


module.exports = router