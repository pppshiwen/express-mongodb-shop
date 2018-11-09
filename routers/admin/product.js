//商品管理模块
var express = require('express');
var router = express.Router();//可使用express.Router类创建模块化，可挂载的路由句柄
var DB = require('../../modules/connectDB.js');//引入自定义数据库模块
var multiparty = require('multiparty')//图片上传模块，既可以获取form表单数据，也可以实现上传图片
var fs =require('fs');


router.get('/',function(req,res){
    //res.send('显示商品首页')
    DB.find('product',{},function(error,docs){
        if(error){
            console.log(error)
        }
        res.render('admin/product/index',{list:docs});
        //console.log(docs)
    })
});



//
router.get('/add',function(req,res){
    //res.send('商品增加')
    res.render('admin/product/add');
})

router.post('/doAdd',function(req,res){
    //res.send('商品增加')
    //res.render('admin/product/productadd');
    
    var form = new multiparty.Form();

    form.uploadDir = 'upload';//上传图片的地方（upload是文件夹）
    form.parse(req, function(err, fields, files) {
        //获取post提交的数据，以及上传成功返回的图片信息
        //console.log(fields);//获取表单的数据
        //console.log(files);//图片上传成功返回的信息
        
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        //图片地址
        var pic = files.pic[0].path;
        //console.log(pic);//upload\UW7sKVNzVszsAWrsrbRgzR7i.jpg

        DB.insertOne('product',{
            title:title,
            price: price,
            fee:fee,
            description:description,
            pic:pic
        },function(error,docs){
            if(error){
                console.log(error);
                return;
            }
            res.redirect('/admin/product');//返回首页
        })

    })
})

//
router.get('/edit',function(req,res){
    //res.send('商品修改')
    //res.render('productedit');

    //获取get传值后面的id值
    //var id = url.parse(req.url,true).query.id;
    var id = req.query.id;
    //console.log(id)

    //去数据查询该id值的数据
    DB.find('product',{
        "_id":new DB.ObjectID(id)//"_id" : ObjectId("5b9940943132724064e43305")
    },function(error,docs){
        if(!error){
           res.render('admin/product/edit',{list:docs[0]});
           //console.log(docs)
        }
    })
})

router.post('/doEdit',function(req,res){
    
    var form = new multiparty.Form();
    form.uploadDir = 'upload';//上传图片的地方（upload是文件夹）
    form.parse(req,function(err,fields,files){
        //console.log(fields);//获取表单的数据
        //console.log(files);//图片上传成功返回的信息

        var id = fields.id[0];//右边id是name的值
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path;//图片地址

        var originalFilename = files.pic[0].originalFilename
        //console.log(originalFilename);//判断依据
        
        //如果改了图片originalFilename会是文件名
        //没改的话，originalFilename会是空， path: 'upload\\6SznCgZ7BEtsWsQr9OjRODzf'是临时文件，但不会是原来的图片
        if(originalFilename){//更改图片
            var setData={
                title:title,
                price: price,
                fee:fee,
                description:description,
                pic:pic
            }
        }else{              //不改图片
            var setData={
                title:title,
                price: price,
                fee:fee,
                description:description,  
            }
            fs.unlink(pic);//删除临时文件
        }

        DB.updateOne('product',{"_id":new DB.ObjectID(id)},setData,function(error,docs){
            if(error){
                console.log(error);
                return;
            }
            res.redirect('/admin/product');//返回首页
        })
    })

})

//
router.get('/delete',function(req,res){
    //res.send('商品删除')
    //获取id
    var id = req.query.id;
    //console.log(id);
    
    DB.deleteOne('product',{
        "_id":new DB.ObjectID(id)
    },function(error,docs){
        if(error){
            console.log(error);
            return;
        }
        res.redirect('/admin/product');//返回首页
    })
})

module.exports=router;


