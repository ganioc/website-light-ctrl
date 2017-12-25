var Mqtt = require('mqtt');

var TOPIC_COMMON_DL = 'light/gw-common-dl';
var TOPIC_COMMON_UL = 'light/gw-common-ul';
var TOPIC_DL = 'light/gw-dl';
var TOPIC_UL = 'light/gw-ul';

var HOST = '127.0.0.1';
var PORT = '1884';
var CLIENT_ID = 'background-client-1';

// mqtt client setting
var SETTINGS = {
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: CLIENT_ID,
    username: 'control-server',
    password: 'server1234'
};

var client = Mqtt.connect('mqtt://' + HOST + ':' + PORT, SETTINGS);

client.on('error', function (err) {
    console.log(err.message);

});

client.on('close', function () {
    console.log('\nClosed');
});

client.on('connect', function () {
    console.log('');
    console.log('Connected');

    client.subscribe(TOPIC_COMMON_UL);
    client.subscribe(TOPIC_UL);

    client.on('message', function (topic, msg) {
        switch (topic) {
            case TOPIC_COMMON_UL:
                console.log(msg.toString());
                break;
            case TOPIC_UL:
                console.log(msg.toString());
                break;
            default:
                break;
        }
    });
});


