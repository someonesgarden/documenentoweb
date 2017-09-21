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
    obj.setAttribute('angle_to', angle);
    obj.pause();
    obj.play();
}

var moveMenuItem2DefPos = function (obj) {
    var ang = obj.getAttribute('def_angle');
    obj.setAttribute('angle_to', ang);
    obj.pause();
    obj.play();
}