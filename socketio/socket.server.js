var socketio    = require('socket.io');
var dateformat  = require('dateformat');
var jquery      = require('jquery');
var http        = require('http');
var fs          = require('fs');

var sio = null;

var sioserver = function(client){
    process.on('uncaughtException', function(_err){ console.log(_err);});

    console.log("sioserver");
    sio = socketio.listen(client);
    sio.set('transports', ['websocket', 'polling']);

    sio.sockets.on('connection' , function(socketClient){
        log(socketClient,"sio.sockets.on('connection')");
        console.log("sio.socket connected.")
        listeners(socketClient);
    });
};


var listeners=function(socket) {

    socket.on('notice', function (data) {
        log(socket,"on::notice",data);
        socket.broadcast.emit(
            'recieve', {
                type: data.type,
                value: data.value,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
            });
    });

    socket.on('socket_voting', function (data) {
        log(socket,"on::socket_voting",data);
        socket.broadcast.emit(
            'broadcastvote', {
                value: data,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
            });
    });

    socket.on('emit', function (data) {
        log(socket,"on::emit",data);
        socket.broadcast.emit(
            'recieve', {
                type: data.type,
                value: data.value,
                time: dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
            });
    });

    socket.on('action_emit',function(data){
        log(socket,"action_emit",data);

        socket.broadcast.emit(data.action,
            {
                type:data.type,
                value:data.value,
                time:dateformat(new Date(), 'yyyy-mm-dd HH:MM:ss')
            });
    });
};



//UTILITY ============================================================
//arg0=socket, それ以外は文字列 / log socket, "text1", "text2"...
var log = function() {
    var array   = ["[$] "];
    var socket  = arguments[0];
    for(var i = 1;i<arguments.length;i++){
        array.push(arguments[i]);
    }
    socket.emit('log', array);
};
//==================================================


module.exports = sioserver;

