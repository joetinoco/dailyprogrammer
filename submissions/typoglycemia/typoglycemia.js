/*
	Challenge name: Typoglycemia
	Level: Easy
	Objective: "Typoglycemia" is the mind's ability to decipher mis-spelled words if the first and last letters of the word are correct (e.g.: "the olny iprmoatnt tihng is taht the frist and lsat ltteer be in the rghit pclae"). The challenge is to create a program which scramble the letters in a piece of text leaving only the first and last letters in place.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3s4nyq/20151109_challenge_240_easy_typoglycemia/
*/

var input = "According to a research team at Cambridge University, it doesn't matter in what order the letters in a word are, \n"
+ "the only important thing is that the first and last letter be in the right place. \n"
+ "The rest can be a total mess and you can still read it without a problem.\n"
+ "This is because the human mind does not read every letter by itself, but the word as a whole. \n"
+ "Such a condition is appropriately called Typoglycemia.";

function typoglycemia(input){
    return input.replace(/\b\w+\b/gm,function(word){
        var w, glyc = word;
        while (glyc === word && word.length >= 4){
            w = word.split('');
            glyc = w.shift() + '';
            while (w.length > 1) glyc += w.splice(Math.random() * w.length - 1, 1);
            glyc += w.length ? w[0] : '';
        }
        return glyc;
    });
}

console.log(typoglycemia(input));