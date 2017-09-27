AFRAME.registerComponent('panelbox', {
    init:function(){
        var thisentity = this.el;
        thisentity.addEventListener('click',function(){
            switchModel("house");
        });
    }
});

AFRAME.registerComponent('arrow', {

    countUp:function(){

        var thisentity = this.el;
        var type = thisentity.getAttribute('type');
        var parententity = thisentity.parentEl;
        var name = parententity.getAttribute("name");
        var d1 = parententity.querySelector('.d1');
        var d2 = parententity.querySelector('.d2');
        var d3 = parententity.querySelector('.d3');
        var point = parseInt(d1.getAttribute("num")+d2.getAttribute("num")+ d3.getAttribute("num"));

        //count up
        if(type=="up"){
            if(point<999){
                point = point + 1;
            }
        }else{
            if(point>0){
                point = point - 1;
            }
        }

        window.socket_voting({
            name:name,
            point:point
        });

        var p_str = ('000'+ point).slice(-3);
        var d1_ = p_str.substr(0,1);
        var d2_ = p_str.substr(1,1);
        var d3_ = p_str.substr(2,1);

        d1.setAttribute("num",d1_);
        d2.setAttribute("num",d2_);
        d3.setAttribute("num",d3_);

        d1.pause();d1.play();
        d2.pause();d2.play();
        d3.pause();d3.play();

        window.votes[name] = p_str;

        $.post("/voteapi", window.votes,
            function(data){
                console.log("resdata",data);
            }
        );
    },


   init:function(){
       var thisentity = this.el;
       var that = this;

       var type = thisentity.getAttribute('type');

       thisentity.setAttribute('obj-model',"obj: #"+type+"-obj; mtl: #"+type+"-mtl");

       if(type=="up"){
           thisentity.setAttribute("position","0.8 4.2 0");
       }else{
           thisentity.setAttribute("position","-0.8 4.2 0");
       }

       thisentity.addEventListener('click',function(){
           that.countUp();
       });

   }
});

AFRAME.registerComponent('num3d', {

    setNum3D:function(){
        var thisentity = this.el;
        var num = thisentity.getAttribute('num');
        thisentity.setAttribute('obj-model',"obj: #num"+num+"-obj; mtl: #num"+num+"-mtl");
    },

    init:function(){
        this.setNum3D();
    },

    play:function(){
        this.setNum3D();
    },

    pause:function(){

    }
});

AFRAME.registerComponent('schelink', {

    init:function(){
        var thisentity = this.el;
        var movie = thisentity.getAttribute('movie');
        thisentity.addEventListener('click',function(){
            //console.log(movie);
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

AFRAME.registerComponent('paneler', {

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    countUp:function(){

        var thisentity = this.el;
        var d1 = thisentity.querySelector('.d1');
        var d2 = thisentity.querySelector('.d2');
        var d3 = thisentity.querySelector('.d3');

        var point = parseInt(d1.getAttribute("num")+d2.getAttribute("num")+ d3.getAttribute("num"));

        //count up
        point = point + 1;

        var p_str = ('000'+ point).slice( -3 );

        var d1_ = p_str.substr(0,1);
        var d2_ = p_str.substr(1,1);
        var d3_ = p_str.substr(2,1);

        d1.setAttribute("num",d1_);
        d2.setAttribute("num",d2_);
        d3.setAttribute("num",d3_);

        d1.pause();d1.play();
        d2.pause();d2.play();
        d3.pause();d3.play();

    },

    init:function(){
        var thisentity = this.el;
        var n = thisentity.getAttribute('n');
        var name = thisentity.getAttribute('name');
        thisentity.angle = 0;
        //thisentity.angle_to = 70+15*n;
        thisentity.angle_to = 90;

        var backimg = thisentity.getAttribute('backsrc');
        var frontimg = thisentity.getAttribute('src');
        var name = thisentity.getAttribute('name');
        var that = this;
        thisentity.addEventListener('mouseenter',function(){
            //console.log(backimg);
            thisentity.setAttribute('src',backimg);
        });
        thisentity.addEventListener('mouseleave',function(){
            //console.log(frontimg);
            thisentity.setAttribute('src',frontimg);
        });

        thisentity.addEventListener('click',function(){
            console.log(name);
            switchModel("panelbox1");
        });
    },

    setupAnimation:function() {
        //console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 6.2;
        //var y0 =  thisentity.getAttribute('y');
        var y0 = 1.8;

        var n = thisentity.getAttribute('n');

        var ang0 = thisentity.angle;

        //var ang1 = thisentity.getAttribute('angle_to');
        var ang1 = thisentity.angle_to;

        //var ang1 = 70+15*n;

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
                thisentity.angle=ang1;
            })
            .delay(120)
            .start();
    },

    pause: function () {
        //console.log("pause");
    },

    play:function(){
        //console.log("play");
        this.setupAnimation();
    },

    tick: function () {
    }
});


AFRAME.registerComponent('curvemenu', {

        init:function(){
            var thisentity = this.el;
            var n = thisentity.getAttribute('n');
            thisentity.angle = 0;
            thisentity.angle_to = 115+15*n;
        },
        setupAnimation:function(){
            //console.log("curvemenu,setmpAnimation")
            var thisentity = this.el;
            var ang0 = thisentity.angle;
            var ang1 = thisentity.angle_to;

            var that = this;
            new AFRAME.TWEEN.Tween({'ang':ang0})
                .to({'ang':ang1}, 2600)
                .easing(AFRAME.TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                    thisentity.setAttribute('rotation',{'x':0,'y':this.ang,'z':0});
                })
                .onComplete(function(){
                    //console.log("ang1",ang1);

                    //thisentity.setAttribute('angle',ang1);
                    thisentity.angle = ang1;

                })
                .delay(100)
                .start();
            //a-animation(attribute="rotation", from="0 0 0", to="0 145 0", delay="750", dur="1000")
        },

        play:function(){
            this.setupAnimation()
        }
});

AFRAME.registerComponent('prog', {

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    init:function() {
        //initで初期だけ定義する代わりに、
        //play(),pause()の仕組みを利用して擬似的にinitと関数呼び出しを実現している
        var thisentity = this.el;
        var n = thisentity.getAttribute('n');
        thisentity.angle = 0;
        //thisentity.angle_to = 290+10*n;
        thisentity.angle_to = 90;
    },

    setupAnimation:function() {
        //console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 5.94;

        //var ang0 = thisentity.getAttribute('angle');
        var ang0 = thisentity.angle;
        //var y0 =  thisentity.getAttribute('y');
        var y0 = 1.8;
        //var ang1 = thisentity.getAttribute('angle_to');
        var ang1 = thisentity.angle_to;

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
                //console.log("ang1",ang1);
                //thisentity.setAttribute('angle',ang1);
                thisentity.angle=ang1;
            })
            .delay(300)
            .start();
    },

    pause: function () {
      //console.log("pause");
    },

    play:function(){
        //console.log("play");
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

        var angle_to = 30-thisentity.angle_to;
        var random_angle = (Math.floor(Math.random() * 3) * 360+angle_to);

        myrotate.setAttribute('attribute', "rotation");
        myrotate.setAttribute('dur', "3000");

        var angles = '0 0 '+random_angle;

        if (axis == "x") {
            angles = random_angle+' 0 0';
        }else{
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
