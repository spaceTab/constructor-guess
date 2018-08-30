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

    figlet('Welcome!', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            console.log(chalk`{bgWhite.red ERROR: ${err}}`);
            return;
        }
        log(data);
        usr_prompt();
    });

}

 
let wordChosen = '';
let usedWord = '';





// Function for the prompt @ the start of game.
const usr_prompt = () => {
    //logo();
    inq.prompt([
        {
            name: 'letter',
            type: 'confirm',
            message: 'lets hang . . . man'
        }]).then((data) => {
            new_game();
        });
}


// const letter_guess = (data) => {
//     if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
 

// }
const new_game = ( /*letter*/) => {
    //grabbing word from wordbank
    let findIndx = Math.floor(Math.random() * wordArr.length);
    let findWord = wordArr[findIndx];

    word = new Word(findWord);
    word.init_word();
    word.show();

    //gives a dynamic amount of guesses
    //depending on the words length. 
    let wordGuess = findWord.length + 5;
    console.log(wordGuess);

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

        // if (data.input === 1) { 
        //     word.show();
        // } else {
        //   // console.log('one letter at a time please');
        //    // word.show();
        // }
        if (word.solved()) {
            console.log('GREAT JOB!');
            inq.prompt([
                {
                    type: 'input',
                    name: 'again',
                    message: 'would you like to play again? [yes/no]',
                    choices: ['yes', 'no']
                }
            ]).then(data => {
                if (data.again === 'yes') {
                    new_game();
                } else {
                    figlet('GoodBye', {
                        horizontalLayout: 'default',
                        verticalLayout: 'default'
                    }, function (error, data) {
                        if (error) return console.log(`Error: ${error}`);
                        console.log(data);
                    })    
                }
            });

        } else {
            letter_prompt();
        }
    });
}
logo();
