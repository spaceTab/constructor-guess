
//Constuctore for letter
function Letter( letter ) {
    this.letter = letter;
    this.hidden = true;
    this.updater = function() {
        this.hidden = !this.hidden;
    }
    this.show = function ( letter ) {
        if (this.hidden === false){
           return this.letter;
        } else {
            return "_";
        }
    }
    console.log(Letter());

    this.check = function(newGuess){
        if (this.letter.toUpperCase() === newGuess.toUpperCase()) letter.updater();
    }
}
//console.log(Letter.show(letter))
module.exports = Letter;



// @ start prompt user
// if they want to play choose from words Array
// replace letter of words with underscores
