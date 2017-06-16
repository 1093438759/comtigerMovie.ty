/**
 * Created by ty on 2017/6/16.
 */


var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var async = require('async');
var collectionName = config.guDuoCollection;
var TestSchema = new mongoose.Schema(
    {
        姓名: {type: String},
        身高: {type: String},
        体重: {type: String},
        别名: {type: String},
        民族: {type: String},
        出生地: {type: String},
        星座: {type:String},
        毕业学校: {type: String},
        经纪公司: {type: String},

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