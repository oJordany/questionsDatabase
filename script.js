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
        window.open(response, "_blank")
    }).then(
        setTimeout(() => {
            window.open(window.location, "_self").close()
        }, 200)
    )
} else if (myUrl.searchParams.get("type") == "function"){
    let question = fetchQuestion("function")
    question.then(response => {
        window.open(response, "_blank")
    }).then(
        setTimeout(() => {
            window.open(window.location, "_self").close()
        }, 200)
    )
}