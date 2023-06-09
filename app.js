var questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language",
        ],
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet",
        ],
    },
    {
        numb: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hypertext Preprogramming",
            "Hometext Preprocessor",
        ],
    },
    {
        numb: 4,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Stylish Question Language",
            "Stylesheet Query Language",
            "Statement Question Language",
            "Structured Query Language",
        ],
    },
    {
        numb: 5,
        question: "What does XML stand for?",
        answer: "eXtensible Markup Language",
        options: [
            "eXtensible Markup Language",
            "eXecutable Multiple Language",
            "eXTra Multi-Program Language",
            "eXamine Multiple Language",
        ],
    },

];

let state = {
    currentQuestion: 0,
    score: [],
    totalQuestions: questions.length,
    heading: 'Computer Quiz'
}

function addMultipleNodes(parent, children) {
    for (let index = 0; index < children.length; index++) {
        parent.appendChild(children[index])
    }
}

let container = document.getElementsByClassName('container')[0].firstElementChild

class question {
    constructor(q, state) {
        let questionCard = document.createElement('div') //The whole Card
        questionCard.id = "questionCard"
        let title = document.createElement('h1') //The heading
        title.innerHTML += state.heading;
        let question = document.createElement('div') //The question
        question.id = "question"
        question.innerHTML = q.question
        let answers = document.createElement('form') //Answers Holder
        answers.id = "answers"
        for (let index = 0; index < q.options.length; index++) {
            let answer = document.createElement('label'); //single answer
            answer.onclick = () => {
                this.selectedAnswer = q.options[index];
            }
            let input = document.createElement('input') //answer input
            input.type = 'radio'
            input.name = 'answer'
            input.value = q.options[index]
            answer.appendChild(input)
            answer.innerHTML += q.options[index] //answer label
            answers.appendChild(answer) //answers div
        }
        let nextBtnHolder = document.createElement('div') //Next button holder
        nextBtnHolder.id = 'options'
        let nextBtn = document.createElement('button') //Next Button
        if (state.currentQuestion + 1 !== state.totalQuestions) {
            nextBtn.innerHTML = "Next Question"
            nextBtn.onclick = () => {
                if (this.selectedAnswer === q.answer) {
                    state.score.push(10)
                }
                else {
                    state.score.push(0)
                }
                console.log(state.currentQuestion)
                state.currentQuestion += 1;
                nextQuestion()
            }
        }
        else {
            nextBtn.innerHTML = "End Quiz"
            nextBtn.onclick = () => {
                if (this.selectedAnswer === q.answer) {
                    state.score.push(10)
                }
                else {
                    state.score.push(0)
                }
                console.log(state.currentQuestion)
                state.currentQuestion += 1;
                endQuiz()
            }
        }
        let prevBtn = document.createElement('button') //Prev Button
        prevBtn.innerHTML = "Prev Question"
        prevBtn.onclick = () => {
            state.score.pop()
            console.log(state.currentQuestion)
            state.currentQuestion -= 1;
            nextQuestion()
        }
        if (state.currentQuestion === 0) {
            prevBtn.disabled = true
        }
        nextBtnHolder.appendChild(prevBtn)
        nextBtnHolder.appendChild(nextBtn)
        addMultipleNodes(questionCard, [title, question, answers, nextBtnHolder])
        this.component = questionCard;
        this.selectedAnswer = ""
    }
}

class endScreen {
    constructor() {
        let questionCard = document.createElement('div') //The whole Card
        questionCard.id = "questionCard"
        let title = document.createElement('h1') //The heading
        title.innerHTML += state.heading;
        //     id="result">
        //     <h1>You received 10/50 marks</h1>
        // </div>
        let result = document.createElement('div')
        result.id = "result"
        let score = document.createElement('h1')
        let scoreNumber = state.score.reduce((a, b) => a + b)
        if (scoreNumber === (state.totalQuestions * 10)) {
            score.innerHTML += `Reamarkable ✨ you received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        else if (state.score / (state.totalQuestions * 10) >= 0.7) {
            score.innerHTML += `Not bad you could have done better.<br/>You received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        else {
            score.innerHTML += `Disappointing you failed.<br/>You received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        let timeHolder = document.createElement('h1')
        console.log(time)
        timeHolder.innerHTML += `You took ${time[0].innerHTML} <sub>hours</sub> and ${time[1].innerHTML} <sub>minutes</sub> ${time[2].innerHTML} <sub>seconds</sub>`
        result.appendChild(score)
        addMultipleNodes(questionCard, [title, result, timeHolder])
        this.component = questionCard
    }
}

function nextQuestion() {
    container
        .replaceChildren(
            new question(
                questions[state.currentQuestion],
                state
            ).component
        )
    console.log(state)
}

function endQuiz() {
    stop(timer)
    console.log(
        new endScreen().component
    )
    container
        .replaceChildren(
            new endScreen().component
        )
    console.log(state)
}
let timer = start()
nextQuestion()