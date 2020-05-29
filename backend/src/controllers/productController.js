const express = require('express');
const multer  = require('multer');
const multerConfig = require('../config/multer');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);

const Product = require('../models/product');

router.get("/list", async (req, res) => {
    try{
        const products = await Product.find();

        return res.json(products);

    } catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.get("/list/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product)
            return res.status(404).json({'message': 'Product not found.'});
        return res.json(product);

    } catch(err){
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.post("/add", multer(multerConfig).single('file'), async (req, res) => {
    
    try{
        const { originalname: image, imageKey, location: imageUrl = "" } = req.file;
        const { name } = req.body;

        const product = await Product.create({
            name,
            image,
            imageKey,
            imageUrl
        });

        return res.json(product);

    } catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }    
});

router.put("/save/:id", async (req, res) => {
    
    try{
        if(!req.params.id){
            return res.status(404).json({error: 'Invalid id param'});
        }
            
        const { name, status } = req.body;
        
        const data = {name, status };
        
        const product = await Product.findByIdAndUpdate({_id: req.params.id}, data, { new: true });

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