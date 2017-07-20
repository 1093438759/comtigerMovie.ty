/**
 * Created by Jia Chengbin on 15/8/18.
 */
var config = require("../config");
var mongoose = require(config.mongoose);
var db = mongoose.connect(config.url);
var collection = config.attentionCollection;
var celebritiesSchema = new mongoose.Schema(
    {
        uid: Number,  //明星的id
        attention: Boolean,//10个账号是否有被关注过
        attention_3: Boolean,//3个账号是否有被关注过
        attention_4: Boolean,//4个账号是否有被关注过
        record: Number,//记录数
        5612659228: Boolean,//是否关注
        5778118013: Boolean,//是否关注`
        5612947848: Boolean,//是否关注
        5612882739: Boolean,//是否关注
        5798694834: Boolean,//是否关注
        5778434697: Boolean,//是否关注
        5612866429: Boolean,//是否关注
        5612683449: Boolean,//是否关注
        5606181366: Boolean,//是否关注
        5601310710: Boolean,//是否关注
        5761833994: Boolean,//是否关注
        5773016143: Boolean,//是否关注
        5606247462: Boolean,//是否关注
        5791682344: Boolean,//是否关注
        5757528867: Boolean,//是否关注
        5778133006: Boolean,//是否关注
        5795971725: Boolean,//是否关注
        5612908847: Boolean,//是否关注
        5606146070: Boolean,//是否关注
        5773070920: Boolean,//是否关注
        5612867210: Boolean,//是否关注
        5612908088: Boolean,//是否关注
        5757862405: Boolean,//是否关注
        5612883530: Boolean,//是否关注
        5612674756: Boolean,//是否关注
        5778428259: Boolean,//是否关注
        5770961845: Boolean,//是否关注
        5612535899: Boolean,//是否关注
        5779670437: Boolean,//是否关注
        5606457103: Boolean,//是否关注
        5778306145: Boolean,//是否关注
        5612690216: Boolean,//是否关注
        5595484402: Boolean,//是否关注
        5765776399: Boolean,//是否关注
        5601099866: Boolean,//是否关注
        5612658571: Boolean,//是否关注
        5749186691: Boolean,//是否关注
        5793825135: Boolean,//是否关注
        5765640664: Boolean,//是否关注
        5612683893: Boolean,//是否关注
        5791152346: Boolean,//是否关注
        5796128110: Boolean,//是否关注
        5769060256: Boolean,//是否关注
        5606361948: Boolean,//是否关注
        5768644382: Boolean,//是否关注
        5759428078: Boolean,//是否关注
        5612734149: Boolean,//是否关注
        5777882736: Boolean,//是否关注
        5791566190: Boolean,//是否关注
        5601132421: Boolean,//是否关注
        5606426713: Boolean,//是否关注
        5755388878: Boolean,//是否关注
        5612534587: Boolean,//是否关注
        5606269917: Boolean,//是否关注
        5791133120: Boolean,//是否关注
        5759603407: Boolean,//是否关注
        5759899067: Boolean,//是否关注
        5757639844: Boolean,//是否关注
        5612761066: Boolean,//是否关注
        5606331264: Boolean,//是否关注
        5775659061: Boolean,//是否关注
        5606291383: Boolean,//是否关注
        5606431637: Boolean,//是否关注
        5762337928: Boolean,//是否关注
        5773073053: Boolean,//是否关注
        5612740918: Boolean,//是否关注
        5612680567: Boolean,//是否关注
        5601118977: Boolean,//是否关注
        5768635020: Boolean,//是否关注
        5595304642: Boolean,//是否关注
        5779402132: Boolean,//是否关注
        5606508343: Boolean,//是否关注
        5761832233: Boolean,//是否关注
        5601138554: Boolean,//是否关注
        5759463773: Boolean,//是否关注
        5612739406: Boolean,//是否关注
        5606252932: Boolean,//是否关注
        5612544469: Boolean,//是否关注
        5606404759: Boolean,//是否关注
        5601105725: Boolean,//是否关注
        5761928636: Boolean,//是否关注
        5764314380: Boolean,//是否关注
        5606375050: Boolean,//是否关注
        5759906093: Boolean,//是否关注
        5759617615: Boolean,//是否关注
        5612953946: Boolean,//是否关注
        5778135054: Boolean,//是否关注
        5606476960: Boolean,//是否关注
        5761925635: Boolean,//是否关注
        5612868908: Boolean,//是否关注
        5793638288: Boolean,//是否关注
        5612892705: Boolean,//是否关注
        5779680072: Boolean,//是否关注
        5612728042: Boolean,//是否关注
        5764301380: Boolean,//是否关注
        5612941376: Boolean,//是否关注
        5757530493: Boolean,//是否关注
        5778438361: Boolean,//是否关注
        5800952399: Boolean,//是否关注
        5606463752: Boolean,//是否关注
    },
    {
        collection: collection
    }
);

var celebritiesManager = db.model(collection, celebritiesSchema);

/**
 * 保存
 * @param movies
 * @param callback
 */

exports.insert = function (update, callback) {
    console.log(update);
    var where = {uid: update.uid};
    celebritiesManager.update(where, update, {upsert: false}, callback);
};

/**
 * 当前账号未关注的明星
 * @param sid
 * @param cabllback
 */
exports.findNoAttention = function (sid, cabllback) {
    var where = {state:null};
    where[sid] = null;
    var res = {uid: 1, record: 1, _id: 0};
    res[sid] = 1;
    celebritiesManager.find(where, res, function (err, result) {
        if (err)
            console.log(err)
        else
            cabllback(null, result)
    })
}
/**
 * 单前账号关注的明星
 * @param sid
 * @param cabllback
 */
exports.findNowAttention = function (sid, cabllback) {
    var where = {state:null};
    where[sid] = true;
    var res = {uid: 1, record: 1, _id: 0};
    res[sid] = 1;
    celebritiesManager.find(where, res, function (err, result) {
        if (err)
            console.log(err);
        else
            cabllback(null, result);
    })
}


/**
 *10个账号  获得所有未被关注的id
 * @param cabllback
 */
exports.tenFindAllBySid = function (cabllback) {
    var where = {attention: false};
    var res = {uid: 1,_id:0};
    celebritiesManager.find(where,res, function (err, result) {
        if (err)
            console.log(err);
        else
            cabllback(null, result);
    })
}

/**
 *查询全部uid
 * @param cabllback
 */
exports.FindAllBySid = function (record,cabllback) {
    var where = {state: null,record:record};
    var res = {uid: 1,_id:0};
    celebritiesManager.find(where,res, function (err, result) {
        if (err)
            console.log(err);
        else
            cabllback(null, result);
    })
}

