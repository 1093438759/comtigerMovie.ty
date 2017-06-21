var express = require("express");
var url = require("url");
var router = express.Router();
var showController = require('../controller/showController');
var topSearchControll = require('../controller/topSearchControll');
router.post("/updateVideo", function (req, res) {
    console.log("执行post方法")
    var videos = req.body;
    showController.updateVideo(videos, function (error, results) {
        if (!error) {
            return res.send(
                {
                    result: 'ok',
                }
            );
        } else {
            return res.send(
                {
                    result: 'err',
                    message: '出现错误'
                }
            );
        }
    })
});

router.post("/updateDiscuss", function (req, res) {
    console.info("执行了post方法");
    var discuss = req.body;
    showController.updateDiscuss(discuss, function (err, results) {
        if (!err) {
            return res.send(
                {
                    result: 'ok',
                    data: results
                }
            );

        } else {
            return res.send(
                {
                    result: 'err',
                    message: '出现错误'
                }
            );
        }

    })
});

router.get("/findID", function (req, res) {
    console.info("执行了get方法");
    var params = url.parse(req.url, true).query;//req.query.terrace
    var platform = (params.platform);
    console.log(platform);
    showController.findID(platform, function (err, result) {
        if (err) {
            return res.send(err);
        } else
            return res.send(result);
    });
});

router.post("/updateTopSearch", function (req, res) {
    console.info("执行了post方法");
    var topSearch = req.body;
    topSearchControll.updateSome(topSearch, function (err, result) {
        if (!err) {
            return res.send(
                {
                    result: "ok",
                }
            );
        } else {
            return res.send(
                {
                    message: err,
                }
            );
        }

    })
});

module.exports = router;