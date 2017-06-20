/**
 * Created by ty on 2017/6/20.
 */


var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var collectionName = config.BaixsCollection;
var TestSchema = new mongoose.Schema(
    {


        name: String,               //姓名
        occupation: String,         //职业
        introduction: String,       //演员介绍或者导演介绍

        born: String,               //出生地
        school: String,             //毕业院校
        stars: Number,              //星级
        birthday: Date,             //生日
        height: Number,             //身高
        weight: Number,             //体重
        awards: String,             //获奖情况
        brokeragefirm: String,      //经纪公司
        nation: String,             //名族

    },
    {
        collection: collectionName
    }
);

var manager = db.model(collectionName, TestSchema);


exports.insert=function (data,callback) {
    var insert = new manager(data);
    insert.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            // console.log('成功插入数据');
            callback(err);
        }
    })
}