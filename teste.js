const fs = require("fs")
const crypto = require("crypto")
const QRcode = require("qrcode")


function insert(link){
    fs.readFile(__dirname + "/database/questionsDatabase.json", "utf-8", (error, content) => {
        if (error){
            let datas = []
            let newItem = {
                id: 1,
                link: link
            }

            datas.push(newItem)

            fs.writeFile(__dirname+"/database/questionsDatabase.json", JSON.stringify(datas), error => {
                console.log(error || "Arquivo Salvo!")
            })
        }else{
            const datas = content ? JSON.parse(content) : []
            console.log(datas)
            for (let [i, data] of datas.entries()){
                data.id = i+1
            }

            let newItem = {
                id: datas.length + 1,
                link: link
            }

            datas.push(newItem)
            
            fs.writeFile(__dirname+"/database/questionsDatabase.json", JSON.stringify(datas), error => {
                console.log(error || "Arquivo Salvo!")
            })
        }
    })
}

function encrypt(text){
    const algorithm = "aes-256-cbc"
    const key = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    let cipher = crypto.createCipheriv(algorithm, key, iv)
    
    let encrypted = cipher.update(text)

    
    
    let permissions = {
        key: key.toString("hex"),
        iv: iv.toString("hex")
    }

    let stringPermissions = JSON.stringify(permissions)

    QRcode.toString(stringPermissions, {type:"svg"}, function(err, url){
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
