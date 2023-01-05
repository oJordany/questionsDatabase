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

            let dataString = JSON.stringify(datas)

            let encrypted = encrypt(dataString)

            fs.writeFile(__dirname+"/database/questionsDatabase.json", encrypted, error => {
                console.log(error || "Arquivo Salvo!")
            })
        }else{
            const datas = content ? JSON.parse(content) : []
            console.log(datas)
            for (let [i, data] of datas.entries()){
                data.id = i+1
            }
            console.log(datas)
            let newItem = {
                id: datas.length + 1,
                link: link
            }

            datas.push(newItem)

            let dataString = JSON.stringify(datas)
            
            let encrypted = encrypt(dataString)

            fs.writeFile(__dirname+"/database/questionsDatabase.json", encrypted, error => {
                console.log(error || "Arquivo Salvo!")
            })
        }
    })
}

function read(permissions){
    fs.readFile(__dirname + "/database/questionsDatabase.json", "utf-8", function (error, content){
        if (error){
            console.log(error)
        }else{
            dataString = JSON.parse(decrypt(permissions, content))
        }
    })
}

function random(list){
    return list[Math.floor(Math.random() * list.length)]
}

function raffleQuestion(){
    let query = read('{"key":"d927fe901ea6d255520b8bd3a2008e86841ffa61b55cb4138858cb7ce7086611","iv":"d3489394ec7ed681b5c0c94fae8ccc5e"}')
    console.log(query)
    let question = random(query)

    return question
}

function encrypt(text){
    const algorithm = "aes-256-cbc"
    const key = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    let cipher = crypto.createCipheriv(algorithm, key, iv)
    
    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])
    
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

    return encrypted.toString("hex")
}

function decrypt(text, encryptedText){
    let datas = JSON.parse(text)
    
    let iv = Buffer.from(datas.iv, "hex")
    let key = Buffer.from(datas.key, "hex")
    let encryptedTxt = Buffer.from(encryptedText, "hex")

    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)

    let decrypted = decipher.update(encryptedTxt)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}

// read('{"key":"d927fe901ea6d255520b8bd3a2008e86841ffa61b55cb4138858cb7ce7086611","iv":"d3489394ec7ed681b5c0c94fae8ccc5e"}')
let q = raffleQuestion()
console.log(q.link)