/*
    Challenge name: Ruth-Aaron pairs
    Level: Easy
	Objective: Determine if a pair of numbers is a valid Ruth-Aaron pair, i.e., a pair where the sum of its distinct prime factors are equal.
	Reddit thread: https://www.reddit.com/r/dailyprogrammer/comments/3ntsni/20151007_challenge_235_intermediate_scoring_a/
*/

function isRuthAaronPair(n1, n2){
    function primeDecompSum(x){
        var primes = [];
        var divisor = 2;
        while ((x > 1) && (x/divisor !== 1)){
            if (x % divisor === 0){
                x = x / divisor;
                if (primes.indexOf(divisor) === -1){
                    primes.push(divisor);
                }
            } else divisor++;
        }
        primes.push(divisor);
        return primes.reduce(function(a, b) { return a + b; });
    }

    return "("+n1+","+n2+") "+(primeDecompSum(n1) == primeDecompSum(n2) ? "VALID" : "NOT VALID");
}

function main(input){
    var arr = input.split('\n');
    for(i = 1; i <= arr[0]; i++){
        n = arr[i].split(",");
        console.log(isRuthAaronPair(n[0].substring(1),n[1].substring(0,n[1].length-3)));
    }
}

$.get('input.txt', main, 'text');