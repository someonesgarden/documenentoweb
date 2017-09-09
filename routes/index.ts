var express = require('express');
var router = express.Router();

router.get('/earth', (req,res, next)=> {
  res.render('earth', {title: 'Earth'});
});

router.get('/vrviewer', (req,res, next)=> {
  res.render('vrviewer', {title: 'VR Viewer'});
});

router.get('/vrtheatre', (req,res, next)=> {
    res.render('vrtheatre', {title: 'VR THEATRE'});
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
