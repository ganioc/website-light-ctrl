console.log("hello");

// 

$("#btnOn").click(() => {
    console.log("Click-on");
    $("#dlgModal").modal("show");
});


$("#btnOff").click(() => {
    console.log("Click-off");
    $("#dlgModal").modal("hide");
});

$("#btnQuery").click(() => {
    console.log("Click-query");
    $("#dlgModal").modal("show");
});
