/**
 * Created by Jia Chengbin on 15/8/18.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var celebritiesSchema = new Schema(
    {
        name: String,  //中文名
        nameEn: String,//英文名
        ids: {},
        akas: [],      //有名
        placeOfBirth: String,//出生地
        dateOfBirth: String,//生日

        birthMonth: Number,//生 日
        birthYear: Number,//生 月
        birthDay: Number,//生 年

        deathYear: Number,// 死 年
        deathMonth: Number,//死 月
        deathDay: Number,//死 日
        introduce: String,


        gender: String,//性别
        height: String,//身高
        salaries: String,//薪资
        spouse: {},//配偶
        relations: [],//社会关系
        keys: {},//关键词
        tags: [],//标签
        constellation: String,//星座
        tradeMark: {},///特征
        uniqueName: String,//
        avatar: String,//头像
        filmographies: [],// 作品
        section: [],//职务
        sectionEn: [],//职务 英文
        awards: [],
        sns: [//社交账号
            {
                name: String,//website\ weibo\ weixin qq\facebook\twitter
                url: String,
                followersCount: Number,//粉丝数量
                friendsCount: Number,
                totalCount: Number,//百度贴吧帖子数
                statusesCount: Number
            }
        ],
        feature: [],//特点
        createdTime: {
            type: Date, required: true, default: function () {
                return new Date()
            }
        },
        updateTime: Date,
        mappingTime: Date,
        aH: {},//韩老师接口影响力 演员
        dH: {},//韩老师接口影响力 导演

        /*  "updateTime" : ISODate("2016-05-26T15:49:05.184Z"),
         "Zindex" : "8.01",
         "Gindex" : "96.00"*/

        influence: { //影响力,雷达图展示用
            //updateTime: Date,
            //tieba: String,
            //weixin: String,
            //weibo: String,
            //news: String,
            //bbs: String
        },
        moviesAnalysis: {}, //作品概况
        monitored: Boolean,//true:被监控,false:未被监控

        weight: String,         //体重
        school: String,         //毕业院校
        brokeragefirm: String,  //经纪公司
        introduction: String,   //演员或者导演简介
        birthday: Date,         //出生年月
        awards: String,         //获奖情况
        nation: String          //名族
    },
    {
        collection: 'm_celebrities'
    }
);

var celebritiesManager = mongoose.model('m_celebrities', celebritiesSchema);
/**
 * 出入艺人数据
 * @param where
 * @param update
 * @param callback
 */
exports.upsertCelebrity = function (where, update, callback) {
    celebritiesManager.findOneAndUpdate(where, update, {
        new: true,
        upsert: true,
        select: "ids name enname avatar"
    }, callback);
};


/**
 * 分页查询
 * @param params
 * @param callback
 */
exports.findPagination = function (params, callback) {
    var q = {};

    if (params.search.key) {
        var reg = new RegExp(params.search.key);//模糊查询参数
        q.$or = [{'name': reg}, {'enname': reg}];
    }

    //var q = params.search || {};//查询条件
    var col = params.columns;//字段
    var pageNumber = params.num || 1;//页数
    var resultsPerPage = params.limit || 10;//每页行数
    var sort = params.sort || '-createdTime';
    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    //console.info(q);
    //console.info('q:' + q + ' col:' + col + ' pageNumber:' + pageNumber + ' skipFrom:' + skipFrom);
    var query = celebritiesManager.find(q, col).sort(sort).skip(skipFrom).limit(resultsPerPage);
    query.exec(function (err, results) {
        if (err) {
            callback(err, null);
        } else {
            celebritiesManager.count(q, function (err, count) {
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

/**
 * 根据条件删除
 * @param where
 * @param callback
 */
exports.removeCelebrity = function (where, callback) {
    celebritiesManager.remove(where, callback);
};

/**
 * 保存
 * @param movies
 * @param callback
 */
exports.saveCelebrity = function (celebrity, callback) {
    celebritiesManager.create(celebrity, callback);
};

exports.insertCelebrity = function (where, update, callback) {
    celebritiesManager.update(where, update, {insert: true}, callback);
};

/**
 *
 * @param where  查询条件
 * @param callback
 */
exports.findCelebrity = function (where, c, callback) {
    celebritiesManager.findOne(where, c, callback);
};

exports.findCelebrities = function (where, c, callback) {
    celebritiesManager.find(where, c, callback);
};

exports.findCelebritiesByCount = function (where, c, n, callback) {
    celebritiesManager.find(where, c).limit(n).exec(callback);
};

exports.findSearchCelebrities = function (key, col, callback) {
    celebritiesManager.find({name: {'$ne': null}, $text: {$search: key}}, col).limit(5).exec(callback);
}


exports.updateCelebrities = function (update, callback) {
    var where = {name: update.name, ids: update.ids};
    celebritiesManager.update(where, update, {upsert: true}, function (err, result) {
        if (err) {
            callback("Err" + err);
        } else {
            callback("成功插入" + result);
        }
    });
};

exports.findInfluenceTop100 = function (callback) {
    celebritiesManager.find({
        aH: {$ne: null},
        section: "演员"
    }, "name avatar aH.allbox aH.influence").sort({'aH.influence': -1}).limit(100).exec(callback);
};

/**
 * 查找更新  找到更新  未找到就插入一条新的
 * @param where
 * @param update
 * @param callback
 */
exports.findOneAndUpdate = function (where, update, callback) {
    celebritiesManager.findOneAndUpdate(where, update, {upsert: false, new: true}, callback);
};

exports.findOneAndUpsert = function (where, update, callback) {
    celebritiesManager.findOneAndUpdate(where, update, {new: true, upsert: true}, callback);
};

exports.findSomeToUpdate = function (platform, count, callback) {
    var where = {
        // gender: "未知",
        // data: null,
//        name:{$ne:null}
//        birthYear:{$ne:null}
        //placeOfBirth :{$ne:null}
//        dateOfBirth :{$ne:null}
        //dateOfBirth:null
    };
    where['ids.' + platform] = {"$ne": null};
    var c = "_id name nameEn ids." + platform;
    //console.info(c);
    celebritiesManager.find(where, c).sort({releaseDate: 1}).limit(count).exec(callback);
};

exports.findSomeToMapping = function (platform, count, callback) {
    var where = {};
    //ids.platform还没有数据才需要mapping
    where['ids.' + platform] = {"$exists": false};
    var c = "name nameEn birthYear";
    //console.info(c);
    celebritiesManager.find(where, c).sort({mappingTime: 1}).limit(count).exec(callback);
};


/**
 * 统计数量
 * @param where
 * @param callback
 */
exports.count = function (where, callback) {
    celebritiesManager.count(where, callback);
}
