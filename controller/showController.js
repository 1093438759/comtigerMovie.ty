/**
 * Created by ty on 2017/5/24.
 */
var async = require("async");
var showManger = require("../model/showModel");
var discussManger = require("../model/updateDiscuss");
exports.updateVideo = function (videos, callback) {
    var doUpdate = function (videos,cb01) {
       // console.info(videoStr);
        var video = JSON.parse(videos);
        showManger.updateVideo(video,cb01);
        cb01(null,"ok")
    };
    async.eachSeries(videos,doUpdate, function (error, results) {
        callback(error, results)
    })
}

/**
 *
 * @param disuss
 * @param callback
 */
exports.updateDiscuss = function (disuss, callback) {

    var doUpdate = function (dis, cb2) {

        var disuss = JSON.parse(dis);

        discussManger.updateDiscuss(disuss, cb2);

    }

    async.eachSeries(disuss, doUpdate, function (error, result) {
        callback(error, result);
    })
    // discussManger.updateDiscuss(disuss,callback);
}

/**
 *传入平台获得视频id
 * @param terraceName
 * @param callback
 */
exports.findID = function (platform, callback) {
    showManger.findID(platform, callback);
}













