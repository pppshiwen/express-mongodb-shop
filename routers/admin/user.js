//用户管理模块
var express = require('express');
var router = express.Router();//可使用express.Router类创建模块化，可挂载的路由句柄
var DB = require('../../modules/connectDB.js');//引入自定义数据库模块

router.get('/',function(req,res){
    //res.send('显示用户首页')
    DB.find('user',{},function(error,docs){
        if(error){
            console.log(error)
        }
        res.render('admin/user/index',{list:docs});
        //console.log(docs)
    })
});



//
router.get('/add',function(req,res){
    res.send('用户增加')
})



//
router.get('/delete',function(req,res){
    res.send('用户删除')
})

module.exports=router;




