// Global vars
let roundLimit = 10;
let questionCount = 1;
let rightAnswerCount = 0;
let wrongAnswerCount = 0;
let questionCounter = document.getElementById("question-counter"); // $('#'question-counter'')
let rightCounter = document.getElementById("right-counter");
let wrongCounter = document.getElementById("wrong-counter");
let startButton = document.getElementById("start-button");
let ratioCount = document.getElementById("ratio-counter");
let nextButton = document.getElementById("next-button");
let roundSelector = document.getElementById("round-selector");
let welcomeScreen = document.getElementById("welcome-screen");
let infoForm = document.getElementById("info-form");
let messageSection = document.getElementById("message-modal");
let messageText = document.getElementById("modal-text");
let messageAnim = document.getElementById("modal-animation");
const questionText = document.getElementById("question-text");
const optionButtons = document.getElementById("option-buttons");
let gameContainer = document.getElementById("game-container");
let endTally = document.getElementById("tally-modal");
let attemptTrack = 0;
let maxAttempt = 4;
let roundTracker = document.getElementById("round-tracker-counter");
let attemptcounter = document.getElementById("attempt-tracker-counter");
// attemptcounter.innerHTML = `Attempt ${attemptTrack} of ${maxAttempt}`;
let messageBar = document.getElementById("message-bar");
messageBar.innerText = `Try Again!`;

//Related to Sound
let bg = "./audio-files/Water Level Game.mp3";
let rightSound = "./audio-files/Achieved.mp3";
let wrongSound = "./audio-files/WRONG BUZZER 6.wav";
let tallysound = "./audio-files/Pull Slot.mp3";
let soundbtn = document.getElementById("sound-btn");
soundbtn.addEventListener("click", playbgAudio);
let slider = document.querySelector(".slider input");
let progressBar = document.querySelector(".slider progress");
let sliderDigits = document.querySelector(".sliderDigits");
let bgAudioPlaying = 0;
let audio = document.getElementById("bgaudio");
let soundIcon = document.getElementById("sound-icon");

function playSound(src) {
  // e.preventDefault();
  let audio = document.getElementById("audio-element");
  audio.src = src;
  audio.play();
  audio.volume = 0.3;
}

// Plays and mutes background audio.
function playbgAudio() {
  // e.preventDefault();
  if (bgAudioPlaying == 0) {
    audio.play();
    soundIcon.src = "icons/volume-high-solid.svg";
    console.log("bg audio playing");
    bgAudioPlaying = 1;
  } else {
    bgAudioPlaying = 0;
    soundIcon.src = "icons/volume-xmark-solid.svg";
    audio.pause();
    console.log("bg audio paused");
  }
}

// Translates slider input to control volume.
function volumeControl() {
  slider.oninput = function () {
    progressBar.value = slider.value;
    sliderDigits.innerHTML = slider.value;
    console.log(slider.value);
    audio.volume = slider.value / 100;
  };
}

//Enables initial actions and display values in the game.
function bindEvents() {
  startButton.addEventListener("click", serveQuestion);
  nextButton.addEventListener("click", serveQuestion);
  nextButton.style.display = "none";
  console.log("bind Events Successful");
  gameContainer.style.display = "none";
  messageSection.style.display = "none";
  volumeControl();
  // audio.play();
}
bindEvents();

// Checks the current round against the roundLimit, and ends the game once they match.
function gameControl() {
  if (questionCount > roundLimit) {
    endGame();

    return;
  }
}

// Places the selected country-capital pair into a question sentence and answer.
function getQuestionArr({ country, capital }) {
  return [
    {
      question: `____________ is the capital of ${country}.`,
      answer: `${capital}`,
    },

    {
      question: `The capital of ____________  is ${capital}.`,
      answer: `${country}`,
    },

    {
      question: `____________ is located in ${country}.`,
      answer: `${capital}`,
    },

    {
      question: `If you visit ${capital}, you will be the country of __________ .`,
      answer: `${country}`,
    },
  ];
}

