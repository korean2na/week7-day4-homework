const quizKey = [
    {
        num: 1,
        question: '2 + 2 = ?',
        answer: '4'
    },
    {
        num: 2,
        question: 'What is the capital of Peru?',
        answer: 'lima'
    },
    {
        num: 3,
        question: 'Which NFL team won Super Bowl 50 back in 2016?',
        answer: 'denver broncos'
    },
    {
        num: 4,
        question: '6! = ?',
        answer: '720'
    },
    {
        num: 5,
        question: 'What is the state bird of Montana?',
        answer: 'western meadowlark'
    },
    {
        num: 6,
        question: 'Which Pro League of Legends team won the Worlds Championship back in 2016?',
        answer: 'sk telecom t1'
    },
    {
        num: 7,
        question: 'How much wood could a woodchuck chuck if a woodchuck could chuck wood?',
        answer: '42'
    },
    {
        num: 8,
        question: '(TRUE or FALSE) Is this valid syntax? const (name) = {arg} => (function actions)',
        answer: 'false'
    },
    {
        num: 9,
        question: 'What color is the dress? gold/white or blue/black?',
        answer: 'stupid meme'
    },
    {
        num: 10,
        question: 'What does the B in BLT stand for?',
        answer: 'bacon'
    },
    {
        num: 11,
        question: 'What is the Spanish word for "bedroom"?',
        answer: 'dormitorio'
    },
    {
        num: 12,
        question: 'Who was the author of "And Then There Were None"?',
        answer: 'agatha christie'
    },
    {
        num: 13,
        question: '"La Gazza Ladra Overture" is in what key?',
        answer: 'e major'
    },
    {
        num: 14,
        question: 'I have 3 apples and Sally has twice that amount in seashells. Bob has three times the amount of seashells, minus 4, in potatoes. What is the melting point of tungsten in Fahrenheit?',
        answer: '6191'
    },
    {
        num: 15,
        question: 'I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?',
        answer: 'an echo'
    }
]
let userAns = []
let counter = 0
const great = Math.floor(.9*quizKey.length)
const poor = Math.floor(.5*quizKey.length)

const questionsEl = document.getElementById('questions')

function loadQuestion(num) {
    const questionEl = document.createElement('div')
    questionEl.classList.add('card', 'p-5', 'pt-2', 'my-5', 'shadow', 'rounded')
    questionEl.setAttribute('id', `question${num}`)

    questionEl.innerHTML = `
        <h2 class="text-end mt-4"><label for="ans${num}" class="form-label">Question # ${num}</label></h2>
        <p class="ms-4 pb-2 fs-5">${quizKey[num-1].question}</p>
        <input type="text" class="form-control ps-4 fs-5" name="ans${num}" placeholder="Enter your answer here">
    `

    questionsEl.appendChild(questionEl)
}

function loadCorrect(num) {
    const questionEl = document.createElement('div')
    questionEl.classList.add('card', 'p-5', 'pt-2', 'my-5', 'shadow', 'rounded', 'bg-success', 'text-white')
    questionEl.setAttribute('id', `question${num}`)

    questionEl.innerHTML = `
        <h2 class="pt-4 text-end"><strong>Correct!</strong></h2>
        <h2 class="mt-4 text-end"><label for="ans${num}" class="form-label">Question # ${num}</label></h2>
        <p class="ms-4 pb-2 fs-5">${quizKey[num-1].question}</p>
        <input type="text" class="form-control ps-4 fs-5" name="ans${num}" placeholder="Your previous answer: ${userAns[num-1].givenAnswer}">
        <h5 class="pt-4 ms-4">Correct Answer:</h5>
        <p class="ms-5 fs-5">${quizKey[num-1].answer}</p>
    `

    questionsEl.appendChild(questionEl)
}

function loadWrong(num) {
    const questionEl = document.createElement('div')
    questionEl.classList.add('card', 'p-5', 'pt-2', 'my-5', 'shadow', 'rounded', 'bg-danger', 'text-white')
    questionEl.setAttribute('id', `question${num}`)

    questionEl.innerHTML = `
        <h2 class="pt-4 text-end"><strong>Incorrect</strong></h2>
        <h2 class="mt-4 text-end"><label for="ans${num}" class="form-label">Question # ${num}</label></h2>
        <p class="ms-4 pb-2 fs-5">${quizKey[num-1].question}</p>
        <input type="text" class="form-control ps-4 fs-5" name="ans${num}" placeholder="Your previous answer: ${userAns[num-1].givenAnswer}">
        <h4 class="pt-4 ms-4">Correct Answer:</h4>
        <p class="ms-5 fs-5">${quizKey[num-1].answer}</p>
    `

    questionsEl.appendChild(questionEl)
}


for (i=1; i<=quizKey.length; i++) {
    loadQuestion(i)
}

const quizFormEl = document.getElementById('quizForm')
quizFormEl.addEventListener('submit', (ev) => {
    ev.preventDefault()

    if (userAns) {
        userAns.length = 0
    }
    counter = 0

    for (i=1; i<=quizKey.length; i++) {
        let ans = document.getElementsByName(`ans${i}`)[0]
        ans = ans.value.toLowerCase()
        if (ans == quizKey[i-1].answer) {
            userAns.push({
                givenAnswer: `${ans}`,
                correct: true
            })
            counter += 1
        }
        else {
            userAns.push({
                givenAnswer: `${ans}`,
                correct: false
            })
        }
    }

    if (counter >= great) {
        questionsEl.innerHTML = `
            <div class="card p-3 mt-4 text-center shadow rounded">
                <h2>🌟 You got ${counter}/${quizKey.length} correct! Great job! 🌟</h2>
            </div>
        `
    }
    else if (counter <= poor) {
        questionsEl.innerHTML = `
            <div class="card p-3 mt-4 text-center shadow rounded">
                <h2>😬 You got ${counter}/${quizKey.length} correct... You tried. 😬</h2>
            </div>
        `
    }
    else {
        questionsEl.innerHTML = `
            <div class="card p-3 mt-4 text-center shadow rounded">
                <h2>You got ${counter}/${quizKey.length} correct. Always room for improvement!</h2>
            </div>
        `
    }

    for (i=1; i<=userAns.length; i++) {
        if (userAns[i-1].correct) {
            loadCorrect(i)
        }
        else {
            loadWrong(i)
        }
    }
})