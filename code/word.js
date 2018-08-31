const letter = require("./letter.js");


function Word(word) {

    this.word = word;
   // console.log(word)
    this.letterBank = [];
    this.guessedLetters = [];
    //console.log(this.word)
    this.init_word = function () {
        this.letterBank = word.split('');
        // console.log(this.letterBank);
    }

    this.show = function () {
        let str = '';
       // console.log(this.letterBank);
        // console.log(this.guessedLetters);
        for (var i = 0; i < this.letterBank.length; i++) {
            if (this.guessedLetters.indexOf(this.letterBank[i]) == -1) {
                str += ' _';
            } else {
                str += this.letterBank[i];
            }
        }
       
        console.log(str);
        return str; 
    }

    this.guess = function (letter) {
        this.guessedLetters.push(letter);
    }

    this.solved = function () {
        let is_solved = true;
        for (i = 0; i < this.letterBank.length; i++) {
            if (this.guessedLetters.indexOf(this.letterBank[i]) == -1) {
                is_solved = false;
            }
        }
        // console.log(this.guessedLetters)
        return is_solved;
    }
};


module.exports = Word;