// Manages stats and scores.
function renderStats() {
  // For Score tracking
  let ratioCal = Math.floor((rightAnswerCount / questionCount) * 100);
  questionCounter.innerHTML = `Question: ${questionCount}`;
  rightCounter.innerHTML = `Right: ${rightAnswerCount} `;
  wrongCounter.innerHTML = `Wrong: ${wrongAnswerCount}`;
  ratioCount.innerHTML = `Success Ratio: ${ratioCal}%`;
}

//Generates other incorrect answers. Pulls other randoms answers from the original "countries" array, based on whether the correct answer is a captial or country.
function generateOtherAnswers(correctAnswer, index) {
  let otherAnswerIndex = Math.floor(Math.random() * countries.length);
  let otherAnswer = "";
  if (correctAnswer == countries[index].country) {
    otherAnswer = countries[otherAnswerIndex].country;
  } else {
    otherAnswer = countries[otherAnswerIndex].capital;
  }

  return otherAnswer;
}

//Main function that composes the Q&A content and send it to the DOM.
function serveQuestion() {
  // Sets values for new game

  renderStats();
  welcomeScreen.style.display = "none";
  messageText.innerHTML = "";
  messageAnim.innerHTML = "";
  messageSection.style.display = "none";
  gameContainer.style.display = "flex";
  attemptTrack = 1;
  roundTracker.innerHTML = `Round ${questionCount}/${roundLimit}`;
  questionCount += 1;
  gameControl();

  let countryIndex = Math.floor(Math.random() * countries.length + 1); // Picks a random country-capital pair from the countries array

  const questionArr = getQuestionArr(countries[countryIndex]);

  let answerArr = []; // array to hold all created answers
  let questionIndex = Math.floor(Math.random() * questionArr.length); // Selects random question format from question Array.

  let correctAnswer = questionArr[questionIndex].answer; // Identifies the correct answer from the questionArr.

  // Sets and displays question
  questionText.innerHTML = questionArr[questionIndex].question; //pushes question to DOM=
  let otherAnswer1 = generateOtherAnswers(correctAnswer, countryIndex);
  let otherAnswer2 = generateOtherAnswers(correctAnswer, countryIndex);
  let otherAnswer3 = generateOtherAnswers(correctAnswer, countryIndex);

  //Collects the correct and incorrect answers into an array for handling.
  answerArr.push(correctAnswer, otherAnswer1, otherAnswer2, otherAnswer3); //Pushes all created answers to an answerArr

  answerArr = answerArr.sort(() => 0.5 - Math.random()); // Puts all of the answers from the answerArr into a random order.

  // Show options
  optionButtons.innerHTML = "";

  // Pushes all of the answers from the answerArr to the DOM as buttons.
  answerArr.forEach((item) =>
    item === correctAnswer
      ? (optionButtons.innerHTML += `
            <button class="answer-button" id="correct-answer" onclick="rightAnswer()">${item} </button>
            `)
      : (optionButtons.innerHTML += `
                <button class="answer-button" onclick="wrongAnswer()">${item}</button>`)
  );

  return questionCount;
}

function displayNextbutton() {
  nextButton.style.display = "block";
}

//Array of prompt message options for when the incorrect answer is chosen.
let rightMessage = [
  {
    message: "You are correct!",
    animation: `<img src="./animations/win-anim/baby-yes.gif" class="animation-media" alt="positive-animaiton"/>`,
  },

  {
    message: "Well Done!",
    animation: `<img src="./animations/win-anim/baby-yoda-baby-yoda-dancing.gif" class="animation-media" alt="positive-animaiton"/>`,
  },

  {
    message: "Awesome!",
    animation: `<img src="./animations/win-anim/happy-dancing-2.gif" class="animation-media" alt="positive-animaiton"/>`,
  },
  {
    message: "Awesome!",
    animation: `<img src= "./animations/win-anim/pointing-that-is-correct-3.gif" class="animation-media" alt="positive-animaiton"/>`,
  },

  {
    message: "You are correct!",
    animation: `<img src="./animations/win-anim/we-play-to-win-snoop-dogg.gif" class="animation-media" alt="positive-animaiton"/>`,
  },

  {
    message: "Well Done!",
    animation: `<img src="./animations/win-anim/win-dwight.gif" class="animation-media" alt="positive-animaiton"/>`,
  },
];

