const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text")); 
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
    .then(res=>{
        return res.json()
    }).then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                questions : loadedQuestion.question,
                answers: [...loadedQuestion.incorrect_answers,loadedQuestion.correct_answer]
            }
            formattedQuestion.answers.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });
            console.log("formattedQuestion", formattedQuestion)
            return formattedQuestion
        })
        startGame()
    }).catch((err) => {
        console.error(err);
    });

startGame = () => {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore",score)
        return window.location.assign("/end.html");
    } 
    questionCounter ++;
    
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    
    question.innerText = currentQuestion.questions

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = currentQuestion.answer == selectedAnswer? "correct" : "incorrect"

        selectedChoice.parentElement.classList.add(classToApply);

        currentQuestion.answer == selectedAnswer ? score += CORRECT_BONUS : score;
        scoreText.innerText = score;

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    })
})