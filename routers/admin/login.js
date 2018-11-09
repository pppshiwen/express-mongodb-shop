//登录模块

var express = require('express');
var router = express.Router();//可使用express.Router类创建模块化，可挂载的路由句柄
var bodyParser = require('body-parser');//用于获取post数据
var md5 = require('md5-node');//用于加密密码
var DB = require('../../modules/connectDB.js');//引入自定义数据库模块


//配置bodyParser中间件
// parse application/x-www-form-urlencoded  
router.use(bodyParser.urlencoded({ extended: false }));    
// parse application/json  
router.use(bodyParser.json());   


router.get('/',function(req,res){
    //res.send('登录页面')
    res.render('admin/login');
});

//处理登录的业务逻辑
router.post('/dologin',function(req,res){
    //res.send('登录数据提交')
     //res.send('login');
    //console.log(req.body);//获取post数据

    var username = req.body.username;
    var password = md5(req.body.password);//密码加密

//封装
    DB.find('user',{
        "username":username,
        "password":password
    },function(error,docs){
        if(docs.length>0){
            console.log("登录成功");
            //保存账号数据到session
            req.session.userinfo=docs[0];
            console.log(req.session.userinfo)
            res.redirect('/admin/product');//登录成功跳转到商品列表
            //res.send("<script>location.href='/product'</script>")
        }else{
            //console.log("登录失败");
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>")
        }
    })

})
router.get('/loginout',function(req,res){
    //res.send('登录页面')
    req.session.destroy(function(err){ /*销毁 session*/
    if(err){
        console.log(err);
    }
    res.redirect('admin/login');
    })
});

module.exports=router;



