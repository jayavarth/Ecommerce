const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    orderid:{
        type:String,
        unique:true,
        required:true
    },
    cust_name:{
        type:String
    },
    cust_phno:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    orderDate:{
        type:Date
    },
    deliveryDate:{
        type:Date
        
    },
    Products:[{
        productid:String,
        quantity:String
    }],
    totalAmount:{
        type:Number
    },
    OrderStatus:{
        type:String
    },
    UserId:{
        type:String
    },
    UserEmail:{
        type:String
    }
});

const Order=mongoose.model('Order',OrderSchema);
module.exports=Order;