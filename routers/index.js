
//前台

var express = require('express');
var router = express.Router();//可使用express.Router类创建模块化，可挂载的路由句柄


router.get('/',function(req,res){
    res.send('index index')
});

router.get('/product',function(req,res){
    res.send('index/product')
})

module.exports=router;









