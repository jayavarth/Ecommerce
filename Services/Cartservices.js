const Cart=require('../models/CartModel');

exports.deleteProduct=async(UserId,productid)=>{
    const cart=Cart.findOne({UserId});

    if((cart.Products).length()<=1){
        await Cart.findByIdAndDelete({UserId});
    }
    else{
        const product = cart.products.filter((prod)=>prod.id != productid);
        const add=new Cart({UserId,product});
        await add.save();
        res.send(add);
    }
}

