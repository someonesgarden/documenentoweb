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



/**
 * 緯度経度から位置を算出します
 * @param {number} latitude 緯度
 * @param {number} longitude 経度
 * @param {number} radius 半径
 * @returns {THREE.Vector3} 位置
 */
function translateGeoCoords(latitude, longitude, radius) {

    console.log("translateGeoCoords");
    // 仰角
    var phi = (latitude) * Math.PI / 180;
    // 方位角
    var theta = (longitude + 90) * Math.PI / 180;

    var x = -(radius) * Math.cos(phi) * Math.cos(theta);
    var y = (radius) * Math.sin(phi);
    var z = (radius) * Math.cos(phi) * Math.sin(theta);
    return new THREE.Vector3(x,z,y);
}


function quaternionSet(lat, lon, rand){
    var up          = new THREE.Vector3(0,1,0);
    var pos_vector  = translateGeoCoords(lat,lon, rand);
    //this.position.copy(pos_vector);

    var normalAxis  = pos_vector.normalize();
    var dir         = new THREE.Vector3();             //上記ベクトルとの内積（cosθ）
    dir.crossVectors(up, normalAxis).normalize();

    var dot = up.dot(normalAxis);     //acos関数を使ってラジアンに変換。
    var rad = Math.acos(dot);         //回転軸用のベクトルを生成
    var q   = new THREE.Quaternion();  //計算した回転軸と角度を元にクォータニオンをセットアップ
    q.setFromAxisAngle(dir, rad);
    return q;
};
