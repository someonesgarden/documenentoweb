var cursor_out_pos = "0 12.2 -1.3";
var cursor_in_pos = "0 0.2 -1.3";
var scene = document.querySelector('a-scene');
var run = function () { return document.getElementById("loader").classList.add("hidden"); };
if (scene.hasLoaded) {
    run();
}
else {
    scene.addEventListener('loaded', run);
}
//ENTER / EXIT VR
document.querySelector('a-scene').addEventListener('enter-vr', function () {
    console.log("ENTERED VR");
    var cursor = document.querySelector("#cursor");
    cursor.setAttribute('position', cursor_in_pos);
});
////////// CLICK EVENT
document.querySelector('a-scene').addEventListener('exit-vr', function () {
    console.log("EXIT VR");
    var cursor = document.querySelector("#cursor");
    cursor.setAttribute('position', cursor_out_pos);
});
document.querySelector("#doculogo").addEventListener('click', function () {
    console.log("logo");
});
document.querySelector("#bug").addEventListener('click', function () {
    console.log("bug");
    var img_cylinder = this.querySelector("#bug_cylinger");
    var mode = img_cylinder.getAttribute("mode");
    img_cylinder.setAttribute("mode", mode * (-1));
});
document.querySelector("#businessman").addEventListener('click', function () {
});
document.querySelector("#earth").addEventListener('click', function () {
    console.log("earth clicked");
});
