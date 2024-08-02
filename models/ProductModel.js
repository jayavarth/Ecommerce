const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    Id:{
        type:String,
        unique:true,
        required:true
    },
    Title:{
        type:String,
        required:[true,"title is required"]
    },
    Description:{
        type:String,
        required:true
    },
    Category:{
        type:String,
    },
    Price:{
        type:Number,
        required:true
    },
    Image:{
        type:String
    },
    Rating:{
        Rate:{
            type:Number
        },
        Count:{
            type:Number
        }
    }
})

const Product=mongoose.model('Product',productSchema);
module.exports=Product;