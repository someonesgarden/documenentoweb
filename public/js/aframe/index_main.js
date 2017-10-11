document.VR = false;
var CURSOR_OUT = "0 12.2 -1.3";
var CURSOR_IN = "0 0.2 -1.3";

var loader = document.getElementById("loader");
var cursor = document.querySelector("#cursor");
var scene  = document.querySelector('a-scene');
var sky    = document.querySelector('a-sky');

//3dmodel
var lantan = d3.select("#lantan");
//var earth = d3.select("#earth");
var house = d3.select('#house_small');
var largehouse = d3.select('#house_large');
var largehouseselector   = document.querySelector('#house_large');
var amagi = d3.select('#amagi');
var infobox = d3.select('#infobox');
var panelbox1 = d3.select('#panelbox1');
var panelbox1selector = document.querySelector('#panelbox1');

//top infos
var top_topinfo1 = document.querySelector('#top_topinfo1');
var top_topinfo2 = document.querySelector('#top_topinfo2');
var top_topinfo3 = document.querySelector('#top_topinfo3');
var topinfos = [
    top_topinfo1,
    top_topinfo2,
    top_topinfo3
];

var programs    = document.querySelectorAll('a-entity#programs a-image');
for(var i=0;i<programs.length;i++){
    programs[i].setAttribute('n',i);
}
var panellers   = document.querySelectorAll('a-entity#panellers a-image');
for(var i=0;i<panellers.length;i++){
    panellers[i].setAttribute('n',i);
}

var venues = document.querySelectorAll('a-entity#venues a-image');


// About
var about_venu = d3.select('#about_venu');
var about_toudansha = d3.select('#about_toudansha');
var about_program = d3.select('#about_program');
var about_fes = d3.select('#about_fes');
var about_fes_j = d3.select('#about_fes_j');
// Logo
var votes;
var seats;

document.mode = "infobox";
document.visible_model = infobox;

/////////// VoteDataLoader
var jsondataloader = function(){
    /*
    d3.json("data/vote.json", function (error, data) {
        votes = data.vote;
        console.log("votes");
        console.log(votes);
        for(var i = 0; i < panellers.length; i++) setVoteDigit(panellers[i], votes);
    });
      */


    d3.json("data/seats.json", function(error, data){
        for(var i = 0; i< programs.length; i++) setDigit(programs[i], data.seats);
    });

};

var setVoteDigit = function(p, votes){
    var name = p.getAttribute("id");
    var d1 = p.querySelector('.d1');
    var d2 = p.querySelector('.d2');
    var d3 = p.querySelector('.d3');

    var p_str = votes[name];
    if(p_str!=undefined) {

        if(!isNaN(p_str)) p_str =('000' + p_str).slice(-3); //数値の場合、3桁の文字列に変換

        var d1_ = p_str.substr(0, 1);
        d1.setAttribute("num", d1_);
        d1.pause();
        d1.play();
        var d2_ = p_str.substr(1, 1);
        d2.setAttribute("num", d2_);
        d2.pause();
        d2.play();
        var d3_ = p_str.substr(2, 1);
        d3.setAttribute("num", d3_);
        d3.pause();
        d3.play();
    }
};



var setDigit = function(v, seats){
    var name = v.getAttribute("id");
    var d1 = v.querySelector('.d1');
    var d2 = v.querySelector('.d2');
    var d3 = v.querySelector('.d3');
    var d4 = v.querySelector('.d4');

    console.log("name=",name);
    console.log("seats=",seats);
    if(seats[name]!=undefined){
        var res_str = seats[name].num;
        var max_str = seats[name].max;
        var d1_ = res_str.substr(0, 1); d1.setAttribute("num", d1_); d1.pause(); d1.play();
        var d2_ = res_str.substr(1, 1); d2.setAttribute("num", d2_); d2.pause(); d2.play();
        var d3_ = max_str.substr(0, 1); d3.setAttribute("num", d3_); d3.pause(); d3.play();
        var d4_ = max_str.substr(1, 1); d4.setAttribute("num", d4_); d4.pause(); d4.play();
    }
};


