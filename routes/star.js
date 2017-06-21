/**
 * Created by ty on 2017/6/21.
 */

var express = require("express");
//var url = require("url");
var router = express.Router();
var starControll=require("../controller/starControll")
router.post("/updateStar", function (req, res) {
    var data = req.body;
    starControll.updateStar(data, function (err,result) {
        if (err) {
            return res.send(
                {
                    result:err,
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

module.exports=router;