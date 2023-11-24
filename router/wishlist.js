const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');

router.post("/wishlist/:id",async(req,res)=>{
    
    const newlist = new Wishlist(req.body);

    try{
        const savedlist = await newlist.save();
        res.json(savedlist);
        
    }catch(err){
        console.log(err);
    }

});

router.get("/wishlist/:id",async(req,res)=>{
    Wishlist.find({userId:id});
});

module.exports = router;