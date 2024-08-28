//DOM elements
const gameContainer = document.querySelector('.container');
userResult = document.querySelector('.user_result img');
cpuResult = document.querySelector('.cpu_result img');
result = document.querySelector('.result');
optionImages = document.querySelectorAll('.option_image');

//Initialize the scores, to keep track of player and cpu scores
let playerScore = 0;
let cpuScore = 0;

//DOM elements displaying the scores
const playerScoreElement = document.getElementById('playerScore');
const cpuScoreElement = document.getElementById('cpuScore');


//Add event listeners to all option images
optionImages.forEach((image,index) => {
    image.addEventListener('click', (e) => {

        //highlight the selected/ clicked image to visually indicate selection.
        image.classList.add('active');

        //Set default images and text while processing the result
        userResult.src = cpuResult.src = "images/rock1.png";
        result.textContent = "Waiting..";     

        // Reset previous result
        result.classList.remove('win', 'lose', 'draw');

        //remove 'active' class/image from all other options
        optionImages.forEach((image2,index2) => {
            
            index !== index2 && image2.classList.remove('active');

        
        });

        //add 'start' class to indicate the game has started
        gameContainer.classList.add('start');

        //set the time out to delay the result calculation by 2.5 seconds
        let time = setTimeout(() => {

             // Remove 'start' class after delay
            gameContainer.classList.remove('start');

            //get the image source of the clicked option
            let imageSrc = e.target.querySelector('img').src;
        userResult.src = imageSrc; //set user choice and updates the image

        //generate a random choice for CPU
        let randomNumber = Math.floor(Math.random() * 3);
        let cpuImages = ["images/rock1.png", "images/paper.png", "images/scissors1.png"]; //CPU possible choices
        cpuResult.src = cpuImages[randomNumber]; //set CPU choice image
       
        //map random number to CPU and user choice
        let cpuValue = ["R", "P", "S"][randomNumber];
        let userValue = ["R", "P", "S"][index];

        //all possible outcomes
        let outcomes = {
            "RR": "Tie",
            "RP": "CPU",
            "RS": "User",
            "PR": "User",
            "PP": "Tie",
            "PS": "CPU",
            "SR": "CPU",
            "SP": "User",
            "SS": "Tie"
        };

        //determine outcome value based on user and CPU options
        let outComeValue = outcomes[userValue + cpuValue];

        //display the result
        //result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Wins :)`;

        //update the score based on the result

        // if (outComeValue === "User") {
        //     playerScore++;
        //     playerScoreElement.textContent = playerScore;

        // } else if (outComeValue === "CPU") {
        //     cpuScore++;
        //     cpuScoreElement.textContent = cpuScore;

        //Display result and update score based on the outcome
        if (userValue === cpuValue) {
            result.textContent = "MATCH DRAW!";
            result.classList.add('draw');
        } else if (outComeValue === "User") {
            result.textContent = "YOU WON!";
            result.classList.add('win');
            playerScore++; //increment player score
            playerScoreElement.textContent = playerScore; //update player score and display result
        } else {
            result.textContent = "CPU WON!";
            result.classList.add('lose');
            cpuScore++; //increment cpu score
            cpuScoreElement.textContent = cpuScore; //update cpu score and display result

        }
            
        },2500); //2.5 seconds delay
 
    });
});

// Reset button functionality
const resetButton = document.getElementById('resetButton');

// Reset button event listener
resetButton.addEventListener('click', () => {
    // Reset scores
    playerScore = 0;
    cpuScore = 0;

    // Update scores in DOM
    playerScoreElement.textContent = playerScore;
    cpuScoreElement.textContent = cpuScore;

    // Reset result text and remove any result class
    result.textContent = "Let's play the game";
    result.classList.remove('win', 'lose', 'draw');

    // Reset images to default
    userResult.src = "images/rock1.png";
    cpuResult.src = "images/rock1.png";

    // Remove active class from all option images
    optionImages.forEach((image) => {
        image.classList.remove('active');
    });

    // Remove 'start' class if it exists
    gameContainer.classList.remove('start');
});