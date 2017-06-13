/**
 * Created by ty on 2017/6/12.
 */


var async = require("async");
var showManger = require("../model/hotResearch");

exports.updateSome=function (update,callback) {
  //  var  where={title:update.title};
    var doUpdate = function (up, cb2) {
        var top = JSON.parse(up);
      //  console.log(top);
        showManger.updateSome(top, cb2);
    }
    async.eachSeries(update, doUpdate, function (error, result) {
        callback(error, result);
    })
}