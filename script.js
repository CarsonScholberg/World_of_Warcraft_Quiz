//HTML Element references
var timeRemainingEl = document.getElementById("time-remaining");
var QandAEl = document.querySelector("#QandA");
var intialInputContainerEl = document.querySelector("#initialInputContainer")
var questionEl = document.querySelector("#question");
var optionsEl = document.querySelectorAll("#options");
var accuracyContainerEl = document.querySelector("#accuracyContainerId");
var accuracyEl = document.querySelector("#accuracyId");
var finalScoreEl = document.querySelector("#finalScore");
var saveLocallyEl = document.querySelector("#saveLocally");
var initialsInputEl = document.querySelector("#initialsInput");
var highscoresContainerEl = document.querySelector("#highscoresContainerId");
var scoresListEl = document.querySelector("#scoresListId");
var restartEl = document.querySelector("#restartId");
var startingScreenEl = document.querySelector("#startingScreenId");
var startQuizBtnEl = document.querySelector("#startQuizBtnId");
var clearScoreEl = document.querySelector("#clearScoreId");
var innerHSContEl = document.querySelector("#innerHSContId");
var navbarViewEl = document.querySelector("#navbarViewId");

// Questions
var QnA = [
    {
        question: "What year did did World of Warcraft originally release?",
        options: ["2003", "2004", "2005", "2006"],
        correctA: "2004"
    },
    {
        question: "Who was the original Lich King",
        options: ["Uther Lightbringer", "Arthas Menethil", "Sylvannas Windrunner", "Thrall"],
        correctA: "Arthas Menethil"
    },
    {
        question: "Who is Thrall's father?",
        options: ["Draka", "Garrosh", "Orgrim Doomhammer", "Durotan"],
        correctA: "Durotan"
    },
    {
        question: "How many siblings does Illidan Stormrage have?",
        options: ["0", "1", "2", "3"],
        correctA: "2"
    },
    {
        question: "What race has the active racial ability known as 'Every Man for Himself'?",
        options: ["Human", "Orc", "Dwarf", "Night Elf"],
        correctA: "Human"
    },
    {
        question: "what does 'Lok'Tar Ogar!' mean?",
        options: ["Victory or death", "Victory for honor!", "Honor above all!", "Blood and thunder!"],
        correctA: "Victory or death!"
    },
    {
        question: "What race is Chromie?",
        options: ["Gold Dragonflight", "Bronze Dragonflight", "Female gnome", "Dragon Aspect"],
        correctA: "Bronze Dragonflight"
    },
    {
        question: "Where was Mankrik's wife located?",
        options: ["Northern harpy lair", "North of Camp Taurajo", "Eastern raptor camp", "West of the Crossroads"],
        correctA: "North of Camp Taurajo"
    },
    {
        question: "Which does not belong?",
        options: ["See ye suun!", "Wash yer back!", "Off with ye!", "How are ye?"],
        correctA: "How are ye?"
    },
    {
        question: "What class is Anduin Wrynn?",
        options: ["Paladin", "Priest", "Druid", "Warlock"],
        correctA: "Priest"
    }
]

// Global variables
var currentQ = 0;
var counter = 90;
var highscores = [];
timeRemainingEl.textContent= counter;

// Functions
function beginQuiz () {
    startingScreenEl.setAttribute("class", "container hidden");
    QandAEl.setAttribute("class", "container");
    startTimer()
    iterateQuestions()
}

// Timer
function startTimer(){
    //interval
    var quizInterval = setInterval(function () {
        counter--;
        timeRemainingEl.textContent = counter;

        if(counter<=0 || currentQ > QnA.length){
            clearInterval(quizInterval);
            QandAEl.setAttribute("class", "hidden");
            intialInputContainerEl.setAttribute("class", "container");
            finalScoreEl.textContent = counter;
        }
    } ,1000)
}

