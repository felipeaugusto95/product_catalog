const express = require('express');
const multer  = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();

const Product = require('../models/product');

router.get("/list", async (req, res) => {
    try{
        const products = await Product.find();

        return res.json(products);

    } catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.post("/add", multer(multerConfig).single('file'), async (req, res) => {
    
    try{
        const { originalname: image, imageKey, location: imageUrl = "" } = req.file;

        const product = await Product.create({
            name: req.body.name,
            image,
            imageKey,
            imageUrl
        });

        return res.json(product);

    } catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }    
});

router.delete("/delete/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        await product.remove();

        return res.json({'message': 'Product deleted successfully'});

    } catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = app => app.use('/product', router);