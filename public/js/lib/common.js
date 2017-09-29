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
}

var moveMenuItem2DefPos = function (obj) {
    var type = obj.getAttribute("type");
    var n    = obj.getAttribute("n");
    var ang  = 0;

    if(type=="panel"){
        ang = 150+15*n;
    } else if(type=="venue"){
        ang = 217+12*n;
    }else if(type=="prog"){
        ang = 220+10*n;
    }else if(type=="topinfo"){
        ang = 230+10*n;
    }else{
        ang = 285 + 10*n;
    }

    obj.play();
    obj.setAttribute('angle_to', ang);
    obj.angle_to = ang;
    obj.pause();
    obj.play();
}