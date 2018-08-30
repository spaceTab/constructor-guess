const letter = require("./letter.js");


function Word(word) {

    this.word = word;
    this.letterBank = [];
    this.guessedLetters = [];
    console.log(this.word)
    this.init_word = function () {

        this.letterBank = word.split('');
       // console.log(this.letterBank);
    }

    this.show = () => {
        let str = '';
       // console.log(this.letterBank);
       // console.log(this.guessedLetters);
        for (i = 0; i < this.letterBank.length; i++) {
            if (this.guessedLetters.indexOf(this.letterBank[i]) == -1) {

                str += ' _';
            } else {
                str += this.letterBank[i];
            }
        }
        console.log(str);
        return str;
    }

    this.guess = (letter) => {
        this.guessedLetters.push(letter)
       // console.log(letter);
        console.log(this.guessedLetters);
    }


    this.solved = () => {
        let is_solved = true;
        for (i = 0; i < this.letterBank.length; i++) {
            if (this.guessedLetters.indexOf(this.letterBank[i]) == -1) {
                is_solved = false;

            }
        }
        console.log(this.guessedLetters)
        return is_solved;
    }

};


module.exports = Word;

