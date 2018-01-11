console.log("hello");

// 

$("#btnOn").click(() => {
    console.log("Click-on");
    $("#dlgModal").modal("show");

    $.ajax({
        url: '/ctrl',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            console.log("bton got response:");
            console.log(data);
            $("#dlgModal").modal("hide");
            $("#tableBody").html("");
        },
        error: function (err) {
            console.log("all on error");
            console.log(err);
            $("#dlgModal").modal("hide");
        },
        timeout: function () {
            console.log("cmd timeout");
            $("#dlgModal").modal("hide");
        },
        data: {
            type: "cmd",
            content: "allon",
            timestamp: 0,
        }
    });

});


$("#btnOff").click(() => {
    console.log("Click-off");
    $("#dlgModal").modal("show");

    $.ajax({
        url: '/ctrl',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            console.log("btoff got response:");
            console.log(data);
            $("#dlgModal").modal("hide");
            $("#tableBody").html("");

        },
        error: function (err) {
            console.log("all off error");
            console.log(err);
            $("#dlgModal").modal("hide");
        },
        timeout: function () {
            console.log("cmd timeout");
            $("#dlgModal").modal("hide");
        },
        data: {
            type: "cmd",
            content: "alloff",
            timestamp: 0,
        }
    });
});

$("#btnQuery").click(() => {
    console.log("Click-query");

    $.ajax({
        url: '/ctrl',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            console.log("btquery got response:");
            console.log(data);
            parseQueryData(data);
        },
        error: function (err) {
            console.log("query error");
            console.log(err);

        },
        timeout: function () {
            console.log("cmd timeout");

        },
        data: {
            type: "cmd",
            content: "query",
            timestamp: 0,
        }
    });
});

function parseQueryData(data) {
    var obj, counter = 0;
    try {
        obj = JSON.parse(data.content);
    } catch (e) {
        console.log(e);
        console.log("wrong query data format");
        return;
    }

    $("#tableBody").html("");

    for (var o in obj) {
        console.log("No:" + counter++);
        console.log(obj[o]);
        // to add <tr> inside <tbody>
        // clear 
        for (var o2 in obj[o]) {
            var str = "<tr>";

            var light = obj[o][o2];
            str += "<td>" + light.deviceID;
            if (light.type === 33) {
                str += "-D";
            } else if (light.type === 32) {
                str += "-S";
            }
            str += "</td>";

            // 灯的状态
            // 是否在网
            str += "<td>";
            if (light.type === 33 && light.online === false) {
                str += "<span class=\"glyphicon glyphicon-exclamation-sign text-infoglyphicon-bigger\"><\/span>";
            } else if (light.type === 33 && light.online === true) {
                str += (light.leftState === 1) ? ("<span class=\"glyphicon glyphicon-star text-success glyphicon-big\"></span>") : ("<span class=\"glyphicon glyphicon-star text-danger glyphicon-big\"></span>");
                str += "-";
                str += (light.rightState === 1) ? ("<span class=\"glyphicon glyphicon-star text-success glyphicon-big\"></span>") : ("<span class=\"glyphicon glyphicon-star text-danger glyphicon-big\"></span>");

            } else if (light.type === 32 && light.online === false) {
                str += "<span class=\"glyphicon glyphicon-exclamation-sign text-info glyphicon-bigger\"><\/span>";
            } else if (light.type === 32 && light.online === true) {
                str += (light.state === 1) ? ("<span class=\"glyphicon glyphicon-star text-success glyphicon-big\"></span>") : ("<span class=\"glyphicon glyphicon-star text-danger glyphicon-big\"></span>");
            } else {
                continue;
            }
            str += "</td>";

            // 最后一次更新时间
            var d = new Date(light.onlineLastUpdate);
            str += "<td>";
            str += (d.getMonth() + 1) + "-";
            str += d.getDay() + "-";
            str += d.getHours() + ":";
            str += d.getMinutes();
            str += "</td>";

            str += "</tr>";
            $("#tableBody").append(str);
        }
    }
}