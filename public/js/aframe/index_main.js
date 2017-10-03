document.VR = false;
var CURSOR_OUT = "0 12.2 -1.3";
var CURSOR_IN = "0 0.2 -1.3";


var loader = document.getElementById("loader");
var cursor = document.querySelector("#cursor");

var scene = document.querySelector('a-scene');
var sky   = document.querySelector('a-sky');

//3dmodel
var lantan = d3.select("#lantan");
var earth = d3.select("#earth");
var house = d3.select('#house_small');
var largehouse = d3.select('#house_large');
var amagi = d3.select('#amagi');
var infobox = d3.select('#infobox');
var panelbox1 = d3.select('#panelbox1');
var panelbox1selector = document.querySelector('#panelbox1');

//top infos
var top_topinfo1 = document.querySelector('#top_topinfo1');

var topinfos = [
    top_topinfo1
];

//Programs
var prog_honshoji0311 = document.querySelector('#prog_honshoji0311');
var prog_kaido0311 = document.querySelector('#prog_kaido0311');
var prog_kaido0411 = document.querySelector('#prog_kaido0411');
var prog_kenkou0411 = document.querySelector('#prog_kenkou0411');
var prog_kenkou0414 = document.querySelector('#prog_kenkou0414');
var prog_matsumoto0311 = document.querySelector('#prog_matsumoto0311');
var prog_matsumoto0411 = document.querySelector('#prog_matsumoto0411');
var prog_unagi0410 = document.querySelector('#prog_unagi0410');
var prog_yatai0311 = document.querySelector('#prog_yatai0311');
var prog_yatai0411 = document.querySelector('#prog_yatai0411');
var prog_yatai0420 = document.querySelector('#prog_yatai0420');

var programs = [
    prog_honshoji0311,
    prog_kaido0311,prog_kaido0411,
    prog_kenkou0411,prog_kenkou0414,
    prog_matsumoto0311,prog_matsumoto0411,
    prog_unagi0410,
    prog_yatai0311,prog_yatai0411,prog_yatai0420
];

//venue
var venue_yataimura = document.querySelector('#venue_yataimura');
var venue_honshoji  = document.querySelector('#venue_honshoji');
var venue_matsumoto = document.querySelector('#venue_matsumoto');
var venue_kaidocafe = document.querySelector('#venue_kaidocafe');
var venue_kenkou = document.querySelector('#venue_kenkou');
var venue_kuromon = document.querySelector('#venue_kuromon');
var venue_unagi = document.querySelector('#venue_unagi');

var venues = [
    venue_yataimura,
    venue_honshoji,
    venue_matsumoto,
    venue_kaidocafe,
    venue_kenkou,
    venue_kuromon,
    venue_unagi];

//Panellers
var paneller_uchiyama = document.querySelector('#paneller_uchiyama');
var paneller_yonemoto = document.querySelector('#paneller_yonemoto');
var paneller_matsui = document.querySelector('#paneller_matsui');
var paneller_ota = document.querySelector('#paneller_ota');
var paneller_fujioka = document.querySelector('#paneller_fujioka');
var paneller_takeoka = document.querySelector('#paneller_takeoka');
var paneller_okuma = document.querySelector('#paneller_okuma');
var paneller_kan = document.querySelector('#paneller_kan');
var paneller_hidaka = document.querySelector('#paneller_hidaka');
var paneller_tokyo = document.querySelector('#paneller_tokyo');
var paneller_someonesgarden = document.querySelector('#paneller_someonesgarden');
var paneller_kawai = document.querySelector('#paneller_kawai');
var paneller_nobuki = document.querySelector('#paneller_nobuki');
var paneller_saitoh = document.querySelector('#paneller_saitoh');
var paneller_nakamura = document.querySelector('#paneller_nakamura');
var paneller_adachi = document.querySelector('#paneller_adachi');
var paneller_miyashita = document.querySelector('#paneller_miyashita');
var paneller_sakuragi = document.querySelector('#paneller_sakuragi');

