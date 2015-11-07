/*
	Challenge name: Fallout hacking game
	Level: Intermediate
	Objective: Reproduce the 'hacking' minigame (similar to the board game 'Mastermind') used in the Fallout franchise.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3qjnil/20151028_challenge_238_intermediate_fallout/
	Demo link: http://josetinoco.com/fallout/game.html
*/

var masterDictionary = {};
var diffLengths = [[4,5],[6,7,8],[9,10],[11,12],[13,14,15]]; // Word lenghts for each difficulty setting

// Randomizer helpers
var r = function(max) { return Math.round(Math.random() * max); };
var randomElement = function(arr) { return arr.splice(r(arr.length-1),1)[0]; };

var password = '', guesses;

$.get('enable1.txt', function(data) {
    // Group words by length and, inside each length, by the word's alphabetic key
    data.split('\n').forEach(function(word){
        var len = word.length;
        var key = word.split('').sort().reduce(function(p,c){
            if (p.charAt(p.length-1) == c) return p;
            else return p + c;
        });
        if (!masterDictionary[len]) masterDictionary[len] = [];
        if (!masterDictionary[len][key]) masterDictionary[len][key] = [];
        masterDictionary[len][key].push(word);
    });

    // Generate a game, picking words of the desired length
    $('#btnPlay').html('Play').attr('disabled', false).click(function(){
        var maxChoices = $('#selAlternatives option:selected').text();
        var difficulty = diffLengths[$('input[name="difficulty"]').filter(':checked').val()];
        var dict = masterDictionary[difficulty[r(difficulty.length - 1)]];
        var keyList = Object.keys(dict);
        var playerChoices = [];

        var key = randomElement(keyList);
        while (playerChoices.length < maxChoices && keyList.length > 0){
            if (dict[key].length === 0)
                while (dict[key].length < 2) key = randomElement(keyList); // Prevent picking word groups with only one element
            playerChoices.push(dict[key].splice(r(dict[key].length-1), 1)[0]);
        }

        var shuffledChoices = []; // Shuffle the selected words to separate the groups
        while (playerChoices.length) shuffledChoices.push(randomElement(playerChoices));

        password = shuffledChoices[r(shuffledChoices.length - 1)];
        guesses = 4;

        // Display the user interface for the game
        $('#output').html('');
        shuffledChoices.forEach(function(word){
            $('#output').append('<button class="btnWordChoice" name="wordchoice">' + word + '</button></br>');
        });

        $('#output').append('<p>Click the words to guess. ' + guesses + ' guesses remaining.</p>');

        // Process user input and give feedback
        $('.btnWordChoice').click(function(){
            var guessedWord = this.innerHTML;
            var p = 0, t = password.length - 1, msg = '';

            for(var i = 0; i < t; i++)
                if (guessedWord.charAt(i) === password.charAt(i)) p++;

            if (p === t) msg = 'Exact match! YOU WIN! ';
            else {
                msg = p + '/' + t + ' correct letters. ';
                if (--guesses) msg += guesses + ' guesses remaining.</p>';
                else msg += 'Game over! The password was ' + password;
            }

            if (!guesses || p === t) $('.btnWordChoice').attr('disabled', true);

            $('#output').append('<p>' + guessedWord + ' : ' + msg + '</p>');
        });
    });
});