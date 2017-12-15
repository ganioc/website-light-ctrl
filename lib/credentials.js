var nUser = "kungfu";
var nCode = "kungfu1234";
var aUser = "admin";
var aCode = "kungfu1234admin";


module.exports = {
    normalId: "people",
    adminId: "guys",
    cookieSecret: 'kungfu&nanchao@2017',
    username: "kungfu",
    usercode: "kungfu1234",
    adminname: "admin",
    admincode: "kungfuadmin1234",
    checkAuth: function(u,p){
	if( u=== nUser && p === nCode ){
	    return 1;
	}
	else if( u===aUser && p === aCode){

	    return 2;
	}
	else{
	    return 0;
	}
    }
};


