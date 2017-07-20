/**
 * Created by ty on 2017/7/19.
 */

var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var collection = config.baiDu;
var Schema = new mongoose.Schema(
    {
        name: String,          //艺人名字
        id:String,             //艺人id
        address: String,       //网址
        attention: Number,     //关注量
        numberPosts: Number,   //帖子数

    },
    {
        collection: collection
    }
);
var baiDuManager = db.model(collection, Schema);


exports.insert = function (update, callback) {
    console.log(update);
    var where = {name: update.name};
    baiDuManager.update(where, update, {upsert: true}, callback);
};