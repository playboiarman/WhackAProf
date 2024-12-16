//Variables
const buttons = document.querySelectorAll(".button")
const controlButtons = document.querySelectorAll("control-buttons")
const scoreTimer = document.querySelectorAll("score-timer")
const holes2 = document.querySelectorAll('.hole')
const gameContainer = document.getElementById("gameContainer")
const volume = document.getElementById("volume")
const backButton = document.getElementById("backButton")
var title = document.getElementById("Title")
var onEscapePress;

//Booleans
const settingsEnabled = false;
const gamePageEnabled = false;

//Functions
function hideMenu(){
    title.style.display = "none";

    buttons.forEach(button => {
        button.style.display = "none";
    })
}

//This function opens the game page when the start button is clicked
function showGamePage(){
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
    title.style.display = "block";  
    buttons.forEach(backbt => backbt.style.display = "inline-block");
}

//This function opens the settings Tab when button is clicked
function showVolume(){
    volume.style.display= "block";
}

//This function hides the volume tab and displays the Main page of the Game (Back button)
function hideVolume(){
    volume.style.display= "none";
    showMainPage();
}

//Events
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        hideMenu(); //Disable main menu UI
        const buttonText = event.target.textContent;
       
        if(buttonText == "Start Game") {
            openGamePage();
            showGamePage();
        }
        if(buttonText == "Settings"){
            showVolume();

            onEscapePress = function(event){
                if(event.key == "Escape"){
                    hideVolume();
                    showMainPage();
                    document.removeEventListener("keydown", onEscapePress);
                }
            }
           
            document.addEventListener("keydown", onEscapePress);
        }
    });
});

//EventListener for the backButton
backButton.addEventListener("click", () => {
    hideVolume();
    document.removeEventListener("keydown", onEscapePress);
})
