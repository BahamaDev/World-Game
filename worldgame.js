

// const Program = {
//     init() {
//         Program.serveQuestion();
//     },

//     bindEvents() {
//         // Bind buttons click events...
//     },

//     serveQuestion() {
//         // ...
//     },
// };




// Global vars
let roundLimit = 1
let questionCount = 0
let rightAnswerCount = 0
let wrongAnswerCount = 0
let questionCounter = document.getElementById('question-counter') // $('#'question-counter'')
let rightCounter = document.getElementById('right-counter')
let wrongCounter = document.getElementById('wrong-counter')
let startButton = document.getElementById('start-button')
let ratioCount = document.getElementById('ratio-counter')
let nextButton = document.getElementById("next-button")
let roundSelector = document.getElementById("round-selector")
let welcomeScreen = document.getElementById("welcome-screen")
let infoForm = document.getElementById("info-form")
let messageSection = document.getElementById('message-modal')
let messageText = document.getElementById('modal-text')
let messageAnim = document.getElementById('modal-animation')
// let getRounds = document.getElementById('round-selector').value
const questionText = document.getElementById("question-text")
const optionButtons = document.getElementById("option-buttons")
let gameContainer = document.getElementById('game-container')
let endTally = document.getElementById('tally-modal')
let attemptTrack = 0
let maxAttempt = 2






function bindEvents() {
    // infoForm.addEventListener('submit', startGame)
    startButton.addEventListener('click', serveQuestion)
    // startButton.addEventListener('click', startGame)
    nextButton.addEventListener("click", serveQuestion)
    nextButton.style.display = "none"
    console.log("bind Events Successful")
    gameContainer.style.display = "none";
    messageSection.style.display = "none"
}
bindEvents()






function gameControl(){
    if (questionCount > roundLimit){
        alert("game over")

        endGame()




        return
    }
}

// function reloadGame(){
//     reloadGame()
// }


// Places the selected country-capital pair into a question sentence and answer.
function getQuestionArr({ country, capital }) {
    return [
        {
            question: `____________ is the capital of ${country}.`,
            answer: `${capital}`
        },

        {
            question: `The capital of ____________  is ${capital}.`,
            answer: `${country}`
        },


        {
            question: `____________ is located in ${country}.`,
            answer: `${capital}`
        },


        {
            question: `If you visit ${capital}, you will be the country of __________ .`,
            answer: `${country}`
        }
    ]
}



// jQuery
// ReactJS Angular VueJS
// [].find [].forEach [].map
// if - ternary op
// functions


function renderStats() {
    //For Score Tracking
    let ratioCal = Math.floor((rightAnswerCount / questionCount) * 100)
    questionCounter.innerHTML = `Question: ${questionCount}`
    rightCounter.innerHTML = `Right: ${rightAnswerCount} `
    wrongCounter.innerHTML = `Wrong: ${wrongAnswerCount}`
    ratioCount.innerHTML = `Success Ratio: ${ratioCal}%`

}





//Generates other incorrect answers: pulls other randoms answers from the original "countries" array, based on whether the correct answer is a captial or country.
function generateOtherAnswers(correctAnswer, index) {
    let otherAnswerIndex = Math.floor(Math.random() * countries.length)
    let otherAnswer = ''
    if (correctAnswer == countries[index].country) {
        otherAnswer = countries[otherAnswerIndex].country
    }
    else {
        otherAnswer = countries[otherAnswerIndex].capital
    }


    return otherAnswer
}



//Main function that composes the Q&A content and send it to the DOM.
function serveQuestion() {
    // console.log(`Rounds start ${setGameRounds()}`)
    console.log(`question start ${questionCount}`)
    renderStats();

    // startButton.style.display = "none"
    welcomeScreen.style.display = "none"
    messageText.innerHTML = ''
    messageAnim.innerHTML = ''
    messageSection.style.display = 'none'
    gameContainer.style.display = 'flex'
    attemptTrack = 0
    questionCount += 1

    gameControl()

    let countryIndex = Math.floor(Math.random() * countries.length + 1) // Picks a random country-capital pair from the countries array

    const questionArr = getQuestionArr(countries[countryIndex]);

    let answerArr = [] // array to hold all created answers
    let questionIndex = Math.floor(Math.random() * questionArr.length) // Selects random question format from question Array.

    let correctAnswer = questionArr[questionIndex].answer; // Identifies the correct answer from the questionArr.

    // Sets/show question
    questionText.innerHTML = questionArr[questionIndex].question; //pushes question to DOM

    let otherAnswer1 = generateOtherAnswers(correctAnswer, countryIndex);
    let otherAnswer2 = generateOtherAnswers(correctAnswer, countryIndex);
    let otherAnswer3 = generateOtherAnswers(correctAnswer, countryIndex);



    answerArr.push(correctAnswer, otherAnswer1, otherAnswer2, otherAnswer3)//Pushes all created answers to an answerArr
    // console.log(answerArr)

    // Shuffle answers
    answerArr = answerArr.sort((a, b) => 0.5 - Math.random()) // Shuffles the answers in the answerArr.



    // Show options
    optionButtons.innerHTML = '';
    answerArr.forEach(item =>
        item === correctAnswer
            ? optionButtons.innerHTML += `
            <button class="answer-button" id="correct-answer" onclick="rightAnswer()">${item} </button>
            `
            : optionButtons.innerHTML += `
                <button class="answer-button" onclick="wrongAnswer()">${item}</button>`

    )



    let correctdata = {

        answer: correctAnswer,
        question: questionText

    }



    return questionCount
}


