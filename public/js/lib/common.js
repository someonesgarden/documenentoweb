var  toggleaudio = function(audioname=window.nowaudio) {

    if(window.nowaudio != "" && window.nowaudio != audioname){
        var prev_audio = document.getElementById(window.nowaudio);
        if(prev_audio != undefined){
            prev_audio.pause();
            prev_audio.currentTime = 0;
            window.nowaudio="";
        }
    }

    if(audioname!=""){
        var audio = document.getElementById(audioname);

        window.nowaudio = audioname;

        if(audio != undefined){
            if (audio.paused) {
                audio.play();

            }else{
                audio.pause();
                audio.currentTime = 0;
                window.nowaudio = "";
            }
        }
    }
};


var getDevice = (function () {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        return 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return 'tab';
    } else {
        return 'other';
    }
})();


var moveMenuItem = function(obj,angle){
    obj.play();
    console.log("type=",obj.getAttribute("type"));
    obj.angle_to = angle;
    obj.setAttribute('angle_to', angle);
    obj.pause();
    obj.play();
};

var moveMenuItem2DefPos = function (obj) {
    var type = obj.getAttribute("type");
    var n    = obj.getAttribute("n");
    var ang  = 0;

    if(type=="panel"){
        ang = 160+10*n;
    } else if(type=="venue"){
        ang = 225+12*n;
    }else if(type=="prog"){
        ang = 162+10*n;
    }else if(type=="topinfo"){
        ang = 225+20*n;
    }else{
        ang = 285 + 10*n;
    }

    obj.play();
    obj.setAttribute('angle_to', ang);
    obj.angle_to = ang;
    obj.pause();
    obj.play();
};


function votesSort(obj){
    var ary = [];
    for (var i = 0; i < Object.keys(obj).length; i++) {
        ary[i] = {'vote': obj[Object.keys(obj)[i]], 'name': Object.keys(obj)[i]};
    }
    ObjArraySort(ary, 'vote', "desc");
    obj = {};
    for (var i = 0; i < ary.length; i++) {
        obj[ary[i].name] = ary[i].vote;
    }
    return obj;
}

function ObjArraySort(ary, key, order) {
    var reverse = 1;
    if(order && order.toLowerCase() == "desc")
        reverse = -1;
    ary.sort(function(a, b) {
        if(a[key] < b[key])
            return -1 * reverse;
        else if(a[key] == b[key])
            return 0;
        else
            return 1 * reverse;
    });
}

