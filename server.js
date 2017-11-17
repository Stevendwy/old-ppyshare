const app = require("express")()

app.get("/*", (req, res) => {
    let staticPath = req.path.replace(/\/ppy\/(.*\/)share170623\/(.*)/, "/$1$2")
//    console.log(staticPath)
    res.sendFile(__dirname + staticPath)
})
clearInterval()
app.listen(8083, "10.48.108.209", () => {
    console.log("success at 8083")
})
