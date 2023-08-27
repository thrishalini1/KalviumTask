const express = require('express');
const router = express.Router();
const History = require('./model');

router.get('/', async (req, res) => {
    try{
       
    }
    catch{
        res.status(500).json({"messsage":"Something went wrong. oops!"});
    }

})


module.exports = router;
