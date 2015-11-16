/*
	Challenge name: Ramp numbers
    Level: Mini-challenge
	Objective: A ramp number is a number whose digits from left to right either only rise or stay the same. 1234 is a ramp number as is 1124. 1032 is not. Challenge: determine the number of 'ramp numbers' less than a given number 'n'.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3o4tpz/weekly_24_mini_challenges/cw5d9ne?context=10000
*/

function ramp(input){
    var count = 0, i = 0;
    while (i < input){
        count++;
        i = parseInt((i+1).toString().split('').reduce(function(p,c){
            if(p.charAt(p.length-1) > c) return p + p.charAt(p.length-1);
            else return p + c;
        }));
    }
    return count;
}

console.log(ramp(99999));