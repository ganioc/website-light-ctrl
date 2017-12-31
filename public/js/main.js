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
        },
        error: function (err) {
            console.log("all on error");
            console.log(err);
        },
        timeout: function () {
            console.log("cmd timeout");
        },
        data: {
            type: "cmd",
            content: "allon"
        }
    });

});


$("#btnOff").click(() => {
    console.log("Click-off");
    $("#dlgModal").modal("show");
});

$("#btnQuery").click(() => {
    console.log("Click-query");
    $("#dlgModal").modal("show");
});