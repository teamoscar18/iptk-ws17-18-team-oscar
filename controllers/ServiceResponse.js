//for general response
var response ={
        setuccessResponse: function (message,code,data) {
        var    successResponse = {
                res: "true",
                response: message,
                token: "",
                sessionid: "",
                responseData: data
            };
            return successResponse;
        },
    setFailureResponse:function (error,code,data) {
      var  failureResponse=
        {
            res:"false",
            response:error,
            token:"",
            sessionid:"",
            responseData:data
        };
      return failureResponse;
    }

}
module.exports=response;