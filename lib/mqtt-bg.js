var Mqtt = require('mqtt');

/**
 * server .         ---> .  GateWay
 * subscribe ul .           subscribe dl
 * subscribe common_ul .   subscribe common_dl
 * 
 * The BG program can also send command to gateway
 * and receive responses from gateway
 * 
 * What to do when connection is closed?
 * 
 * how to fulfill below functions?
 * (1) 查询所有的灯光状态
 * 
 * (2) 1组灯光关闭/打开
 * 
 * (3) 2组灯光关闭/打开
 * 
 * (4) 3组灯光关闭/打开
 * 
 * 
 */

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

let lstGWLightsStorage = []; // 要还是不要这个东西呢?


var client = Mqtt.connect('mqtt://' + HOST + ':' + PORT, SETTINGS);

client.on('error', function (err) {
    console.log(err.message);

});

client.on('close', function () {
    console.log('\nClosed');
});

client.on('connect', function () {
    console.log('');
    console.log('Mqtt bg app Connected');

    // monitor the uplink message
    client.subscribe(TOPIC_COMMON_UL);
    client.subscribe(TOPIC_UL);

    let obj;

    client.on('message', function (topic, msg) {
        switch (topic) {
            case TOPIC_COMMON_UL:
                console.log(TOPIC_COMMON_UL + ":" + msg.toString());

                common_parse(msg.toString());
                break;
            case TOPIC_UL:
                console.log("\nreceived a UL msg:");
                console.log(TOPIC_UL + ":" + msg.toString());

                var obj;

                try {
                    obj = parse(msg.toString());
                } catch (e) {
                    console.log(e);
                    break;
                }

                console.log(obj.type);
                if (obj.type === "report") {

                } else if (obj.type === "cmdrsp") {

                } else {
                    console.log("unrecognized cmd type:" + obj.type);
                }

                break;
            default:
                break;
        }
    });
});

// parse 
function common_parse(inStr) {
    var obj;

    try {
        obj = JSON.parse(inStr);
    } catch (e) {
        console.log(e);
        return;
    }

    if (obj.type === "cmdrsp") {

    } else if (obj.type === "report") {

    } else {
        console.log("unrecognized cmd type:" + obj.type);
    }
}



module.exports = {
    sayHello: () => {
        console.log("hello from http");
    },
    allOn: function (callback) {
        client.publish(TOPIC_COMMON_DL, JSON.stringify({
            type: "cmd",
            content: "allon",
            timestamp: new Date().getTime(),
        }));

    },
    allOff: function (callback) {
        client.publish(TOPIC_COMMON_DL, JSON.stringify({
            type: "cmd",
            content: "alloff",
            timestamp: new Date().getTime(),
        }));
    },
    query: function (callback) {

    },
    test: function (callback) {
        client.publish(TOPIC_COMMON_DL, JSON.stringify({
            type: "cmd",
            content: "test",
            timestamp: new Date().getTime(),
        }));
    }
};