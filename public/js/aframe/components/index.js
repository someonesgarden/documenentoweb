
AFRAME.registerComponent('auto_rotate_y', {
    tick: function () {
        var thisentity = this.el;
        var cameraRotation = thisentity.getAttribute('rotation');
        var mode = thisentity.getAttribute('mode');

        if(mode!=-1) {
            cameraRotation.y = cameraRotation.y + 0.6;
            thisentity.setAttribute('rotation', cameraRotation);
        }else{
            //console.log(cameraRotation);
            thisentity.setAttribute('rotation', {'x':0,'y':0,'z':0});
        }
    }
});

AFRAME.registerComponent('auto_rotate_z', {
    tick: function () {
        var thisentity = this.el;
        var cameraRotation = thisentity.getAttribute('rotation');
        var mode = thisentity.getAttribute('mode');

        if (mode != -1) {
            cameraRotation.z = cameraRotation.z + 0.6;
            thisentity.setAttribute('rotation', cameraRotation);
        } else {
            //console.log(cameraRotation);
           thisentity.setAttribute('rotation', {'x': -90, 'y': 0, 'z': 0});
        }
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
