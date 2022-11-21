window.addEventListener('load', carregado)

const db = openDatabase("dbQuestions", "1.0", "Meu primeiro banco", 2 * 1024 * 1024)

db.transaction(function(tx){
    tx.executeSql("CREATE TABLE IF NOT EXISTS questionsDatabase (id PRIMARY KEY, links TEXT)")
})

function carregado(){
    document.getElementById('btn-salvar').addEventListener('click', salvar)
}

function salvar(){
    console.log('clicado')
    link = "https://docs.google.com/forms/d/e/1FAIpQLSdqljXxqC1_BG4OCL5Ai8uK9nXBVS8D5UTntZlMLJx5-tgfDA/viewform?usp=sf_link"
    db.transaction(function(tx){
        tx.executeSql(`INSERT INTO questionsDatabase (links) VALUES("${link}")`, )
    })
}

function get(){
    console.log("busca iniciada")
    const table = document.getElementById("table-body")
    db.transaction(function(tx){
        tx.executeSql("SELECT * FROM questionsDatabase", [], function(tx, result){
            var rows = result.rows
            let randomNumber =  Math.floor(Math.random() * rows.length)
            // console.log(rows[randomNumber].links)
            document.getElementById('form').src = rows[randomNumber].links
        })
    })
}