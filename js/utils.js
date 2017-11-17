var hostPort = "http://192.168.10.111"
// hostPort = ""

function getAjax(url, content, callback, allReturn) {
    $.ajax({
        type: "get",
        url: url,
        data: content,
        success: function(data) {
            if(allReturn) {
                callback(data)
                return
            }
            if(data.code == 1) callback(data)
            else alert(data.msg)
        }
    })
}

function postAjax(url, content, callback) {
    $.ajax({
        type: "post",
        url: url,
        data: content,
        success: function(data) {
            if(data.code == 1) callback(data)
            else alert(data.msg)
        }
    })
}

var urlSearch = location.search
var params = new Object()
if(urlSearch.indexOf("?") == 0) {
	var paramsString = urlSearch.substr(1)
	var paramLink = paramsString.split("&linkUrl=")
	params.linkUrl = paramLink[1]
	var paramsStrings = paramLink[0].split("&")
	for(var i = 0; i < paramsStrings.length; i++) {
		params[paramsStrings[i].split("=")[0]] = paramsStrings[i].split("=")[1];
	}
}
