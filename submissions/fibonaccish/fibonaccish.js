/*
    Challenge name: Fibonacci-ish sequence
    Level: Intermediate
	Objective: Generate a 'custom' Fibonacci sequence (hence, Fibonacci-ish) that includes numbers that are not in the original sequence.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3opin7/20151014_challenge_236_intermediate_fibonacciish/
*/

function sequence(x1, x2, max){
    var x = x1 + x2;
    if (x1 == 0) return x1 + " " + x2 + " " + sequence(x2, x, max);
    else if (x >= max) return x2 + " " + x;
    else return x2 + " " + sequence(x2, x, max);
}

function fibonacish(x){
    if (x == 0) return "0";
    var fib = x, divisor = 1;
    while ((Math.sqrt(5*Math.pow(fib,2)+4) % 1 !== 0) && (Math.sqrt(5*Math.pow(fib,2)-4) % 1 !== 0)){
        fib = x / ++divisor;
    }
    return sequence(0, divisor, x);
}

console.log(fibonacish(123456789));