var socket = io.connect();


//#////////////////////////////// socket emit ////////////////
//#イベント発信
var emit = function(type, msg){
  console.log("emit:"+type);
  socket.emit('notice', {
    type: type,
    value: msg
  });
};

var onReceive = function(data){
  //onReceiveControllerImpl data
  console.log("onReceive",data);
}


var socket_voting = function(data){
    socket.emit('socket_voting', data);
};

var socket_seating = function(data){
    console.log("socket_Seating",data);
    socket.emit("socket_seating", data);
}

var socket_reset_votes = function(){
    console.log("socket_reset_votes");
    socket.emit("socket_reset_votes",{});
}

var onBroadcastVote = function(data){
    console.log("onBroadcastVote",data);
    socketresponse(data); // IN -> index_new.jade
}

var onBroadcastSeat = function(data){
    console.log("onBroadcastSeat",data);
    socketseatresponse(data); // IN -> index_new.jade
}






/////////////////////////////////////////////
//サーバー上のアクションをクライントブラウザに書き出す
socket.on("log", function(array){console.log.apply(console,array);});
socket.on('connect', function(){emit('login')});
socket.on('disconnect', function(client){console.log("socket::disconnect",client)});
socket.on('recieve', onReceive);
socket.on('broadcastvote',onBroadcastVote);
socket.on('broadcastseat',onBroadcastSeat);


/////////////////////////////////////////////
window.emit = emit;
window.socket_voting = socket_voting;
window.socket_seating = socket_seating;

