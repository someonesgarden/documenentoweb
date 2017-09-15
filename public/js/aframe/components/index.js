AFRAME.registerComponent('paneler', {

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    init:function(){
        var thisentity = this.el;
        var backimg = thisentity.getAttribute('backsrc');
        var frontimg = thisentity.getAttribute('src');
        thisentity.addEventListener('mouseenter',function(){
            console.log(backimg);
            thisentity.setAttribute('src',backimg);
        });
        thisentity.addEventListener('mouseleave',function(){
            console.log(frontimg);
            thisentity.setAttribute('src',frontimg);
        });
    },

    setupAnimation:function() {
        console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 6.2;

        var ang0 = thisentity.getAttribute('angle');
        var y0 =  thisentity.getAttribute('y');
        var ang1 = thisentity.getAttribute('angle_to');

        var that = this;

        new AFRAME.TWEEN.Tween({'ang':ang0})
            .to({'ang':ang1}, 2000)
            .easing(AFRAME.TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                var pos1 = that.angleChange(`${this.ang}`,radius,y0);
                thisentity.setAttribute('position', {'x':pos1.x,'y':pos1.y, 'z':pos1.z});
                thisentity.setAttribute('rotation',{'x':0,'y':-this.ang-90,'z':0});
            })
            .onComplete(function(){
                console.log("ang1",ang1);
                thisentity.setAttribute('angle',ang1);
            })
            .delay(300)
            .start();
    },

    pause: function () {
        console.log("pause");
    },

    play:function(){
        console.log("play");
        this.setupAnimation();
    },

    tick: function () {
    }

});


AFRAME.registerComponent('schelink', {

    init:function(){
        var thisentity = this.el;
        var movie = thisentity.getAttribute('movie');
        thisentity.addEventListener('click',function(){
            console.log(movie);
            location.href="/vrtheatre?movie="+movie;
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

AFRAME.registerComponent('curvemenu', {

        init:function(){

        },

        setupAnimation:function(){
            console.log("curvemenu,setmpAnimation")
            var thisentity = this.el;
            var ang0 = thisentity.getAttribute('angle');
            var ang1 = thisentity.getAttribute('angle_to');

            var that = this;
            new AFRAME.TWEEN.Tween({'ang':ang0})
                .to({'ang':ang1}, 2600)
                .easing(AFRAME.TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                    thisentity.setAttribute('rotation',{'x':0,'y':this.ang,'z':0});
                })
                .onComplete(function(){
                    console.log("ang1",ang1);
                    thisentity.setAttribute('angle',ang1);
                })
                .delay(100)
                .start();
            //a-animation(attribute="rotation", from="0 0 0", to="0 145 0", delay="750", dur="1000")
        },

        play:function(){
            this.setupAnimation()
        }


});

AFRAME.registerComponent('cylinderize', {

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    init:function() {
        //initで初期だけ定義する代わりに、
        //play(),pause()の仕組みを利用して擬似的にinitと関数呼び出しを実現している
    },

    setupAnimation:function() {
        console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 5.94;

        var ang0 = thisentity.getAttribute('angle');
        var y0 =  thisentity.getAttribute('y');
        var ang1 = thisentity.getAttribute('angle_to');

        var that = this;

        new AFRAME.TWEEN.Tween({'ang':ang0})
            .to({'ang':ang1}, 2000)
            .easing(AFRAME.TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
                var pos1 = that.angleChange(`${this.ang}`,radius,y0);
                thisentity.setAttribute('position', {'x':pos1.x,'y':pos1.y, 'z':pos1.z});
                thisentity.setAttribute('rotation',{'x':0,'y':-this.ang-90,'z':0});
            })
            .onComplete(function(){
                console.log("ang1",ang1);
                thisentity.setAttribute('angle',ang1);
            })
            .delay(300)
            .start();
    },

    pause: function () {
      console.log("pause");
    },

    play:function(){
        console.log("play");
        this.setupAnimation();
    },

    tick: function () {
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
