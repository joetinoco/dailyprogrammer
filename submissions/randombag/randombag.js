/*
    Challenge name: Random bag system
    Level: Easy
	Objective: Implement a system that generates Tetris pieces for a game, by generating a full "bag" with all seven pieces, removing one by one, and refilling the bag when it's empty - thus ensuring the player will not go too long without seeing a particular piece.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3ofsyb/20151012_challenge_236_easy_random_bag_system/
*/

function tetrominoPieces(){
    var pieces = [];
    var output = [], idx;
    while(output.length < 50){
        if (pieces.length === 0) pieces = ['O','I','S','Z','L','J','T'];
        idx = Math.floor(Math.random() * (pieces.length));
        output.push(pieces.splice(idx,1));
    }
    return output.join('');
}

// Verification

function validator(input){
    var chunk, i = 0;
    while(i < input.length){
        chunk = input.slice(i,i+7);
        if ('IJLOSTZ'.indexOf(chunk.split('').sort().join('')) < 0) return false;
        i += 7;
    }
    return true;
}

for (i=0; i<5; i++){
    str = tetrominoPieces();
    console.log(str + " - valid: " + validator(str));
}