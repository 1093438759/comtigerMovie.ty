/**
 * Created by ty on 2017/6/6.
 */


var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var discussCollectionName = config.discussCollection;
var TestSchema = new mongoose.Schema({
    vid: {type: String},
    id: {type: Number},
    name: {type: String},
    replys: {type: Array},
    dianzan: {type: Number},
    icon: {type: String},
    content: {type: String},
    platform: {type: String},
    create_time: {type: Number}
}, {
    collection: discussCollectionName
})

var model = db.model(discussCollectionName, TestSchema);
exports.updateDiscuss = function (data, cb2) {
    var where = {platform: data.platform, id: data.id};
    model.updateOne(where, data, {upsert: true}, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            console.log("插入成功");
        }
        cb2(null, doc);
    })
}