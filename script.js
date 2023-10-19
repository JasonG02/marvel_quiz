const questions = [
    {
        question: "Where is Captain America from?",
        answers : [
            {text: "New York", correct: true},
            {text: "Pennsylvania", correct: false},
            {text: "Chicago", correct: false},
            {text: "California", correct: false},
        ]
        
    },
    {
        question: "Where did Tony Stark Graduate from?",
        answers : [
            {text: "Harvard", correct: false},
            {text: "MIT", correct: true},
            {text: "Stanford", correct: false},
            {text: "NYU", correct: false}, 
        ]
    },
    {
        question: "What year did Endgame come out?",
        answers : [
            {text: "2017", correct: false},
            {text: "2018", correct: false},
            {text: "2020", correct: false},
            {text: "2019", correct: true}, 
        ] 
    },
    {
        question: "Which SuperHero had their Movie debut in 2008?",
        answers : [
            {text: "Ant Man", correct: false},
            {text: "Captain America", correct: false},
            {text: "Hulk", correct: false},
            {text: "Iron Man", correct: true}, 
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct"); 
        score++;  
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block"
}



function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
});




startQuiz();