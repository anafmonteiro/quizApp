const userName = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore");

userName.addEventListener("keyup", () => {
    saveScoreButton.disabled = !userName.value
})

finalScore.innerText = localStorage.getItem("mostRecentScore")

