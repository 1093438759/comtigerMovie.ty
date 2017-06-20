/**
 * Created by ty on 2017/6/20.
 */

var celebrities=require("../model/celebrities");

exports.updateStar=function (update,callback) {

    celebrities.updateCelebrities(update,callback)

}

