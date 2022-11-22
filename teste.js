const fs = require("fs")
const crypto = require("crypto")
const QRcode = require("qrcode")


function encrypt(){
    const algorithm = "aes-256-cbc"
    const key = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    
    
    let data = {
        key: key.toString("hex"),
        iv: iv.toString("hex")
    }

    let stringData = JSON.stringify(data)

    QRcode.toString(stringData, {type:"svg"}, function(err, url){
        if(err){ 
            console.log("error ocurred")
        }else{
            fs.writeFile(__dirname+"/image/qrcode.svg", url, err => {
                console.log(err || "qrcode salvo")
            })
        }
    })

    // QRcode.toDataURL(stringData, function(err, code){
    //     if(err) return console.log("error ocurred")
    //     console.log(code)
    // })
}

function decrypt(text){
    let datas = JSON.parse(text)
    
    let iv = Buffer.from(datas.iv, "hex")
    let key = Buffer.from(datas.key, "hex")

    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)

    let decrypted = decipher.update()

}