//////////// LOAD VOte DATA
jsondataloader();

/////////// INIT
var run = function () {
    loader.classList.add("hidden");
    setTimeout(function(){

        for (var i = 0; i < topinfos.length; i++) {
            moveMenuItem2DefPos(topinfos[i]);
        }

        //moveMenuItem(top_topinfo1, 235);
    },1000);

    if (getDevice == 'sp') {
        scene.enterVR();
        setTimeout(function () {
            scene.enterVR();
        }, 1000);
    }
};

if (!scene.hasLoaded) {
    scene.addEventListener('loaded', run);
}


///////////// FUNCTION
var switchPanelBox = function (name) {

    var model_to_change = panelbox1;
    var model_y = 0;

    model_y = model_to_change.attr("position").y;
    if (model_y == 45) {
        var tween = new AFRAME.TWEEN.Tween({y: 45, ly: 0})
            .to({y: 0, ly: 80}, 1400)
            //to()までの数値変化のイージング種類
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(function () {
                model_to_change.attr({position: "0 " + this.y + " -3"});
                document.visible_model.attr({position: "0 " + (45 - this.y) + " -3"});
            })
            .onComplete(function () {
                document.mode = "panelbox1";
                document.visible_model = panelbox1;
            });
        tween.start();
    }
}


///////////// FUNCTION
var switchModel = function (model) {

    var model_to_change = null;
    var model_y = 0;

    switch(model){

        case "earth":
            sky.setAttribute("src", "");
            //model_to_change = earth;
            break;
        case "house":
            model_to_change = house;
            break;
        case "amagi":
            model_to_change = amagi;
            break;
        case "infobox":
            model_to_change = infobox;
            break;
        case "lantan":
            model_to_change = lantan;
            break;
        case "panelbox1":
            model_to_change = panelbox1;
            break;
        default:
            model_to_change = house;
            break;
    }

    model_y = model_to_change.attr("position").y;
    if (model_y == 45) {
        var tween = new AFRAME.TWEEN.Tween({y: 45, ly: 0})
            .to({y: 0, ly: 80}, 1400)
            //to()までの数値変化のイージング種類
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(function () {
                model_to_change.attr({position: "0 " + this.y + " -3"});
                document.visible_model.attr({position: "0 " + (45 - this.y) + " -3"});
            })
            .onComplete(function () {
                document.mode = model;
                document.visible_model = model_to_change;
            });
        tween.start();
    }
}


//ENTER / EXIT VR
scene.addEventListener('enter-vr', function () {
    console.log("ENTERED VR");
    if(mobile){
        cursor.setAttribute('position', CURSOR_IN);
        cursor.setAttribute('cursor',"maxDistance:100; fuse:true;");
    }
    document.VR = true;
});
scene.addEventListener('exit-vr', function () {
    console.log("EXIT VR");
    if(mobile) {
        cursor.setAttribute('position', CURSOR_OUT);
        cursor.setAttribute('cursor', "maxDistance:100; fuse:false;");
    }
    document.VR = false;
});


////////// EVENT ////////////////
// Logo
//        logo_bug.addEventListener('click', function () {
//            moveMenuItem(prog_kaihouku,30);
//        });
//
//         logo_bug.addEventListener('mouseenter', function () {
//             console.log("logo_bu");
//            moveMenuItem(prog_kaihouku,200);
//        });
//         logo_bug.addEventListener('mouseleave', function () {
//            moveMenuItem2DefPos(prog_kaihouku);
//        });

// About
about_program.on('click',function(){
    switchModel("house");
    largehousemove("back");

    for (var i = 0; i < topinfos.length; i++) {
        moveMenuItem(topinfos[i], 90);
    }

    for (var i = 0; i < programs.length; i++) {
        moveMenuItem2DefPos(programs[i]);
    }

    for (var j = 0; j < panellers.length; j++) {
        moveMenuItem(panellers[j], 90);
    }

    for (var j = 0; j < venues.length; j++) {
        moveMenuItem(venues[j], 90);
    }
});


