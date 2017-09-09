var greenbox = document.getElementById("greenbox");
//var redbox = document.querySelector("#redbox");
greenbox.setAttribute("material","color", "yellow");

var redbox = document.getElementById("redbox");


greenbox.addEventListener('click', function(){
    redbox.setAttribute("material","opacity","0.1");
});




redbox.addEventListener('click', function(){
    //redbox.setAttribute('material.color',"white");
    greenbox.setAttribute('material','color:blue');
});

