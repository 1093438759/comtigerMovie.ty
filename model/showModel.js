/**
 * Created by ty on 2017/5/24.
 */

//插入数据库mongodb

var mongoose = require("mongoose");
var config = require("../config");
var db = mongoose.connect(config.url);
var collectionName = "video";
var TestSchema = new mongoose.Schema({
        title: {type: String},                          //视频名字
        vid: {type: String},                            //视频ID
        episodes: {type: Number},                       //集数
        fixupdate: {type: String},                      //更新进度
        severalEpisodes: {type: Number},                //更新至几级
        director: {type: String},                       //导演
        acts: {type: Array},                            //主演
        type: {type: String},                           //分类(电视剧，电影..)
        catalog: {type: Array},                         //类型(偶像，古装..)
        area: {type: String},                           //那地拍摄
        year: {type: Number},                           //哪一年出的
        date:{type:String},                             //具体月日时间
        score: {type: Number},                          //评分
        pv: {type: Number},                             //播放量
        content: {type: String},                        //视频简介
        platform: {type: String},                       //平台
        updateTime: {type: Date, default: Date.now},   //更新时间
    },
    {
        collection: collectionName
    });
var TestModel = db.model(collectionName, TestSchema); //"TV"相当于collection

/*
 *传入数据插入数据库
 * @param terraceName
 * @param callback
 */
exports.updateVideo = function (data, cb01) {
    var where = {platform: data.platform, vid: data.vid};
    TestModel.updateOne(where, data, {upsert: true}, function (err, doc) {
        if (err) {
            console.log("error :" + err);
        } else {
            //console.info(doc)
            console.log("插入成功");
        }
        console.log("error :" + err);
        cb01(err, doc)
    });
}


exports.findID = function (platform, callback) {
    var condition = {platform: platform};
    var condition1 = {vid: 1};
    TestModel.find(condition, condition1, function (err, result) {
        if (err) {
            console.info(err)
        } else {
            callback(null, result)
        };
    });
}