//Array of prompt message options for when the incorrect answer is chosen.
let wrongMessage = [
  {
    message: "That answer was incorrect. Maybe another time.",
    animation: `<img src="./animations/loss-anim/army-soldier.gif" class="animation-media" alt="loss-animaiton"/>`,
  },

  {
    message: "Incorrect. Good try though.",
    animation: `<img src="./animations/loss-anim/eh-nope.gif" class="animation-media" alt="loss-animaiton"/>`,
  },

  {
    message: "Almost had it.",
    animation: `<img src="./animations/loss-anim/fail-soldiers.gif" class="animation-media" alt="loss-animaiton"/>`,
  },

  {
    message: "Incorrect. Good try though.",
    animation: `<img src="./animations/loss-anim/peter-draws-lets-try-again.gif"  class="animation-media" alt="loss-animaiton"/>`,
  },
  {
    message: "Close, but....",
    animation: `<img src="./animations/loss-anim/simpsons-wrong-answer.gif" class="animation-media" alt="loss-animaiton"/>`,
  },

  {
    message: "Almost there, but....",
    animation: `<img src="./animations/loss-anim/were-gonna-try-this-thing-again-eric-cartman-2.gif"  class="animation-media" alt="loss-animaiton"/>`,
  },
];

// Composes message and animations based on answer.
function generateMessage(messageArr) {
  messageSection.style.display = "block";
  let messageIndex = Math.floor(Math.random() * messageArr.length);
  console.log(messageIndex);
  let messageSentence = messageArr[messageIndex].message;
  let messageImage = messageArr[messageIndex].animation;
  gameContainer.style.display = "none";
  messageText.innerHTML = `${messageSentence}`;
  messageAnim.innerHTML = `${messageImage}`;
  console.log(messageAnim.children);
  let thatNode = messageAnim.childNodes[1];
  thatNode.style.display = "none";
  let finalNode = messageAnim.childNodes[0];
  finalNode.classList.add("animation-media");
  console.log(finalNode);
  return;
}

// This function/sequence of events if the correct answer is selected.
function rightAnswer() {
  playSound(rightSound);
  rightAnswerCount += 1;
  displayNextbutton();
  messageSection.style.backgroundColor = "rgb(97, 238, 207)";
  generateMessage(rightMessage);
}

// This function/sequence of events if the incorrect answer is selected.
function wrongAnswer() {
  playSound(wrongSound);
  attemptTrack = attemptTrack + 1;
  console.log(attemptTrack);
  wrongAnswerCount += 1;
  // Manages attempts when a wrong answer is selected. Shows correct answer and manages flow.
  if (attemptTrack == maxAttempt) {
    let correctButton = document.getElementById("correct-answer");
    let answerButtons = document.getElementsByClassName("answer-button");
    //correctButton.style.backgroundColor = "rgb(97, 238, 207"
    correctButton.classList.add("blink-button");
    console.log(answerButtons);

    //Disables button functions whilst correct as correct answer is highlighted.
    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].setAttribute("disabled", "true");
    }

    // Displays final message animation
    setTimeout(
      function () {
        generateMessage(wrongMessage);
        messageSection.style.backgroundColor = "rgb(255, 61, 51)";
        messageText.style.color = "white";
      },

      3000
    );

    displayNextbutton();
  } else {
    // Controls try again messages.
    messageBar.style.display = "flex";
    messageBar.classList.add("blink-message");
    setTimeout(() => {
      clearTimeout();
      messageBar.style.display = "none";
    }, 2000);
  }
}

function endGame() {
  playSound(tallysound);
  let endRatioCal = Math.floor((rightAnswerCount / questionCount) * 100);
  gameContainer.style.display = "none";
  welcomeScreen.style.display = "none";
  messageSection.style.display = "none";
  alert("game over");
  endTally.style.display = "flex";
  let tallyText = document.getElementById("tally-text");
  tallyText.innerHTML = `You answered <em>${questionCount}</em> questions.<br>Your Success Rate was <em>${endRatioCal}%.</em>`;
}
