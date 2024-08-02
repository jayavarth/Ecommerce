const Product=require('../models/ProductModel');
const { v4: uuidv4 } = require('uuid');


const getAllProducts=async(req,res)=>{
    // console.log(req.body);
    try{
        const product= await Product.find();
        res.send(product);
    }
    catch(err){
        console.error(err);
    }
};

const AddProducts=async(req,res)=>{
    try{
        const { Title, Description, Category, Price, Image, Rating } = req.body;
        const product = new Product({Id:uuidv4(),Title,Description,Category,Price,Image,Rating});
        await product.save();
        res.send(product);
    }
    catch(err){
        console.error(err);
    }
};

const RemoveProducts=async(req,res)=>{
    try{
        const removeid = req.params.id;
        await Product.findOneAndDelete({ Id: removeid });
        res.send("product removed successfully");
    }
    catch(err){
        console.error(err);
    }
};

const UpdateProducts=async(req,res)=>{
    try{
        const updateid = req.params.id;
        const { Title, Description, Category, Price, Image, Rating}=req.body;
        await Product.findOneAndUpdate({ Id: updateid },{ Title, Description, Category, Price, Image, Rating},{new:true})
        res.send("product updated successfully");
    }
    catch(err){
        console.error(err);
    }
};

const ReplaceProducts=async(req,res)=>{
    try{
        const replaceid = req.params.id;
        const replacecontent = req.body;
        await Product.findOneAndUpdate({ Id: replaceid },replacecontent,{ new: true });
        res.send("product changes updated successfully");
    }
    catch(err){
        console.error(err);
    }
};

module.exports={getAllProducts,AddProducts,RemoveProducts,UpdateProducts,ReplaceProducts};