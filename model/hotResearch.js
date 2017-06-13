/**
 * Created by weiwei on 2016/11/22.
 */
var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var async = require('async');
var collectionName = config.topSearchCollection;
var TestSchema = new mongoose.Schema(
    {
        title: {type: String},
        rank: {type: Number},
        url: {type: String},
        readAmount: {type: Number},
        type: {type: Number},
        platform: {type: String},
        updateTime: {type: Date, required: true, default: Date.now},  //更新时间

    },
    {
        collection: collectionName
    }
);

var manager = db.model(collectionName, TestSchema);

exports.save = function (data, callback) {
    manager.create(data, callback);
};

exports.findOne = function (where, callback) {
    manager.findOne(where, callback);
};


exports.updateSome = function (update, callback) {
    update.updateTime = new Date().toLocaleString();
    var monInsert = new manager(update)
    monInsert.save(function (err,result) {
        if (err) {
            console.log(err);
        } else {
            console.log('成功插入数据');
            callback(null, result);
        }
    });
}

exports.findAndUpsert = function (where, update, callback) {
    manager.findOneAndUpdate(where, update, {upsert: true}, callback);
};

exports.HotResearchPagination = function (where, col, skip, callback) {
    var query = manager.find(where, col).sort('-updateTime').skip((skip - 1) * 20).limit(20);
    query.exec(function (err, results) {
        if (err) {
            callback(err);
        } else {
            callback(null, results);

        }
    });
}

exports.findLast = function (callback) {
    var query = manager.find().sort('-updateTime').limit(50);
    query.exec(callback);
}

