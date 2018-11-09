
//后台

/*
可以
admin
admin/user
admin/product

*/


var express = require('express');
var router = express.Router();//可使用express.Router类创建模块化，可挂载的路由句柄

//引入自定义模块
var login = require('./admin/login.js')
var product = require('./admin/product.js')
var user = require('./admin/user.js')




  //自定义中间件 判断状态
router.use(function(req,res,next){
   // console.log(req.url)
    if(req.url=='/login'||req.url=='/login/dologin'){
        next();
    }else{
        console.log(req.session.userinfo);
        if(req.session.userinfo&&req.session.userinfo.username!=''){
            //ejs中  设置全局数据  所有的页面都可以使用 view/public/header.ejs
            req.app.locals['userinfo']=req.session.userinfo;
            next();
        }else{
            res.redirect('/admin/login');
        }
    }
})
  



//配置路由
//不是app.use(),而是router.use()

router.use('/login',login)
router.use('/product',product)
router.use('/user',user)



module.exports=router;