about_fes.on('click', function () {
    switchModel("infobox");
    largehousemove("back");
    for (var i = 0; i < topinfos.length; i++) {
        moveMenuItem2DefPos(topinfos[i]);
    }

    for (var i = 0; i < programs.length; i++) {
        moveMenuItem(programs[i], 90);
    }
    for (var j = 0; j < panellers.length; j++) {
        moveMenuItem(panellers[j], 90);
    }

    for (var j = 0; j < venues.length; j++) {
        moveMenuItem(venues[j], 90);
    }
});

about_fes_j.on('click', function () {
    switchModel("house");
    largehousemove("back");
    for (var i = 0; i < topinfos.length; i++) {
        moveMenuItem2DefPos(topinfos[i]);
    }

    for (var i = 0; i < programs.length; i++) {
        moveMenuItem(programs[i], 90);
    }
    for (var j = 0; j < panellers.length; j++) {
        moveMenuItem(panellers[j], 90);
    }

    for (var j = 0; j < venues.length; j++) {
        moveMenuItem(venues[j], 90);
    }
});

about_venu.on('click', function () {
    switchModel("lantan");

    for (var i = 0; i < topinfos.length; i++) {
        moveMenuItem(topinfos[i], 90);
    }

    for (var j = 0; j < programs.length; j++) {
        moveMenuItem(programs[j], 90);
    }

    for (var j = 0; j < panellers.length; j++) {
        moveMenuItem(panellers[j], 90);
    }

    for (var j = 0; j < venues.length; j++) {
        moveMenuItem2DefPos(venues[j]);
    }
});


about_toudansha.on('click', function(){
    switchModel("house");
    largehousemove("back");

    for (var i = 0; i < topinfos.length; i++) {
        moveMenuItem(topinfos[i], 90);
    }

    for (var i = 0; i < panellers.length; i++) {
        moveMenuItem2DefPos(panellers[i]);
    }

    for (var i = 0; i < programs.length; i++) {
        moveMenuItem(programs[i], 90);
    }

    for (var j = 0; j < venues.length; j++) {
        moveMenuItem(venues[j], 90);
    }
});


// 3d model
var largehousemove = function(mode,videourl=""){

    console.log("videourl=",videourl);

    var largehouse_y = largehouse.attr("position").y;

    var y0 = 0;
    var y1 = 80;

    if(mode=="video"){
        sky.setAttribute("src", "/assets/video/"+videourl+".mp4");
    }


    if (mode=="video" && largehouse_y < 80) {
        y0 = largehouse_y;
        y1 = 80;

        var tween = new AFRAME.TWEEN.Tween({y: y0})
            .to({y: y1}, 400)
            //to()までの数値変化のイージング種類
            .easing(TWEEN.Easing.Circular.In)
            .onUpdate(function () {
                largehouse.attr({
                    position: "0 " + this.y + " -3"
                });
                largehouseselector.pause();
            })
            .onComplete(function () {
            });
        tween.start();

    }

    else if (mode=="back" && largehouse_y >0) {
        y0 = largehouse_y;
        y1 = 0;

        var tween = new AFRAME.TWEEN.Tween({y: y0})
            .to({y: y1}, 1400)
            //to()までの数値変化のイージング種類
            .easing(TWEEN.Easing.Circular.Out)
            .onUpdate(function () {
                largehouse.attr({
                    position: "0 " + this.y + " -3"
                });
                largehouseselector.play();
            })
            .onComplete(function () {
                sky.setAttribute("src", "");
            });
        tween.start();
    }
};

/*
earth.on('click', function(){
    console.log("earth clicked");
});
*/

house.on('click',function(){
    console.log("house clicked");
    largehousemove("back");
});


//SOCKET.IO
var socketresponse = function (data) {
    console.log("socketresponse test",data.value.votes);
    for(var i = 0; i < panellers.length; i++) setVoteDigit(panellers[i], data.value.votes);
};

var socketseatresponse = function(data){
    console.log("data=",data);
    for(var i = 0; i< programs.length; i++) setDigit(programs[i], data.value.seats);
};


window.socketseatresponse = socketseatresponse;
window.socketresponse = socketresponse;
window.votes = votes;
