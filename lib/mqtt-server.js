/**
 * topic: light/gw-common-dl
 * GW subscribe to this topic to receive common commands
 * 
 * topic: light/gw-common-ul
 * arbitrator subscribe to this topic to receive response of GWs
 * 
 *  
 *  
 */

var Mosca = require('mosca');

var TOPIC_COMMON_DL = 'light/gw-common-dl';
var TOPIC_COMMON_UL = 'light/gw-common-ul';
var TOPIC_DL = 'light/gw-dl';
var TOPIC_UL = 'light/gw-ul';

var settings = {
    port: 1884,
    host: ''
};

var server = new Mosca.Server(settings);
var r = new RegExp(/^ruff[0-9]{1,3}$/);

server.authenticate = function (client, username, password, callback) {

    console.log('username:' + username);
    console.log('password:' + password);

    if ((username == "client1" && password == "ruff5678") ||
        ((username == "client2") && (password == "ruff5678")) ||
        ((username == "client3") && (password == "ruff5678")) ||
        ((username == "client4") && (password == "ruff5678")) ||
        ((username == "client5") && (password == "ruff5678")) ||
        (username == "control-server" && password == "server1234") ||
        (username == "control-server1" && password == "server1234") ||
        (username == "control-server2" && password == "server1234") ||
        (username == "background" && password == "secret")) {
        console.log('Pass auth');
        callback(null, true);
    } else {
        console.log('Fail auth');
        callback(null, false);
    }
};

server.on('clientConnected', function (client) {
    console.log('client connected ', client.id);
});

server.on('ready', function () {
    console.log('Mosca server (web light control) is running');
});

server.on('published', function (packet, client) {
    console.log('');
    console.log(new Date());
    console.log('Published:' + packet.topic + ' ' + packet.payload);

});

server.on('subscribed', function (packet, client) {
    console.log('');
    console.log(new Date());
    console.log('Subscribed:' + packet + ' ' + client.id);

});