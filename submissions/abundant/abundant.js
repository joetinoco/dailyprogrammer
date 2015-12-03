/*
	Challenge name: Abundant and Deficient Numbers
  Level: Easy
  Objective: Determine if a number is deficient (i.e., the sum of all its divisors is less than 2x the number) or abundant (the other way around). Also show by how much it is abundant.
  Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3uuhdk/20151130_challenge_243_easy_abundant_and/
*/

[18,21,9,111,112,220,69,134,85,6,28].forEach(function(num){
    for(var i=1, div=0; i<num; i++)
        if (num % i === 0) div += i;
    var def = num - div;
    console.log(num + (def > 0 ? ' deficient ' : (def < 0 ? ' abundant by ' + -def : ' ~~neither~~ ')));
});
