const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    User_id:{
        type:String,
        required:true,
    },
    Products:[{//Object -> collection of key value pairs
        productid:String,
        quantity:String,
    },],
});

const Cart=mongoose.model('Cart',CartSchema);
module.exports=Cart;