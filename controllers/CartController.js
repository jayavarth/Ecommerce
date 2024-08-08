const Cart=require('../models/CartModel');
const Product=require('../models/ProductModel');

// const Cartservices=require('../Services/Cartservices');

// const jwt = require('jsonwebtoken');

const AddCart=async(req,res)=>{
    try{
        // const token = req.header("Authorization").split(" ")[1];
        // const decoded = jwt.verify(token, "secret_key");
        // const User_id = decoded.userId;
        const User_id=req.user;

        const productid=req.body.productid;
        const quantity=req.body.quantity;
        const incart=await Cart.findOne({User_id});
        if(incart){
            const isProduct = incart.Products.find(p => p.productid === productid);
            if (isProduct) {
                isProduct.quantity = (parseInt(isProduct.quantity) + parseInt(quantity)).toString();
            } else {
                incart.Products.push({ productid, quantity });
            }
            await incart.save();
            res.send(incart);
        }else{
                const add=new Cart({User_id,Products:[{productid,quantity}]});
                await add.save();
                res.send(add);
            }
        }
    catch(err){
        console.log(err);
    }
};

const GetCart=async(req,res)=>{
    try{
        // const token = req.header("Authorization").split(" ")[1];
        // const decoded = jwt.verify(token, "secret_key");
        // const User_id = decoded.userId;

        const User_id=req.user;
        
        const incart=await Cart.findOne({User_id});
        
        if(incart){
            const productIds = incart.Products.map(product => product.productid);
            
            const products = await Product.find({ Id: { $in: productIds } },{Title:1,Description:1,Image:1,Price:1,_id:0});
            res.send(products);
        }
        else{
            res.send("empty cart");
        }
    }
    catch(err){
        console.log(err);
    }
}

// const DeleteProduct=async(req,res)=>{
//     await Cartservices.deleteProduct(req.user,req.body.productid);
// }

const deleteproduct = async (req, res) => {
    try {
        const User_id=req.user;
        const Productid=req.body.productid;
        console.log(Productid,User_id);
        const cart = await Cart.findOne({ User_id });
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        if (cart.Products.length <= 1) {
            await Cart.findByIdAndDelete(cart._id);
            // await Cart.findByIdAndDelete(cart);
            return res.json({ msg: "Cart deleted" });
        } else {
            cart.Products = cart.Products.filter(prod => prod.productid !== productid);
            await cart.save();
            return res.json(cart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


module.exports={AddCart,GetCart,deleteproduct};