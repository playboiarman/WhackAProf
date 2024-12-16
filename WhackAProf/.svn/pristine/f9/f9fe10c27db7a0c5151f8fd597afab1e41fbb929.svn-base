const holes = document.querySelectorAll('.hole');
let currentMole;
let timerInterval;
let score = 0;
let highScore = 0;
let timeLeft = 30; // Total time for the game
let gameActive = false; // Flag to check if the game is active
let gamePaused = false; // Flag to check if the game is paused
let maxMoles = 1; // Start with 1 mole
let moleChangeInterval;
var title = document.getElementById("Title")

//Sounds
//const hitSound = document.getElementById('hit-sound');


/*[Functions]*/
// Function to randomly place a mole in one of the holes
function showMole() {
    hideMole(); // Hide all existing moles first

    const randomIndexes = [];
    while (randomIndexes.length < maxMoles) {
        const randomIndex = Math.floor(Math.random() * holes.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    randomIndexes.forEach(index => {
        const mole = holes[index].querySelector('.mole');
        if (mole) {
            mole.style.display = 'inline-block'; // Show the mole
        }
    });
}

function startMolePositionChange() {
    moleChangeInterval = setInterval(() => {
        if(gameActive == false){
            clearInterval(moleChangeInterval);
        }

        if(timeLeft % 2 == 0 && gamePaused == false){
            showMole(); // Update the moles' positions    
        }   
    }, 1000); // Check time left every second
}

function increaseMolesOverTime() {
    const moleIncreaseInterval = setInterval(() => {
        if(gameActive == false){
            clearInterval(moleIncreaseInterval);
        }

        if(timeLeft % 10 == 0){
            if (maxMoles < 3) { // Increase moles up to 3
                maxMoles++;
            } else {
                clearInterval(moleIncreaseInterval); // Stop increasing after reaching 3 moles
            }
        }
    }, 1000); // Check every second
}

// Function to play the hit sound and update the score when a mole is clicked
function whackMole(event) {
    if (event.target.classList.contains('mole') && gamePaused == false) {
        //hitSound.play(); // Play sound effect
        //currentMole.classList.remove('mole'); // Remove mole after hit
        event.target.style.display = 'none'; 
        increaseScore();
        showMole(); // Show the mole again in a random hole
    }
}

function hideMole() {
    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        if (mole) {
            mole.style.display = 'none'; // Hide the mole element
            //mole.classList.remove('mole'); // Remove the mole class for cleanup
        }
    });
}

// Function to toggle between Start and Restart
function toggleGame() {
    if (gameActive || gamePaused) {
        resetGame(); // Restart the game if it's currently active or paused
    } else {
        startGame(); // Start the game if it's not active
    }
}


// Pause the game
function pauseGame() {
    if (gameActive && !gamePaused) {
        clearInterval(timerInterval); // Clear the timer
        gamePaused = true; // Set game as paused
        document.getElementById('pause-button').innerText = 'Resume'; // Change pause button to resume
        document.getElementById('restart-button').style.display = 'inline-block';
    } else if (gamePaused) {
        resumeGame(); // Call resume game if already paused
    }
}


// Resume the game
function resumeGame() {
    if (gamePaused) {
        gamePaused = false; // Set game as not paused
        document.getElementById('pause-button').innerText = 'Pause'; // Change resume back to pause

        // Resume the countdown
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                document.getElementById('time-remaining').innerText = timeLeft;
            } else {
                endGame(); // End the game when time runs out
            }
        }, 1000); // Decrease timer every second
    }
}


// Reset the game to initial state
function resetGame() {
    clearInterval(timerInterval); // Stop any existing timer
    gameActive = false; // Set game as inactive
    gamePaused = false; // Reset pause state
    score = 0; // Reset score
    timeLeft = 30; // Reset timer
    maxMoles = 0;

    hideMole();

    // Reset button texts and display
    document.getElementById('restart-button').style.display = 'none';
    //document.getElementById('start-button').innerText = 'Start';
    document.getElementById('start-button').style.display = 'inline-block';
    document.getElementById('pause-button').style.display = 'none'; // Hide the pause button
    document.getElementById('pause-button').innerText = 'Pause'; // Reset pause button text


    document.getElementById('score').innerText = score; // Update score display
    document.getElementById('time-remaining').innerText = timeLeft; // Update timer display
    document.getElementById('game-over-message').style.display = 'none'; // Hide game over message
}


// Increase score function (can be linked to game events)
function increaseScore() {
    if (gameActive && !gamePaused) {
        score++;
        document.getElementById('score').innerText = score;
    }
}


//Start the game
function startGame(){
    score = 0; // Reset score
    timeLeft = 30; // Reset timer
    maxMoles = 1; // Reset to 1 mole
    gameActive = true; // Set game as active
    gamePaused = false; // Set game as not paused
    document.getElementById('score').innerText = score;
    document.getElementById('time-remaining').innerText = timeLeft;
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'inline-block';

    // Hide the game over message if visible
    document.getElementById('game-over-message').style.display = 'none';
    document.getElementById('pause-button').style.display = 'inline-block';
    document.getElementById('pause-button').innerText = 'Pause';

    // Start mole behavior
    showMole();
    startMolePositionChange();
    increaseMolesOverTime();

    // Start the countdown
    timerInterval = setInterval(() => {
        if(gameActive == false){
            clearInterval(timerInterval);
        }
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time-remaining').innerText = timeLeft;
        }
        else {
            endGame(); // End the game when time runs out
        }
    }, 1000);
}

// End the game and show game over message
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    clearInterval(moleChangeInterval); // Stop changing mole positions
    gameActive = false;
    gamePaused = false;

    // Hide the pause button
    document.getElementById('pause-button').style.display = 'none';

    // Show game over message
    document.getElementById('final-score').innerText = score;
    document.getElementById('game-over-message').style.display = 'block';

    // Update high score
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').innerText = highScore;
    }
}

//Open game page
function openGamePage(){
    // Attach click event listener to all holes
    holes.forEach(hole => {
        hole.addEventListener('click', whackMole);
    });
}

document.addEventListener("keydown", (event) => {
    if(event.key == "Escape"){
        hideGamePage();
        showMainPage();
        resetGame();
    }
});