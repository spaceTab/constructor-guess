const inq = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const Word = require("./word.js");


//const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const wordArr = [
    'overflow',
    'file',
    'edit',
    'selection',
    'debug',
    'compile',
    'configuration'
]

const logo = () => {
    let log = console.log;

    // log('____  ____  ___  _____  ____         ____ _______   ___  _____ _____');
    // log('|  |__|  | /   \ |    \ |   \       /    ||  |  |  /  _]/ ___// ___/');
    // log('|  |  |  ||     ||  D  )|    \     |   __||  |  | /  [_(   \_(   \_');
    // log('|  |  |  ||  O  ||    / |  D  |    |  |  ||  |  ||    _]\__  |\__  |');
    // log('|        ||     ||    \ |     |    |  |_ ||  :  ||   [_ /  \ |/  \ |');
    // log(' \      / |     ||  .  \|     |    |     ||     ||     |\    |\    |');
    // log('  \_/\_/   \___/ |__|\_||_____|    |___,_| \__,_||_____| \___| \___|');
    // log('\n');
    figlet('Welcome!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log(chalk`{bgWhite.red ERROR: ${err}}`);
            return;
        }
    });
    usr_prompt();
}


let usrGuesses = 10;
let wordChosen = '';
let usedWord = '';





// Function for the prompt @ the start of game.
const usr_prompt = () => {
    inq.prompt([
        {
            name: 'letter',
            type: 'confirm',
            message: 'lets hang . . . man'
        }]).then((data) => {
            new_game();
        });
}

//usr_prompt();

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

const new_game = ( /*letter*/) => {
    //grabbing word from wordbank
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
        if (word.solved()) {
            console.log('GREAT JOB!');
            inq.prompt([
                {
                    type: 'input',
                    name: 'again',
                    message: 'would you like to play again? [Yes/No]',
                    choices: ['yes', 'no']
                }
            ]).then(data => {
                if (data.again === 'yes') {
                    new_game();
                } else {
                    console.log('goodbye');
                }
            });
        } else {
            letter_prompt();
        }
    });
}
logo();