const express=require('express');
const Router=express.Router();
const UserController=require('../controllers/UserController');

Router.post('/Adduser',UserController.AddUser);
Router.post('/Loginuser',UserController.Login);

module.exports=Router;