
//封装数据库模块

var MongoClient = require('mongodb').MongoClient;//引入数据库
var ObjectID = require('mongodb').ObjectID;
//数据库端口
var dbUrl = 'mongodb://localhost:27017';
//数据库名
var dbName = 'ad_login';


function __connectDb(callback){
    MongoClient.connect(dbUrl,function(err,client){
        if(err){
            console.log(err);
            console.log('数据库连接失败');
            return;
        }
        //增加，修改，删除
        //var db = client.db(dbName);
        callback(client);
       
    })

}


//暴露ObjectID
exports.ObjectID = ObjectID;


//DB.find('user',{},function(error,docs){})
//查询数据
exports.find=function(collectionName,json,callback){

//步骤
    // MongoClient.connect(dbUrl,function(err,client){
    //     if(err){
    //         console.log(err);
    //         console.log('数据库连接失败');
    //         return;
    //     }
    //     //增加，修改，删除
    //     var db = client.db(dbName);
    //     var collection = db.collection(collectName); 
    //     collection.find(json)
    //     callback()//返回数据，异步不能直接返回，要通过回调函数
    // })


    //通过回调函数就获得了__connectDb的err,client
    //相当于var callback = function(err,client){}
    //而callback(err,client)就相当于调用函数
    __connectDb(function(client){

        var db = client.db(dbName);
        var collection = db.collection(collectionName); 
        collection.find(json).toArray(function(error,docs){
            callback(error,docs);//这时候要返回数据，返回数据，异步不能直接返回，要通过回调函数
            client.close();//关闭数据库
        })
    });
   
}


//insertOne({a : 1}, function(err, result) {})
//DB.insert('product',{a : 1},function(err, result) {})
//增加数据
exports.insertOne=function(collectionName,json,callback){
    __connectDb(function(client){

        var db = client.db(dbName);
        var collection = db.collection(collectionName); 
        collection.insertOne(json,function(error,docs){
            callback(error,docs);
            client.close();
        })
    });
}


//updateOne({ a : 2 }, { $set: { b : 1 } }, function(err, result) {})
//DB.update('product',{ a : 2 },{ b : 1 },function(err, result) {})
//修改数据
exports.updateOne=function(collectionName,json1,json2,callback){
    __connectDb(function(client){

        var db = client.db(dbName);
        var collection = db.collection(collectionName); 
        collection.updateOne(json1,{$set:json2},function(error,docs){
            callback(error,docs);
            client.close();
        })
    });
}


//deleteOne({ a : 3 }, function(err, result) {})
//DB.deleteOne('product',{ a : 3 },function(err, result) {})
//删除数据
exports.deleteOne=function(collectionName,json,callback){
    __connectDb(function(client){

        var db = client.db(dbName);
        var collection = db.collection(collectionName); 
        collection.deleteOne(json,function(error,docs){
            callback(error,docs);
            client.close();
        })
    });
}