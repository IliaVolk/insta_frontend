var express = require("express")
var app = express()


app.get("/main.js", function(req, res){
    //console.log("get main js")
    res.sendFile(__dirname+"/dist/main.js")
})
app.get("*", function(req, res){
    //console.log("get index")
    res.sendFile(__dirname+"/indexLocal.html")
})


app.listen(3001)