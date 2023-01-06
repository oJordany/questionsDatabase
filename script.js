function fetchQuestion(type){
    return fetch("database/questionsDatabase.json")
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => {
            questionIndex = Math.floor(Math.random() * response[type].length)
            console.log(questionIndex)
            return response[type][questionIndex]
        })
}

const myUrl = new URL(window.location.href)
console.log(myUrl)

if (myUrl.searchParams.get("type") == "statistic"){
    let question = fetchQuestion("statistic")
    question.then(response => {
        console.log(response)
        document.body.innerHTML = response
    })
} else if (myUrl.searchParams.get("type") == "function"){
    let question = fetchQuestion("statistic")
    question.then(response => {
        console.log(response)
        document.body.innerHTML = response
    })
}