var response = {
    setResponse: function (is_success, message, code, data,sessionid,token) {
        var response = {
            code: code,
            is_success: is_success,
            description: message,
            token: token,
            sessionid: sessionid,
            responseData: data
        };
        return response;
    }
}
module.exports = response;