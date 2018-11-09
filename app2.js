

//安装express
var express = require('express');
var app = express();

var session = require("express-session");//用于保存数据
var admin = require('./routers/admin.js')
var index = require('./routers/index.js')


//使用ejs模板引擎  默认找views这个目录
app.set('view engine','ejs');


//利用express.static托管静态文件
//配置public目录为静态资源目录
//这是为了可以加载images，css,js，文件
app.use(express.static('public'));

app.use('/upload',express.static('upload'));

//因为每个路由之前都要执行
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge:1000*60*30 
      
      },
      rolling:true
  }))



//前台
//index
//index/product
app.use('/',index)


//后台
//admin,没有匹配到任何路由
//aadmin/login
//admin/user,匹配
//admin/product

//首先匹配/admin，根据模块找到./routers/admin.js
//在admin.js上没有匹配到/admin
//admin/login 会在admin.js上继续匹配/login，根据模块找到./admin/login.js
app.use('/admin',admin)//前一个参数是路径，后一个是模块





app.listen(3000,'127.0.0.1');