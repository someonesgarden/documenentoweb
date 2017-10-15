AFRAME.registerComponent('panelbox', {
    init:function(){
        var thisentity = this.el;
        thisentity.addEventListener('click',function(){
            switchModel("house");

        });
    },
    pause: function () {
        console.log("panelbox:pause");
    },

    play:function(){
        console.log("panelbox:play");
    },
});

AFRAME.registerComponent('arrow', {

    countUp:function(){
        var thisentity = this.el;
        var type = thisentity.getAttribute('type');
        var parententity = thisentity.parentEl;
        var name = parententity.getAttribute("id");
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

        console.log("window.votes");
        console.log(window.votes);
        $.post("/voteapi", window.votes,
            function(data){
                console.log("resdata",data);
                console.log(window.votes);
                window.socket_voting({
                    name:name,
                    point:point,
                    votes:window.votes
                });
            }
        );
    },


   init:function(){
       var thisentity = this.el;
       var that = this;

       var type = thisentity.getAttribute('type');

       thisentity.setAttribute('obj-model',"obj: #"+type+"-obj; mtl: #"+type+"-mtl");

       if(type=="up"){
           thisentity.setAttribute("position","0.52 3 0");
       }else{
           thisentity.setAttribute("position","-0.52 3 0");
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
        var type = thisentity.getAttribute('type');

        if(type=="limit"){
            thisentity.setAttribute('obj-model',"obj: #num"+num+"-obj; mtl: #red-mtl");
        }else{
            thisentity.setAttribute('obj-model',"obj: #num"+num+"-obj; mtl: #black-mtl");
        }
    },

    init:function(){
        this.setNum3D();
    },

    play:function(){
        this.setNum3D();
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
        var type = thisentity.getAttribute('type');

        var n = thisentity.getAttribute("n");

        var angle_to = 180+90-162-10*n;

        if(type=="venue"){
            angle_to = 225-180-10*n;
        }


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
        thisentity.angle = 0;
        //thisentity.angle_to = 70+15*n;
        thisentity.angle_to = 90;

        var backimg = thisentity.getAttribute('backsrc');
        var frontimg = thisentity.getAttribute('src');
        var name = thisentity.getAttribute('id');
        var that = this;
        thisentity.addEventListener('mouseenter',function(){
            //console.log(backimg);
            thisentity.setAttribute('src',backimg);
        });
        thisentity.addEventListener('mouseleave',function(){
            //console.log(frontimg);
            thisentity.setAttribute('src',frontimg);
        });

        /*
        thisentity.addEventListener('click',function(){
            switchPanelBox(name);
            var collada = panelbox1selector.querySelector('a-collada-model');
            collada.setAttribute("obj-model","obj: #panelbox-obj; mtl: #panelbox-"+name+"-mtl");
            panelbox1selector.pause();
            panelbox1selector.play();
        });
        */
    },

    setupAnimation:function() {
        //console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 5.9;
        //var y0 =  thisentity.getAttribute('y');
        var y0 = 2.5;

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
                thisentity.pause();
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
                    thisentity.pause();
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

        var name = thisentity.getAttribute('id');
        var type = thisentity.getAttribute('type');
        thisentity.angle = 0;
        //thisentity.angle_to = 290+10*n;
        thisentity.angle_to = 90;

        if(type!="topinfo") {
            thisentity.addEventListener('click', function () {
                switchPanelBox(name);
                var collada = panelbox1selector.querySelector('a-collada-model');
                collada.setAttribute("obj-model", "obj: #panelbox-obj; mtl: #progbox-" + name + "-mtl");
                panelbox1selector.pause();
                panelbox1selector.play();
            });
        }else{
            thisentity.addEventListener('click', function () {
                var href = thisentity.getAttribute('href');
                if(href!=undefined)
                    window.open(href, 'mywindow1', 'width=600, height=720, menubar=no, toolbar=no, scrollbars=yes');
            });
        }
    },

    setupAnimation:function() {
        //console.log("setupAnimation");
        var thisentity = this.el;
        var radius = 5.94;

        var ang0 = thisentity.angle;
        var ang1 = thisentity.angle_to;
        var y0   = thisentity.getAttribute('y') ? thisentity.getAttribute('y') : 2.1;

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
                //thisentity.pause();
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

AFRAME.registerComponent('venu', {

    angleChange:function(angle,radius,y){
        var x = radius * Math.cos(angle * (Math.PI / 180));
        var z = radius * Math.sin(angle * (Math.PI / 180));
        return {'x':x,'y':y,'z':z};
    },

    init:function() {
        var thisentity = this.el;
        var n = thisentity.getAttribute('n');
        var name =thisentity.getAttribute('name');
        thisentity.angle = 0;
        thisentity.angle_to = 90;

        thisentity.addEventListener('click',function(){
            console.log("venu=",name);
            largehousemove("video",name);
        });

    },

    setupAnimation:function() {
        var thisentity = this.el;
        var radius = 5.94;

        var ang0 = thisentity.angle;
        var y0 =  thisentity.getAttribute('y') ? thisentity.getAttribute('y') : 2.1;
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

