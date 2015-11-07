/*
    Challenge name: Zero-sum Game of Thress
    Level: Intermediate
    Objective: A variation of the 'Game of Threes' where you can add any of any of [-2, -1, 1, 2] to reach a multiple of 3, and the sum of all those modifiers must equal 0. The code must handle very large integer inputs in a reasonable time.
    Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3rhzdj/20151104_challenge_239_intermediate_a_zerosum/
*/

function gameOfThrees(input, sum, output){
    sum = sum || 0;
    output = output || '';

    if (input === 1) {
        if (sum === 0){ 
            return output + '\n1';
        } else return null;
    } else if (input >= 3 ){
        var result;
        for(var i = -2; i < 3; i++){
            if ((input + i) % 3 === 0){
                result = gameOfThrees((input + i) / 3, sum + i, output + '\n' + input + ' ' + i);
                if (result) return result;
            }
        }
    }
    return null;
}

// Runs reasonably fast in my crappy PC up to about this long number.
console.log(gameOfThrees(46744073709551620) || 'Impossible!');