var panellers = [
    paneller_uchiyama,
    paneller_yonemoto,
    paneller_matsui,
    paneller_ota,
    paneller_fujioka,
    paneller_takeoka,
    paneller_okuma,
    paneller_kan,
    paneller_hidaka,
    paneller_tokyo,
    paneller_someonesgarden,
    paneller_kawai,
    paneller_nobuki,
    paneller_saitoh,
    paneller_nakamura,
    paneller_adachi,
    paneller_miyashita,
    paneller_sakuragi
];
// About
var about_venu = d3.select('#about_venu');
var about_toudansha = d3.select('#about_toudansha');
var about_program = d3.select('#about_program');
var about_fes = d3.select('#about_fes');
var about_fes_j = d3.select('#about_fes_j');
// Logo
var votes;
var reserved;
var seat_max;

document.mode = "infobox";
document.visible_model = infobox;

/////////// VoteDataLoader
var jsondataloader = function(){
    d3.json("data/vote.json", function (error, data) {

        votes = data.vote;
        for (var i = 0; i < panellers.length; i++) {
            var p = panellers[i];

            var name = p.getAttribute("name");
            var d1 = p.querySelector('.d1');
            var d2 = p.querySelector('.d2');
            var d3 = p.querySelector('.d3');

            var p_str = votes[name];
            if(p_str!=undefined) {
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
        }
    });

    d3.json("data/seat.json", function(error, data){

        reserved = data.seats.reserved;
        seat_max = data.seats.max;

        for(var i = 0; i< venues.length; i++){

            var v = venues[i];
            var name = v.getAttribute("name");
            var d1 = v.querySelector('.d1');
            var d2 = v.querySelector('.d2');
            var d3 = v.querySelector('.d3');
            var d4 = v.querySelector('.d4');

            var res_str = reserved[name];
            var max_str = seat_max[name];

            var d1_ = res_str.substr(0, 1); d1.setAttribute("num", d1_); d1.pause(); d1.play();
            var d2_ = res_str.substr(1, 1); d2.setAttribute("num", d2_); d2.pause(); d2.play();
            var d3_ = max_str.substr(0, 1); d3.setAttribute("num", d3_); d3.pause(); d3.play();
            var d4_ = max_str.substr(1, 1); d4.setAttribute("num", d4_); d4.pause(); d4.play();


        }

    });
};




//////////// LOAD VOte DATA
jsondataloader();

/////////// INIT
var run = function () {
    loader.classList.add("hidden");
    setTimeout(function(){
        moveMenuItem(top_topinfo1, 235);
    },4000);
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
            model_to_change = earth;
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

about_venu.on('mouseenter',function(){
    console.log("about_town_mouseenter");
});

about_venu.on('mouseleave', function(){
    console.log("about_town_mouseleave");
})

// Program
/*
prog_businessman.addEventListener('click', function () {
    switchModel("schedule");
});

prog_tabitabi.addEventListener('click', function () {
    switchModel("earth");
});

prog_tokyodocs.addEventListener('click', function () {
    console.log("tokyodokc");
    switchModel("amagi");
});
*/


// 3d model

earth.on('click', function(){
    console.log("earth clicked");
});

house.on('click',function(){
    console.log("house clicked");
    var largehouse_y = largehouse.attr("position").y;
    if (largehouse_y ==80) {
        sky.setAttribute("src", "");
        var tween = new AFRAME.TWEEN.Tween({y: 80})
            .to({y: 0}, 400)
            //to()までの数値変化のイージング種類
            .easing(TWEEN.Easing.Circular.In)
            .onUpdate(function () {
                largehouse.attr({
                    position: "0 " + this.y + " -3"
                });
            })
            .onComplete(function () {
            });
        tween.start();
    }
});


//SOCKET.IO
var socketresponse = function (data) {
    console.log("socketresponse test",data);

    var point = data.value.point;

    var paneller = document.querySelector('a-image#paneller_'+data.value.name);
    var thisentity = paneller.el;

    var d1 = paneller.querySelector('.d1');
    var d2 = paneller.querySelector('.d2');
    var d3 = paneller.querySelector('.d3');

    var p_str = ('000' + point).slice(-3);

    var d1_ = p_str.substr(0, 1);
    var d2_ = p_str.substr(1, 1);
    var d3_ = p_str.substr(2, 1);

    d1.setAttribute("num", d1_);
    d2.setAttribute("num", d2_);
    d3.setAttribute("num", d3_);

    d1.pause();
    d1.play();
    d2.pause();
    d2.play();
    d3.pause();
    d3.play();
};



window.socketresponse = socketresponse;
window.votes = votes;

