/**
 * Created by ty on 2017/6/26.
 */
var express = require("express");
var router = express.Router();
var fictions=require("../model/fictions")
router.post("/updateFictions", function (req, res) {
    var data = req.body;
    fictions.findOneAndUpsert(data, function (err,result) {
        if (err) {
            return res.send(
                {
                    result:err,
                }
            );
        } else {
            return res.send(
                {
                    result: "成功插入",
                }
            );
        }
    })

});

module.exports=router;