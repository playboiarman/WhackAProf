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


const moleImageArray={  professor1: 'graphicElements/profJose.png',
                        professor2:'graphicElements/profGary.png',
                        trustee1:'graphicElements/profFrank.png'};

const roleTexts={   professor1 : 'Professor',
                    professor2 : 'Professor',
                    trustee1 : 'Trustee'};                        

//Sounds
const malletSound = document.getElementById('hitSound');      
const backgroundMusic = document.getElementById('backgroundMusic');
let MalletSoundActive = true;
let backgroundMusicActive = true;

playBackgroundMusic();
/*[Functions]*/
function playBackgroundMusic() {
    if (backgroundMusicActive) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

function playMalletSound() {
    if (MalletSoundActive) {
        malletSound.play();
    } else {
        malletSound.pause();
    }
}

// Event listeners to control background music
document.getElementById("TurnOnBgMusic").addEventListener("click", () => {
    backgroundMusicActive = true;
    playBackgroundMusic(); // Start playing music
});

document.getElementById("TurnOffBgMusic").addEventListener("click", () => {
    backgroundMusicActive = false;
    playBackgroundMusic(); // Pause the music
});

document.getElementById("TurnOnHitSound").addEventListener("click", () => {
    MalletSoundActive = true;
    playMalletSound(); // Start playing music
});

document.getElementById("TurnOffHitSound").addEventListener("click", () => {
    MalletSoundActive = false;
    playMalletSound(); // Pause the music
});








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
        const randomIndex=Math.floor(Math.random()*holes.length);
        const hole = holes[randomIndex];
        const mole =hole.querySelector('.mole');
        const moleText=hole.querySelector('.moleText');
       
        
        if (mole) {
            //const randomMoleImage=moleImageArray[Math.floor(Math.random()*moleImageArray.length)];
            const roles=['professor1','professor2','trustee1'];
            const randomRole=roles[Math.floor(Math.random()*roles.length)];
            
            mole.setAttribute('data-role',randomRole);
            mole.src=moleImageArray[randomRole];
            
            moleText.textContent=roleTexts[randomRole];
            
            mole.style.display = 'block'; // Show the mole
            moleText.style.display= 'block';
            
            currentMole=mole;
            
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
    if (event.target.classList.contains('mole') && gamePaused == false && gameActive == true) {
        // Ensure we're targeting the correct mole element and its text
        const mole = event.target;
        const moleContainer = mole.closest('.hole');
        const moleText = moleContainer.querySelector('.moleText');  // Find the moleText element in the same hole

        const moleRole=mole.getAttribute('data-role');

        if(moleRole === 'trustee1') {
            const moleRect=mole.getBoundingClientRect();
            const moleX = moleRect.left + moleRect.width / 2;
            const moleY = moleRect.top + moleRect.height / 2;

            // Create the blood circle at the mole's position
            createBloodCircle(moleX, moleY);
            increaseScore();
        }

        playMalletSound();
        

        // Whack the mole by adding the flatten class
        mole.classList.add('flatten');

        // Clear and hide the mole text
        moleText.style.display = 'none';  // Hide the mole text

        // Optionally, clear the mole text content
        moleText.textContent = '';

        // After the flatten animation ends, hide the mole and increase the score
        setTimeout(() => {
            mole.classList.remove('flatten');  // Remove flatten effect
            mole.style.display = 'none';       // Hide the mole

            // Optionally, reset the mole text visibility
            moleText.style.display = 'block'; // Show mole text again if needed

            // Increase score after whacking the mole
            increaseScore();

            // Show a new mole in a random hole
            showMole();
        }, 500); // Wait for flatten animation to complete
    }
}

function createBloodCircle(x, y) {
    // Create a new div for the blood circle
    const circle = document.createElement('div');
    circle.classList.add('blood-circle');

    // Position the blood circle at the clicked coordinates
    circle.style.left = `${x - 25}px`;  // Adjust to center the circle around the click
    circle.style.top = `${y - 25}px`;   // Adjust to center the circle around the click

    // Add the blood circle to the document
    document.body.appendChild(circle);

    // Remove the blood circle after the animation finishes (1.5 seconds)
    setTimeout(() => {
        circle.remove();
    }, 1500);  // Matches the animation duration
}
function hideMole() {
    holes.forEach(hole => {
        const mole = hole.querySelector('.mole');
        const moleText= hole.querySelector('.moleText');
        if (mole) {
            mole.style.display = 'none'; // Hide the mole element
            
            //mole.classList.remove('mole'); // Remove the mole class for cleanup
        }
        if(moleText){
            moleText.style.display = 'none';
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



    