console.log(questionCount)




function displayNextbutton() {
    nextButton.style.display = "block"
}



let rightMessage = [

    {
        message: "Great Job!",
        animation: `<div style="width:100%;height:0;padding-bottom:98%;position:relative;"><iframe src="https://giphy.com/embed/WTEcIzqMRffRssYJjy" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>`,
    },

    {
        message: "You are correct!",
        animation: `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/QuTOdlwvMl5lHKbpRC" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/eddie-murphy-coming-to-america-QuTOdlwvMl5lHKbpRC">via GIPHY</a></p>`
    },


    {
        message: "Well Done!",
        animation: `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/l2Sqir5ZxfoS27EvS" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/loop-blue-celebration-l2Sqir5ZxfoS27EvS">via GIPHY</a></p>`
    },

    {
        message: "Awesome!",
        animation: `<div style="width:100%;height:0;padding-bottom:83%;position:relative;"><iframe src="https://giphy.com/embed/10YMf6TaREdW35MYJx" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/MickeyMouse-10YMf6TaREdW35MYJx">via GIPHY</a></p>`
    }



]

let wrongMessage = [

    {
        message: "That answer was incorrect. Maybe another time.",
        animation: `<div style="width:100%;height:0;padding-bottom:108%;position:relative;"><iframe src="https://giphy.com/embed/Wq9RLX06zRg4UM42Qf" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/chicken-bro-Wq9RLX06zRg4UM42Qf">via GIPHY</a></p>`
    },

    {
        message: "Wrong Answer. You'll get the next one.",
        animation: `<div style="width:100%;height:0;padding-bottom:134%;position:relative;"><iframe src="https://giphy.com/embed/eKrgVyZ7zLvJrgZNZn" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/eKrgVyZ7zLvJrgZNZn">via GIPHY</a></p>`
    },

    {
        message: "Incorrect. Good try though.",
        animation: `<div style="width:100%;height:0;padding-bottom:77%;position:relative;"><iframe src="https://giphy.com/embed/HKch5zpaH97ck" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/failure-mortal-HKch5zpaH97ck">via GIPHY</a></p>`
    }
]




function generateMessage(messageArr) {
    messageSection.style.display = 'block';
    let messageIndex = Math.floor(Math.random() * messageArr.length)
    console.log(messageIndex)
    let messageSentence = messageArr[messageIndex].message
    let messageImage = messageArr[messageIndex].animation
    gameContainer.style.display = "none"
    messageText.innerHTML = `${messageSentence}`
    messageAnim.innerHTML = `${messageImage}`
    let thatNode = messageAnim.childNodes[1]
    thatNode.style.display = 'none'
    return

}

function rightAnswer() {
    rightAnswerCount += 1
    displayNextbutton()
    messageSection.style.backgroundColor = "rgb(97, 238, 207)";

    generateMessage(rightMessage)


}



function wrongAnswer() {

    attemptTrack += 1
    wrongAnswerCount += 1

    if (attemptTrack == maxAttempt) {
        let correctButton = document.getElementById('correct-answer')
        let answerButtons = document.getElementsByClassName('answer-button')
        //correctButton.style.backgroundColor = "rgb(97, 238, 207"
        correctButton.classList.add('blink-button')
        console.log(answerButtons)

        //disable button functions whilst correct as correct answer is highlighted.
        for (let i = 0; i < answerButtons.length; i++) {
            answerButtons[i].setAttribute('disabled', 'true')

        }


        setTimeout(function () {
            generateMessage(wrongMessage)
            messageSection.style.backgroundColor = "rgb(255, 61, 51)";
            messageText.style.color = "white"

        },

            4000)

        displayNextbutton()

    }
    else {

        alert("Nope. Try Again!")
    }

}


console.log(questionCount)

// serveQuestion()



function endGame() {
    let endRatioCal = Math.floor((rightAnswerCount / questionCount) * 100)
    gameContainer.style.display = 'none'
    welcomeScreen.style.display = 'none'
    messageSection.style.display = 'none'
    alert("game over")
    endTally.style.display = 'flex'
    let tallyText = document.getElementById('tally-text')
    tallyText.innerHTML = 
    
    // `<p>You answered <em>${ questionCount }</em> questions.<br>Your Success Rate was <em>${endRatioCal}%.</em></p>`
        `You answered <em>${questionCount}</em> questions.<br>Your Success Rate was <em>${endRatioCal}%.</em>`

}








