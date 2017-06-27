/**
 * Created by 贾承斌 on 16/7/24.
 */

//定义 引用
var config = require("../config");
var mongoose = require(config.mongoose);
var Schema = mongoose.Schema;
var collectionName=config.fictionsCollection;
var fictionsSchema = new Schema(
    {
        sourceId: String,       //原始id
        title: String,          //电影名称
        updateTime: Date,       //更新时间
        author: String,          //作者
        genres: [],              //分类
        simplePlot: String,      //简介
        url: String,             //链接
        wordCount: Number,       //字数
        type: String,            //类型
        hot: Number,             //人气
        click: Number,           //点击量
        platform: String,       //平台
        createTime: Date,       //创建时间
        tags: [],                //标签
        urlPoster: String,       //封面

    },
    {
        collection: collectionName
    }
);
var manager = mongoose.model(collectionName, fictionsSchema);

//--------------------方法---------
/**
 * 保存方法
 * @param movies
 * @param callback
 */
exports.save = function (movies, callback) {
    manager.create(movies, callback);
};
//exports.removeMovie = function (where, callback) {
//    moviesManager.remove(where, callback);
//};
//exports.findOneAndUpdate = function (where, update, callback) {
//    moviesManager.findOneAndUpdate(where, update, {upsert: false}, callback);
//};
//
//exports.upsertMovie = function (where, update, callback) {
//    moviesManager.findOneAndUpdate(where, update, {upsert: true}, callback);
//};
//
//
//exports.findOneMovie = function (where, c, callback) {
//    moviesManager.findOne(where, c, callback);
//};
///**
// * 跟新数据
// * @param where
// * @param update
// * @param callback
// */
//exports.updateMovie = function (where, update, callback) {
//    moviesManager.update(where, update, {upsert: false, multi: true}, callback);
//};
////
////
//exports.findSomeMovies = function (where, col, count, callback) {
//    moviesManager.find(where, col).limit(count).exec(callback);
//};
////
//exports.findMovies = function (where, col, callback) {
//    moviesManager.find(where, col, callback);
//};

/**
 * 插入原属数据库
 * @param data
 * @param callback
 */
exports.findOneAndUpsert = function (data, callback) {

    var fiction = {
        sourceId: data.sourceId,
        title: data.title,//电影名称
        updateTime: new Date(),
        platform: data.platform,//平台
    };
    if (data.hot) {
        fiction.hot = data.hot;
    }
    if (data.click) {
        fiction.click = data.click;
    }
    if (data.type) {
        fiction.type = data.type;
    }
    if (data.wordCount) {
        fiction.wordCount = data.wordCount;
    }
    if (data.author) {
        fiction.author = data.author;
    }
    if (data.genres) {
        fiction.genres = data.genres;
    }
    if (data.simplePlot) {
        fiction.simplePlot = data.simplePlot;
    }
    if (data.url) {
        fiction.url = data.url;
    }
    if (data.tags) {
        fiction.tags = data.tags;
    }

    if (data.type) {
        fiction.type = data.type;
    }

    manager.findOneAndUpdate({sourceId: data.sourceId, platform: data.platform}, fiction, {upsert: true}, callback);
};
///**
// * 用来分析网络大电影
// * @param where
// * @param callback
// * @constructor
// */
//exports.AnalysisWebMovie = function (where, callback) {
//
//    moviesManager.aggregate(
//        [
//            {
//                "$match": where
//            },
//            {"$project": {'title': 1, 'data.playCount': 1, 'releaseDate': 1}},
//            {
//                "$group": {
//                    "_id": {
//                        data: {$substr: ["$releaseDate", 0, 7]},
//                    },
//                    //"num": {$sum: "$data.playCount"}
//                    "num": {$sum: 1}
//                }
//            },
//        ]
//    ).exec(callback);
//};
//
exports.findPagination = function (params, callback) {
    //console.info(params);
    var q = params.search;//
    // if (params.search) {
    // var reg = new RegExp(params.search.key);//模糊查询参数
    // q.$or = [{'title': reg}];
    //  q = params.search;
    //}
    var col = params.columns;//字段

    var pageNumber = params.page || 1;//页数
    var resultsPerPage = params.limit || 20;//每页行数
    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;//其实也
    var query = manager.find(q, col).sort('-showDate').skip(skipFrom).limit(resultsPerPage);
    query.exec(function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            manager.count(q, function (err, count) {
                if (err) {
                    callback(err, null);
                } else {
                    var pageCount = Math.ceil(count / resultsPerPage);
                    callback(null, {'pageCount': pageCount, 'results': results, currentPage: pageNumber, sum: count});
                }
            });
        }
    });
};
