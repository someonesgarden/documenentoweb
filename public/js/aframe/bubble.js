var  scene  = document.querySelector("a-scene");

for(var i=0;i<100;i++){

    var sphere = document.createElement('a-sphere');

    //update July 2017
    var curves = document.createElement('a-curve');
    curves.setAttribute('id',"track"+ i);
    scene.appendChild(curves);


    var posx = 10*Math.random();
    var posy = 10*Math.random();
    var posz = 10*Math.random();


    var x1 = 10*Math.random();
    var y1 = 10*Math.random();
    var z1 = 10*Math.random();

    var x2 = 10*Math.random();
    var y2 = 10*Math.random();
    var z2 = 10*Math.random();

    var rad = 2*Math.random();
    var col = Math.floor(16777215*Math.random());

    sphere.setAttribute('radius', rad.toString());
    sphere.setAttribute('color', '#'+col.toString(16));
    sphere.setAttribute('opacity','0.5');
    sphere.setAttribute('position', posx.toString()+" "+posy.toString()+" "+posz.toString());



    //update July 2017
    var curve_point1 = document.createElement('a-curve-point');
    var curve_point2 = document.createElement('a-curve-point');
    //update July 2017
    curve_point1.setAttribute('position', x1 + " " + y1 + " " + z1);
    curve_point2.setAttribute('position', x2 + " " + y2 + " " + z2);

    // appendChild to curves //update July 2017
    curves.appendChild(curve_point1);
    curves.appendChild(curve_point2);

    //update July 2017
    sphere.setAttribute('alongpath',"curve: #track"+ i+"; dur:10000;loop:true");



    scene.appendChild(sphere);



}