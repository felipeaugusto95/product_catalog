const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/list', async (req, res) => {
    
    try{
        return res.send(await User.find());

    } catch(err){
        return res.status(400).send({error: 'Load users failed'});
    }
});


module.exports = (app) => app.use('/user', router);