// Moving through the questions
function iterateQuestions() {
    //question iteration
    if(currentQ < QnA.length){
        questionEl.textContent = QnA[currentQ].question;
        for(i=0; i<optionsEl.length; i++){
            optionsEl[i].textContent = QnA[currentQ].options[i]
        }
    }
    currentQ++
    setTimeout(function(){
        accuracyContainerEl.setAttribute("class", "container hidden");
    }, 2500)
    
}

// Checking if the answer is correct and moving to the next question
function checkAnswerAndIterate() {
    var prevA = this.textContent
    if(prevA == QnA[currentQ-1].correctA){
        console.log("correct")
        //add a set amount of points to score
        accuracyEl.textContent="Correct";
    } else {
        console.log("wrong");
        //subtract time because bad
        accuracyEl.textContent="Wrong";
        counter=counter-10;
    }
    accuracyContainerEl.setAttribute("class", "container");
    iterateQuestions();
}

// Saving your highscore to the leaderboard
function saveHighscore() {
    // Get intitials
    var initialsVar = initialsInputEl.value
    // check if initials != empty string
    // if true then add to array as key value pair w/ score
    // if false then alert user to input initials and then resubmit
    // display leaderboard
    if (initialsVar == "") {
        alert("Please enter your initials");
    }
    else {
        var scoreVar = {
            name: initialsVar, 
            score: counter
        }
        // if statement
        // if array is empty then add the scoreVar to the array
        // else if not empty then loop through array until we hit an element where new score > element score
            // insert the ScoreVar at this index
        if (highscores.length == 0) {
            highscores.push(scoreVar);
        }
        else if (highscores[highscores.length - 1].score > counter) {
            highscores.push(scoreVar);
        }
        else {
            for (var i = 0; i < highscores.length; i++) {
                var currentScore = highscores[i].score;
                if (counter >= currentScore) {
                    highscores.splice(i, 0, scoreVar);
                    break
                }
            }
        }
        console.log(highscores);
    }
    intialInputContainerEl.setAttribute("class", "container hidden");
    updateLeaderboard();
    highscoresContainerEl.setAttribute("class", "container");
}

// Restarts the quiz from the title page
function restartQuiz() {
    highscoresContainerEl.setAttribute("class", "container hidden");
    startingScreenEl.setAttribute("class", "container");
    counter = 90;
    currentQ = 0;
}

// Clears the score; reference function
function clearScore() {
    highscores = [];
    updateLeaderboard();
}

// Updates the leaderboard with your newly added score and name pair
function updateLeaderboard() {
    scoresListEl.innerHTML = "";
    for (var i = 0; i < highscores.length; i++) {
        var tempScore = highscores[i].score;
        var tempName = highscores[i].name;
        var tempNode = document.createElement("li");
        tempNode.textContent = tempName + " : " + tempScore;
        scoresListEl.appendChild(tempNode);
    }
}

// Reveals the highscores to be viewed
function showHighscores() {
    highscoresContainerEl.setAttribute("class", "container");
    navbarViewEl.textContent = "Hide Highscores";
    navbarViewEl.removeEventListener("click", showHighscores);
    navbarViewEl.addEventListener("click", hideHighscores);
}

// Hides the highscores from view
function hideHighscores() {
    highscoresContainerEl.setAttribute("class", "container hidden");
    navbarViewEl.textContent = "View Highscores";
    navbarViewEl.removeEventListener("click", hideHighscores);
    navbarViewEl.addEventListener("click", showHighscores);
}

//invocations
saveLocallyEl.addEventListener("click", saveHighscore);
restartEl.addEventListener("click", restartQuiz);
clearScoreEl.addEventListener("click", clearScore);
startQuizBtnEl.addEventListener("click", beginQuiz);
navbarViewEl.addEventListener("click", showHighscores);

for(j=0;j<optionsEl.length;j++){
    optionsEl[j].addEventListener("click", checkAnswerAndIterate)
}

