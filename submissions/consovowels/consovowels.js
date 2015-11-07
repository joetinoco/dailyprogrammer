/*
	Challenge name: Consonants and vowels
    Level: Easy
	Objective: Generate words based on a pattern of consonants (c) and vowels (v), like 'cvcvv' or 'CcvV'.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3q9vpn/20151026_challenge_238_easy_consonants_and_vowels/
*/

var generateWord = function(pattern){
    if (!pattern.match(/[cv]+/gi)) return 'Invalid input';
    else{
        var letters = {
            v: 'aeiou'.split(''),
            c: 'bcdfghjklmnpqrstvwxyz'.split(''),
            randomLetter: function(type){
                var t = type.toLowerCase();
                var c = this[t][Math.floor(Math.random() * this[t].length)];
                return t === type ? c : c.toUpperCase();
            }
        };
        for (var word, i = 0; i < pattern.length; i++)
            word += letters.randomLetter(pattern[i]);

        return word;
    }
};

['cvcvcc','CcvV','cvcvcvcvcvcvcvcvcvcv','bogus'].forEach(function(i){
    console.log(generateWord(i));
});