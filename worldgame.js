const Program = {
    init() {
        Program.serveQuestion();
    },

    bindEvents() {
        // Bind buttons click events...
    },

    serveQuestion() {
        // ...
    },
};

const questionText = document.getElementById("question-text")
const optionButtons = document.getElementById("option-buttons")


//List of country-capital pairs
let countries = [

    {
        country: "The Bahamas",
        capital: "Nassau"
    },


    {
        country: "United States of America",
        capital: "Washington"
    },


    {
        country: "Australia",
        capital: "Canberra"
    },


    {
        country: "Belarus",
        capital: "Minsk"
    },



    {
        country: "Barbados",
        capital: "Bridgetown"
    },


    {
        country: "Cameroon",
        capital: "Yaounde"
    },


    {
        country: "Canada",
        capital: "Ottowa"
    },


    {
        country: "Brunie",
        capital: "Bandar Seri Begawan"
    },


    {
        country: "Costa Rica",
        capital: "San Jose"
    },


    {
        country: "Dominica",
        capital: "Roseau"
    },


    {
        country: "Denmark",
        capital: "Copenhagen"
    },

    {
        country: "Indonesia",
        capital: "Jakarta"
    },

    {
        country: "Malaysia",
        capital: "Kuala Lampur"

    },

    {
        country: "Maldives",
        capital: "Male"
    },

    {
        country: "Saudi Arabia",
        capital: "Riyadh"
    },



    {
        country: "Turkey",
        capital: "Ankara"
    },


    {
        country: "Georgia",
        capital: "Tbilisi"
    },


    {
        country: "Finland",
        capital: "Helsinki"
    },



    {
        country: "Bulgara",
        capital: "Sofia"
    },

]

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
            question: `If you visit ${capital}, you will be the coutry of __________ .`,
            answer: `${country}`
        }
    ]
}


// Global vars
let gameRounds = document.getElementById('round-selector').value
let questionCount = 1
let rightAnswerCount = 0
let wrongAnswerCount = 0
let questionCounter = document.getElementById('question-counter') // $('#'question-counter'')
let rightCounter = document.getElementById('right-counter')
let wrongCounter = document.getElementById('wrong-counter')
let startButton = document.getElementById('start-button')
let nextButton = document.getElementById('next-button')
let roundSelector = document.getElementById("round-selector")
let welcomeScreen = document.getElementById("welcome-screen")


if (gameRounds === questionCount){
endGame()
}
// jQuery
// ReactJS Angular VueJS
// [].find [].forEach [].map
// if - ternary op
// functions


function renderStats() {
    //For Score Tracking
    questionCounter.innerHTML = `<p> Question: ${questionCount} <p>`
    rightCounter.innerHTML = `<p> Right: ${rightAnswerCount} <p>`
    wrongCounter.innerHTML = `<p> Wrong: ${wrongAnswerCount} <p>`
}



function bindEvents() {
    startButton.addEventListener("click", serveQuestion); // $startButton.click(serveQuestion);
    startButton.style.display = "display"
    nextButton.addEventListener("click", serveQuestion)
    nextButton.style.display = "none"
}

bindEvents();

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
    renderStats();
   welcomeScreen.style.display = "none"
   welcomeScreen.setAttribute("disabled", "disabled")
    roundSelector.setAttribute('disabled',"disabled")
    roundSelector.style.display = "none"
    startButton.style.display = "none"
    nextButton.style.display = "none"
    questionCount += 1

    let countryIndex = Math.floor(Math.random() * countries.length + 1) // Picks a random country-capital pair from the countries array

    const questionArr = getQuestionArr(countries[countryIndex]);

    let answerArr = [] // array to hold all created answers
    let questionIndex = Math.floor(Math.random() * questionArr.length) // Selects random question format from question Array.

    let correctAnswer = questionArr[questionIndex].answer; // Identifies the correct answer from the questionArr.

    //selects other random answers to be populated to the buttons
    // let otherAnswerIndex1 = Math.floor(Math.random() * questionArr.length)
    // let otherAnswerIndex2 = Math.floor(Math.random() * questionArr.length)
    // let otherAnswerIndex3 = Math.floor(Math.random() * questionArr.length)

    // Sets/show question
    questionText.innerHTML = questionArr[questionIndex].question; //pushes question to DOM

    let otherAnswer1 = generateOtherAnswers(correctAnswer, countryIndex);
    let otherAnswer2 = generateOtherAnswers(correctAnswer, countryIndex);
    let otherAnswer3 = generateOtherAnswers(correctAnswer, countryIndex);

    console.log(" other answer 1 " + otherAnswer1)
    console.log(" other answer 2 " + otherAnswer2)
    console.log(" other answer 3 " + otherAnswer3)

    answerArr.push(correctAnswer, otherAnswer1, otherAnswer2, otherAnswer3)//Pushes all created answers to an answerArr
    console.log(answerArr)

    // Shuffle answers
    answerArr = answerArr.sort((a, b) => 0.5 - Math.random()) // Shuffles the answers in the answerArr.

    //Pushes answer values to relative buttons.
    //let theChildren = optionButtons.children.innerHTML;

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
    // console.log(theChildren)

    return questionCount
}



function displayNextbutton() {
    nextButton.style.display = "block"
}

function rightAnswer() {
    rightAnswerCount += 1
    alert("Right Answer")
    displayNextbutton()
}

function wrongAnswer() {
    wrongAnswerCount += 1
    alert("Wrong Answer")
    displayNextbutton()

}

console.log(questionCount)

// serveQuestion()



function endGame(){
    nextButton.style.display = "none"
    alert("game over")



}

//Video Aid: https://www.youtube.com/watch?v=R1S_NhKkvGA

// Have User Choose the number of Rounds - 
// Have small modal with messages to confirm right or wrong answer. 
//Maybe add sound to answer
// Modal with total score and stats at end of game



// Need to initiate game with a start button. - Completed
// Need to track score count and right or wrong answers - Completed
//Need to allow user to move on to next question -Completed


