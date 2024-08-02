const Order = require('../models/OrderModel');
const User = require('../models/UserModel');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');
const {v4:uuidv4} = require('uuid');

const jwt = require('jsonwebtoken');

const CreateOrders = async (req, res) => {
    try {
        const { cust_name, cust_phno, address } = req.body;
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        const userid = decoded.userId;

        // const userid=req.user;

        // console.log(cust_name,cust_phno,address,userid);

        const cart =await Cart.findOne({ User_id:userid });

        // console.log(cart);

        const user=await User.findById(userid,{Email:1,_id:0});

        // console.log(user);

        const productDetails = await Product.find({Id:{$in:cart.Products.map(product => product.productid) } });

        const totalAmount=productDetails.reduce((total,product) => {
            const quantity=cart.Products.find(cartProduct => cartProduct.productid.toString() === product.Id.toString()).quantity;
            return total+product.Price*quantity;
        }, 0);

        const createorder = new Order({
            orderid : uuidv4(),
            cust_name,cust_phno,address,
            orderDate: new Date(),
            deliveryDate: new Date(Date.now()+10*24*60*60*1000), 
            Products: cart.Products,
            totalAmount,
            OrderStatus: 'ordered',
            UserId:userid,
            UserEmail:user.Email
        });
        await createorder.save();

        await Cart.findByIdAndDelete(cart._id);
        // await Cart.findByIdAndDelete(userid);

        res.send(createorder);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

//products,order status,ordered date,delivery date
const GetOrders=async(req,res)=>{
    try{
        const userid=req.params.id;
        const Orders=await Order.findOne({UserId:userid});
        if(Orders){
            const items=Orders.Products;
            const arr=[];
            for(const i of items){
                const product=await Product.findOne({Id:i.productid});
                if(product){
                    arr.push({
                        title : product.Title,
                        description : product.Description,
                        price : product.Price,
                        image : product.Image,
                        quantity : i.quantity,
                    })
                }
            }
            res.send({
                OrderId:Orders.id,
                orderDate:Orders.orderDate,
                deliveryDate:Orders.deliveryDate,
                totalAmount:Orders.totalAmount,
                OrderStatus:Orders.OrderStatus,
                products:arr,
                totalAmount:Orders.totalAmount,
            });
        }else{
            res.send("no orders");
        }
    }
    catch(err){
        res.send(err);
    }
}

module.exports = {CreateOrders,GetOrders};
