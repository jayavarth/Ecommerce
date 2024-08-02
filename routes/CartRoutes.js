const express=require('express');
const Router=express.Router();
const CartController=require('../controllers/CartController');
const auth=require('../middleware/Auth');

Router.get('/getcart',auth,CartController.GetCart);
Router.post('/addcart',auth,CartController.AddCart);
Router.delete('/delete',auth,CartController.deleteproduct);

module.exports=Router;