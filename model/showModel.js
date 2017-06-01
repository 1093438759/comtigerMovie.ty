/**
 * Created by ty on 2017/5/24.
 */

//插入数据库mongodb

var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/doc");
var collectionName = "video";
var TestSchema = new mongoose.Schema({
        title: {type: String},
        vid: {type: String},
        episodes: {type: Number},
        fixupdate: {type: String},
        severalEpisodes: {type: String},
        director: {type: String},
        acts: {type: Array},
        act: {type: String},
        type: {type: String},
        catalog: {type: Array},
        area1: {type: String},
        year: {type: String},
        score: {type: Number},
        pv: {type: Number},
        content: {type: String},
        platform: {type: String},
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
        }
        ;
    });
}





