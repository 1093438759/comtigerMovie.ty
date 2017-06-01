/**
 * Created by ty on 2017/5/24.
 */

var http = require("http");
var url = require("url");
var util = require("util");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

//get
http.createServer(function (req, res) {
    //res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    mogodb(params.get(data));
}).listen(3000);


//post
http.createServer(function (req, res) {
    var body = "";
    req.on("datas", function (chunk) {
        body += chunk;
    });
    req.on("end", function () {
        // 解析参数
        body = querystring.parse(body);
        if(body.data && body.url) { // 输出提交的数据
             mogodb(body.get(data));
        } else {  // 输出表单
            res.write("插入成功");
        }
        res.end();
    });
}).listen(3000);


//插入数据库mongodb
function mogodb(data) {
    var mongoose = require("mongoose");
    var db = mongoose.connect("mongodb://127.0.0.1:27017/doc");
    var TestSchema = new mongoose.Schema({
        title:    {type: String},
        director: {type: String},
        act:      {type: String},
        catalog:  {type: String},
        area:     {type: String},
        year:     {type: String},
        mark:     {type: String},
        pv:       {type: String},
        content:  {type: String}
    });

    var TestModel = db.model("TV", TestSchema); //"test"相当于collection

    //遍历数据插入数据库
    for (var i = 0; i < data.length; i++) {
        var TestEntity = new TestModel({
            title: data.title,
            director: data.director,
            act: data.act,
            catalog: data.catalog,
            area: data.area,
            year: data.year,
            mark: data.mark,
            pv: data.pv,
            content: data.content
        });

        TestEntity.save(function (err, doc) {
            if (err) {
                console.log("error :" + err);
            } else {
                console.log("插入成功");
            }
        });
    }
}
/*
 var data={"title" : "名侦探柯南",
 "director" : "山本泰一郎",
 "act" : "高山南,山口胜平,林原惠美,堀川亮,山崎和佳奈,神谷明",
 "catalog" : "推理,校园",
 "area" : "日本",
 "year" : "1994",
 "mark" : "9.6",
 "pv" : "571255019",
 "content" : "《名侦探柯南》PPTV大陆正版授权，每周六晚19:30日本",}*/












/*
 public void updateData(JSONObject jsonObject) {
 Set<String> set = jsonObject.keySet();
 for (String key : set) {
 JSONArray teleplayArray = jsonObject.getJSONArray(key);
 for (int i = 0; i < teleplayArray.length(); i++) {
 JSONObject teleplayData = teleplayArray.getJSONObject(i);
 DBObject dbObject = (DBObject) JSON.parse(teleplayData.toString());
 DBObject upsertValue = new BasicDBObject("$set", dbObject);
 BasicDBObject queryObject = new BasicDBObject("title", dbObject.get("title"));
 DBCollection dbCollection = MongoDBUtils.getConnection("docs", "TV");
 dbCollection.update(queryObject, upsertValue, true, false);
 }
 }
 }*/
