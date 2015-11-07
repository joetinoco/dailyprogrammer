/*
	Challenge name: Game of threes
	Level: Easy
	Objective: Starting with a random large number, reduce it to 1 using only three operations: dividing it by 3, adding or subtracting 1.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3r7wxz/20151102_challenge_239_easy_a_game_of_threes/
*/

function gameOfThrees(input){
    if (input === 1) console.log(input);
    else if (input % 3 === 0) console.log(input + " 0"), gameOfThrees(input / 3);
    else if (input % 3 === 1) console.log(input + " -1"), gameOfThrees((input - 1) / 3);
    else console.log(input + " 1"), gameOfThrees((input + 1) / 3);
}