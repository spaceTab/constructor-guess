const Word = require("./word.js");
const inquirer = require("inquirer");
const figlet = require("figlet");

const wordBank = [
    'gentoo',
    'debian',
    'ubuntu',
    'fedora',
    'arch',
    'slackware',
    'redstar'
]
//
let findIndx = 0;
//let chosen   = '';  
let word     = '';  
let count    = 0;   //user guesses

// Creates an Ascii art greeting @ initiale running
const LOGO = () => {
    let log = console.log;
    figlet('Guess The Distro', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function (err, data) {
        if (err) {
            log(`ERROR: ${err}}`);
            return;
        }
        log(data);
        BEGIN();
    });
}

//function to choose word @ beginning of game
const BEGIN = () => {
    findIndx = Math.floor(Math.random() * wordBank.length); //choses index of an array
    chosen = wordBank[findIndx]; //takes random index and then choses the word @ that index
    word = new Word(chosen);
    word.init_word();   //initialize word in word.js

    if (findIndx > -1) {
        wordBank.slice(findIndx, 1);
    }
    console.log('You have 10 guessses');

    LETTER_PROMPT();
}

//function that allows user to enter a letter.
const LETTER_PROMPT = () => {
    if (count < 10) {       //makes sure the user has correct amount of gueses
        
        word.show();    //shows the '_' placeholder of the chosen word

        inquirer.prompt([
            {
                type: 'input',
                name: 'letter',
                message: 'Pick one Letter & press ENTER:'
            }
        ]).then(data => {
            CHECK_ANSWER(data);
        })
    } else {
        console.log('You\'ve run out of guesses');
        console.log('The correct word was' + chosen);

        chosen   = '';
        word     = ''
        findIndx = 0;
        count    = 0;

        NEW_ROUND();
    }
}

//function checks if the users input has same letter of chosen word
const CHECK_ANSWER = (data) => {
    //ensures input is 1 character -> Regex function to make sure of input is w/ in alphabet
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
      //  let checker = data.letter.toUpperCase();
        let letterCheck     = word.solved(data.letter);
        //word.guess(checker);

        if (letterCheck === word.solved(data.letter)) { //compares input to letters in word if false -1 guess
            count++;
            console.log(`Guesses Remaining:  ${10 - count}`);
        } 
        
        if (letterCheck === word.guess(data.letter)){ 
            LETTER_PROMPT();
        } else {
            CHECK_RIGHT();
        }
    } else {
        console.log('One Letter @ a time please \n');
        BEGIN();
    }
}

//function to check if all inputed letters are in the the chosen word
const CHECK_RIGHT = () => {
    // console.log('correct \n');
    if (word.solved()) {
        figlet('CORRECT!', {
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function (err, data) {
            if (err) return console.log(`ERROR: ${err}}`);

            word  = '';     //after figlet resets all the variables to ' 0 ' for next round
            chosen = '';
            select = 0;
            count  = 0;  

            console.log(data);
            NEW_ROUND(); 
        });        
    } else {
        LETTER_PROMPT(); //calls this when the word is not solved.
    }
}

//function to prompt user if they'd like to play again, then responds accordingly
const NEW_ROUND = () => {
    inquirer.prompt([
        {
            name: 'round',
            type: 'list',
            message: 'play again?',
            choices: ['yes', 'no']
        }
    ]).then(data => {
        if (data.round === 'yes') {
            BEGIN();
        } else {
            figlet('Goodbye!', {
                horizontalLayout: 'default',
                verticalLayout:   'default'
            }, function (err, data) {
                if (err) return console.log(`ERROR: ${err}`);
                
                console.log(`${data}`);
            });
        }
    })
}

LOGO();