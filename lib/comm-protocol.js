// GW 主动汇报状态
let GWLightsReport = {
    name: "", // name or id of the GW
    IP: "",
    timeStamp: "",
    lightList: [{},
        {}
    ],
};
// in case some light changed it's status
let GWSingleLightReport = {
    IEEEAddress: "",
    name: "",
    status: "",
    timeStamp: "",
}
// Sent to the server every 5 minutes
let GWStatusReport = {
    name: "", // name or id of the GW
    IP: "",
    timeStamp: "",
    type: "",
}


// server控制网关
// 目前一共是3个网关
let Server2GWCmd = {
    nameGW: "",
    cmd: "allon", // "alloff", "query"
    content: {},
}

module.exports = {


}