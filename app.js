const express=require('express');
const app=express();
const cors=require('cors');//middleware
const bodyparser=require('body-parser');

const productRoutes=require("../e-commerce_mvc/routes/ProductRoutes");
const UserRoutes=require('../e-commerce_mvc/routes/UserRoutes');
const CartRoutes=require('../e-commerce_mvc/routes/CartRoutes');
const OrderRoutes=require('../e-commerce_mvc/routes/OrderRoutes');

const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://jayavardhinim14:Jayvardh2004@cluster0.yxnqgbb.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("mongodb connected");
});

app.set("view engine","ejs");//view holds ejs file format


app.use(express.json())
app.use(cors)
app.use(bodyparser.json());

app.use("/",productRoutes);
app.use("/",UserRoutes);
app.use("/",CartRoutes);
app.use("/",OrderRoutes);

app.listen(3000,()=>{
    console.log("server is running");
})
