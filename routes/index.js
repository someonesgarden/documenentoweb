/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth-connect');
var fs = require('fs');
//router.use(basicAuth('tabitabi','bitabita'));
var parser = require('ua-parser-js');
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
router.get('/', function (req, res, next) {
    var agent = parser(req.headers['user-agent']);
    var device_type = agent.device.type;
    console.log("================================================");
    console.log(agent.device.type);
    console.log("================================================");
    if (device_type == "mobile") {
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭VR', mobile: true });
    }
    else {
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭', mobile: false });
    }
});
module.exports = router;
