function App() {
    var self = this

    this.__proto__ = {
        init: function() {
            document.getElementById("container-regist").style.height = document.body.clientWidth / 32 * 35 + "px"

            weChat()
            events()
            types()
            agency()
        },
        types: document.getElementsByClassName("input-type"),
        currentType: "汽配商",
		hostPort: hostPort,
        agency: ""
    }

    function weChat() {
        var ua = window.navigator.userAgent.toLowerCase()
        var reg = new RegExp(/MicroMessenger/i)
        if(reg.test(ua)) document.getElementById("out").style.display = "flex"
    }

    function events() {
        document.getElementById("phone").addEventListener("input", input)
        document.getElementById("submit").addEventListener("click", submit)
    }

    function types() {
        for(var j = 0, k = this.types.length; j < k; j++) {
            var type = this.types[j]
            type.addEventListener("click", click)
        }
    }

    function agency() {
        var url = self.hostPort + "/promotion/register_agency"
        var obj = {
            auth: params.auth
        }
        getAjax(url, obj, function(res) {
            self.agency = res.agency_name
            document.getElementById("agency").innerHTML = self.agency + "km"
        })
    }

    function click(e) {
        self.currentType = e.target.value
		refresh()
    }

	function refresh() {
        for(var j = 0, k = self.types.length; j < k; j++) {
            var type = self.types[j]

            if(type.value == self.currentType) {
                type.style.backgroundColor = "#ffda00"
                type.style.color = "#333"
                type.style.border = "0"
            }else {
                type.style.backgroundColor = "white"
                type.style.color = "#999"
                type.style.border = "1px solid #666"
            }
        }
	}

	function input(e) {
        var value = e.target.value
        value = value.replace(/\D/g, "")
        e.target.value = value.substr(0, 11)
    }

	function submit() {
		var url = self.hostPort + "/promotion/register_agency"
		var obj = checkInfo()

		if(!obj) return

		postAjax(url, obj, function(res) {
            location.href = res.url + "&phone=" + obj.username + "&agency=" + self.agency
            // location.href = res.url + "&auth=" + params.auth + "&agency=" + self.agency
        })
	}

	function checkInfo() {
		var info = {}
		info.username = document.getElementById("phone").value
		info.real_name = document.getElementById("name").value
		info.company = document.getElementById("company").value
		info.company_type = self.currentType
		info.auth = params.auth

		if(info.username.length < 1) {
			alert("请输入手机号")
			return
		}
		else if(info.real_name.length < 1) {
			alert("请输入用户名称")
			return
		}
		else if(info.company.length < 1) {
			alert("请输入公司名称")
			return
		}

		return info
	}
}

var app = new App()
app.init()

// function onBridgeReady() {
//     WeixinJSBridge.invoke(
//         'getBrandWCPayRequest',
//         {
//             "package": "prepay_id=wx20170613225827f7b3ae0eb50671866580",
//             "timeStamp": "1497365907",
//             "signType": "MD5",
//             "paySign": "66469A4C01431A4FCED2E7E78449B44A",
//             "appId": "wx36f7153809aad261",
//             "nonceStr": "3puWpomhswQaSrRq"
//         },
//         function(res) {
//             if(res.err_msg == "get_brand_wcpay_request:ok" ) alert("ok") //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠
//             else alert(JSON.stringify(res))
//         }
//     )
// }
// if (typeof WeixinJSBridge == "undefined") {
//     if( document.addEventListener ){
//         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
//     }else if (document.attachEvent){
//         document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
//         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
//     }
// }else {
//     onBridgeReady()
// }