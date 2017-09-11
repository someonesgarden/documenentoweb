AFRAME.registerComponent('schelink', {

    init:function(){
        var thisentity = this.el;
        var movie = thisentity.getAttribute('movie');
        thisentity.addEventListener('click',function(){
            console.log(movie);
            location.href="http://localhost:3000/vrtheatre?movie="+movie;
        })
    }
});

AFRAME.registerComponent('alink', {

    init:function(){
        var thisentity = this.el;
        var href = thisentity.getAttribute('href');
        thisentity.addEventListener('click',function(){
            if(!document.VR){
                window.open(href,"","width=800,height=650");
            }
        })
    }
});

AFRAME.registerComponent('cylinderize', {
    /*
   angle_to : 0~360
    */

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    init:function() {
        var thisentity = this.el;
        var angle_to = thisentity.getAttribute('angle_to');
        var radius = 5.94;
        thisentity.setAttribute('rotation',{'x':0,'y':-angle_to-90,'z':0});
        thisentity.setAttribute('position',this.angleChange(0,radius,0));
    },

    tick: function () {
        var thisentity = this.el;
        var angle = thisentity.getAttribute('angle');
        var y =  thisentity.getAttribute('y');
        var radius = 5.94;
        //thisentity.setAttribute('rotation',{'x':0,'y':-angle-90,'z':0});
        thisentity.setAttribute('position',this.angleChange(angle,radius,y));
    }
});


AFRAME.registerComponent('auto_rotate', {

    /*
    axis : x or y
    angle_to : 0~360
     */

    init:function() {
        var thisentity = this.el;
        var myrotate = document.createElement("a-animation");
        var axis = thisentity.getAttribute('axis');

        var angle_to = 270-thisentity.getAttribute('angle_to');
        var random_angle = (Math.floor(Math.random() * 3) * 360+angle_to);

        myrotate.setAttribute('attribute', "rotation");
        myrotate.setAttribute('dur', "3000");

        var angles = '0 0 '+random_angle;

        if (axis == "x") {
            angles = random_angle+' 0 0';
        }else if(axis=="y"){
            angles = '0 '+random_angle+' 0';
        }

        myrotate.setAttribute('to', angles);
        myrotate.setAttribute('begin','click');
        thisentity.appendChild(myrotate);
    },

    tick: function () {
    }
});



AFRAME.registerComponent('rotation-updater', {
    tick: function () {
        var sphere = this.el;
        var camera = document.querySelector("#camera");
        var cameraRotation = camera.getAttribute('rotation');

        // var sphereRotation = DO SOMETHING WITH CAMERA ROTATION.
        sphere.setAttribute('rotation', cameraRotation);
    }
});

AFRAME.registerComponent('camera-seeker', {
    init() {
        this.CAMERA = document.querySelector("#camera");
        this.newCords = {};
        this.setupAnimation();
    },

    setupAnimation () {
        let el = this.el;
        var this_ = this;
        seekAnim = new AFRAME.TWEEN.Tween(this.el.getAttribute('rotation'))
            .to(this.newCords, 30000)
            .easing(AFRAME.TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                el.setAttribute('rotation', `${this.x}, ${this.y}, ${this.z}`);
            })
            .repeat(Infinity)
            .start();
    },

    tick () {
        if (AFRAME.utils.coordinates.stringify(this.CAMERA.getAttribute('rotation')) !== AFRAME.utils.coordinates.stringify(this.el.getAttribute('rotation'))) {
            Object.assign(this.newCords, this.CAMERA.getAttribute('rotation'));
        }
    }
});
