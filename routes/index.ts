var express = require('express');
var router = express.Router();

router.get('/earth', (req,res, next)=> {
  res.render('earth', {title: 'Earth'});
});

router.get('/vrviewer', (req,res, next)=> {
  res.render('vrviewer', {title: 'VR Viewer'});
});

// router.get('/vrtheatre', function(req,res, next){
//     res.render('vrtheatre', {title: 'VR THEATRE'});
// });

router.get('/vrtheatre', function(req,res,next){
    console.log("this is apen!!!!");

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


router.get('/', (req, res, next)=> {
  res.render('index', { title: 'DOCU-MEMENTO映画祭' });
});

module.exports = router;
