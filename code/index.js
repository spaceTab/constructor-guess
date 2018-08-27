const inq = require("inquirer");
const chalk = require("chalk");
const Word = require("./word.js");


//const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const wordArr = [
    'Greg',
    'file',
    'edit',
    'selection',
    'debug',
    'compile',
    'configuration'
]

const logo = () => {
    let log = console.log;

    log('____  ____  ___  _____  ____         ____ _______   ___  _____ _____');
    log('|  |__|  | /   \ |    \ |   \       /    ||  |  |  /  _]/ ___// ___/');
    log('|  |  |  ||     ||  D  )|    \     |   __||  |  | /  [_(   \_(   \_');
    log('|  |  |  ||  O  ||    / |  D  |    |  |  ||  |  ||    _]\__  |\__  |');
    log('|        ||     ||    \ |     |    |  |_ ||  :  ||   [_ /  \ |/  \ |');
    log(' \      / |     ||  .  \|     |    |     ||     ||     |\    |\    |');
    log('  \_/\_/   \___/ |__|\_||_____|    |___,_| \__,_||_____| \___| \___|');
    log('\n');
}


let usrGuesses = 10;




// Function for the prompt @ the start of game.
const usr_prompt = () => {
    logo();

        inq.prompt([
        {
            name: 'letter',
            type: 'confirm',
            message: 'lets hang . . . man'
        }]).then((data) => {
            new_game();

        });

}

usr_prompt();

// const letter_guess = (data) => {
//     let log = console.log;
//     let guessedLetters = new Set();
//     let usedLetters = []
//     new_game();
//     //Checking if users guess has already been guessed
//     if (guessedLetters === 1) {
//         if (guessedLetters.has(data)) {
//             log('\n you have already guessed this letter \n');
//             usrGuesses--;
//         } else {
//             guessedLetters.add(usedLetters);
//             usrGuesses--
//         }
        

//     if (usrGuesses == 0) {
//         log(' ')
//     }
// }

const new_game = ( /*letter*/ ) => {
    
    let findIndx = Math.floor(Math.random() * wordArr.length);
    let findWord = wordArr[findIndx];
    
    word = new Word(findWord);
    word.init_word();
    word.show();
    
    letter_prompt();
}

const letter_prompt = () => {
      inq.prompt([{
        name: 'input',
        type: 'input',
        message: 'guess a letter'
        }]).then((data) => {
            word.guess(data.input);
            word.show();
            //letter_guess();
            if(word.solved()){
              new_game();
            }
            else {
              letter_prompt(); 
            }
        });
    }