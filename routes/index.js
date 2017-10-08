/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
var express = require('express');
var router = express.Router();
var fs = require('fs');
var parser = require('ua-parser-js');
//ファイルの書き込み関数
function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            throw err;
        }
    });
}
function ObjArraySort(ary, key, order) {
    var reverse = 1;
    if (order && order.toLowerCase() == "desc")
        reverse = -1;
    ary.sort(function (a, b) {
        if (a[key] < b[key])
            return -1 * reverse;
        else if (a[key] == b[key])
            return 0;
        else
            return 1 * reverse;
    });
}
router.get('/earth', function (req, res, next) {
    res.render('earth', { title: 'Earth' });
});
router.get('/vrviewer', function (req, res, next) {
    res.render('vrviewer', { title: 'VR Viewer' });
});
router.get('/vrtheatre', function (req, res, next) {
    console.log(req.query); // for logging
    var movie = req.query.movie ? req.query.movie : "doglegs.mp4";
    res.render('vrtheatre', { title: 'VR THEATRE', movie: movie });
});
router.get('/d3', function (req, res, next) {
    res.render('d3', { title: 'D3' });
});
router.get('/d3camera', function (req, res, next) {
    res.render('d3camera', { title: 'D3Camera' });
});
router.get('/react', function (req, res, next) {
    res.render('react', { title: 'REACT' });
});
router.get('/dev', function (req, res, next) {
    var agent = parser(req.headers['user-agent']);
    var device_type = agent.device.type;
    //var json    = fs.readFileSync("public/data/panelists.json","utf-8");
    //var obj     = JSON.parse(json);
    if (device_type == "mobile") {
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭VR', mobile: true });
    }
    else {
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭', mobile: false });
    }
});
router.get('/i', function (req, res, next) {
    res.render('index_i', { title: 'DOCU-MEMENTO映画祭VR', mobile: true });
});
//VOTE
router.get('/v', function (req, res, next) {
    //var json    = fs.readFileSync("public/data/panelists.json","utf-8");
    //var obj     = JSON.parse(json);
    //var panels  = obj.panels;
    res.render('vote_i', { title: 'DOCU-MEMENTO投票システム', mobile: true });
});
//SEAT
router.get('/s', function (req, res, next) {
    res.render('seat_i', { title: 'DOCU-MEMENTO投票システム', mobile: true });
});
router.get('/prog', function (req, res, next) {
    res.render('seat_i', { title: 'DOCU-MEMENTO投票システム', mobile: true });
});
router.get('/', function (req, res, next) {
    var agent = parser(req.headers['user-agent']);
    var device_type = agent.device.type;
    console.log("================================================");
    console.log(agent.device.type);
    console.log("================================================");
    if (device_type == "mobile") {
        res.render('index_i', { title: 'DOCU-MEMENTO映画祭@i', mobile: true });
        //res.render('index_tmp', { title: 'DOCU-MEMENTO映画祭VR', mobile:true});
    }
    else {
        res.render('index_tmp', { title: 'DOCU-MEMENTO映画祭', mobile: false });
    }
});
router.post('/voteapi', function (req, res, next) {
    var votes = req.body;
    var ary = [];
    for (var i = 0; i < Object.keys(votes).length; i++) {
        ary[i] = { 'vote': votes[Object.keys(votes)[i]], 'name': Object.keys(votes)[i] };
    }
    ObjArraySort(ary, 'vote', "desc");
    votes = {};
    for (var i = 0; i < ary.length; i++) {
        votes[ary[i].name] = ary[i].vote;
    }
    var obj = { "vote": votes };
    writeFile("public/data/vote.json", JSON.stringify(obj));
    res.send("voteapi");
});
module.exports = router;
