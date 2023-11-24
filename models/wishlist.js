const mongoose = require('mongoose');

const Wishlist = new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productsId:{type:String,required:true},
            productimg:{type:String,required:true}
        },
        
    ]
});
module.exports = mongoose.model("Wishlist",Wishlist);