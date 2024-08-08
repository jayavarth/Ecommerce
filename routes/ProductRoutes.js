const express=require('express');
const Router=express.Router();
const productController=require('../controllers/productController'); 
const auth=require('../middleware/Auth')

Router.get('/products',productController.getAllProducts);
Router.post('/addproducts',productController.AddProducts);
Router.delete('/removeproducts/:id',productController.RemoveProducts);
Router.put('/updateproducts/:id',productController.UpdateProducts);
Router.patch('/replaceproducts/:id',productController.ReplaceProducts);

module.exports=Router;