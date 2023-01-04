const MAX_HIGH_SCORES = 5;

const userName = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || []

userName.addEventListener("keyup", () => {
    saveScoreButton.disabled = !userName.value
})

finalScore.innerText = mostRecentScore;

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: userName.value
    }
    highScores.push(score)

    sortScores()
    showScores()

    localStorage.setItem("highScores", JSON.stringify(highScores))
    window.location.assign("/index.html")
}

sortScores = () => {
    highScores.sort((a , b) =>{
        return b.score - a.score;
    })
}

showScores = () => {
    highScores.splice(MAX_HIGH_SCORES)
}