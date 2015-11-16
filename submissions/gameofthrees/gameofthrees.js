/*
	Challenge name: Game of threes
	Level: Easy
	Objective: The goal of this game is to reduce a random large number to 1 by sucessively dividing it by 3. If the number is not a multiple of 3, you can add or subtract 1 from it to achieve a number that is divisible by three. The challenge is to design a program that plays this game, showing each step of the number reduction.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3r7wxz/20151102_challenge_239_easy_a_game_of_threes/
*/

function gameOfThrees(input){
    if (input === 1) console.log(input);
    else if (input % 3 === 0) console.log(input + " 0"), gameOfThrees(input / 3);
    else if (input % 3 === 1) console.log(input + " -1"), gameOfThrees((input - 1) / 3);
    else console.log(input + " 1"), gameOfThrees((input + 1) / 3);
}

gameOfThrees(100);