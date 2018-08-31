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

let findIndx = 0;
let chosen   = '';
let word     = '';
let count    = 0; //user guesses


const LOGO = () => {
    let log = console.log;
    figlet('Guess Dat Distro', {
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

const BEGIN = () => {

    findIndx = Math.floor(Math.random() * wordBank.length);
    chosen = wordBank[findIndx];
    word = new Word(chosen);
    word.init_word();

    if (findIndx > -1) {
        wordBank.slice(findIndx, 1);
    }
    console.log('You have 10 guessses');

    USR_PROMPT();
}

const USR_PROMPT = () => {
    if (count < 10) {
        
        word.show();

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

const CHECK_ANSWER = (data) => {

    if ((data.letter.length === 1)) {
        let checker = data.letter.toUpperCase();
        let tmp = word.solved(data.letter);
        word.guess(checker);

        if (tmp === word.solved(data.letter)) {
            count++;
            console.log(`Guesses Remaining:  ${10 - count}`);
        } 
        
        if (tmp === word.guess(data.letter)){
            USR_PROMPT();
        } else {
            CHECK_RIGHT();
        }
    } else {
        console.log('One Letter @ a time \n');
        BEGIN();
    }
}

const CHECK_RIGHT = () => {
    // console.log('correct \n');
    if (word.solved()) {
        console.log('Correct Guess');

        word   = '';
        chosen = '';
        select = 0;
        count  = 0;

        NEW_ROUND();
    } else {
        USR_PROMPT();
    }
}

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
                verticalLayout: 'default'
            }, function (err, data) {
                if (err) {
                    console.log(`ERROR: ${err}`);
                    return;
                }
                console.log(`${data}`);
            });
        }
    })
}

LOGO();