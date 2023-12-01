let questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },

    {
        question: "Which is the smallest Country in the world",
        answers: [
            { text: 'Vatican City', correct: true },
            { text: 'Bhutan', correct: false },
            { text: 'Nepal', correct: false },
            { text: 'Srilanka', correct: false },
        ]
    },

    {
        question: 'Which is the largest desert in the world?',
        answers: [
            { text: 'Kalahari', correct: false },
            { text: 'Gobi', correct: false },
            { text: 'Sahara', correct: false },
            { text: 'Antartica', correct: true },
        ]
    },

    {
        question: "Which is the smallest continent in the world",
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Arctic', correct: false },
            { text: 'Africa', correct: false },
        ]
    }

];

let questionElement = document.getElementById("question")
let ansBtn = document.getElementById("ans-btn")
let nextBtn = document.getElementById("next-btn")

let currentQuestionindex,score;

const StartQuiz = () =>{
    currentQuestionindex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"
    ShowQuiz();
}

function ShowQuiz(){
    resetState()
    let inner = questions[currentQuestionindex]
    let question_no = currentQuestionindex + 1;
    questionElement.innerHTML = question_no + ". " + inner.question

    inner.answers.forEach(answer => {
        let button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add('btn')
        ansBtn.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',select_btn)
    });
}

function select_btn(e){
    let value = e.target
    let iscorrect = value.dataset.correct === 'true'
    if(iscorrect){
        value.classList.add('correct')
        score++;
    }
    else{
        value.classList.add('incorrect')
    }

    Array.from(ansBtn.children).forEach(element=>{
        if(element.dataset.correct === 'true'){
            element.classList.add('correct')
        }
        element.disabled = true;
    })

    nextBtn.style.display = "block"
}

function resetState(){
    nextBtn.style.display = "none"
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild)
    }
}

nextBtn.addEventListener('click',next1)

function playagain(){
    if(currentQuestionindex < questions.length){
        ShowQuiz();
    }
    else{
        resetState();
        questionElement.innerHTML =`Your score is ${score} out of ${questions.length}`
        nextBtn.style.display = "block"
        nextBtn.innerHTML = "Play Again"
    }
}

function next1(){
    if(currentQuestionindex < questions.length){
        currentQuestionindex++;
        playagain();
    }
    else{
         StartQuiz()
    }
}

StartQuiz();