/**
 * Created by ty on 2017/6/21.
 */

var express = require("express");
var url = require("url");
var router = express.Router();
var starControll = require("../controller/starControll");
var weiboFollows = require("../model/weiboFollows");
var baiDuTieBa = require("../model/baiDuTieBa");

/**
 * 骨朵和百晓生
 */
router.post("/updateStar", function (req, res) {
    var data = req.body;
    starControll.updateStar(data, function (err, result) {
        if (err) {
            return res.send(
                {
                    result: err,
                }
            );
        } else {
            return res.send(
                {
                    result: result,
                }
            );
        }
    })

});

/**
 * 插入微博关注的明星
 */
router.post("/attentionStar", function (req, res) {
    var data = req.body;
    weiboFollows.insert(data, function (err, result) {
        if (err) {
            return res.send(
                {
                    result: err,
                }
            );
        } else {
            return res.send(
                {
                    result: result,
                }
            );
        }
    })
});

/**
 * 查询单前账号未关注的明星
 */
router.get("/noAttentionStar", function (req, res) {
    var params = url.parse(req.url, true).query;//req.query.terrace
    var sid = (params.sid);
    weiboFollows.findNoAttention(sid, function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    })

});


/**
 * 查询已关注的明星
 */
router.get("/nowAttentionStar", function (req, res) {
    var params = url.parse(req.url, true).query;//req.query.terrace
    var sid = (params.sid);
    weiboFollows.findNowAttention(sid, function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    })

});

/**
 * 查询10个账号所有未被关注的明星
 */
router.get("/tenAllNoAttentionStar", function (req, res) {

    weiboFollows.tenFindAllBySid(function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    })
});
/**
 *
 */
router.get("/aStar", function (req, res) {
    var params = url.parse(req.url, true).query;//req.query.terrace
    var record = (params.record);
    weiboFollows.FindAllBySid(record, function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    })
});

router.post("/baiDu", function (req, res) {
    var update = req.body;
    baiDuTieBa.insert(update, function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    })
});


module.exports = router;