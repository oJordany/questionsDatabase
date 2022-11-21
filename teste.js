const QRcode = require("qrcode")

let data = {
    cryptoKey : "Jordy123",
    name: "Jordany",
    data: "20/11/22"
}

let stringData = JSON.stringify(data)

QRcode.toString(stringData, {type:"terminal"}, function(err, url){
    if(err) console.log("error ocurred")
    console.log(url)
})

QRcode.toDataURL(stringData, function(err, code){
    if(err) return console.log("error ocurred")
    console.log(code)
})