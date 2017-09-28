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
    console.log("type=",obj.getAttribute("type"));
    obj.angle_to = angle;
    obj.setAttribute('angle_to', angle);
    obj.pause();
    obj.play();
}

var moveMenuItem2DefPos = function (obj) {
    var type = obj.getAttribute("type");
    var n = obj.getAttribute("n");

    console.log("type=",type);
    console.log("n=",n);

    //var ang = obj.getAttribute('def_angle');

    var ang = 0;

    if(type=="panel"){
        //ang = 70+15*n;
        ang = 150+15*n;
    } else if(type=="venue"){
        //ang = 70+15*n;
        ang = 217+12*n;
    }else if(type=="prog"){
        //ang = 70+15*n;
        ang = 220+10*n;
    }else if(type=="topinfo"){
        //ang = 70+15*n;
        ang = 230+10*n;
    }else{
        //ang = 290 + 10*n;
        ang = 285 + 10*n;
    }

    obj.setAttribute('angle_to', ang);
    obj.angle_to = ang;
    obj.pause();
    obj.play();
}