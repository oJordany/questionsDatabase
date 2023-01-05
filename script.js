function fetchQuestion(type){
    return fetch("database/questionsDatabase.json")
            .then(response => response.text())
            .then(response => JSON.parse(response))
            .then(response => {
                questionIndex = Math.floor(Math.random() * response.length)
                console.log(questionIndex)
                return response[type][questionIndex]
            })
}

fetchQuestion("statistic")