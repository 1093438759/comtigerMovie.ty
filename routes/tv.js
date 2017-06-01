
var express = require("express");
var url = require("url");
var router = express.Router();
var showController = require('../controller/showController');
router.post("/updateVideo", function(req, res) {
     var videos = req.body;
    showController.updateVideo(videos,function(error,results){
        if(!error){
            return res.send(
                {
                    result: 'ok',
                    data: results
                }
            );
        }else{
            return res.send(
                {
                    result: 'err',
                    message: '出现错误'
                }
            );
        }
    })
});

router.get("/findID", function(req, res) {
    console.info("执行了get方法");
    var params = url.parse(req.url, true).query;//req.query.terrace
    var platform = (params.platform);
    console.log(platform);
    showController.findID(platform, function (err,result) {
    if(err){
        return res.send(err);
    }else
        return res.send(result);
    });
});
module.exports = router;