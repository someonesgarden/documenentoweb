/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />

var express = require('express');
var router = express.Router();
var basicAuth = require('basic-auth-connect');
var fs = require('fs');
var parser = require('ua-parser-js');

//router.use(basicAuth('tabitabi','bitabita'));

//ファイルの書き込み関数
function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
        if (err) {
            throw err;
        }
    });
}


router.get('/earth', (req,res, next)=> {
  res.render('earth', {title: 'Earth'});
});

router.get('/vrviewer', (req,res, next)=> {
  res.render('vrviewer', {title: 'VR Viewer'});
});

router.get('/vrtheatre', function(req,res,next){
    console.log(req.query); // for logging
    var movie = req.query.movie  ? req.query.movie : "doglegs.mp4";
    res.render('vrtheatre', {title: 'VR THEATRE', movie:movie});
});

router.get('/d3', (req,res, next)=>{
   res.render('d3', {title:'D3'});
});

router.get('/d3camera', (req,res, next)=>{
    res.render('d3camera', {title:'D3Camera'});
});


router.get('/react',(req,res,next)=>{
    res.render('react', {title:'REACT'});
});


router.get('/dev', (req, res, next)=> {

    const agent = parser(req.headers['user-agent']);
    const device_type = agent.device.type;
    console.log("================================================");
    console.log(agent.device.type);
    console.log("================================================");

    if(device_type=="mobile"){
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭VR', mobile:true});
    }else{
        res.render('index_new', { title: 'DOCU-MEMENTO映画祭', mobile:false});
    }
});


router.get('/', (req, res, next)=> {

    const agent = parser(req.headers['user-agent']);
    const device_type = agent.device.type;
    console.log("================================================");
    console.log(agent.device.type);
    console.log("================================================");

    if(device_type=="mobile"){
        res.render('index_tmp', { title: 'DOCU-MEMENTO映画祭VR', mobile:true});
    }else{
        res.render('index_tmp', { title: 'DOCU-MEMENTO映画祭', mobile:false});
    }
});


router.post('/voteapi', (req, res, next)=> {

    var obj = {"vote":req.body};
    writeFile("public/data/vote.json", JSON.stringify(obj));
    res.send("voteapi");
});



module.exports = router;
