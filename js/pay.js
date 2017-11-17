function App() {
    var self = this

    this.__proto__ = {
        init: function() {
            document.getElementById("phone").innerHTML = params.phone
        }
    }
}

var app = new App()
app.init()