const express=require('express');
const Router=express.Router();

const OrderController=require('../controllers/OrderController');

Router.post('/order',OrderController.CreateOrders);
Router.get('/getorder',OrderController.GetOrders);

module.exports=Router;