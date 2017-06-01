var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var collectionName = "i_index"; //指数

var schema = new Schema(
    {
        type: String,//类型：热门电视剧/热门电影/主角/微博...
        objectId: String,//电视剧、电影对应的id
        keyword: String,//关键词
        queryDate: String,//日期 yyyy-MM-dd
        index: Number,//指数
        avg7days: Number,//近7天平均数
        platform: String,//平台：baidu/google/ali...
        createdTime: {type: Date, default: Date.now},
        data: {},//具体数据
    },
    {
        collection: collectionName
    }
);
var manager = mongoose.model(collectionName, schema);

exports.create = function (data, callback) {
    manager.create(data, callback);
};
exports.findOneUpdate = function () {
};


exports.findOneUpsert = function (where, update, callback) {
    manager.findOneAndUpdate(where, update, {upsert: true, new: false}, callback);
};