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