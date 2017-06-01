/**
 * Created by ty on 2017/5/24.
 */
var async = require("async");
var showManger = require("../model/showModel")
exports.updateVideo = function (videos, callback) {
    var doUpdate = function(videoStr,cb01){
        //console.info(videoStr);
        var video = JSON.parse(videoStr);
        showManger.updateVideo(video,cb01);
        // cb01(null,"ok")
    };
    async.eachSeries(videos,doUpdate,function(error,results){
        callback(error,results)
})
}
/**
 *传入平台获得视频id
 * @param terraceName
 * @param callback
 */
exports.findID = function (platform,callback) {
   showManger.findID(platform,callback);
}






