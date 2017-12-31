/**
 * This is just an example of how to write gateway side program
 */
var Mqtt = require('mqtt');

var TOPIC_COMMON_DL = 'light/gw-common-dl';
var TOPIC_COMMON_UL = 'light/gw-common-ul';
var TOPIC_DL = 'light/gw-dl';
var TOPIC_UL = 'light/gw-ul';

var HOST = '127.0.0.1';
var PORT = '1884';
var CLIENT_ID = 'gw-client-1';

// mqtt client setting
var SETTINGS = {
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: CLIENT_ID,
    username: 'client1',
    password: 'ruff5678'
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

    // monitor the uplink message
    client.subscribe(TOPIC_COMMON_DL);
    client.subscribe(TOPIC_DL + "/" + CLIENT_ID);

    client.publish(TOPIC_COMMON_UL, {});

    client.on('message', function (topic, msg) {
        switch (topic) {
            case TOPIC_COMMON_DL:
                console.log(TOPIC_COMMON_DL + ":" + msg.toString());
                parse(msg.toString());
                break;
            case TOPIC_DL:
                console.log(TOPIC_DL + ":" + msg.toString());
                parse(msg.toString());
                break;
            default:
                break;
        }
    });

    setTimeout(() => {
        client.publish(TOPIC_UL, JSON.stringify({
            name: CLIENT_ID
        }));
    }, 2000);
});

function parse(inStr) {


}