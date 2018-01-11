var Mqtt = require('mqtt');
var _ = require('underscore');
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
/**
 * {"shortAddress":"0x2c8b","IEEEAddress":\
"0x00158d00014a9fc3","type":33,"online":true,"onlineLastUpdate":1510625881207,"\
deviceID":"B6","dongleID":"00041308","leftState":1,"rightState":1,"leftStateLas\
tUpdate":1510624561247,"rightStateLastUpdate":1510624595318},
 */
let lstGWLightsStorage = {}; // 要还是不要这个东西呢? object
function updateGWLightsStorage(gwName, obj) {
    // 只包含双键开关和单键开关
    // 保证这个结构里存放的是最新的状态
    var dev;

    if (lstGWLightsStorage[gwName] === undefined) {
        lstGWLightsStorage[gwName] = [];
    }

    if (obj.type === 16 || obj.type === 17) {
        console.log("Switch is invalid");
        return;
    }
    dev = _.find(lstGWLightsStorage[gwName], (a) => {
        return (a.IEEEAddress === obj.IEEEAddress);
    });
    if (dev === undefined) {
        lstGWLightsStorage[gwName].push(obj);
        return;
    }

    dev.shortAddress = obj.shortAddress;
    dev.online = obj.online;
    dev.onlineLastUpdate = obj.onlineLastUpdate;
    dev.leftState = obj.leftState;
    if (dev.type === 33) {
        dev.rightState = obj.rightState;
    }
    console.log("update dev");
    console.log(dev);
}

var client;

setTimeout(() => {
    client = Mqtt.connect('mqtt://' + HOST + ':' + PORT, SETTINGS);


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
                    console.log(new Date());
                    console.log("\nreceived a UL msg:");
                    console.log(TOPIC_UL + ":" + msg.toString());

                    var obj;

                    try {
                        obj = JSON.parse(msg.toString());
                    } catch (e) {
                        console.log(e);
                        break;
                    }

                    console.log(obj.type);

                    if (obj.type === "report") {
                        var i;
                        for (i = 0; i < obj.content.length; i++) {
                            updateGWLightsStorage(obj.name, obj.content[i]);
                        }

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


}, 3000); // connect to the server after 10 seconds

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
        callback(null, "OK");
    },
    allOff: function (callback) {
        client.publish(TOPIC_COMMON_DL, JSON.stringify({
            type: "cmd",
            content: "alloff",
            timestamp: new Date().getTime(),
        }));
        callback(null, "OK");
    },
    query: function (callback) {
        callback(null, JSON.stringify(lstGWLightsStorage));
    },
    test: function (callback) {
        client.publish(TOPIC_COMMON_DL, JSON.stringify({
            type: "cmd",
            content: "test",
            timestamp: new Date().getTime(),
        }));
        callback(null, "OK");
    }
};