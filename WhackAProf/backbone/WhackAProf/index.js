//Variables
const buttons = document.querySelectorAll(".button")
const controlButtons = document.querySelectorAll("control-buttons")
const scoreTimer = document.querySelectorAll("score-timer")
const holes2 = document.querySelectorAll('.hole')
const gameContainer = document.getElementById("gameContainer")
const volume = document.getElementById("volume")
const backButton = document.getElementById("backButton")
var title = document.getElementById("Title")
const menuPage= document.getElementById("menuContainer")
const settingPage=document.getElementById("settingContainer")
var onEscapePress;
const backToMenuButton=document.getElementById("back-to-menu-Button")
const cursor=document.getElementById('cursor');

//Booleans
const settingsEnabled = false;
const gamePageEnabled = false;


//Functions


function triggerMalletEffect(event){
    cursor.style.animation='malletStrike 0.2s ease forwards';
    setTimeout(() => {
        cursor.style.animation = '';
      }, 200);
}

function hideMenu(){
    menuPage.style.display = "none";
}

//This function opens the game page when the start button is clicked
function showGamePage(){
    hideSettingPage();
    gameContainer.style.display = "flex";
    holes2.forEach(hole => {
        hole.style.display = "inline-block";
    });
}

function hideGamePage(){
    gameContainer.style.display = "none";
    holes2.forEach(hole => {
        hole.style.display = "none";
    });
}

//This functions brings up the main page of the game when the user backs out of the game page/setting
function showMainPage(){
    //hideSettingPage();
   menuPage.style.display="flex";
}

//This function opens the settings Tab when button is clicked
function showSettingPage(){
   
   settingPage.style.display = "block";
}

//This function hides the volume tab and displays the Main page of the Game (Back button)
function hideSettingPage(){
    settingPage.style.display= "none";
    
}

//Events

document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX - cursor.width / 2}px`;
    cursor.style.top = `${event.clientY - cursor.height / 2}px`;
  });

    document.addEventListener('click', () => {
    cursor.style.animation = 'hammerSwing 0.1s ease forwards';

    // Reset the animation after it finishes (300ms duration)
    setTimeout(() => {
      cursor.style.animation = ''; // Remove the animation
    }, 300);
  });  


buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        hideMenu(); //Disable main menu UI
        const buttonText = event.target.textContent;
       
        if(buttonText == "Start Game") {
            openGamePage();
            showGamePage();
        }
        if(buttonText == "Settings"){
            showSettingPage();

            onEscapePress = function(event){
                if(event.key == "Escape"){
                    hideSettingPage();
                    showMainPage();
                    document.removeEventListener("keydown", onEscapePress);
                }
            }
         
            document.addEventListener("keydown", onEscapePress);
        }
    });
});

backToMenuButton.addEventListener("click", () => {
    hideSettingPage();
    showMainPage();
    resetGame();
});
document.getElementById("backToMenuButton").addEventListener("click", () => {
    gameContainer.style.display="none";
    showMainPage();
    resetGame();
});

document.getElementById("gameplaySetting").addEventListener("click", () => {
    hideGamePage();
     showSettingPage();

});


//EventListener for the backButton
backButton.addEventListener("click", () => {
    hideSettingPage();
    document.removeEventListener("keydown", onEscapePress);
});






